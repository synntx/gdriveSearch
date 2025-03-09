import { Router } from "express";
import {
  googleAuthRedirect,
  googleCallback,
} from "../controllers/auth.controller";

const authRoutes = Router();

authRoutes.get("/google", googleAuthRedirect);
authRoutes.get("/google/callback", googleCallback);

export default authRoutes;
