"use client";
import React, { useEffect, useState } from "react";
// import { n } from "../../utils/join";
import socketIO from "socket.io-client";
import "../../utils/chat.css";
import ScrollToBottom from "react-scroll-to-bottom";


const ENDPOINT = "http://localhost:4500";
let socket: any;

interface Props{
    userId:string;
}

const Chat:React.FC<Props> = ({userId}) => {
  
  const [id, setid] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>("");

  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert('connected')
      setid(socket.id);
    });

    socket.emit("joined", { user: userId });
    socket.on("welcome", (data: any) => {
      setMessages([...messages, data]);
      console.log(data.user + ":" + data.message);
    });
    socket.on("userJoined", (data: any) => {
      setMessages([...messages, data]);
      console.log(data.user + ":" + data.message);
    });

    socket.on("sendMessage", (data: any) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    socket.on("leave", (data: any) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
    });
    return () => {
      socket.emit("dc");
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data: any) => {
      setMessages([...messages, data]);
      console.log(messages);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() !== "") {
      socket.emit("message", { message: inputText, id });
      // setMessages([...messages, { message: inputText, user: n }]);
      setInputText("");
    }
  };
  return (
    <div className="center">
      <div className="userName">{userId}</div>
      <div className="ChatContainer">
        <ScrollToBottom className="messagesContainer">
          <div className="test">
            {messages.map((i, index) => (
              // <div key={index} className={i.user === n ? 'sender' : 'receiver ' }>
              <div
                key={index}
                className={i.user === userId ? "sender message" : "receiver message"}
              >
                {i.user === userId ? i.message : `${i.user}:${i.message}`}
              </div>
            ))}
          </div>
        </ScrollToBottom>

        <div className="InputContainer">
          <input
            onKeyPress={(event) =>
              event.key === "Enter" ? handleSend() : null
            }
            type="text"
            className="InputField"
            placeholder="Type your message..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="SendButton" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
