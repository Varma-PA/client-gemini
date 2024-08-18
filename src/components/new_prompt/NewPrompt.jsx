import React, { useRef, useEffect, useState } from "react";
import "./newprompt.scss";
import Upload from "../upload/Upload";
import { IKImage } from "imagekitio-react";
import model from "../../lib/gemini.js";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const [question, setQuestion] = useState("");

  const [answer, setAnswer] = useState("");

  const [img, setImg] = useState({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const endRef = useRef(null);

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

  const add = async (prompt) => {
    // const prompt = "Write a story about an AI and magic";

    setQuestion(prompt);

    const result = await chat.sendMessageStream(
      Object.entries(img.aiData).length ? [img.aiData, prompt] : prompt
    );

    let accumulatedText = "";

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      console.log(chunkText);
      accumulatedText += chunkText;
      setAnswer(accumulatedText);
    }

    // const response = await result.response;
    // const answer = response.text();

    // setAnswer(answer);

    setImg({
      isLoading: false,
      error: "",
      dbData: {},
      aiData: {},
    });

    // return response.text();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { value } = event.target.text_box;

    if (!value) return;

    event.target.text_box.value = "";

    await add(value);
  };

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer, img.dbData]);
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
        <form className="newForm" onSubmit={handleSubmit}>
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
