# URL Shortener

## 🚀 Overview
A simple and efficient URL shortener that allows users to generate short links from long URLs. Built with **MongoDB**, **Redis (for caching)**, **Node.js**, and **Express.js**, this project ensures quick redirections and optimized performance.

## ✨ Features
- Generate short URLs from long URLs.
- Redirect short URLs to their original links.
- Caching with **Redis** for faster redirections.
- API endpoints for URL shortening and retrieval.
- Auto-expires inactive URLs after 24 hours

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Frontend**: React.js

## 🏗️ Environment Variables

### Backend (`.env` file):
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urlShortener
REDIS_HOST=<your_redis_host>
REDIS_PORT=<your_redis_port>
REDIS_PASSWORD=<your_redis_password>
CORS_ORIGIN=<frontend_url>
```

### Frontend (`.env` file):
```env
VITE_API_BASE_URL=http://localhost:5000  # Change this for production
```

The frontend will be available at `http://localhost:3000` and backend at `http://localhost:5000`.

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/shorten` | Generate a short URL |
| GET | `/:shortId` | Redirect to the original URL |


## 📝 License
This project is licensed under the MIT License.

## 📬 Contact
If you have any questions, feel free to reach out:
- GitHub: [@vkhanna2004](https://github.com/vkhanna2004)
- LinkedIn: [Vishakha Khanna](https://www.linkedin.com/in/vishakha-khanna)

---
Made with ❤️ by Vishakha Khanna.
