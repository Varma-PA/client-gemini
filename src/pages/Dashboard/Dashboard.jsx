import React from "react";
import "./dashboard.scss";
import axios from "axios";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

const backendAPIRoute = import.meta.env.VITE_BACKEND_API_URL;

const Dashboard = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const { getToken } = useAuth();

  const mutation = useMutation({
    mutationFn: async (text) => {
      const response = await axios.post(
        `${backendAPIRoute}/chat`,
        { text },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      const id = await response.data;

      return id;
    },
    onSuccess: (id) => {
      // Invalidate and fetch
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chat/${id}`);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const { value } = event.target.prompt_text;

    console.log(value);

    if (!value) return;

    mutation.mutate(value);

    event.target.prompt_text.value = "";
  };

  return (
    <div className="dashboardPage">
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <h1>Gemini Clone</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="Chat" />
            <span>Create a New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="Chat" />
            <span>Analyze Image</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="Chat" />
            <span>Help me with my Code</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="prompt_text"
            placeholder="Ask me anything..."
          />
          <button type="sbmit">
            <img src="/arrow.png" alt="" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
