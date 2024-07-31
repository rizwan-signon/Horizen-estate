import { Router } from "express";
import {
  updateUser,
  getCookie,
  deleteUser,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();

router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

router.get("/token", getCookie);

export default router;
