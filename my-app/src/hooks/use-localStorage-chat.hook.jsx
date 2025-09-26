import { useState, useEffect } from "react";

export const useLocalStorageChat = () => {
  const [chats, setChats] = useState([]);

  // Asegurar que chats siempre sea un array
  useEffect(() => {
    if (!Array.isArray(chats)) {
      setChats([]);
    }
  }, [chats]);

  //    guardar un chat
  const saveChat = (chat) => {
    const newChat = {
      id: chat.id,
      messages: chat.messages,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
    };

    localStorage.setItem("chats", JSON.stringify(chat));
    setChats(chat);
  };

  //    eliminar un chat específico
  const clearChat = (chatId) => {
    let storageChats = localStorage.getItem("chats");
    if (storageChats) {
      const parsedChats = JSON.parse(storageChats);
      const filterChats = parsedChats.filter((chat) => chat.id !== chatId);
      localStorage.setItem("chats", JSON.stringify(filterChats));
      setChats(filterChats);
    }
  };

  //    cargar un chat específico
  const loadChat = (chatId) => {
    let storageChats = localStorage.getItem("chats");
    if (storageChats) {
      const allChats = JSON.parse(storageChats);
      const filteredChats = allChats.filter((chat) => chat.id === chatId);
      localStorage.setItem("chats", JSON.stringify(filteredChats));
      setChats(filteredChats);
      return filteredChats;
    }
    return [];
  };

  //    obtener todos los chats
  const getChats = () => {
    let storageChats = localStorage.getItem("chats");
    if (storageChats) {
      const parsedChats = JSON.parse(storageChats);
      setChats(parsedChats);
      return parsedChats;
    }
    return [];
  };

  return {
    saveChat,
    clearChat,
    loadChat,
    getChats,
    chats,
    setChats,
  };
};
