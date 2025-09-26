import API_CONFIG from "../config/api-config.js";

class ConfigService {
  getChatApiKey() {
    return API_CONFIG.OPENAI_API_KEY;
  }

  getChatApiUrl() {
    return API_CONFIG.OPENAI_API_URL;
  }

  getChatApiConfig() {
    return {
      key: this.getChatApiKey(),
      url: this.getChatApiUrl(),
    };
  }
}

export default new ConfigService();
