import express from "express";
const router = express.Router();
import {Home , About} from '../Controllers/auth-controller.js'

// Home page route.
router.get("/", Home);

// About page route.
router.get("/about", About);

export default router;
