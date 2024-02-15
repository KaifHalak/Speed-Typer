import { Router, Request, Response, NextFunction } from "express"

const userRouter = Router()

import { POSTUpdateHighScore } from "../controllers/user.controller"
userRouter.post("/update-highscore", POSTUpdateHighScore)

export default userRouter