import { Router } from "express";
import { updateUser, getCookie } from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();

router.post("/update/:id", verifyToken, updateUser);
router.get("/token", getCookie);

export default router;
