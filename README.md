
# Cloud Load Balancer Creation Tool

This project provides a web interface to create a cloud load balancer by interacting with a set of shell scripts. It consists of a Node.js/Express backend that serves a React/Ant Design frontend.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Git**: For cloning the repository.
- **Node.js**: v18 or later is recommended.
- **npm**: (Node Package Manager) which comes with Node.js.
- **A `bash`-compatible shell**: To execute the `.sh` scripts.
- **`openssl`**: Required by the cloud CLI scripts for generating signatures.

## Manual Installation & Setup (Non-Docker)

Follow these steps to set up and run the project on your local machine without using Docker.

### 1. Clone the Repository

First, clone the repository from GitHub to your local machine:

```bash
git clone https://github.com/07212421/clb-creation-tool.git
cd clb-creation-tool
```

### 2. Install Backend Dependencies

The project root contains the Node.js server. Install its dependencies:

```bash
npm install
```

### 3. Install Frontend Dependencies

The `antd-demo` directory contains the React frontend. Navigate into it and install its dependencies:

```bash
cd antd-demo
npm install
cd ..
```

### 4. Build the Frontend

The Node.js server is configured to serve the *static, built files* of the React app. You must build the frontend before starting the server.

To do this, run the build command from within the `antd-demo` directory:

```bash
cd antd-demo
npm run build
cd ..
```
This will create an optimized version of the frontend in the `antd-demo/build` directory.

### 5. Make Scripts Executable

The shell scripts need to have execute permissions. Grant them using `chmod`:

```bash
chmod +x *.sh
```

## Running the Application

After completing all the installation and setup steps, you can start the server from the **project root directory**:

```bash
node server.js
```

You should see a confirmation message in your terminal:
`[INFO] Server listening on port 3001`

You can now access the application by opening your web browser and navigating to:

**http://localhost:3001**

### Running on a Different Port

The application will run on port `3001` by default. To specify a different port, you can use the `PORT` environment variable:

```bash
PORT=8080 node server.js
```
The application would then be available at `http://localhost:8080`.

---

## Quick Start (Summary of Commands)

```bash
# 1. Clone
git clone https://github.com/07212421/clb-creation-tool.git
cd clb-creation-tool

# 2. Install backend dependencies
npm install

# 3. Install frontend dependencies and build the app
cd antd-demo
npm install
npm run build
cd ..

# 4. Make scripts executable
chmod +x *.sh

# 5. Run the server
node server.js
```
