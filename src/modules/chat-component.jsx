import { ButtonComponent, InputComponent } from "../shared";
import { useState, useEffect } from "react";
import { useQueryChat } from "../hooks/use-query-chat.hook.jsx";
import { chatStyles } from "../styles/chat-styles.js";
import { useLocalStorageChat } from "../hooks/use-localStorage-chat.hook.jsx";

export const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [view, setView] = useState("closed"); // 'closed', 'menu', 'chat'

  const [shouldSend, setShouldSend] = useState(false);
  const { data, isLoading, error } = useQueryChat(messageToSend, shouldSend);

  const { saveChat, clearChat, loadChat, getChats, chats, setChats } =
    useLocalStorageChat();

  const handleInputChange = (e) => {
    setMessage(e.target.value);
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

  const toggleChat = () => {
    setView("chat");
  };

  const toggleMenu = () => {
    console.log("Vista actual:", view);
    if (view === "chat") {
      setView("menu"); // Chat → Menú
    } else if (view === "menu") {
      setView("closed"); // Menú → Cerrado
    } else {
      setView("menu"); // Cerrado → Menú
    }
  };

  // Debug para ver cambios de vista
  useEffect(() => {
    console.log("Vista cambiada a:", view);
  }, [view]);

  const createNewChat = () => {
    const newChat = {
      id: Date.now(),
      title: "Nuevo Chat",
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const currentChats = Array.isArray(chats) ? chats : [];
    setChats([...currentChats, newChat]);
    saveChat(newChat);
    setMessages([]);
    setView("chat");
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
    // HeaderBtn
    <div className="relative">
      <div className={chatStyles.toggleContainer}>
        <ButtonComponent
          name={
            view === "menu" ? (
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
          onClick={toggleMenu}
          className={chatStyles.toggleButton}
        />
      </div>

      {/* menu */}
      {view === "menu" && (
        <div className={chatStyles.menuContent}>
          <h3 className={chatStyles.menuTitle}>
            Hi there 👋 How can we help you today?
          </h3>
          <ButtonComponent
            name="create new chat"
            onClick={createNewChat}
            className={chatStyles.menuCreateButton}
          />
          <h3>Chats history</h3>
          {chats &&
            Array.isArray(chats) &&
            chats.map((chat) => (
              <div className={chatStyles.menuChatItem} key={chat.id}>
                {chat.title}
                <ButtonComponent
                  name="delete"
                  onClick={() => clearChat(chat.id)}
                  className={chatStyles.menuItemDelete}
                />
                <ButtonComponent
                  name="load"
                  onClick={() => loadChat(chat.id)}
                  className={chatStyles.menuItemLoad}
                />
              </div>
            ))}
        </div>
      )}

      {/* backBtn */}
      {view === "chat" && (
        <div className={chatStyles.container}>
          <div className={chatStyles.header}>
            <ButtonComponent
              name={
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
              }
              className={chatStyles.backButton}
              onClick={toggleChat}
            />
            <span className={chatStyles.chatTitle}>Chat</span>
          </div>

          {/* messages */}
          <div className={chatStyles.messagesArea}>
            {view === "chat" && (
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
            )}
          </div>

          {/* input */}
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
