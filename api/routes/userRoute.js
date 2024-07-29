import { Router } from "express";
import { getUsers } from "../controllers/user.js";

const router = Router();

router.get("/users", getUsers);

export default router;
