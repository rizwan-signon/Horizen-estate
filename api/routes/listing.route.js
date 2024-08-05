import { Router } from "express";
import {
  createListing,
  getListings,
  deleteListing,
  getListingById,
} from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
const router = Router();
router.post("/create", createListing);
router.get("/listings/:id", verifyToken, getListings);
router.delete("/delete_listing/:id", verifyToken, deleteListing);
router.get("/get_listing/:listingId", getListingById);

export default router;
