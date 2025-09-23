import { ButtonComponent, InputComponent } from "../shared";
import { useState, useEffect } from "react";
import { useQueryChat } from "../modules/use-query-chat.hook";

export const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [shouldSend, setShouldSend] = useState(false);
  const { data, isLoading, error } = useQueryChat(message, shouldSend);

  // Debug: mostrar estados en consola
  console.log("Estado actual:", {
    message,
    shouldSend,
    data,
    isLoading,
    error,
  });

  // Debug: verificar si la query debería ejecutarse
  useEffect(() => {
    console.log("shouldSend cambió:", {
      shouldSend,
      type: typeof shouldSend,
      message,
    });
    if (shouldSend && message) {
      console.log("Query debería ejecutarse:", { shouldSend, message });
    }
  }, [shouldSend, message]);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (messageToSend) => {
    if (messageToSend.trim()) {
      // Agregar mensaje del usuario
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: messageToSend, sender: "user" },
      ]);

      // Configurar la query con el mensaje
      setMessage(messageToSend);
      setShouldSend(true);

      // NO limpiar el mensaje aquí, se limpiará después de la respuesta
    }
  };

  useEffect(() => {
    if (data) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: prevMessages.length + 1,
          text: data.message || data,
          sender: "bot",
        },
      ]);
      setShouldSend(false);
      setMessage(""); // Limpiar el input después de recibir la respuesta
    }
  }, [data]);

  // Resetear shouldSend si hay error
  useEffect(() => {
    if (error) {
      setShouldSend(false);
      setMessage(""); // Limpiar el input también en caso de error
    }
  }, [error]);

  return (
    <div>
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {messages.map((message) => (
          <div key={message.id}>
            {message.sender === "user" ? (
              <div>{message.text}</div>
            ) : (
              <div>{message.text}</div>
            )}
          </div>
        ))}
      </div>
      <div>
        <InputComponent value={message} onChange={handleInputChange} />
        <ButtonComponent
          name="Send"
          onClick={() => handleSendMessage(message)}
        />
      </div>
    </div>
  );
};
