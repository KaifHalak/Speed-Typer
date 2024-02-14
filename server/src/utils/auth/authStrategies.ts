import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20"; 
import { Strategy as LocalStrategy } from "passport-local"
import { Profile } from "passport"

import { Request } from "express"; 
import { envGet } from "../env";

import { validateEmail, validatePassword, validateTermsAndConditions } from "./helperFunctions"; 

// Google

const GOOGLE_CLIENT_ID = envGet("GOOGLE_CLIENT_ID")!
const GOOGLE_CLIENT_SECRET = envGet("GOOGLE_CLIENT_SECRET")!
const GOOGLE_CALLBACK_URL = "/auth/google/callback"

export const googleStrategy = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  }, (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
        // TODO: verify / add user to DB
        console.log(profile)
        done(null, profile)
  })


// Local (Email and Password)

export const localStrategy = new LocalStrategy({ passReqToCallback: true, usernameField:"email" }, (req: Request, username: string, pass: string, done: VerifyCallback) => {
      let { email, password, termsAndConditions } = req.body
      
      let validationOutcome: string | Boolean

      validationOutcome = validateEmail(email)
      if (typeof validationOutcome === "string" ){
        return done(validationOutcome, undefined)
      }

      validationOutcome = validatePassword(password)
      if (typeof validationOutcome === "string" ){
        return done(validationOutcome, undefined)
      }

      validationOutcome = validateTermsAndConditions(termsAndConditions)
      if (typeof validationOutcome === "string" ){
        return done(validationOutcome, undefined)
      }


  // TODO: Add user verification from DB
      if (req.url === "/signup") {
          //TODO: signup

          let { confirmPassword } = req.body

          if (password !== confirmPassword){
            return done("Passwords must match.", undefined)
          } 

      }

    return done(null, {userId: 1})
})


