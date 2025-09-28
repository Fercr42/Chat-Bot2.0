class EnvServices {
  constructor() {}

  get OpenAiApiKey() {
    return import.meta.env.VITE_OPENAI_API_KEY;
  }

  get OpenAiApiUrl() {
    return import.meta.env.VITE_OPENAI_API_URL;
  }

  get ChatApiConfig() {
    return {
      key: this.OpenAiApiKey,
      url: this.OpenAiApiUrl,
    };
  }
}

const envServices = new EnvServices();
export default envServices;
