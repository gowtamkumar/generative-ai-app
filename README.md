# Generative AI Chat Application

This is a full-stack chat application that uses a Next.js frontend and a Node.js (Express) backend to interact with the Hugging Face API. The application provides a user-friendly chat interface for interacting with a generative AI model.

## Features

- **Chat Interface**: A clean and simple chat interface to send and receive messages.
- **Code Block Highlighting**: Support for rendering code blocks with syntax highlighting.
- **Hugging Face Integration**: The backend communicates with the Hugging Face API to get responses from a generative AI model.
- **Easy to Run**: The project is divided into a `client` and `server` directory, which can be run concurrently.
- **Docker Support**: The entire application can be run using Docker Compose.

## Tech Stack

- **Frontend**:
  - [Next.js](https://nextjs.org/)
  - [React](https://reactjs.org/)
  - [axios](https://axios-http.com/)
  - [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
  - [Tailwind CSS](https://tailwindcss.com/)

- **Backend**:
  - [Node.js](https://nodejs.org/)
  - [Express](https://expressjs.com/)
  - [cors](https://www.npmjs.com/package/cors)
  - [dotenv](https://www.npmjs.com/package/dotenv)

- **API**:
  - [Hugging Face Inference API](https://huggingface.co/docs/api-inference/index)

- **Containerization**:
  - [Docker](https://www.docker.com/)
  - [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

There are two ways to run this project: using Docker or running the client and server manually.

### Running with Docker (Recommended)

This is the easiest way to get the application running.

#### Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Configuration

1. **Create a `.env` file in the `server` directory.**
   ```bash
   cd server
   touch .env
   ```

2. **Add your Hugging Face API key to the `.env` file.** You can get your API key from the [Hugging Face website](https://huggingface.co/settings/tokens).
   ```
   HF_API_KEY="your-hugging-face-api-key"
   ```

#### Running the Application

1. **Build and start the services:**
   From the root of the project, run:
   ```bash
   docker-compose up -d --build
   ```

2. **Access the application:**
   - The client will be available at [http://localhost:3100](http://localhost:3100).
   - The server will be available at [http://localhost:3900](http://localhost:3900).

3. **To stop the services:**
   ```bash
   docker-compose down
   ```

### Manual Installation

Follow these steps if you want to run the client and server manually without Docker.

#### Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v18 or later recommended)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/) or [npm](https://www.npmjs.com/get-npm)

#### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd generative-ai
   ```

2. **Install client dependencies:**
   ```bash
   cd client
   yarn install
   # or
   npm install
   ```

3. **Install server dependencies:**
   ```bash
   cd ../server
   yarn install
   # or
   npm install
   ```

#### Configuration

1. **Create a `.env` file in the `server` directory.**
   ```bash
   cd server
   touch .env
   ```

2. **Add your Hugging Face API key to the `.env` file.** You can get your API key from the [Hugging Face website](https://huggingface.co/settings/tokens).
   ```
   HF_API_KEY="your-hugging-face-api-key"
   ```

#### Running the Application

1. **Start the backend server:**
   ```bash
   cd server
   yarn dev
   # or
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

2. **Start the frontend client:**
   ```bash
   cd client
   yarn dev
   # or
   npm run dev
   ```
   The client will start on `http://localhost:3000`.

3. **Open your browser and navigate to `http://localhost:3000` to use the chat application.**

## Project Structure

The project is organized into two main directories:

- `client/`: Contains the Next.js frontend application.
- `server/`: Contains the Node.js backend application.

## API Endpoints

### `POST /chat`

This endpoint is used to send a message to the generative AI model.

- **Request Body**:
  ```json
  {
    "message": "Your message here"
  }
  ```

- **Response**:
  ```json
  {
    "reply": "The AI's response here"
  }
  ```