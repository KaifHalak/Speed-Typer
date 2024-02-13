import { Router, Request, Response, NextFunction } from "express"
import path from "path"
import passport from "passport"
const authRouter = Router()


const authUIPath = path.join(__dirname, "../", "../", "../", "client", "public", "auth", "template.ejs")
authRouter.get("/login", (req: Request, res: Response, next: NextFunction) => {
    res.render(authUIPath, {type:"login"})
})
authRouter.get("/signup", (req: Request, res: Response, next: NextFunction) => {
    res.render(authUIPath, {type:"signup"})
})


import { localStrategy, googleStrategy } from "../utils/auth/authStrategies"

passport.use(localStrategy)
passport.use(googleStrategy);

authRouter.post('/login', passport.authenticate('local', { failureRedirect: '/auth/login', successRedirect:"/"}));


authRouter.get('/google',
  passport.authenticate('google', { scope: ['email'] }));

authRouter.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/auth/login', successRedirect:"/"}));


export default authRouter