import { Router } from "express";
import { signUp } from "../controllers/user.js";

const router = Router();
router.post("/signup", signUp);

export default router;
