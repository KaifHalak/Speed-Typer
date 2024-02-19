import { Router } from "express"

const userRouter = Router()

import { POSTUpdateHighScore, GETUserPlacement } from "../controllers/user.controller"

userRouter.post("/update-highscore", POSTUpdateHighScore)
userRouter.get("/placement", GETUserPlacement)

export default userRouter