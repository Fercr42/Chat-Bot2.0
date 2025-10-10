import { chatStyles } from "../styles/chat-styles.js";
import { ButtonComponent } from "../shared/index.js";
import { useTheme } from "../hooks/useTheme-hook.jsx";

export const HistoryComponent = ({
  currentView,
  chats,
  clearChat,
  loadChat,
  setChatMessages,
  setCurrentChatId,
  setCurrentView,
  setMessageInput,
  setMessageToSend,
  setShouldSendMessage,
}) => {
  const { theme, toggleTheme } = useTheme();

  const clearChatState = () => {
    setChatMessages([]);
    setMessageInput("");
    setMessageToSend("");
    setShouldSendMessage(false);
  };

  return (
    <div
      className={
        theme === "Dark"
          ? chatStyles.menuContentDark
          : chatStyles.menuContentLight
      }
    >
      {chats &&
        Array.isArray(chats) &&
        chats.map((chat) => (
          <div
            className="flex items-center text-white p-4 bg-slate-500 mask-b-to-orange-300 rounded-2xl hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer border border-white mx-6 mb-2 m-3"
            key={chat.id}
          >
            {chat.title}
            <div className="flex items-center justify-end ml-auto gap-7">
              <ButtonComponent
                name="delete"
                onClick={() => clearChat(chat.id)}
                className={chatStyles.menuItemDelete}
              />
              <ButtonComponent
                name="load"
                onClick={() => {
                  clearChatState();
                  const messages = loadChat(chat.id);
                  setChatMessages(messages);
                  setCurrentChatId(chat.id);
                  setCurrentView("chat");
                }}
                className={chatStyles.menuItemLoad}
              />
            </div>
          </div>
        ))}

      <div
        className={
          theme === "Dark"
            ? chatStyles.menuItemsDark
            : chatStyles.menuItemsLight
        }
      >
        <ButtonComponent
          name={
            <div
              className={`${chatStyles.navItem} ${
                currentView === "menu" && theme === "Dark"
                  ? chatStyles.navItemActive
                  : currentView === "menu" && theme === "Light"
                  ? chatStyles.navItemActiveLight
                  : chatStyles.navItemInactive
              }`}
            >
              <svg
                className={chatStyles.navIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
              <span
                className={
                  theme === "Dark"
                    ? chatStyles.navTextDark
                    : chatStyles.navTextLight
                }
              >
                Home
              </span>
            </div>
          }
          onClick={() => setCurrentView("menu")}
          className=""
        />

        <ButtonComponent
          name={
            <div
              className={`${chatStyles.navItem} ${
                currentView === "history" && theme === "Dark"
                  ? chatStyles.navItemActive
                  : currentView === "history" && theme === "Light"
                  ? chatStyles.navItemActiveLight
                  : chatStyles.navItemInactive
              }`}
            >
              <svg
                className={chatStyles.navIcon}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
              </svg>
              <span
                className={
                  theme === "Dark"
                    ? chatStyles.navTextDark
                    : chatStyles.navTextLight
                }
              >
                Messages
              </span>
            </div>
          }
          onClick={() => setCurrentView("history")}
          className=""
        />
      </div>
    </div>
  );
};
