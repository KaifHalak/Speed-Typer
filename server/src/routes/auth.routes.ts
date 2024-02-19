import { Router } from "express"
import passport from "passport"

import { validateLocalAuth, GETLoginPage, GETSignupPage } from "../controllers/localAuth.controller" 

const authRouter = Router()

authRouter.get("/login", GETLoginPage)
authRouter.get("/signup", GETSignupPage)

authRouter.post('/login', validateLocalAuth);
authRouter.post('/signup', validateLocalAuth);

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', "email"] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login', successRedirect:"/", keepSessionInfo: true}));


export default authRouter