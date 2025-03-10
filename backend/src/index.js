import dotenv from "dotenv";
import connectDB from "./config/db.js";
import connectRedis from "./config/redis.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  await connectRedis();

  app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );
})();
