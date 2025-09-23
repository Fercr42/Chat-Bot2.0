import { useQuery } from "@tanstack/react-query";
import ConfigService from "../services/env-services";

export const useQueryChat = (message, enabled = false) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["chat", message],
    networkMode: "online",
    enabled: Boolean(enabled) && Boolean(message) && message.trim().length > 0,
    queryFn: async () => {
      console.log("Haciendo llamada a OpenAI...", {
        url: ConfigService.getChatApiUrl(),
        key: ConfigService.getChatApiKey() ? "presente" : "faltante",
      });

      const response = await fetch(ConfigService.getChatApiUrl(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ConfigService.getChatApiKey()}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          max_tokens: 150,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Respuesta de OpenAI:", result);
      return result.choices[0].message.content;
    },
  });
  return { data, isLoading, error, refetch };
};
