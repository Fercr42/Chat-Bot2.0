// Estilos del componente Chat
export const chatStyles = {
  // Contenedor principal del chat
  containerDark:
    "bg-black w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl flex flex-col mx-auto",
  containerLight:
    "bg-slate-400 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl flex flex-col mx-auto",

  // Contenedor principal del chat
  historyContent:
    "bg-black w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl flex flex-col mx-auto",

  // Header del chat
  headerDark:
    "flex items-center text-center border-b border-gray-700 p-2 sm:p-3 flex-shrink-0",
  headerLight:
    "flex items-center text-center border-b border-gray-300 p-2 sm:p-3 flex-shrink-0",

  backButton:
    "bg-transparent cursor-pointer rounded-2xl hover:bg-gray-700 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center",

  backIcon: "sm:w-4 sm:h-4",
  chatTitle: "text-white text-xs sm:text-sm md:text-base ml-2",

  // Área de mensajes
  messagesAreaDark:
    "flex-1 bg-gray-900 overflow-y-auto p-2 sm:p-3 space-y-1 sm:space-y-2",
  messagesAreaLight:
    "flex-1 bg-white overflow-y-auto p-2 sm:p-3 space-y-1 sm:space-y-2",
  messagesContainerDark:
    "flex flex-col font-serif-light text-xs sm:text-sm space-y-1 sm:space-y-2",

  messageContainer: {
    user: "flex justify-end",
    bot: "flex justify-start",
  },
  messageBubble: {
    user: "bg-sky-300 text-black text-xs sm:text-sm p-2 sm:p-3 rounded-2xl max-w-[85%] sm:max-w-[80%] break-words",
    bot: "bg-slate-500  text-white text-xs sm:text-sm p-2 sm:p-3 rounded-2xl max-w-[85%] sm:max-w-[80%] break-words",
  },

  // Estados de carga y error
  loadingTextDark: "text-white text-xs sm:text-sm",
  loadingTextLight: "text-black text-xs sm:text-sm",
  errorText: "text-red-500 text-xs sm:text-sm",
  errorTextLight: "text-red-500 text-xs sm:text-sm",

  // Área de input
  inputArea: "p-2 sm:p-3 border-t border-gray-700 flex-shrink-0",
  inputAreaLight:
    "p-2 sm:p-3 border-t border-slate-300 flex-shrink-0 bg-slate-200",
  inputContainer: "relative flex items-center bg-gray-700 rounded-md",
  inputContainerLight:
    "relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-500",
  textInput:
    "flex-1 bg-transparent text-white text-xs sm:text-sm p-2 sm:p-3 pr-10 sm:pr-12 rounded-md border-none outline-none",
  textInputLight:
    "flex-1 bg-transparent text-slate-800 text-xs sm:text-sm p-2 sm:p-3 pr-10 sm:pr-12 rounded-2xl border-none outline-none placeholder-slate-500",
  sendButton:
    "absolute right-1 sm:right-2 bg-gray-600 text-white text-xs sm:text-sm p-1.5 sm:p-2 rounded-md hover:bg-gray-500 transition-colors cursor-pointer",
  sendButtonLight:
    "absolute right-1 sm:right-2 bg-blue-500 text-white text-xs sm:text-sm p-1.5 sm:p-2 rounded-xl hover:bg-blue-600 transition-all duration-300 cursor-pointer shadow-lg",
  // Botón de toggle
  toggleContainer: "flex align-items-center justify-center p-2",
  toggleButton:
    "bg-gray-700 text-white text-xs sm:text-sm p-2 sm:p-3 rounded-md hover:bg-gray-500 transition-colors cursor-pointer",

  // Navegación dentro del menú
  menuItemsDark:
    "flex justify-around bg-gray-800 items-center py-4 px-2 border-t border-gray-700 mt-auto",
  menuItemsLight:
    "flex justify-around bg-gray-200 items-center py-4 px-2 border-t border-gray-300 mt-auto",
  navItem:
    "flex flex-col items-center justify-center py-2 px-2 cursor-pointer min-w-0 flex-1  hover:text-gray-400 transition-all duration-300",

  // Estilos del menú
  menuContentDark:
    "bg-gray-900 relative rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex flex-col mx-auto overflow-hidden",
  menuContentLight:
    "bg-white relative rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex flex-col mx-auto overflow-hidden",
  menuTitle: "text-white text-2xl font-bold mb-2 px-6 pt-6",
  menuTitleLight: "text-gray-900 text-2xl font-bold mb-2 px-6 pt-6",
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
  navItemActiveLight: "text-gray-900",
  navItemInactiveLight: "text-gray-600",

  navIcon: "w-6 h-6 mb-1",
  navTextDark: "text-xs font-medium truncate",
  navTextLight: "text-xs font-medium truncate",
};
