import { Router } from "express";
import { searchFiles } from "../controllers/search.controller";

const searchRoutes = Router();

searchRoutes.get("/", searchFiles);

export default searchRoutes;
