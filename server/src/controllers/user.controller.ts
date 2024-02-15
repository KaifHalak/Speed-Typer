import { Request, Response, NextFunction } from "express"

import { updateUserHighscoreValue } from "../utils/database/main"

// TODO: fix this type
interface UserI {
    userId: string,
    username: string,
    pictureURL: string
}

// TODO: add user validation middleware

export async function POSTUpdateHighScore(req: Request, res: Response, next: NextFunction) {
    if (!(req.user && req.isAuthenticated())){
        return
    }

    const userData = req.user as UserI 
    let newHighScore: number = req.body.newHighScore
    let outcome = await updateUserHighscoreValue(userData.userId, newHighScore)
    res.send({status: outcome})
}
