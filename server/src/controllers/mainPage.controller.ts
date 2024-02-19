import { Request, Response, NextFunction } from "express"
import path from "path"

import { getUserHighscoreDetails } from "../utils/database/main"
import { userHighScoreSchemaI } from "../utils/database/schemas"
import { UserI } from "../utils/types/reqUser"

// let text = "The quick brown fox jumps over the lazy dog. This sentence is often used to test typewriters and computer keyboards due to its use of every letter in the English alphabet. It is also a popular pangram, a sentence that contains every letter of the alphabet at least once."

let text = "Hello There"

export async function GETMainPage(req: Request, res: Response, next: NextFunction) {
    let pictureURL: string | null = null

    let highScoreDetails: userHighScoreSchemaI | null = null

    const userData = req.user as UserI

    if (userData && req.isAuthenticated()) {
        pictureURL = userData.pictureURL
        highScoreDetails = await getUserHighscoreDetails(userData.userId)
    }

    res.render(path.join(__dirname, "../", "../", "../", "client", "public", "index"), { text, pictureURL, highScoreDetails })
}


