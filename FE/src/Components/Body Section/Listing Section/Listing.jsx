import React, { useState, useEffect } from 'react';
import { GrSend } from "react-icons/gr";
import { FaMicrophone } from "react-icons/fa";
import './Listing.css';

const Listing = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState([]);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [transcript, setTranscript] = useState(""); // Văn bản nhận dạng từ giọng nói

    // Hàm cập nhật transcript khi người dùng gõ vào textarea
  const handleInputChange = (event) => {
    setTranscript(event.target.value);
  };
  // Hàm để bắt đầu hoặc dừng ghi âm và nhận diện giọng nói
  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const startRecording = () => {
    // Bắt đầu ghi âm với Web Speech API
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "vi-VN"; // Ngôn ngữ Tiếng Việt

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        setTranscript(speechToText); // Cập nhật văn bản vào transcript
        document.getElementById("user_input").value = speechToText; // Hiển thị trong textarea
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
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  // Hàm gửi tin nhắn văn bản
  const sendMessage = async () => {
    const messageInput = document.getElementById("user_input").value;

    if (messageInput.trim() !== "") {
      // Hiển thị tin nhắn của người dùng
      setMessages([...messages, { sender: "user", text: messageInput }]);

      try {
        // Gửi yêu cầu tới backend để nhận phản hồi
        const response = await fetch("http://localhost:8000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ user_input: messageInput })
        });

        const data = await response.json();

        // Hiển thị phản hồi từ chatbot
        if (data.response) {
          setMessages(prevMessages => [
            ...prevMessages,
            { sender: "bot", text: data.response }
          ]);
        }

        // Phát âm thanh nếu có
        if (data.audio_url) {
          const audio = new Audio(data.audio_url);
          audio.play().catch(error => console.error("Error playing audio:", error));
          
          // Hiển thị trình phát âm thanh trong giao diện
          const audioElement = (
            <audio controls src={data.audio_url} style={{ marginTop: '10px' }}>
              Your browser does not support the audio element.
            </audio>
          );
          setMessages(prevMessages => [
            ...prevMessages,
            { sender: "bot", text: "Bot sent an audio response:", audio: audioElement }
          ]);
        }
      } catch (error) {
        console.error("Error sending message:", error);
      }

      // Xóa nội dung ô nhập sau khi gửi
      document.getElementById("user_input").value = "";
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
              {msg.text}
              {msg.audio && msg.audio}  {/* Hiển thị phần tử audio nếu có */}
            </div>
          ))}
        </div>
        
        <div className="chat-input">
          <textarea
            id="user_input"
            placeholder="Enter a message..."
            required
            value={transcript}
            onChange={handleInputChange} // Cho phép người dùng nhập liệu
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
