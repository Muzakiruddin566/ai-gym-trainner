// routes/planRoutes.js
import express from "express";
import { generateFitnessPlan } from "../controller/planController.js";

const router = express.Router();

router.post("/generate", generateFitnessPlan);

export default router;
