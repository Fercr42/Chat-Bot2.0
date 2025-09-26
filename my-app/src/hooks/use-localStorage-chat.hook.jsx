import { useState, useEffect } from "react";

export const useLocalStorageChat = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const loadInitialChats = () => {
      const storedChats = localStorage.getItem("chats");
      if (storedChats) {
        try {
          const parsedChats = JSON.parse(storedChats);
          if (Array.isArray(parsedChats)) {
            setChats(parsedChats);
          } else {
            setChats([]);
          }
        } catch (error) {
          console.error("Error parsing stored chats:", error);
          setChats([]);
        }
      }
    };
    loadInitialChats();
  }, []);

  const saveChat = (chat) => {
    let storageChats = localStorage.getItem("chats");
    let existingChats = [];

    if (storageChats) {
      try {
        existingChats = JSON.parse(storageChats);
        if (!Array.isArray(existingChats)) {
          existingChats = [];
        }
      } catch (error) {
        console.error("Error parsing stored chats:", error);
        existingChats = [];
      }
    }

    const existingChatIndex = existingChats.findIndex((c) => c.id === chat.id);

    let updatedChats;
    if (existingChatIndex >= 0) {
      updatedChats = [...existingChats];
      updatedChats[existingChatIndex] = chat;
    } else {
      updatedChats = [...existingChats, chat];
    }
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setChats(updatedChats);
  };

  const clearChat = (chatId) => {
    let storageChats = localStorage.getItem("chats");
    if (storageChats) {
      const parsedChats = JSON.parse(storageChats);
      const filterChats = parsedChats.filter((chat) => chat.id !== chatId);
      localStorage.setItem("chats", JSON.stringify(filterChats));
      setChats(filterChats);
    }
  };

  const loadChat = (chatId) => {
    let storageChats = localStorage.getItem("chats");
    if (storageChats) {
      const allChats = JSON.parse(storageChats);
      const selectedChat = allChats.find((chat) => chat.id === chatId);
      return selectedChat ? selectedChat.messages : [];
    }
    return [];
  };

  return {
    saveChat,
    clearChat,
    loadChat,
    chats,
  };
};
