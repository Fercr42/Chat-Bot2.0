import { ButtonComponent, InputComponent } from "../shared";
import { useState, useEffect } from "react";
import { useQueryChat } from "../hooks/use-query-chat.hook.jsx";
import { chatStyles } from "../styles/chat-styles.js";

export const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [shouldSend, setShouldSend] = useState(false);
  const { data, isLoading, error } = useQueryChat(messageToSend, shouldSend);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = (messageToSend) => {
    if (messageToSend.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: messageToSend, sender: "user" },
      ]);

      setMessage("");

      setMessageToSend(messageToSend);
      setShouldSend(true);
    }
  };

  useEffect(() => {
    if (data) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: data.message || data,
          sender: "bot",
        },
      ]);
      setShouldSend(false);
    }
  }, [data]);

  return (
    <div className="relative">
      <div className={chatStyles.toggleContainer}>
        <ButtonComponent
          name={
            isOpen ? (
              <svg width="24" height="24" fill="none">
                <path
                  d="M6 18L18 6M6 6l12 12"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none">
                <path
                  d="M8 12h8M12 8v8"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          }
          onClick={toggleChat}
          className={chatStyles.toggleButton}
        />
      </div>

      {isOpen && (
        <div className={chatStyles.container}>
          <div className={chatStyles.header}>
            <button className={chatStyles.backButton} onClick={toggleChat}>
              <svg
                width="14"
                height="14"
                className={chatStyles.backIcon}
                fill="white"
              >
                <path
                  d="M10 4L6 8l4 4"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </button>
            <span className={chatStyles.chatTitle}>Chat</span>
          </div>

          <div className={chatStyles.messagesArea}>
            <div className={chatStyles.messagesContainer}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={chatStyles.messageContainer[message.sender]}
                >
                  <div className={chatStyles.messageBubble[message.sender]}>
                    {message.text}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className={chatStyles.loadingText}>Typing...</div>
              )}
              {error && (
                <div className={chatStyles.errorText}>
                  Error: {error.message}
                </div>
              )}
            </div>
          </div>

          <div className={chatStyles.inputArea}>
            <div className={chatStyles.inputContainer}>
              <InputComponent
                placeholder="Type your message..."
                value={message}
                onChange={handleInputChange}
                className={chatStyles.textInput}
              />
              <ButtonComponent
                name={
                  <svg width="24" height="24" fill="none">
                    <path
                      d="M12 16V8M8 12l4-4 4 4"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
                onClick={() => handleSendMessage(message)}
                className={chatStyles.sendButton}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
