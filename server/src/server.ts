import app from "./config/serverSettings";

import { GETMainPage, GETLeaderboardPage } from "./controllers/mainPage.controller"
app.get("/", GETMainPage)
app.get("/leaderboard", GETLeaderboardPage)

import authRouter from "./routes/auth.routes";
app.use("/auth", authRouter)

import userRouter from "./routes/user.routes";
app.use("/user", userRouter)


