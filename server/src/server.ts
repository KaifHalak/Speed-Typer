import app from "./config/serverSettings"


import { GETMainPage, pageNotFound } from "./controllers/mainPage.controller"
app.get("/", GETMainPage)

import leaderboardRouter from "./routes/leaderboard.routes"
app.use("/leaderboard", leaderboardRouter)

import authRouter from "./routes/auth.routes"
app.use("/auth", authRouter)

import userRouter from "./routes/user.routes"
app.use("/user", userRouter)

import raceRouter from "./routes/race.routes"
app.use("/race", raceRouter)

app.use("/", pageNotFound)
