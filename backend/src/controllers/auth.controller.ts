import { Request, Response } from "express";
import { getAuthUrl, getTokens, getUserInfo } from "../services/auth.service";

export const googleAuthRedirect = (req: Request, res: Response) => {
  const url = getAuthUrl();
  res.redirect(url);
};

export const googleCallback = async (req: Request, res: Response) => {
  console.log("Oauth Callback called");
  const code = req.query.code as string;
  try {
    const tokens = await getTokens(code);

    const userInfo = await getUserInfo(tokens.access_token!);

    req.session.tokens = tokens;
    req.session.userInfo = userInfo;

    // res.json({ tokens, userInfo });
    // res.redirect(`http://localhost:5173/ingest`);
    res.redirect(`${process.env.FRONTEND_URL}/ingest`);
  } catch (error) {
    console.error("Error during Google OAuth callback:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};
