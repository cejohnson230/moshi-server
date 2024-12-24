# NestJS Chat Application

A NestJS-based chat application that integrates with OpenAI's API and maintains chat history using Redis.

## Architecture

The application consists of several key modules:

- **ChatHistory Module**: Manages chat history storage and retrieval using Redis
- **OpenAI Module**: Handles interactions with OpenAI's API
- **App Module**: Root module managing application configuration and module integration

### Key Components:
- Redis for chat history caching
- OpenAI API for chat completions
- CORS enabled for frontend integration

## Prerequisites

- Node.js
- Redis server running locally
- OpenAI API key

## Configuration

### Environment Variables

1. Create a `.env` file in the root directory:
```env
# Required - Your OpenAI API key
OPENAI_API_KEY=your_openai_api_key
# Required - Frontend URL
FRONTEND_URL=http://localhost:5173
# Optional - Redis host (defaults to localhost if not set)
REDIS_HOST=localhost
# Optional - Redis port (defaults to 6379 if not set)
REDIS_PORT=6379
# Optional - Server port (defaults to 3000 if not set)
PORT=3000
```

Important notes about the `.env` file:
- Never commit your `.env` file to version control
- Make sure to replace `your_openai_api_key` with your actual OpenAI API key
- You can obtain an API key from the [OpenAI platform](https://platform.openai.com/api-keys)
- The API key should start with "sk-"

For development, you can create a `.env.development` file with development-specific values.


### Redis Configuration

2. Ensure Redis is running locally on default port (6379)

## Installation

```bash
$ npm install
```

## Running the Application

```bash
# Development
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## API Endpoints

### Chat History
- `GET /chat-history`
  - Query params:
    - `userId`: string (required)
    - `brandId`: string (required)
    - `limit`: number (optional)
  - Returns chat history for a specific user and brand

### OpenAI Integration
- `POST /openai/chat`
  - Body:
    ```json
    {
      "messages": [{ "role": "user", "content": "Hello" }],
      "userId": "string",
      "brandId": "string"
    }
    ```
  - Returns AI-generated response and saves to chat history

## Debugging

1. For VS Code users, create a launch configuration:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug NestJS",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "start:debug"],
      "console": "integratedTerminal"
    }
  ]
}
```

2. Use the following npm script for debug mode:
```bash
$ npm run start:debug
```

## Testing

```bash
# Unit tests
$ npm run test

# E2E tests
$ npm run test:e2e

# Test coverage
$ npm run test:cov
```

## Frontend Integration

The application is configured with CORS to work with a frontend running on `http://localhost:5173`. To use a different frontend URL, update the CORS configuration in `src/main.ts`.

## License

This project is MIT licensed.
