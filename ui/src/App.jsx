import { Route, Routes } from "react-router-dom";
import { io } from "socket.io-client";
import { GlobalAccessProvider } from "./authentication/GlobalAccessProvider";
import PrivateRoute from "./authentication/PrivateRoute";
import { Footer } from "./components/layouts/footer";
import { Header } from "./components/layouts/header";
import ChatRoom from "./pages/chatroom/chatroom";
import { Dashboard } from "./pages/dashboard";
import { Landingpage } from "./pages/landingpage/landingpage";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { SkillPage } from "./pages/skills/skill";

const socket = io.connect("http://localhost:3120/");

function App() {
  
  return (
    <GlobalAccessProvider>
      <Header />
      <Routes>
        <Route path="*" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Register />} />

        <Route
          path="/tutor/dashboard"
          element={
            <PrivateRoute requiredRoles={["tutor", "student"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/skills/:skillId"
          element={
            <PrivateRoute requiredRoles={["student"]}>
              <SkillPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/chat/:roomId"
          element={
            <PrivateRoute requiredRoles={["student", "tutor"]}>
              <ChatRoom socket={socket} />
            </PrivateRoute>
          }
        />
      </Routes>
      <Footer />
    </GlobalAccessProvider>
  );
}

export default App;
