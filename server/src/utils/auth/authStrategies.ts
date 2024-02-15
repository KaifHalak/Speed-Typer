import { Strategy as GoogleStrategy, VerifyCallback } from "passport-google-oauth20"; 
import { Strategy as LocalStrategy } from "passport-local"
import { Profile } from "passport"

import { Request } from "express"; 
import { envGet } from "../env";

import { validateEmail, validatePassword, validateTermsAndConditions } from "./helperFunctions"; 

import { userModel } from "../database/schemas";


// Google

interface GoogleProfileI extends Profile {
    _json: {
      sub: string,
      email: string,
      email_verified: boolean,
      name: string,
      picture: string
    }
}

const GOOGLE_CLIENT_ID = envGet("GOOGLE_CLIENT_ID")!
const GOOGLE_CLIENT_SECRET = envGet("GOOGLE_CLIENT_SECRET")!
const GOOGLE_CALLBACK_URL = "/auth/google/callback"

export const googleStrategy = new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL
  }, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {

    let extendedProfile = profile as GoogleProfileI
    
    let { sub: userId, email, email_verified: emailVerified, name: username, picture: pictureURL } = extendedProfile._json
    let userData = {userId, username, pictureURL}
    
    // Check if user already exists
    let userDocument = await userModel.findOne({_id: userId})

    // If user does not exist, add to DB
    // TODO: why are the types not showing here?
    if (!userDocument){
      await userModel.create({_id: userId ,username, email, pictureURL, provider: profile.provider})
    }

    done(null, userData)
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


