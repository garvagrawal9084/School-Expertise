# School Expertise

A full-stack school management web application with role-based access for **users**, **teachers** and **admins**, and course management. The React frontend is served by Nginx, the Express API talks to MongoDB, and the whole stack runs with a single `docker compose` command.

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router 7, Tailwind CSS 4, Axios, react-hot-toast, lucide-react |
| Backend | Node.js (ES modules), Express 5, Mongoose 9 |
| Auth | JSON Web Tokens, bcrypt password hashing, cookie-based sessions (`cookie-parser`) |
| File uploads | Multer + Cloudinary |
| Database | MongoDB (with Mongo Express admin UI in development) |
| Infrastructure | Docker, Docker Compose, Nginx |

## Project Structure

```
School-Expertise/
├── client/                 # React + Vite frontend
│   ├── nginx/default.conf  # Nginx config: serves the SPA, proxies /api to the server
│   └── Dockerfile          # Multi-stage build (Node 22 build -> Nginx runtime)
├── server/                 # Express REST API
│   └── src/
│       ├── server.js       # Entry point: connects to MongoDB, starts the app
│       ├── app.js          # Express app, middleware and route mounting
│       ├── db/             # MongoDB connection
│       └── Routes/         # health, user, admin, course and teacher routes
├── docker-compose.yaml     # client, server, mongo and mongo-express services
└── .vscode/                # Editor settings
```

## API Overview

All endpoints are prefixed with `/api/v1`.

| Route | Purpose |
| --- | --- |
| `/api/v1/check` | Health check |
| `/api/v1/users` | User accounts and authentication |
| `/api/v1/admin` | Admin operations |
| `/api/v1/courses` | Course management |
| `/api/v1/teacher` | Teacher operations |

Errors are returned as JSON in the form `{ "success": false, "message": "..." }`.

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose  
- (For running without Docker) Node.js 22+ and a MongoDB instance

### 1. Clone the repository

```bash
git clone https://github.com/garvagrawal9084/School-Expertise.git
cd School-Expertise
```

### 2. Configure the server environment

Create `server/.env`. The compose file expects it to exist. Example:

```env
PORT=4000
MONGODB_URI=mongodb://admin:password@mongo:27017
JWT_SECRET=change-me

# Cloudinary (for file uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

> The variable names above are illustrative. Match them to the names the server code reads from `process.env`. `PORT` should be `4000` when using Docker, because the Nginx config proxies `/api/` to `server:4000`.

### 3. Run with Docker Compose

```bash
docker compose up --build
```

| Service | URL |
| --- | --- |
| Web app | http://localhost |
| Mongo Express (DB admin UI) | http://localhost:8082 |

The API is reachable through the web app at `http://localhost/api/v1/...`.

To stop everything:

```bash
docker compose down        # keep database data
docker compose down -v     # also delete the database volume
```

## Running Locally Without Docker

**Server**

```bash
cd server
npm install
npm run dev        # nodemon with polling (use `npm start` for plain nodemon)
```

**Client**

```bash
cd client
npm install
npm run dev        # Vite dev server
```

Other client scripts: `npm run build`, `npm run preview`, `npm run lint`.

> The server's CORS policy currently allows the origin `http://localhost` (the Nginx-served app). If you use the Vite dev server (default `http://localhost:5173`), update the `origin` in `server/src/app.js` accordingly.

## Security Notes

- `docker-compose.yaml` ships with default MongoDB credentials (`admin` / `password`) and exposes Mongo Express on port 8082. These are fine for local development only. Change them and remove or protect Mongo Express before any real deployment.
- Never commit `server/.env`. Keep JWT secrets and Cloudinary keys out of version control.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes and push the branch
4. Open a pull request

## License

No license has been specified yet. Add a `LICENSE` file to define how others may use this project.
