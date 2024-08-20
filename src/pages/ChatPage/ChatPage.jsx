import React, { useEffect, useRef } from "react";
import "./chatpage.scss";
import NewPrompt from "../../components/new_prompt/NewPrompt";
import { useLocation } from "react-router-dom";
import { useIsRestoring, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IKImage } from "imagekitio-react";
import { useAuth } from "@clerk/clerk-react";
import Markdown from "react-markdown";

const backendAPIRoute = import.meta.env.VITE_BACKEND_API_URL;

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT_URL;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { getToken } = useAuth();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response = await axios.get(`${backendAPIRoute}/chat/${chatId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      const data = await response.data;
      console.log(data);
      return data;
      // fetch(`${backendAPIRoute}/chat/${chatId}`, {
      //   credentials: "include",
      //   // headers: {
      //   //   Authorization: `Bearer ${await getToken()}`,
      //   // },
      // }).then((res) => res.json());
      // return axios.get(`${backendAPIRoute}/chat/${chatId}`, {
      //   withCredentials: true,
      //   headers: {
      //     Authorization: `Bearer ${await getToken()}`,
      //   },
      // });
    },
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? "Loading..."
            : error
            ? "Something went wrong 2123123..." + error
            : data?.history?.map((message, i) => (
                <>
                  {message.img && (
                    <IKImage
                      key={i}
                      urlEndpoint={urlEndpoint}
                      path={message.img}
                      height="300"
                      width="400"
                      transformation={[{ height: 300, width: 400 }]}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <div
                    key={i}
                    className={
                      message.role === "user" ? "message user" : "message"
                    }
                  >
                    <Markdown>{message.parts[0].text}</Markdown>
                  </div>
                </>
              ))}
          {data ? <NewPrompt data={data} /> : ""}
          {/* {data ? (<NewPrompt data={data}) : "" />} */}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
