import { Request, Response, NextFunction } from "express"

import { getUserHighscorePlacement, updateUserHighscoreValue } from "../utils/database/main"

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
    let  { accuracy, newHighScore, text} = req.body
    let outcome = await updateUserHighscoreValue(userData.userId, newHighScore, accuracy, text)
    res.send({status: outcome})
}

export async function GETUserPlacement(req: Request, res: Response, next: NextFunction) {
    if (!(req.user && req.isAuthenticated())){
        return
    }

    const userData = req.user as UserI
    
    let placement = await getUserHighscorePlacement(userData.userId)

    res.send(placement.toString())
}
