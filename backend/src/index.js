import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import {connectRedis} from "./config/redis.js";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await connectDB();
    await connectRedis();

    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
})();
