import {Router} from "express";
import { shortenURL, redirectURL } from "../controllers/url.controller.js";

const router = Router();

router.post("/shorten", shortenURL);
router.get("/:shortid", redirectURL);

export default router;
