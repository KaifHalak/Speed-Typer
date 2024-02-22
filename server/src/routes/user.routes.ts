import { Router } from "express"

const userRouter = Router()

import { authUser } from "../middlewares/auth.middleware"
userRouter.use("/", authUser)

import { PATCHUpdateHighScore, GETUserPlacement } from "../controllers/user.controller"

userRouter.patch("/highscore", PATCHUpdateHighScore)
userRouter.get("/placement", GETUserPlacement)

export default userRouter