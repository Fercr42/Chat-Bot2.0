import { ButtonComponent, InputComponent } from "../shared";
import { useState, useEffect } from "react";
import { useQueryChat } from "../modules/use-query-chat.hook";

export const ChatComponent = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [messageToSend, setMessageToSend] = useState("");

  const [shouldSend, setShouldSend] = useState(false);
  const { data, isLoading, error } = useQueryChat(messageToSend, shouldSend);

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (messageToSend) => {
    if (messageToSend.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: messageToSend, sender: "user" },
      ]);

      setMessage("");

      setMessageToSend(messageToSend);
      setShouldSend(true);
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
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setShouldSend(false);
    }
  }, [error]);

  return (
    <div>
      <div>
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
        {isLoading && <div>Typing...</div>}
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
