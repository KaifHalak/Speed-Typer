import { Router, Request, Response, NextFunction } from "express"
import path from "path"
import passport from "passport"

import { validateLocalAuth, validateGoogleAuth, GETLoginPage, GETSignupPage } from "../controllers/auth.controller" 

const authRouter = Router()

authRouter.get("/login", GETLoginPage)
authRouter.get("/signup", GETSignupPage)

authRouter.post('/login', validateLocalAuth);
authRouter.post('/signup', validateLocalAuth);

authRouter.get('/google', passport.authenticate('google', { scope: ['email'] }));
authRouter.get('/google/callback', validateGoogleAuth);


export default authRouter