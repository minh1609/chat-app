import React, { useEffect, useState } from "react";
import UserList from "./UserList";
import socket from "../socketConfig";

function ChatMenu() {
    const [chatContent, setChatContent] = useState([]);
    const [message, setMessage] = useState("");
    let userName = sessionStorage.getItem("userName");

    const send = e => {
        socket.emit("send message", {
            message,
            user: sessionStorage.getItem("userName")
        });
        setMessage("");
    };

    const handleChange = e => {
        setMessage(e.target.value);
    };

    socket.on("new message", data => {
        setChatContent([...chatContent, data]);
    });

    const renderChatContent = () => {
        return chatContent.map(e => {
            return (
                <div class="alert alert-secondary" role="alert">
                    <strong>{e.user}</strong>: {e.message}
                </div>
            );
        });
    };

    return (
        <div className="container mt-3">
            <h2>
                Hi {sessionStorage.getItem("userName")}, welcome to room chat
            </h2>
            <UserList />
            <div>{renderChatContent()}</div>
            <input
                className="form-control mt-2"
                onChange={handleChange}
                value={message}
                type="text"
                placeholder="enter your message"
            />
            <button className="btn-primary btn my-3" onClick={send}>
                Send
            </button>
        </div>
    );
}

export default ChatMenu;
