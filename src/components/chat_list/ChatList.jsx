import React from "react";
import { Link } from "react-router-dom";
import "./chatlist.scss";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const backendAPIRoute = import.meta.env.VITE_BACKEND_API_URL;

const ChatList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const response = await axios.get(`${backendAPIRoute}/userchats`, {
        withCredentials: true,
      });
      const data = await response.data;
      return data;
    },
  });

  return (
    <div className="chatList">
      <span>Dashboard</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Gemini Clone</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">Recent Chats</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong..."
          : data.map((chat) => (
              <Link key={chat._id} to={`dashboard/chat/${chat._id}`}>
                {chat.title}
              </Link>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="logo" />
        <div className="texts">
          <span>Upgrade to Gemini Clone Pro</span>
          <span>Get Unlimited Access</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
