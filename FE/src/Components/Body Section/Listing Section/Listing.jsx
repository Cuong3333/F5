import React, { useState } from 'react';
import { GrSend } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import { useTodoContext } from '../../../hooks/TodoContext';
import './Listing.css';

const Listing = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [transcript, setTranscript] = useState("");
  const { addTask } = useTodoContext();

  const handleInputChange = (event) => {
    setTranscript(event.target.value);
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "vi-VN";

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } else {
      console.warn("Web Speech API is not supported by this browser.");
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const sendMessage = async () => {
    const messageInput = transcript.trim();
    if (messageInput !== "") {
      const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setMessages([...messages, { sender: "user", text: messageInput, time: currentTime }]);

      try {
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ user_input: messageInput })
        });
        const data = await response.json();

        if (Array.isArray(data.messages)) {
          // Xử lý các phản hồi từ chatbot
          setMessages(prevMessages => [
            ...prevMessages,
            ...data.messages.map(msg => ({
              sender: "bot",
              text: msg.text.replace(/<br>/g, "\n"), // Đảm bảo xuống dòng khi hiển thị
              isTask: msg.is_task
            }))
          ]);
        } else {
          console.error("Expected 'data.messages' to be an array, but got:", data.messages);
        }

        // Phát âm thanh nếu có audio_url
        if (data.audio_url) {
          const audio = new Audio(data.audio_url);
          audio.play().catch(error => console.error("Error playing audio:", error));
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }
      setTranscript("");
    }
  };

  return (
    <div className="listingSection show-chatbot">
      <div className="chatbot">
        <header>
          <h2>Chatbot</h2>
        </header>

        <div className="chat-box" id="chat-box">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.sender}`}>
              <p style={{ whiteSpace: "pre-line" }}>{msg.text}</p> {/* Đảm bảo xuống dòng khi hiển thị */}
              {msg.isTask && (
                <div>
                  <button onClick={() => addTask(msg.text)}>Yes</button>
                  <button>No</button>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <textarea
            id="user_input"
            placeholder="Enter a message..."
            required
            value={transcript}
            onChange={handleInputChange}
          ></textarea>
          <button onClick={toggleRecording} className="voice-button">
            {isRecording ? '🔴 Recording...' : <FaMicrophone size={20} />}
          </button>
          <button onClick={sendMessage}>
            <GrSend className="icon iconSend" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Listing;
