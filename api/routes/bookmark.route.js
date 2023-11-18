import express from 'express';
import { addToBookmarks, removeFromBookmarks, getUserBookmarks } from '../controllers/bookmark.controller.js';
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/add', addToBookmarks);
router.post('/remove', removeFromBookmarks);
router.get('/user', getUserBookmarks);

export default router;