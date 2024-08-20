import React, { useRef, useEffect, useState } from "react";
import "./newprompt.scss";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini.js";
import Markdown from "react-markdown";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";

const backendAPIRoute = import.meta.env.VITE_BACKEND_API_URL;
const environment = import.meta.env.VITE_ENVIRONMENT;

const NewPrompt = ({ data }) => {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);
  const formRef = useRef(null);

  // const chat = model.startChat({
  //   history: [
  //     data?.history.map(({ role, parts }) => ({
  //       role: role,
  //       parts: [{ text: parts[0].text }],
  //     })),
  //   ],
  //   generationConfig: {
  //     // maxOutputTokens: 100,
  //   },
  // });

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "Hello" }],
      },
      {
        role: "model",
        parts: [{ text: "Great to meet you. What would you like to know?" }],
      },
    ],
    generationConfig: {},
  });

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer, img.dbData]);

  const hasRun = useRef(false);
  useEffect(() => {
    if (!hasRun.current) {
      console.log("Inside Use Effect");
      console.log(data);
      if (data?.history?.length === 1) {
        console.log("Inside if");
        add(data.history[0].parts[0], true);
      }
    }
    hasRun.current = true;
  }, []);

  const queryClient = useQueryClient();

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.put(
        `${backendAPIRoute}/chat/${data._id}`,
        {
          question: question.length ? question : undefined,
          answer,
          img: img.dbData?.filePath || undefined,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );
      const theData = await response.data;
      return theData;
    },
    onSuccess: () => {
      // Invalidate and fetch

      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
          setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
        });

      // console.log("Inside New Prompt On Success mutation");
      // queryClient
      //   .invalidateQueries({ queryKey: ["chat", data._id] })
      //   .then(() => {
      //     console.log("Inside Invalidation Then Loop");
      //     formRef.current.reset();
      //     setQuestion("");
      //     setAnswer("");
      //     setImg({ isLoading: false, error: "", dbData: {}, aiData: {} });
      //   });
      // navigate(`/dashboard/chat/${id}`);
    },
    onError: (err) => {
      console.log("Inside Error");
      console.log(err);
    },
  });

  const add = async (text, isInitial) => {
    // const prompt = "Write a story about an AI and magic";
    try {
      if (!isInitial) setQuestion(text);

      const result = await chat.sendMessageStream(
        Object.entries(img.aiData).length ? [img.aiData, text] : text
      );

      let accumulatedText = "";

      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      console.log("Not waiting until the first loop is done");

      // const response = await result.response;
      // const answer = response.text();

      // setAnswer(answer);

      // setImg({
      //   isLoading: false,
      //   error: "",
      //   dbData: {},
      //   aiData: {},
      // });

      // return response.text();
      mutation.mutate();
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { value } = event.target.text_box;

    if (!value) return;

    event.target.text_box.value = "";

    add(value, false);
  };

  return (
    <>
      {img.isLoading && <div className="loading">Loading...</div>}
      {img.dbData?.filePath && (
        <IKImage
          urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT_URL}
          path={img.dbData?.filePath}
          width="300"
          transformation={[{ width: "300" }]}
        />
      )}
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}>
        <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
          <Upload setImg={setImg} />
          <input id="file" type="file" multiple={false} hidden />
          <input type="text" name="text_box" placeholder="Ask me anything..." />
          <button type="submit">
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </>
  );
};

export default NewPrompt;
