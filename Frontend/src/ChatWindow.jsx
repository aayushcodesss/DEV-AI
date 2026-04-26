import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, currThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const getReply = async () => {
        if (!prompt.trim() || loading) return;

        setLoading(true);
        setNewChat(false);

        const currentPrompt = prompt;
        setPrompt("");

        // Immediately add user message to UI
        setPrevChats(prevChats => (
            [...prevChats, {
                role: "user",
                content: currentPrompt
            }]
        ));

        console.log("message ", currentPrompt, " threadId ", currThreadId);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: currentPrompt,
                threadId: currThreadId
            })
        };

        try {
            const API_URL = import.meta.env.VITE_API_URL || "";
            const response = await fetch(`${API_URL}/api/chat`, options);
            const res = await response.json();
            console.log(res);
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    // Append AI reply to prevChats when received
    useEffect(() => {
        if(reply) {
            setPrevChats(prevChats => {
                // If the last message is already from the assistant for this turn, don't duplicate
                if (prevChats.length > 0 && prevChats[prevChats.length - 1].role === "assistant") {
                    return prevChats;
                }
                return [...prevChats, {
                    role: "assistant",
                    content: reply
                }];
            });
            setReply(null); // Clear reply after adding to prevent infinite loops
        }
    }, [reply, setPrevChats, setReply]);


    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>DEV AI <i className="fa-solid fa-chevron-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon">A</span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i className="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i className="fa-solid fa-cloud-arrow-up"></i> Upgrade plan</div>
                    <div className="dropDownItem"><i className="fa-solid fa-arrow-right-from-bracket"></i> Log out</div>
                </div>
            }
            
            <Chat loading={loading} />

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask anything..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter'? getReply() : ''}
                    />
                    <div id="submit" 
                         className={!prompt.trim() || loading ? 'disabled' : ''} 
                         onClick={getReply}>
                        <i className="fa-solid fa-arrow-up"></i>
                    </div>
                </div>
                <p className="info">
                    DEV AI can make mistakes. Check important info.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;