import express from "express";
import cors from "cors";
import session from "express-session";
import authRoutes from "./routes/auth.route.";
import driveRoutes from "./routes/drive.route";
import ingestRoutes from "./routes/ingest.route";
import searchRoutes from "./routes/search.route";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "sessionssecret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "lax" }, // --- Use { secure : true } for HTTPS ---
  }),
);

app.use("/auth", authRoutes);
app.use("/drive", driveRoutes);
app.use("/ingest", ingestRoutes);
app.use("/search", searchRoutes);

app.get("/status", (req, res) => {
  res.json({ status: "ok", authenticated: !!req.session.tokens });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
