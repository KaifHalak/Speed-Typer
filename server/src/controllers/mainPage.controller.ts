import { Request, Response, NextFunction } from "express"
import path from "path"
import { getUserHighscoreValue } from "../utils/database/main"

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
    let highScore: string = "Log In"

    const userData = req.user as UserI

    if (userData) {
        pictureURL = userData.pictureURL
        highScore = (await getUserHighscoreValue(userData.userId)).toString()
    }

    res.render(path.join(__dirname, "../", "../", "../", "client", "public", "index"), { text, pictureURL, highScore })
}
