// Estilos del componente Chat
export const chatStyles = {
  // Contenedor principal del chat
  container:
    "bg-black w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl flex flex-col mx-auto",

  // Header del chat
  header:
    "flex items-center text-center border-b border-gray-700 p-2 sm:p-3 flex-shrink-0",
  backButton:
    "bg-transparent cursor-pointer rounded-2xl hover:bg-gray-700 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center",
  backIcon: "sm:w-4 sm:h-4",
  chatTitle: "text-white text-xs sm:text-sm md:text-base ml-2",

  // Área de mensajes
  messagesArea: "flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 sm:space-y-2",
  messagesContainer:
    "flex flex-col font-serif-light text-xs sm:text-sm space-y-1 sm:space-y-2",
  messageContainer: {
    user: "flex justify-end",
    bot: "flex justify-start",
  },
  messageBubble: {
    user: "bg-white text-black text-xs sm:text-sm p-2 sm:p-3 rounded-2xl max-w-[85%] sm:max-w-[80%] break-words",
    bot: "bg-gray-700 text-white text-xs sm:text-sm p-2 sm:p-3 rounded-2xl max-w-[85%] sm:max-w-[80%] break-words",
  },

  // Estados de carga y error
  loadingText: "text-white text-xs sm:text-sm",
  errorText: "text-red-500 text-xs sm:text-sm",

  // Área de input
  inputArea: "p-2 sm:p-3 border-t border-gray-700 flex-shrink-0",
  inputContainer: "relative flex items-center bg-gray-700 rounded-md",
  textInput:
    "flex-1 bg-transparent text-white text-xs sm:text-sm p-2 sm:p-3 pr-10 sm:pr-12 rounded-md border-none outline-none",
  sendButton:
    "absolute right-1 sm:right-2 bg-gray-600 text-white text-xs sm:text-sm p-1.5 sm:p-2 rounded-md hover:bg-gray-500 transition-colors cursor-pointer",

  // Botón de toggle
  toggleContainer: "flex align-items-center justify-center p-2",
  toggleButton:
    "bg-gray-700 text-white text-xs sm:text-sm p-2 sm:p-3 rounded-md hover:bg-gray-500 transition-colors cursor-pointer",

  // Estilos del menú

  menuContent:
    "bg-gray-400 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex flex-col p-6 space-y-4 mx-auto",
  menuHeader:
    "text-white text-lg font-bold mb-4 border-b border-gray-700 pb-3 text-center",
  menuChatList:
    "space-y-3 flex-1 overflow-y-auto bg-gray-100 rounded-xl p-4 border-2 border-gray-300 shadow-inner",
  menuChatItem:
    "flex items-center justify-between p-4 bg-gradient-to-r from-white to-gray-50 rounded-2xl hover:from-blue-50 hover:to-blue-100 transition-all duration-300 cursor-pointer border-2 border-gray-200 hover:border-blue-400 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm",
  menuChatTitle:
    "text-gray-800 text-sm font-bold truncate flex-1 hover:text-blue-600 transition-colors duration-200",
  menuChatDate:
    "text-gray-500 text-xs ml-2 bg-gray-100 px-2 py-1 rounded-full hover:bg-blue-100 hover:text-blue-600 transition-all duration-200",
  menuActions: "space-y-3 pt-4 border-t border-gray-700 flex-shrink-0",
  menuCreateButton:
    "w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-4 rounded-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 cursor-pointer text-center font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 border-2 border-blue-400 hover:border-blue-300",
  menuDeleteButton:
    "w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 cursor-pointer text-center font-semibold shadow-lg hover:shadow-xl",
  menuEmptyState:
    "text-gray-400 text-sm text-center py-8 flex-1 flex items-center justify-center",

  // Items del menú
  menuItem:
    "bg-gray-800 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-gray-600 font-medium",
  menuItemDelete:
    "bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 cursor-pointer font-semibold shadow-lg hover:shadow-xl",
  menuItemLoad:
    "bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-3 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 cursor-pointer font-semibold shadow-lg hover:shadow-xl",
};

// Estilos del componente Button
export const buttonStyles = {
  primary:
    "bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors",
  secondary:
    "bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors",
  transparent:
    "bg-transparent text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors",
};

// Estilos del componente Input
export const inputStyles = {
  primary:
    "w-full bg-gray-700 text-white p-2 rounded-md border-none outline-none focus:ring-2 focus:ring-blue-500",
  transparent:
    "flex-1 bg-transparent text-white p-2 rounded-md border-none outline-none",
};
