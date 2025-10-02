import { useQuery } from "@tanstack/react-query";
import envServices from "../services/env-services";

export const useQueryChat = (
  message,
  conversationHistory = [],
  enabled = false
) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chat", message, conversationHistory.length],
    networkMode: "online",
    enabled: Boolean(enabled) && Boolean(message) && message.trim().length > 0,
    queryFn: async () => {
      const messages = [
        {
          role: "system",
          content:
            "Respond only about the Costa Rica Labor Code, you can provide the source of information if the user asks for it. If the user asks about something else, kindly inform the user that you are a labor law assistant and you only answer about the Costa Rica Labor Code. You can use emojis to make the conversation more engaging. Be friendly and engaging, do not be too formal. Always provide extensive answers.",
        },

        ...conversationHistory.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),

        {
          role: "user",
          content: message,
        },
      ];

      const response = await fetch(envServices.ChatApiConfig.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${envServices.ChatApiConfig.key}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: messages,
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      return result.choices[0].message.content;
    },
  });
  return { data, isLoading, error };
};
