import { Router } from "express"

const leaderboardRouter = Router()

import { GETLeaderboardPage, GETLeaderboardText } from "../controllers/mainPage.controller"


leaderboardRouter.get("/:id", GETLeaderboardText)
leaderboardRouter.get("/", GETLeaderboardPage)


export default leaderboardRouter