import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import "./homepage.scss";
import axios from "axios";

const backend = import.meta.env.VITE_BACKEND_API_URL;

const Homepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="homePage">
      <img src="./orbital.png" alt="orbital-background" className="orbital" />
      <div className="left">
        <h1>Gemini Clone</h1>
        <h2>Supercharge your creativity and productivity</h2>
        <h3>Coded with ❤️ by Achyuth Varma</h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">
        <div className="imgContainer">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <img src="/bot.png" alt="" className="bot" />
          <div className="chat">
            <img
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "bot.png"
              }
              alt=""
            />
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Human: Hey There!",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Hello, Human!",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2: Who created this app?",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot: Achyuth Varma",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
