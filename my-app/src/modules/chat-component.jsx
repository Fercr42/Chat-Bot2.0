import { ButtonComponent, InputComponent } from "../shared";
import { useState, useEffect } from "react";
import { useQueryChat } from "../hooks/use-query-chat.hook.jsx";
import { chatStyles } from "../styles/chat-styles.js";
import { useLocalStorageChat } from "../hooks/use-localStorage-chat.hook.jsx";

export const ChatComponent = () => {
  const [currentView, setCurrentView] = useState("closed");
  const [chatMessages, setChatMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [shouldSendMessage, setShouldSendMessage] = useState(false);

  const { data, isLoading, error } = useQueryChat(
    messageToSend,
    shouldSendMessage
  );

  const { saveChat, clearChat, loadChat, chats } = useLocalStorageChat();

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSendMessage = (messageToSend) => {
    if (messageToSend.trim()) {
      const updatedMessages = [
        ...chatMessages,
        { id: chatMessages.length + 1, text: messageToSend, sender: "user" },
      ];

      setChatMessages(updatedMessages);
      setMessageInput("");
      setMessageToSend(messageToSend);
      setShouldSendMessage(true);
    }
  };

  const toggleInterface = () => {
    if (currentView === "chat") {
      setCurrentView("history");
    } else if (currentView === "menu") {
      setCurrentView("closed");
    } else {
      setCurrentView("menu");
    }
  };

  const toggleHistory = () => {
    if (currentView === "menu") {
      setCurrentView("history");
    } else if (currentView === "history") {
      setCurrentView("menu");
    }
  };

  const createNewChat = () => {
    const chatId = Date.now();
    const newChat = {
      id: chatId,
      title: `chat ${chats.length + 1}`,
      messages: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setChatMessages([]);
    setMessageInput("");
    setMessageToSend("");
    setShouldSendMessage(false);
    setCurrentChatId(chatId);
    setCurrentView("chat");
    saveChat(newChat);
  };

  useEffect(() => {
    if (data && currentChatId) {
      setChatMessages((prevMessages) => {
        const updatedMessages = [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: data.message || data,
            sender: "bot",
          },
        ];

        const updatedChat = {
          id: currentChatId,
          title: `chat ${chats.length + 1}`,
          messages: updatedMessages,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        saveChat(updatedChat);

        return updatedMessages;
      });
      setShouldSendMessage(false);
    }
  }, [data, currentChatId]);

  return (
    // headerBTN
    <div className="relative">
      <div className={chatStyles.toggleContainer}>
        <ButtonComponent
          name={
            currentView === "menu" ? (
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
          onClick={toggleInterface}
          className={chatStyles.toggleButton}
        />
      </div>

      {/* menu */}
      {currentView === "menu" && (
        <div className={chatStyles.menuContent}>
          <h1 className={chatStyles.menuTitle}>Hi there 👋</h1>
          <p className="text-gray-400 text-sm mb-6 px-6">How can we help?</p>
          <ButtonComponent
            name="create new chat"
            onClick={createNewChat}
            className={chatStyles.menuCreateButton}
          />

          <div className={chatStyles.menuItems}>
            <ButtonComponent
              name={
                <div
                  className={`${chatStyles.navItem} ${
                    currentView === "menu"
                      ? chatStyles.navItemActive
                      : chatStyles.navItemInactive
                  }`}
                >
                  <svg
                    className={chatStyles.navIcon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  <span className={chatStyles.navText}>Home</span>
                </div>
              }
              onClick={toggleHistory}
              className=""
            />

            <ButtonComponent
              name={
                <div
                  className={`${chatStyles.navItem} ${
                    currentView === "history"
                      ? chatStyles.navItemActive
                      : chatStyles.navItemInactive
                  }`}
                >
                  <svg
                    className={chatStyles.navIcon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                  <span className={chatStyles.navText}>Messages</span>
                </div>
              }
              onClick={toggleHistory}
              className=""
            />
          </div>
        </div>
      )}

      {/* history */}
      {currentView === "history" && (
        <div className={chatStyles.menuContent}>
          {chats &&
            Array.isArray(chats) &&
            chats.map((chat) => (
              <div
                className="flex items-center text-white justify-between p-4 bg-blue-900 mask-b-to-orange-300 rounded-2xl hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-white mx-6 mb-2 m-3"
                key={chat.id}
              >
                {chat.title}
                <ButtonComponent
                  name="delete"
                  onClick={() => clearChat(chat.id)}
                  className={chatStyles.menuItemDelete}
                />
                <ButtonComponent
                  name="load"
                  onClick={() => {
                    const messages = loadChat(chat.id);
                    setChatMessages(messages);
                    setCurrentChatId(chat.id);
                    setCurrentView("chat");
                  }}
                  className={chatStyles.menuItemLoad}
                />
              </div>
            ))}

          <div className={chatStyles.menuItems}>
            <ButtonComponent
              name={
                <div
                  className={`${chatStyles.navItem} ${
                    currentView === "menu"
                      ? chatStyles.navItemActive
                      : chatStyles.navItemInactive
                  }`}
                >
                  <svg
                    className={chatStyles.navIcon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                  </svg>
                  <span className={chatStyles.navText}>Home</span>
                </div>
              }
              onClick={toggleHistory}
              className=""
            />

            <ButtonComponent
              name={
                <div
                  className={`${chatStyles.navItem} ${
                    currentView === "history"
                      ? chatStyles.navItemActive
                      : chatStyles.navItemInactive
                  }`}
                >
                  <svg
                    className={chatStyles.navIcon}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
                  </svg>
                  <span className={chatStyles.navText}>Messages</span>
                </div>
              }
              onClick={toggleHistory}
              className=""
            />
          </div>
        </div>
      )}

      {/* backBtn */}
      {currentView === "chat" && (
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
              onClick={toggleInterface}
            />
            <span className="text-white text-xs sm:text-sm md:text-base ml-2">
              Chat
            </span>
          </div>

          {/* chat messages */}
          <div className={chatStyles.messagesArea}>
            {currentView === "chat" && (
              <div className={chatStyles.messagesContainer}>
                {chatMessages.map((message) => (
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
                value={messageInput}
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
                onClick={() => handleSendMessage(messageInput)}
                className={chatStyles.sendButton}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
