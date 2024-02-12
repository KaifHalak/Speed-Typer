import { Router, Request, Response, NextFunction } from "express"
import path from "path"

const authRouter = Router()


const authUIPath = path.join(__dirname, "../", "../", "../", "client", "public", "auth", "template.ejs")

authRouter.get("/login", (req: Request, res: Response, next: NextFunction) => {
    res.render(authUIPath, {type:"login"})
})

authRouter.get("/signup", (req: Request, res: Response, next: NextFunction) => {
    res.render(authUIPath, {type:"signup"})
})


export default authRouter