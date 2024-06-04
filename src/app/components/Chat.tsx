"use client";
import React, { useEffect, useState } from "react";
// import { n } from "../../utils/join";
import socketIO from "socket.io-client";
import "../../utils/chat.css";
import ScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "http://localhost:4500";
let socket: any;

interface Props {
  userId: string;
  recipientId: string;
}

const Chat: React.FC<Props> = ({ userId, recipientId }) => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [inputText, setInputText] = useState<string>("");
  const [isChatboxOpen, setIsChatboxOpen] = useState<boolean>(false);
  const [sender, setSender] = useState<string>(userId);
  const [reciever, setReciever] = useState<string>(recipientId)
  const chatContainer = document.getElementById("chat-container");
  const toggleChatbox = () => {
    chatContainer?.classList.toggle("hidden");
    setIsChatboxOpen(!isChatboxOpen); // Toggle the state
  };
  useEffect(() => {
    setReciever(recipientId);
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      // alert('connected')
      setid(socket.id);
    });

    socket.emit("joined", userId);
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

    // socket.on("leave", (data: any) => {
    //   setMessages([...messages, data]);
    //   console.log(data.user, data.message);
    // });
    // return () => {
    //   socket.emit("dc");
    //   socket.off();
    // };
  }, []);

  useEffect(() => {
    socket.on("recieveMessage", (data: any) => {
      setMessages([...messages, data]);
      console.log(messages,data);
      setSender(data.reciever);
      setReciever(data.sender)
      console.log(data.reciever, data.sender, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim() !== "") {
      socket.emit("sendMessage", { message: inputText, id, sender, reciever });
      setSender(userId)
      setReciever(reciever)
      setMessages([...messages, { message: inputText, sender, reciever }]);
      setInputText("");
    }
  };
  return (
    <>
      <div className="fixed bottom-0 right-0 mb-4 mr-4">
        <button
          onClick={toggleChatbox}
          id="open-chat"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            ></path>
          </svg>
          Ping
        </button>
      </div>
      <div id="chat-container" className="hidden fixed bottom-16 right-4 w-96">
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
          <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
            <p className="text-lg font-semibold">{recipientId}</p>
            <button
              onClick={toggleChatbox}
              id="close-chat"
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          {/* <div id="chatbox" className="p-4 h-80 overflow-y-auto">
      <div className="mb-2 text-right">
        <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">hello</p>
      </div>
      <div className="mb-2">
        <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
      </div>
      <div className="mb-2 text-right">
        <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">this example of chat</p>
      </div>
      <div className="mb-2">
        <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
      </div>
      <div className="mb-2 text-right">
        <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">design with tailwind</p>
      </div>
      <div className="mb-2">
        <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
      </div>
    </div> */}

          {/* <div className="p-4 border-t flex">
        <input id="user-input" type="text" placeholder="Type a message" className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        <button id="send-button" className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
    </div> */}

          <div className="ChatContainer">
            <ScrollToBottom className="messagesContainer">
              <div className="test">
                {messages.map((i, index) => (
                  // <div key={index} className={i.user === n ? 'sender' : 'receiver ' }>
                  <div
                    key={index}
                    className={
                      i.sender === userId ? "sender message" : "receiver message"
                    }
                  >
                    {i.sender === userId ? i.message : `${i.sender}:${i.message}`}
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
      </div>
    </>
  );
};

export default Chat;
