// Estilos del componente Chat
export const chatStyles = {
  // Contenedor principal del chat
  container:
    "bg-black w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl flex flex-col mx-auto",

  // Contenedor principal del chat
  historyContent:
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

  // Navegación dentro del menú
  menuItems:
    "flex justify-around bg-gray-800 items-center py-4 px-2 border-t border-gray-700 mt-auto",
  navItem:
    "flex flex-col items-center justify-center py-2 px-2 cursor-pointer min-w-0 flex-1  hover:text-gray-400 transition-all duration-300",

  // Estilos del menú
  menuContent:
    "bg-gray-900 relative rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex flex-col mx-auto overflow-hidden",
  menuTitle: "text-white text-2xl font-bold mb-2 px-6 pt-6",
  menuCreateButton:
    "w-3/4 bg-blue-600 text-white px-6 py-4 rounded-2xl hover:bg-blue-700 transition-all duration-300 cursor-pointer text-center font-semibold mx-auto",
  menuChatItem:
    "flex items-center justify-between p-4 bg-gray-800 rounded-2xl hover:bg-gray-700 transition-all duration-300 cursor-pointer border border-gray-700 mx-6 mb-2",
  menuItemDelete:
    "bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 cursor-pointer text-xs font-medium",
  menuItemLoad:
    "bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-all duration-300 cursor-pointer text-xs font-medium",

  // Barra de navegación inferior

  navItemActive: "text-white",
  navItemInactive: "text-gray-500",

  navIcon: "w-6 h-6 mb-1",
  navText: "text-xs font-medium truncate",
};
