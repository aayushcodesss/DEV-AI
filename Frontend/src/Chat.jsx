import "./Chat.css";
import React, { useContext } from "react";
import { MyContext } from "./MyContext";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Chat({ loading }) {
    const {newChat, prevChats, setPrompt} = useContext(MyContext);

    const handleSuggestionClick = (text) => {
        setPrompt(text);
        // The user will manually click send or we can auto-send, 
        // but populating input is safer.
    };

    return (
        <div className="chats">
            {newChat && (
                <div className="welcomeScreen">
                    <h1>Welcome to DEV AI</h1>
                    <div className="suggestions">
                        <div className="suggestionPill" onClick={() => handleSuggestionClick("Explain quantum computing in simple terms")}>
                            Explain quantum computing
                        </div>
                        <div className="suggestionPill" onClick={() => handleSuggestionClick("Write a professional email to my boss")}>
                            Write an email
                        </div>
                        <div className="suggestionPill" onClick={() => handleSuggestionClick("How do I center a div in CSS?")}>
                            Center a div in CSS
                        </div>
                        <div className="suggestionPill" onClick={() => handleSuggestionClick("Give me a 3-day workout plan")}>
                            Workout plan
                        </div>
                    </div>
                </div>
            )}
            
            {prevChats?.map((chat, idx) => 
                <div className={chat.role === "user"? "userDiv" : "gptDiv"} key={idx}>
                    {chat.role === "assistant" && (
                        <div className="gptAvatar">
                            <img src="src/assets/blacklogo.png" alt="DEV AI" />
                        </div>
                    )}
                    
                    {chat.role === "user"? 
                        <p className="userMessage">{chat.content}</p> : 
                        <div className="gptMessageContent">
                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                        </div>
                    }
                </div>
            )}

            {loading && (
                <div className="gptDiv" key="loading">
                    <div className="gptAvatar">
                        <img src="src/assets/blacklogo.png" alt="DEV AI" />
                    </div>
                    <div className="gptMessageContent">
                        <div className="typingIndicator">
                            <div className="dot"></div>
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Chat;