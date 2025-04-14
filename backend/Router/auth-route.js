import express from "express";
const router = express.Router();
import {signup} from '../Controllers/auth-controller.js'

router.post("/signup", signup)

export default router;
