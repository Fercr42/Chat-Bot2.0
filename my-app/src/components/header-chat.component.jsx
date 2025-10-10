import { chatStyles } from "../styles/chat-styles.js";
import { ButtonComponent } from "../shared/index.js";
import { useTheme } from "../hooks/useTheme-hook.jsx";

export const HeaderChatComponent = ({
  toggleInterface,
  search,
  handleSearch,
  setCurrentView,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={
        theme === "Dark" ? chatStyles.headerDark : chatStyles.headerLight
      }
    >
      <ButtonComponent
        name={
          theme === "Dark" ? (
            <svg width="14" height="14" fill="white">
              <path
                d="M10 4L6 8l4 4"
                stroke="white"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          ) : (
            <svg width="14" height="14" fill="white">
              <path
                d="M10 4L6 8l4 4"
                stroke="black"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          )
        }
        className={chatStyles.backButton}
        onClick={toggleInterface}
      />
      <div className="flex-1 flex items-center gap-2 ml-2">
        <span
          className={
            theme === "Dark"
              ? "text-white text-xs sm:text-sm md:text-base"
              : "text-black text-xs sm:text-sm md:text-base"
          }
        >
          Chat
        </span>
        <input
          type="text"
          placeholder="Search Messages..."
          value={search}
          onChange={handleSearch}
          className={
            theme === "Dark"
              ? "flex ml-auto bg-gray-700 text-white text-xs px-3 py-1 rounded-lg outline-none placeholder-gray-400"
              : "flex ml-auto bg-gray-200 text-black text-xs px-3 py-1 rounded-lg outline-none placeholder-gray-500"
          }
        />
      </div>

      <ButtonComponent
        name={
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        }
        onClick={() => setCurrentView("closed")}
        className={
          theme === "Dark"
            ? "text-white text-lg hover:scale-110 transition-all duration-300 cursor-pointer ml-auto"
            : "text-black text-lg hover:scale-110 transition-all duration-300 cursor-pointer ml-auto"
        }
      />
    </div>
  );
};
