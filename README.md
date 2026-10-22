# Node.js Demo App

A lightweight, production-ready Node.js & Express application showcasing modern DevOps best practices, including automated testing with Jest and Supertest, containerization with Docker, and CI/CD pipelines via GitHub Actions.

---

## 📁 Project Structure

```text
nodejs-demo-app/
├── .github/
│   └── workflows/
│       └── main.yml        # GitHub Actions CI/CD workflow
├── app.js                  # Express web server & API definitions
├── app.test.js             # Automated test suite (Jest & Supertest)
├── package.json            # Project manifest, dependencies, and scripts
├── package-lock.json       # Locked dependency versions
├── Dockerfile              # Docker container configuration
├── .dockerignore           # Ignored files for Docker build context
└── README.md               # Project documentation
```

---

## 🚀 Features

- **Express 5 API**: Simple, modular REST API.
- **Automated Testing**: Unit & integration tests using Jest and Supertest.
- **Optimized Containerization**: Docker image based on `node:22-alpine` using a non-root `node` user and production-only dependencies.
- **Continuous Integration (CI)**: Automated GitHub Actions pipeline testing across multiple Node.js versions (20.x, 22.x) and verifying Docker builds.
- **Health Checks**: `/health` endpoint for container orchestration and uptime monitoring.

---

## 📋 Prerequisites

- **Node.js** (v20.x or v22.x recommended)
- **npm** (v10.x+)
- **Docker** (optional, for running containerized)

---

## 🛠️ Getting Started

### 1. Clone & Install Dependencies

```bash
git clone <repository-url>
cd nodejs-demo-app
npm install
```

### 2. Start the Application

```bash
npm start
```

The application will start on port `3000` (or `PORT` environment variable if defined):
```text
Server is running on port 3000
```

---

## 🧪 Running Tests

To run the automated test suite with Jest:

```bash
npm test
```

To run tests in watch mode during development:

```bash
npx jest --watch
```

---

## 🐳 Docker Setup

### 1. Build the Docker Image

```bash
docker build -t nodejs-demo-app:latest .
```

### 2. Run the Container

```bash
docker run -d -p 3000:3000 --name nodejs-demo-app nodejs-demo-app:latest
```

### 3. Verify the Running Container

```bash
curl http://localhost:3000/
curl http://localhost:3000/health
```

### 4. Stop and Remove the Container

```bash
docker stop nodejs-demo-app && docker rm nodejs-demo-app
```

---

## 🌐 API Endpoints

### 1. `GET /`
Returns a welcome message and internship task info.

**Response (200 OK):**
```json
{
  "message": "Hello from Node.js CI/CD!",
  "status": "success",
  "task": "DevOps Internship Task 1"
}
```

### 2. `GET /health`
Liveness/readiness probe for monitoring tools (e.g., Kubernetes, AWS ECS).

**Response (200 OK):**
```json
{
  "status": "healthy"
}
```

---

## 🔄 CI/CD Pipeline

The GitHub Actions workflow defined in [`.github/workflows/main.yml`](.github/workflows/main.yml) runs on every push and pull request to the `main` branch:

1. **Test Job (`test`)**:
   - Runs on `ubuntu-latest`.
   - Checks out the repository and sets up Node.js `22` with npm caching.
   - Runs `npm ci` and `npm test`.

2. **Build and Push Job (`build-and-push`)**:
   - Runs only on pushes to `main` after the `test` job passes.
   - Sets up Docker Buildx.
   - Authenticates with Docker Hub using repository secrets.
   - Builds and pushes images tagged with `:latest` and `:${{ github.sha }}`.

### Required GitHub Secrets

To allow the `build-and-push` job to publish images to Docker Hub, configure the following repository secrets under **Settings > Secrets and variables > Actions**:

| Secret Name | Description |
|---|---|
| `DOCKERHUB_USERNAME` | Your Docker Hub account username |
| `DOCKERHUB_TOKEN` | Your Docker Hub personal access token (PAT) |
