import express from 'express';
import { createListing } from '../controllers/listing.controller.js';
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();

//user needs to be verified before creating listing
router.post('/create', verifyToken, createListing);

export default router;