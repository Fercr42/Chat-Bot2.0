// Estilos del componente Chat
export const chatStyles = {
  // Contenedor principal
  container:
    "bg-black w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl h-[600px] sm:h-[500px] md:h-[600px] lg:h-[700px] rounded-2xl flex flex-col mx-auto",

  // Header
  header:
    "flex items-center text-center border-b border-gray-700 p-2 sm:p-3 flex-shrink-0",

  // Botón de flecha
  backButton:
    "bg-transparent cursor-pointer rounded-2xl hover:bg-gray-700 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center",

  // Icono SVG
  backIcon: "sm:w-4 sm:h-4",

  // Título del chat
  chatTitle: "text-white text-xs sm:text-sm md:text-base ml-2",

  // Área de mensajes
  messagesArea: "flex-1 overflow-y-auto p-2 sm:p-3 space-y-1 sm:space-y-2",

  // Contenedor de mensajes
  messagesContainer:
    "flex flex-col font-serif-light text-xs sm:text-sm space-y-1 sm:space-y-2",

  // Contenedor de mensaje individual
  messageContainer: {
    user: "flex justify-end",
    bot: "flex justify-start",
  },

  // Burbujas de mensaje
  messageBubble: {
    user: "bg-white text-black text-xs sm:text-sm p-2 sm:p-3 rounded-2xl max-w-[85%] sm:max-w-[80%] break-words",
    bot: "bg-gray-700 text-white text-xs sm:text-sm p-2 sm:p-3 rounded-2xl max-w-[85%] sm:max-w-[80%] break-words",
  },

  // Estados de carga y error
  loadingText: "text-white text-xs sm:text-sm",
  errorText: "text-red-500 text-xs sm:text-sm",

  // Área de input
  inputArea: "p-2 sm:p-3 border-t border-gray-700 flex-shrink-0",

  // Contenedor del input
  inputContainer: "relative flex items-center bg-gray-700 rounded-md",

  // Input de texto
  textInput:
    "flex-1 bg-transparent text-white text-xs sm:text-sm p-2 sm:p-3 pr-10 sm:pr-12 rounded-md border-none outline-none",

  // Botón de enviar
  sendButton:
    "absolute right-1 sm:right-2 bg-gray-600 text-white text-xs sm:text-sm p-1.5 sm:p-2 rounded-md hover:bg-gray-500 transition-colors cursor-pointer",

  // Icono de enviar
  sendIcon: "w-6 h-6",

  // Botón de toggle
  toggleButton:
    "bg-gray-700 text-white text-xs sm:text-sm p-2 sm:p-3 rounded-md hover:bg-gray-500 transition-colors cursor-pointer",

  // Contenedor del botón de toggle
  toggleContainer: "flex align-items-center justify-center p-2",
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
