// TODO: Code clean up

import { Request, Response, NextFunction } from "express"
import path from "path"
import { getUserAllHighscoreDetails } from "../utils/database/main"

// TODO: fix this type
interface UserI {
    userId: string,
    username: string,
    pictureURL: string
}

// let text = "The quick brown fox jumps over the lazy dog. This sentence is often used to test typewriters and computer keyboards due to its use of every letter in the English alphabet. It is also a popular pangram, a sentence that contains every letter of the alphabet at least once."
let text = "Hello There"

export async function GETMainPage(req: Request, res: Response, next: NextFunction) {
    let pictureURL: string = ""
    let highScoreDetails: highScoreDetailsI = {
        netWPM: "Log In",
        accuracy: null,
        dateAchieved: new Date()
    }

    const userData = req.user as UserI

    if (userData) {
        pictureURL = userData.pictureURL
        highScoreDetails = await getUserAllHighscoreDetails(userData.userId)
    }

    res.render(path.join(__dirname, "../", "../", "../", "client", "public", "index"), { text, pictureURL, highScoreDetails })
}

interface highScoreDetailsI {
    netWPM: Number | String,
    accuracy: Number | null,
    dateAchieved: Date,
}

// let n = new Date()

// n.toISOString()