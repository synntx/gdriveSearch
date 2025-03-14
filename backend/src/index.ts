import express from "express";
import cors from "cors";
import session from "express-session";
import driveRoutes from "./routes/drive.route";
import ingestRoutes from "./routes/ingest.route";
import searchRoutes from "./routes/search.route";
import authRoutes from "./routes/auth.route.";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

const isProd = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_SECRET || "sessionssecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd, // secure in production
      sameSite: isProd ? "strict" : "lax",
      httpOnly: true,
    },
  })
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
