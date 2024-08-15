import React, { useEffect, useRef } from "react";
import "./chatpage.scss";
import NewPrompt from "../../components/new_prompt/NewPrompt";

const ChatPage = () => {
  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          <div className="message">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae
            eius expedita voluptates accusamus dolorum illo quo, molestias ipsum
            reiciendis natus totam architecto error dicta. Possimus eius minus
            assumenda molestiae exercitationem!
          </div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis, possimus. A animi ea alias, illum voluptatibus nihil
            quis ipsa sequi inventore ullam, consectetur, veritatis ducimus iste
            at deserunt aut debitis! 1
          </div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <div className="message">AI</div>
          <div className="message user">User 1</div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
