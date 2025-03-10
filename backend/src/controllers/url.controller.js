import {url} from "../models/url.model.js";
import redisClient from "../config/redis.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "node:crypto";

export const shortenURL = asyncHandler(async (req, res) => {
  const { longurl } = req.body;
  if (!longurl) {
    throw new ApiError(400, "Enter a valid url");
  }

  //unique short id
  const shortid = crypto.randomBytes(4).toString("hex"); //safer than math.random

  const new_url = await url.create({ shortid, longurl }); //stored in mongodb

  await redisClient.setEx(shortid, 86400, longurl);
  //stored in redis, expiry - 24 hr

  res.json(
    new ApiResponse(201, { shortid, longurl }, "URL shortened successfully !")
  );
});

export const redirectURL = asyncHandler(async () => {
  const { shortid } = req.params;

  let longURL = await redisClient.get(shortId);

  if (!longURL) {
    const urlDoc = await URL.findOne({ shortId });
    if (!urlDoc) throw new ApiError(404, "URL not found or expired");

    longURL = urlDoc.longURL;

    await redisClient.setEx(shortId, 86400, longURL);
  }

  res.redirect(longURL);
});
