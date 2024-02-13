import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20"; 
import { Strategy as LocalStrategy } from "passport-local"
import { Profile } from "passport"

import { Request } from "express"; 
import path from "path";
import env from "dotenv"
env.config({path: path.join(__dirname, "../", "../", ".env")})

// Google

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!
const GOOGLE_CALLBACK_URL = "/auth/google/callback"

export const googleStrategy = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  }, (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        // TODO: verify / add user to DB
        done(null, profile)
  })


// Local (Email and Password)

export const localStrategy = new LocalStrategy({ passReqToCallback: true }, (req: Request, username: string, password: string, done: VerifyCallback) => {
    // TODO: Add user verification from DB
    let userId = "random id then use it to get access to userId from serverSide"
    done(null, userId)
})


