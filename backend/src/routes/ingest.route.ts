import { Router } from "express";
import { ingestFiles } from "../controllers/ingest.controller";

const ingestRoutes = Router();

ingestRoutes.post("/", ingestFiles);

export default ingestRoutes;
