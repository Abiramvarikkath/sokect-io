
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import route from '../router';
import { useParams } from 'react-router-dom';
import { io } from "socket.io-client";
import './Chat.scss'; 
import { IoMdSend } from "react-icons/io";

const SOCKET_SERVER_URL = "http://localhost:3010";

function Chat() {
    const token = localStorage.getItem("Auth");
    const { otherUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socketRef = useRef();
    const messagesEndRef = useRef(null);

    // Initialize socket connection
    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL, {
            auth: { token: `Bearer ${token}` },
            transports: ["websocket"],
        });

        socketRef.current.on("receive_message", (message) => {
            if (
                message.senderId === otherUserId ||
                message.receiverId === otherUserId
            ) {
                setMessages((prev) => [...prev, message]);
            }
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [otherUserId, token]);

    // Fetch chat history
    useEffect(() => {
        const fetchMessages = async () => {
            if (!otherUserId) return;
            try {
                const { status, data } = await axios.get(
                    `${route()}messages/${otherUserId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (status === 200) {
                    setMessages(data);
                }
            } catch (error) {
                console.log(error);
                alert('Error loading messages');
            }
        };
        fetchMessages();
    }, [otherUserId, token]);

    // Auto-scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Send message
    const sendMessage = async () => {
        if (!newMessage.trim()) return;

        const messageData = {
            receiverId: otherUserId,
            content: newMessage,
        };
        try {
            const { status, data } = await axios.post(
                `${route()}message`,
                messageData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (status === 201) {
                socketRef.current.emit("send_message", data);
                setMessages((prev) => [...prev, data]);
                setNewMessage("");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending message");
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Chat</h2>
            <div className="chat-messages">
                {messages.map((msg) => {
                    const isMine = msg.senderId !== otherUserId;
                    return (
                        <div
                            key={msg._id}
                            className={`chat-message ${isMine ? "mine" : "theirs"}`}
                        >
                            <span>{msg.content}</span>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="chat-input-container">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button onClick={sendMessage}><IoMdSend /></button>
            </div>
        </div>
    );
}

export default Chat;
