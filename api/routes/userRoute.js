import { Router } from "express";
import { signUp, signIn, signinWithGoogle } from "../controllers/user.js";

const router = Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", signinWithGoogle);
export default router;
