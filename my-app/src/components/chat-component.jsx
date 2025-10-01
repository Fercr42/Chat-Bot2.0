import { ButtonComponent, InputComponent } from "../shared/index.js";
import { useState, useEffect } from "react";
import { useQueryChat } from "../hooks/use-query-chat.hook.jsx";
import { chatStyles } from "../styles/chat-styles.js";
import { useLocalStorageChat } from "../hooks/use-localStorage-chat.hook.jsx";
import { motion, AnimatePresence } from "framer-motion";
import { MenuComponent } from "./menu.component.jsx";
import { HistoryComponent } from "./history.component.jsx";

export const ChatComponent = () => {
  const [currentView, setCurrentView] = useState("closed");
  const [chatMessages, setChatMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [shouldSendMessage, setShouldSendMessage] = useState(false);
  const [theme, setTheme] = useState("Dark");
  const [search, setSearch] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const { data, isLoading, error } = useQueryChat(
    messageToSend,
    shouldSendMessage
  );

  const { saveChat, clearChat, loadChat, chats } = useLocalStorageChat();

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCopyToClipboard = (text, messageId) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedMessageId(messageId);

        setTimeout(() => {
          setCopiedMessageId(null);
        }, 2000);
      },
      (err) => {
        console.error("error copying to clipboard:", err);
      }
    );
  };

  const getChatDetails = () => {
    const chat = chats.find((chat) => chat.id === currentChatId);

    if (!chat) {
      setChatMessages([]);
      return [];
    }

    if (!search.trim()) {
      setChatMessages(chat.messages);
      return chat.messages;
    }

    const filteredChatMessages = chat.messages.filter((message) =>
      message.text.toLowerCase().includes(search.toLowerCase())
    );

    setChatMessages(filteredChatMessages);
    return filteredChatMessages;
  };

  const toggleTheme = () => {
    setTheme(theme === "Dark" ? "Light" : "Dark");
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

  useEffect(() => {
    if (currentChatId) {
      getChatDetails();
    }
  }, [search, currentChatId]);

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
          >
            <MenuComponent
              currentView={currentView}
              theme={theme}
              toggleTheme={toggleTheme}
              createNewChat={createNewChat}
              setCurrentView={setCurrentView}
            />
          </motion.div>
        )}

        {/* history */}
        <motion.div
          key="history"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {currentView === "history" && (
            <HistoryComponent
              currentView={currentView}
              theme={theme}
              chats={chats}
              clearChat={clearChat}
              loadChat={loadChat}
              setChatMessages={setChatMessages}
              setCurrentChatId={setCurrentChatId}
              setCurrentView={setCurrentView}
              setMessageInput={setMessageInput}
              setMessageToSend={setMessageToSend}
              setShouldSendMessage={setShouldSendMessage}
            />
          )}
        </motion.div>

        {/* chat header*/}
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
              <div className="flex-1 flex items-center gap-2 ml-2">
                <span
                  className={
                    theme === "Dark"
                      ? "text-white text-xs sm:text-sm md:text-base"
                      : "text-black text-xs sm:text-sm md:text-base"
                  }
                >
                  Chat
                </span>
                <input
                  type="text"
                  placeholder="Search Messages..."
                  value={search}
                  onChange={handleSearch}
                  className={
                    theme === "Dark"
                      ? "flex ml-auto bg-gray-700 text-white text-xs px-3 py-1 rounded-lg outline-none placeholder-gray-400"
                      : "flex ml-auto bg-gray-200 text-black text-xs px-3 py-1 rounded-lg outline-none placeholder-gray-500"
                  }
                />
              </div>

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
                      <div className="flex items-center gap-2">
                        <div
                          className={chatStyles.messageBubble[message.sender]}
                        >
                          {message.text}
                        </div>

                        <div className="relative">
                          <ButtonComponent
                            name={
                              copiedMessageId === message.id ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M20 6L9 17l-5-5"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <rect
                                    x="9"
                                    y="9"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  />
                                  <rect
                                    x="3"
                                    y="3"
                                    width="13"
                                    height="13"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  />
                                </svg>
                              )
                            }
                            onClick={() =>
                              handleCopyToClipboard(message.text, message.id)
                            }
                            className={
                              copiedMessageId === message.id
                                ? "text-green-500 cursor-pointer scale-110 transition-all duration-300"
                                : theme === "Dark"
                                ? "text-gray-400 hover:text-white cursor-pointer hover:scale-110 transition-all duration-300"
                                : "text-gray-600 hover:text-black cursor-pointer hover:scale-110 transition-all duration-300"
                            }
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-center">
                      <motion.div
                        className="flex gap-2 p-4 bg-slate-500 rounded-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.span
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ repeat: Infinity, duration: 1 }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.2,
                          }}
                        />
                        <motion.span
                          className="w-2 h-2 bg-white rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            delay: 0.4,
                          }}
                        />
                      </motion.div>
                    </div>
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
