import { motion } from "framer-motion";
import { chatStyles } from "../styles/chat-styles.js";
import { ButtonComponent } from "../shared/index.js";
import { useTheme } from "../hooks/useTheme-hook.jsx";

export const MenuComponent = ({
  currentView,
  createNewChat,
  setCurrentView,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={
        theme === "Dark"
          ? chatStyles.menuContentDark
          : chatStyles.menuContentLight
      }
    >
      <div className="relative">
        <h1
          className={
            theme === "Dark" ? chatStyles.menuTitle : chatStyles.menuTitleLight
          }
        >
          Hi there 👋
        </h1>
        <div className="relative flex items-center justify-center px-6 mb-6">
          <p
            className={
              theme === "Dark"
                ? "text-gray-400 text-sm"
                : "text-gray-600 text-sm"
            }
          >
            How can we help?
          </p>
          <ButtonComponent
            name={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M20 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7" />
                <circle cx="12" cy="12" r="5" />
                <path d="M15.5 12A3.5 3.5 0 1 1 12 8.5" />
              </svg>
            }
            onClick={toggleTheme}
            className={
              theme === "Dark"
                ? "text-white hover:text-gray-400 cursor-pointer hover:scale-110 transition-all duration-300 absolute right-6"
                : "text-gray-600 hover:text-gray-400 cursor-pointer hover:scale-110 transition-all duration-300 absolute right-6"
            }
          />
        </div>
      </div>
      <ButtonComponent
        name="create new chat"
        onClick={createNewChat}
        className={chatStyles.menuCreateButton}
      />
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
