class ConfigService {
  getChatApiKey() {
    return import.meta.env.VITE_CHAT_API_KEY;
  }
  getChatApiUrl() {
    return import.meta.env.VITE_CHAT_API_URL;
  }

  getChatApiConfig() {
    return {
      key: this.getChatApiKey(),
      url: this.getChatApiUrl(),
    };
  }
}

export default new ConfigService();
