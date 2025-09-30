import { ButtonComponent, InputComponent } from "../shared";
import { useState, useEffect } from "react";
import { useQueryChat } from "../hooks/use-query-chat.hook.jsx";
import { chatStyles } from "../styles/chat-styles.js";
import { useLocalStorageChat } from "../hooks/use-localStorage-chat.hook.jsx";
import { motion, AnimatePresence } from "framer-motion";

export const ChatComponent = () => {
  const [currentView, setCurrentView] = useState("closed");
  const [chatMessages, setChatMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [shouldSendMessage, setShouldSendMessage] = useState(false);
  const [theme, setTheme] = useState("Dark");

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

  const toggleTheme = () => {
    setTheme(theme === "Dark" ? "Light" : "Dark");
  };

  const clearChatState = () => {
    setChatMessages([]);
    setMessageInput("");
    setMessageToSend("");
    setShouldSendMessage(false);
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

    clearChatState();
    setCurrentChatId(chatId);
    setCurrentView("chat");
    saveChat(newChat);
  };

  useEffect(() => {
    if (data && currentChatId && shouldSendMessage) {
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
  }, [data, currentChatId, shouldSendMessage, saveChat, chats.length]);

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

      <AnimatePresence mode="wait">
        {/* menu */}
        {currentView === "menu" && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={
              theme === "Dark"
                ? chatStyles.menuContentDark
                : chatStyles.menuContentLight
            }
          >
            <div className="relative">
              <h1
                className={
                  theme === "Dark"
                    ? chatStyles.menuTitle
                    : chatStyles.menuTitleLight
                }
              >
                Hi there 👋
              </h1>
              <div className="relative flex items-center justify-center px-6 mb-6">
                <p
                  className={
                    theme === "Dark"
                      ? "text-gray-400 text-sm"
                      : "text-gray-600 text-sm"
                  }
                >
                  How can we help?
                </p>
                <ButtonComponent
                  name={
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M20 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
                      <circle cx="12" cy="12" r="5" />
                      <path d="M15.5 12A3.5 3.5 0 1 1 12 8.5" />
                    </svg>
                  }
                  onClick={toggleTheme}
                  className={
                    theme === "Dark"
                      ? "text-white hover:text-gray-400 cursor-pointer hover:scale-110 transition-all duration-300 absolute right-6"
                      : "text-gray-600 hover:text-gray-400 cursor-pointer hover:scale-110 transition-all duration-300 absolute right-6"
                  }
                />
              </div>
            </div>

            <ButtonComponent
              name="create new chat"
              onClick={createNewChat}
              className={chatStyles.menuCreateButton}
            />

            <div
              className={
                theme === "Dark"
                  ? chatStyles.menuItemsDark
                  : chatStyles.menuItemsLight
              }
            >
              <ButtonComponent
                name={
                  <div
                    className={`${chatStyles.navItem} ${
                      currentView === "menu" && theme === "Dark"
                        ? chatStyles.navItemActive
                        : currentView === "menu" && theme === "Light"
                        ? chatStyles.navItemActiveLight
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
                    <span
                      className={
                        theme === "Dark"
                          ? chatStyles.navTextDark
                          : chatStyles.navTextLight
                      }
                    >
                      Home
                    </span>
                  </div>
                }
                onClick={() => setCurrentView("menu")}
                className=""
              />

              <ButtonComponent
                name={
                  <div
                    className={`${chatStyles.navItem} ${
                      currentView === "history" && theme === "Dark"
                        ? chatStyles.navItemActive
                        : currentView === "history" && theme === "Light"
                        ? chatStyles.navItemActiveLight
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
                    <span
                      className={
                        theme === "Dark"
                          ? chatStyles.navTextDark
                          : chatStyles.navTextLight
                      }
                    >
                      Messages
                    </span>
                  </div>
                }
                onClick={() => setCurrentView("history")}
                className=""
              />
            </div>
          </motion.div>
        )}

        {/* history */}
        {currentView === "history" && (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={
              theme === "Dark"
                ? chatStyles.menuContentDark
                : chatStyles.menuContentLight
            }
          >
            {chats &&
              Array.isArray(chats) &&
              chats.map((chat) => (
                <div
                  className="flex items-center text-white p-4 bg-slate-500 mask-b-to-orange-300 rounded-2xl hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer border border-white mx-6 mb-2 m-3"
                  key={chat.id}
                >
                  {chat.title}
                  <div className="flex items-center justify-end ml-auto gap-7">
                    <ButtonComponent
                      name="delete"
                      onClick={() => clearChat(chat.id)}
                      className={chatStyles.menuItemDelete}
                    />
                    <ButtonComponent
                      name="load"
                      onClick={() => {
                        clearChatState();
                        const messages = loadChat(chat.id);
                        setChatMessages(messages);
                        setCurrentChatId(chat.id);
                        setCurrentView("chat");
                      }}
                      className={chatStyles.menuItemLoad}
                    />
                  </div>
                </div>
              ))}

            <div
              className={
                theme === "Dark"
                  ? chatStyles.menuItemsDark
                  : chatStyles.menuItemsLight
              }
            >
              <ButtonComponent
                name={
                  <div
                    className={`${chatStyles.navItem} ${
                      currentView === "menu" && theme === "Dark"
                        ? chatStyles.navItemActive
                        : currentView === "menu" && theme === "Light"
                        ? chatStyles.navItemActiveLight
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
                    <span
                      className={
                        theme === "Dark"
                          ? chatStyles.navTextDark
                          : chatStyles.navTextLight
                      }
                    >
                      Home
                    </span>
                  </div>
                }
                onClick={() => setCurrentView("menu")}
                className=""
              />

              <ButtonComponent
                name={
                  <div
                    className={`${chatStyles.navItem} ${
                      currentView === "history" && theme === "Dark"
                        ? chatStyles.navItemActive
                        : currentView === "history" && theme === "Light"
                        ? chatStyles.navItemActiveLight
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
                    <span
                      className={
                        theme === "Dark"
                          ? chatStyles.navTextDark
                          : chatStyles.navTextLight
                      }
                    >
                      Messages
                    </span>
                  </div>
                }
                onClick={() => setCurrentView("history")}
                className=""
              />
            </div>
          </motion.div>
        )}

        {/* chat */}
        {currentView === "chat" && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={
              theme === "Dark"
                ? chatStyles.containerDark
                : chatStyles.containerLight
            }
          >
            <div
              className={
                theme === "Dark"
                  ? chatStyles.headerDark
                  : chatStyles.headerLight
              }
            >
              <ButtonComponent
                name={
                  theme === "Dark" ? (
                    <svg width="14" height="14" fill="white">
                      <path
                        d="M10 4L6 8l4 4"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  ) : (
                    <svg width="14" height="14" fill="white">
                      <path
                        d="M10 4L6 8l4 4"
                        stroke="black"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  )
                }
                className={chatStyles.backButton}
                onClick={toggleInterface}
              />
              <span
                className={
                  theme === "Dark"
                    ? "text-white text-xs sm:text-sm md:text-base ml-2"
                    : "text-black text-xs sm:text-sm md:text-base ml-2"
                }
              >
                Chat
              </span>

              <ButtonComponent
                name={
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                }
                onClick={() => setCurrentView("closed")}
                className={
                  theme === "Dark"
                    ? "text-white text-lg hover:scale-110 transition-all duration-300 cursor-pointer ml-auto"
                    : "text-black text-lg hover:scale-110 transition-all duration-300 cursor-pointer ml-auto"
                }
              />
            </div>

            {/* chat messages */}
            <div
              className={
                theme === "Dark"
                  ? chatStyles.messagesAreaDark
                  : chatStyles.messagesAreaLight
              }
            >
              {currentView === "chat" && (
                <div className={chatStyles.messagesContainerDark}>
                  {chatMessages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20, rotate: 10 }}
                      animate={{ opacity: 1, y: 0, rotate: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={chatStyles.messageContainer[message.sender]}
                    >
                      <div className={chatStyles.messageBubble[message.sender]}>
                        {message.text}
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={
                        theme === "Dark"
                          ? chatStyles.loadingTextDark
                          : chatStyles.loadingTextLight
                      }
                    >
                      Typing...
                    </motion.div>
                  )}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={
                        theme === "Dark"
                          ? chatStyles.errorTextDark
                          : chatStyles.errorTextLight
                      }
                    >
                      Error: {error.message}
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            {/* input */}
            <div
              className={
                theme === "Dark"
                  ? chatStyles.inputArea
                  : chatStyles.inputAreaLight
              }
            >
              <div
                className={
                  theme === "Dark"
                    ? chatStyles.inputContainer
                    : chatStyles.inputContainerLight
                }
              >
                <InputComponent
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={handleInputChange}
                  className={
                    theme === "Dark"
                      ? chatStyles.textInput
                      : chatStyles.textInputLight
                  }
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
                  className={
                    theme === "Dark"
                      ? chatStyles.sendButton
                      : chatStyles.sendButtonLight
                  }
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
