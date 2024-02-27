import app from "./config/serverSettings";

let tempMemorySession = {
    user1: {
        userId: "108224617154390927768",
        username: "Muhamamd Usman",
        pictureURL: "https://lh3.googleusercontent.com/a/ACg8ocLdMmb2SS_z5vruJcsApoKum-_vJMShwwb1pq8bh6c6AY4=s96-c"
    },
    user2: {
        userId: "111523940494267932474",
        username: "Usman 2",
        pictureURL: "https://lh3.googleusercontent.com/a/ACg8ocKJiNrb3oIltnq3H9YiNq44PHxrhrtoIFvIzb7qvCb2=s96-c"
    }
}

app.use("/", (req, res, next) => {
    req.user = tempMemorySession.user1
    req.isAuthenticated = () => {
        return false
    }

    next()
})

import { GETMainPage, pageNotFound } from "./controllers/mainPage.controller"
app.get("/", GETMainPage)

import leaderboardRouter from "./routes/leaderboard.routes";
app.use("/leaderboard", leaderboardRouter)

import authRouter from "./routes/auth.routes";
app.use("/auth", authRouter)

import userRouter from "./routes/user.routes";
app.use("/user", userRouter)

import raceRouter from "./routes/race.routes";
app.use("/race", raceRouter)

app.use("/", pageNotFound)






