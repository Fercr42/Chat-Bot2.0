# Chat Bot 2.0

Una aplicación de chat moderna con interfaz oscura y navegación dinámica.

## 🚀 Configuración

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_OPENAI_API_KEY=tu_api_key_de_openai_aqui
VITE_OPENAI_API_URL=https://api.openai.com/v1/chat/completions
```

### 3. Obtener API Key de OpenAI

1. Ve a [OpenAI Platform](https://platform.openai.com/)
2. Crea una cuenta o inicia sesión
3. Ve a "API Keys" en el menú
4. Crea una nueva API key
5. Copia la key y pégala en tu archivo `.env`

### 4. Ejecutar la aplicación

```bash
npm run dev
```

## 🔒 Seguridad

- **NUNCA** subas tu archivo `.env` a GitHub
- El archivo `.env` está en `.gitignore` por seguridad
- Cada desarrollador debe crear su propio archivo `.env`

## 📁 Estructura del proyecto

```
src/
├── components/          # Componentes reutilizables
├── hooks/              # Custom hooks
├── modules/            # Módulos principales
├── services/           # Servicios (API, configuración)
├── styles/             # Estilos y temas
└── utils/              # Utilidades
```

## 🎨 Características

- ✅ Interfaz oscura moderna
- ✅ Navegación dinámica
- ✅ Persistencia en localStorage
- ✅ Integración con OpenAI API
- ✅ Diseño responsive
- ✅ Gestión de múltiples chats

## 🛠️ Tecnologías

- React 18
- Vite
- Tailwind CSS
- React Query
- OpenAI API
