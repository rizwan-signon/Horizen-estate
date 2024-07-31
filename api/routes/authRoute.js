import { Router } from "express";
import {
  signUp,
  signIn,
  signinWithGoogle,
  signOut,
} from "../controllers/authController.js";

const router = Router();
router.post("/signup", signUp);
router.post("/signin", signIn);
router.post("/google", signinWithGoogle);
router.get("/signout", signOut);
export default router;
