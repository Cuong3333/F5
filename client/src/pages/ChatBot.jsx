import React, { useState, useEffect } from 'react';
import { GrSend } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import axios from 'axios';
import '../css/ChatBox.css';


import Tree from '../components/DecorativeTree/Tree';

const ChatBox = ({ onAddTask }) => {
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  // Fetch initial messages when the component mounts
  useEffect(() => {
    const fetchInitialMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/initial-chat");
        const data = response.data;

        // Set initial messages in the chat
        if (data.messages) {
          setMessages(data.messages.map((msg) => ({
            sender: msg.sender,
            text: msg.text.replace(/\n/g, "<br>"),
            is_task: msg.is_task
          })));
        }
      } catch (error) {
        console.error("Error fetching initial messages:", error);
      }
    };

    fetchInitialMessages();
  }, []); // Empty dependency array to run once on mount

  const handleInputChange = (event) => {
    setTranscript(event.target.value);
  };

  const toggleRecording = () => {
    isRecording ? stopRecording() : startRecording();
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "vi-VN";

      recognition.onstart = () => setIsRecording(true);
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);

      recognition.start();
    } else {
      console.warn("Web Speech API is not supported by this browser.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  // Send message function, triggered by clicking the send button
  const sendMessage = async () => {
    const message = transcript.trim();
    if (!message) return;

    // Add the user's message to the chat before sending
    setMessages([...messages, { sender: "user", text: message }]);
    setTranscript("");

    try {
      const response = await axios.post("http://localhost:8000/chat", new URLSearchParams({ user_input: message }), {
        headers: { "Content-Type": "application/x-www-form-urlencoded" }
      });

      const data = response.data;

      if (data.messages) {
        setMessages((prevMessages) => [
          ...prevMessages,
          ...data.messages.map((msg) => ({
            sender: "bot",
            text: msg.text.replace(/\n/g, "<br>"),
            is_task: msg.is_task // Check if it's a task that requires confirmation
          }))
        ]);
      }

      if (data.audio_url) {
        const audio = new Audio(data.audio_url);
        audio.play();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleTaskResponse = async (index, response) => {
    if (response === "Yes" && messages[index].text) {
      try {
        // Gửi tiêu đề nhiệm vụ tới backend để lưu
        await axios.post("http://localhost:8000/save-task", {
          title: messages[index].text,
          user_id: 1  // Gán cứng user_id là 1
        }, {
          headers: { "Content-Type": "application/json" } // Đảm bảo sử dụng JSON
        });
        console.log("Task saved successfully!");
      } catch (error) {
        console.error("Error saving task:", error);
      }
    }
  
    // Cập nhật trạng thái của nút "Yes" hoặc "No"
    const updatedMessages = [...messages];
    updatedMessages[index] = { ...updatedMessages[index], user_response: response };
    setMessages(updatedMessages);
  };
  

  return (
    <div className="flex flex-col sm:flex-col md:flex-row h-[800px] w-full md:w-[1200px]">
      {/* Phần bên trái */}
      <div className="w-full sm:w-full md:w-[1100px] bg-gray-200 overflow-auto">
        {/* Nội dung bên trái */}

        <div className="chatbox">
          <header>ChatBot</header>
          
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <span dangerouslySetInnerHTML={{ __html: msg.text }} />
                
                {msg.is_task && !msg.user_response && (
                  <div className="task-buttons">
                    <button onClick={() => handleTaskResponse(index, "Yes")}>Yes</button>
                    <button onClick={() => handleTaskResponse(index, "No")}>No</button>
                  </div>
                )}
                
                {msg.user_response && (
                  <div className="user-response">
                    <strong>Response: </strong>{msg.user_response}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="input-container">
            <textarea
              value={transcript}
              onChange={handleInputChange}
              placeholder="Nhập tin nhắn..."
            ></textarea>
            
            <button onClick={toggleRecording} className="voice-button">
              {isRecording ? '🔴 Recording...' : <FaMicrophone size={20} />}
            </button>
            
            <button onClick={sendMessage} className="send-button">
              <GrSend />
            </button>
          </div>
        </div>

      </div>

      {/* Phần bên phải */}
      <div className="w-full sm:w-full md:w-1/2 flex flex-col bg-blue-300">
        {/* Phần bên trên */}
        <div className="h-[300px] w-full sm:w-full md:max-w-[350px] md:mx-auto">
          <Tree />
        </div>

        {/* Phần bên dưới */}
        <div className="flex-grow bg-green-200 overflow-y-auto" style={{ maxHeight: '500px' }}>
          {/* Nội dung phần dưới */}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
