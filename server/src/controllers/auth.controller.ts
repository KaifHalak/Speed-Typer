import { Request, Response, NextFunction } from "express"
import passport from "passport"
import path from "path"

import { localStrategy, googleStrategy } from "../utils/auth/authStrategies"

const authUIPath = path.join(__dirname, "../", "../", "../", "client", "public", "auth", "template.ejs")

passport.use(localStrategy)
passport.use(googleStrategy);

export function GETLoginPage(req: Request, res: Response, next: NextFunction){
    return res.render(authUIPath, {type:"login"})
}

export function GETSignupPage(req: Request, res: Response, next: NextFunction){
    return res.render(authUIPath, {type:"signup"})
}

export function validateLocalAuth(req: Request, res: Response, next: NextFunction){
    passport.authenticate('local', (err: string | null, user: Express.User, info: any) => {
      
      if (err){
        return res.setHeader("HX-Trigger", JSON.stringify({authResponse: {error: err}})).status(400).send()
      }

      if (info){
          if (info.message === "Missing credentials"){
            return res.setHeader("HX-Trigger", JSON.stringify({authResponse: {error: "Missing credentials"}})).status(400).send()
        }}


      req.login(user, (err) => {
            return res.setHeader("HX-Location", "/").send()
        });
        
    })(req, res, next);
}

export function validateGoogleAuth(req: Request, res: Response, next: NextFunction){
    passport.authenticate('google', { failureRedirect: '/auth/login', successRedirect:"/", keepSessionInfo: true})
}