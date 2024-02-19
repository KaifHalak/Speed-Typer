import { Router } from "express"
import passport from "passport"

import { googleStrategy } from "../utils/auth/authStrategies"

passport.use(googleStrategy)

const authRouter = Router()

authRouter.get('/google', passport.authenticate('google', { scope: ['profile', "email"] }));
authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/login', successRedirect:"/", keepSessionInfo: true}));


export default authRouter