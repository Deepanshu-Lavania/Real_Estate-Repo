import express from "express";
const router = express.Router();
import {google, signin, signup} from '../Controllers/auth-controller.js'

router.post("/signup", signup)
router.post("/signin", signin)
router.post("/google", google)

export default router;
