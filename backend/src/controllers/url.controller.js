import { Url } from "../models/url.model.js";
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

  //check redis cache for long url
  const cached_shortid = await redisClient.get(longurl);
  if (cached_shortid) {
    return res.json(
      new ApiResponse(
        201,
        {shortid: cached_shortid, longurl },
        "URL found in redis cache !"
      )
    );
  }

  //check in mongoDB
  const db_shortid = await Url.findOne({ longurl });
  if (db_shortid) {
    return res.json(
      new ApiResponse(
        200,
        { shortid: db_shortid.shortid, longurl },
        "URL found in MongoDB!"
      )
    );
  }

  //unique short id
  const shortid = crypto.randomBytes(4).toString("hex"); //safer than math.random

  const new_url = await Url.create({ shortid, longurl }); //stored in mongodb

  await redisClient.setEx(shortid, 86400, longurl);
  //stored in redis, expiry - 24 hr

  res.json(
    new ApiResponse(201, { shortid, longurl }, "URL shortened successfully !")
  );
});

//handle redirection when short url is accessed, looks up for corresponding original url.
export const redirectURL = asyncHandler(async (req, res) => {
  const { shortid } = req.params;

  let longurl = await redisClient.get(shortid);

  if (!longurl) {
    const urlDoc = await Url.findOne({ shortid });
    if (!urlDoc) throw new ApiError(404, "URL not found or expired");

    longurl = urlDoc.longurl;

    await redisClient.setEx(shortid, 86400, longurl);
    //url will expire if not accessed within 24 hrs

    await Url.updateOne({ shortid }, { $inc: { clicks: 1 } });
  }

  res.redirect(longurl);
});
