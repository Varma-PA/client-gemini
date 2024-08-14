import React from "react";
import { Link } from "react-router-dom";
import "./chatlist.scss";

const ChatList = () => {
  return (
    <div className="chatList">
      <span>Dashboard</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Gemini Clone</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">Recent Chats</span>
      <div className="list">
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
        <Link to="/">Chat Title</Link>
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
