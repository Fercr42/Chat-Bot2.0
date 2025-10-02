import { chatStyles } from "../styles/chat-styles.js";
import { ButtonComponent } from "../shared/index.js";
import { motion } from "framer-motion";

export const MessagesComponent = ({
  theme,
  chatMessages,
  handleCopyToClipboard,
  copiedMessageId,
  isLoading,
  error,
}) => {
  return (
    <div
      className={
        theme === "Dark"
          ? chatStyles.messagesAreaDark
          : chatStyles.messagesAreaLight
      }
    >
      <div className={chatStyles.messagesContainerDark}>
        {chatMessages.map((message) => (
          <div
            key={message.id}
            className={chatStyles.messageContainer[message.sender]}
          >
            <div className="flex items-center gap-2">
              <motion.div
                className={chatStyles.messageBubble[message.sender]}
                initial={{ opacity: 0, y: 20, rotate: 10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {message.text}
              </motion.div>

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
          </div>
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
    </div>
  );
};
