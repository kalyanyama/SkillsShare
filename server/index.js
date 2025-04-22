const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const user = require("./routes/user");
const chat = require("./routes/chat");
const skills = require("./routes/skillsCategory/skill");
const skillsCategory = require("./routes/skillsCategory");
const connectDB = require("./database");
const globalError = require("./middlewares/global-error");

require("dotenv").config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());

app.use("/api/users", user);
app.use("/api/chats", chat);
app.use("/api/skills", skills);
app.use("/api/skills-category", skillsCategory);

app.use(globalError);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinRoom", ({ roomId, username, role }) => {
    socket.join(roomId);
    console.log(`${username} with role ${role} joined room: ${roomId}`);

    socket.to(roomId).emit("message", {
      user: "System",
      text: `${username} (${role}) joined the chat`,
    });
  });

  socket.on("send-message", (data) => {
    const { roomId, senderId, message } = data;
    console.log("Received message:", data);

    io.to(roomId).emit("receive-message", {
      roomId,
      senderId,
      message,
      timestamp: new Date(),
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 3120;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
