import { Router } from "express";
import { getFiles, getFilesByName } from "../controllers/drive.controller";

const driveRoutes = Router();

driveRoutes.get("/", (req, res) => {
  res.send("drive route");
});

driveRoutes.get("/files", getFiles);

driveRoutes.get("/files/:fileName", getFilesByName);

export default driveRoutes;
