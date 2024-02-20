import { Request, Response, NextFunction } from "express"

import { getUserHighscorePlacement, updateUserHighscoreValue } from "../utils/database/main"
import { UserI } from "../utils/types/reqUser"

export async function POSTUpdateHighScore(req: Request, res: Response, next: NextFunction) {
    if (!(req.user && req.isAuthenticated())){
        return
    }

    const userData = req.user as UserI 
    let  { accuracy, netWPM, grossWPM, text } = req.body
    let outcome = await updateUserHighscoreValue(userData.userId, grossWPM, netWPM, accuracy, text)
    res.send({status: outcome})
}

export async function GETUserPlacement(req: Request, res: Response, next: NextFunction) {
    if (!(req.user && req.isAuthenticated())){
        return
    }

    const userData = req.user as UserI
    
    let placement = await getUserHighscorePlacement(userData.userId)

    res.send("#" + placement.toString())
}
