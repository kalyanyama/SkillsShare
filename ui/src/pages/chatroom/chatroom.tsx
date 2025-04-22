import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalAccess } from "../../authentication/GlobalAccessProvider";
import { GET_METHOD } from "../../authentication/get-methods";
import { POST_METHOD } from "../../authentication/post-methods";

const ChatRoom = ({ socket }) => {
  const { user } = useGlobalAccess();
  const { roomId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await GET_METHOD(`api/chats/room/${roomId}/messages`);
        const skillData = await response.json();
        if (skillData.success) {
          setMessages(skillData.messages);
        }
      } catch (err) {
        console.error("Failed to fetch messages:", err);
      }
    };

    fetchMessages();
    socket.emit("joinRoom", {
      roomId,
      username: user.name,
      role: user.role,
    });

    const handleIncomingMessage = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    socket.on("receive-message", handleIncomingMessage);

    return () => {
      socket.off("receive-message", handleIncomingMessage);
    };
  }, [roomId, user, socket]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      const body = {
        roomId,
        senderId: user._id,
        message,
      };
      socket.emit("send-message", body);
      await POST_METHOD("api/chats/message", body);
      setMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 mt-24">
      <h2 className="text-2xl font-bold text-center mb-6">
        Chatting with{" "}
        <span className="text-indigo-600">
          {user.role === "student" ? "Tutor" : "Student"}
        </span>
      </h2>

      <div className="bg-gray-100 rounded-lg shadow-lg h-[500px] overflow-y-auto p-4 space-y-3">
        {messages.map((msg, idx) => {
          const isMe = msg.senderId === user._id;
          return (
            <div
              key={idx}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-xl max-w-[70%] text-sm ${
                  isMe
                    ? "bg-indigo-600 text-white rounded-tr-none"
                    : "bg-white text-gray-800 border rounded-tl-none"
                }`}
              >
                <span className="font-light text-xs opacity-50 block mb-1">
                  {isMe ? "You" : user.role === "student" ? "tutor" : "student"}
                </span>
                <p>{msg.message}</p>
              </div>
            </div>
          );
        })}
        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
