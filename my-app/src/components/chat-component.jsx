import { ButtonComponent, InputComponent } from "../shared/index.js";
import { useState, useEffect, useCallback } from "react";
import { useQueryChat, useLocalStorageChat } from "../hooks/index.js";
import { useTheme } from "../hooks/useTheme-hook.jsx";
import { chatStyles } from "../styles/chat-styles.js";
import { motion, AnimatePresence } from "framer-motion";
import {
  MenuComponent,
  HistoryComponent,
  MessagesComponent,
  HeaderChatComponent,
} from "./index.js";

export const ChatComponent = () => {
  const [currentView, setCurrentView] = useState("closed");
  const [chatMessages, setChatMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messageToSend, setMessageToSend] = useState("");
  const [shouldSendMessage, setShouldSendMessage] = useState(false);
  const [search, setSearch] = useState("");
  const [copiedMessageId, setCopiedMessageId] = useState(null);

  const { theme, toggleTheme } = useTheme();

  const { data, isLoading, error } = useQueryChat(
    messageToSend,
    chatMessages,
    shouldSendMessage
  );

  const { saveChat, clearChat, loadChat, chats } = useLocalStorageChat();

  const handleInputChange = useCallback((e) => {
    setMessageInput(e.target.value);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearch(e.target.value);
  }, []);

  const handleCopyToClipboard = useCallback((text, messageId) => {
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
  }, []);

  const getChatDetails = useCallback(() => {
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
  }, [chats, currentChatId, search]);

  const handleSendMessage = useCallback(
    (messageToSend) => {
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
    },
    [chatMessages]
  );

  const toggleInterface = useCallback(() => {
    if (currentView === "chat") {
      setCurrentView("history");
    } else if (currentView === "menu") {
      setCurrentView("closed");
    } else {
      setCurrentView("menu");
    }
  }, []);

  const clearChatState = useCallback(() => {
    setChatMessages([]);
    setMessageInput("");
    setMessageToSend("");
    setShouldSendMessage(false);
  }, []);

  const createNewChat = useCallback(() => {
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
  }, [clearChatState, saveChat, chats.length]);

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
            <HeaderChatComponent
              toggleInterface={toggleInterface}
              search={search}
              handleSearch={handleSearch}
              setCurrentView={setCurrentView}
            />

            {/* chat messages */}
            {currentView === "chat" && (
              <MessagesComponent
                currentView={currentView}
                chatMessages={chatMessages}
                handleCopyToClipboard={handleCopyToClipboard}
                copiedMessageId={copiedMessageId}
                isLoading={isLoading}
                error={error}
              />
            )}

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
