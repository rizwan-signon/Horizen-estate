import { Router } from "express";
import {
  createListing,
  getListings,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();
router.post("/create", createListing);
router.get("/listings/:id", verifyToken, getListings);
export default router;
