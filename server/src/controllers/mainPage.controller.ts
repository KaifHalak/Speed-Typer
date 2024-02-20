import { Request, Response, NextFunction } from "express"
import path from "path"

import { getUserHighscoreDetails, getLeaderboardData, getLeaderboardUserData } from "../utils/database/main"
import { userHighScoreSchemaI } from "../utils/database/schemas"
import { UserI } from "../utils/types/reqUser"

let text = "The quick brown fox jumps over the lazy dog. This sentence is often used to test typewriters and computer keyboards due to its use of every letter in the English alphabet. It is also a popular pangram, a sentence that contains every letter of the alphabet at least once."

// let text = "Hello There"

const MAIN_PAGE = path.join(__dirname, "../", "../", "../", "client", "public", "pages", "main", "index")
const LEADERBOARD_PAGE = path.join(__dirname, "../", "../", "../", "client", "public", "pages","leaderboardPage", "index.ejs")
const LEADERBOARD_TEXT = path.join(__dirname, "../", "../", "../", "client", "public", "pages","leaderboardTextReplay",  "index.ejs")

export async function GETMainPage(req: Request, res: Response, next: NextFunction) {
    let pictureURL: string | null = null

    let highScoreDetails: userHighScoreSchemaI | null = null

    const userData = req.user as UserI

    if (userData && req.isAuthenticated()) {
        pictureURL = userData.pictureURL
        highScoreDetails = await getUserHighscoreDetails(userData.userId)
    }

    res.render(MAIN_PAGE, { text, pictureURL, highScoreDetails })
}


export async function GETLeaderboardPage(req: Request, res: Response, next: NextFunction) {
    let pictureURL = ""
    
    let leaderboardData = await getLeaderboardData()

    const userData = req.user as UserI
    if (userData && req.isAuthenticated()){
        pictureURL = userData.pictureURL
    }

    res.render(LEADERBOARD_PAGE, {leaderboardData, pictureURL})
}


export async function GETLeaderboardText(req: Request, res: Response, next: NextFunction) {

    let leaderboardId = req.params.id

    if (!leaderboardId){return}

    let pictureURL: string | null = null

    const userData = req.user as UserI

    if (userData && req.isAuthenticated()) {
        pictureURL = userData.pictureURL
    }

    let { highScoreDetails, placement } = await getLeaderboardUserData(leaderboardId)
    

    res.render(LEADERBOARD_TEXT, { text: highScoreDetails.text, pictureURL, highScoreDetails, placement: `#${placement}` })
}



