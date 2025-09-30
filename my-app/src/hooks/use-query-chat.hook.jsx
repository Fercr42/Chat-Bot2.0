import { useQuery } from "@tanstack/react-query";
import envServices from "../services/env-services";

export const useQueryChat = (message, enabled = false) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["chat", message],
    networkMode: "online",
    enabled: Boolean(enabled) && Boolean(message) && message.trim().length > 0,
    queryFn: async () => {
      const response = await fetch(envServices.ChatApiConfig.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${envServices.ChatApiConfig.key}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content:
                "Respond only about the Costa Rica Labor Code. If the user asks about something else, say that you are a labor law assistant and you only answer about the Costa Rica Labor Code.",
            },
            {
              role: "user",
              content: message,
            },
          ],
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
