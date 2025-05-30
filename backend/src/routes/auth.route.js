import express from "express"
const router= express.Router();

import { login , logout , signup, updatePicture, checkAuth } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

router.post('/login',login)

router.post('/signup',signup)

router.post('/logout', logout)

router.post('/uploadPhoto',protectRoute, updatePicture)

router.get('/check', protectRoute, checkAuth)

export default router;