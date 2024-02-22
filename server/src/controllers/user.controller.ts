import { Request, Response, NextFunction } from "express"

import { getUserHighscorePlacement, updateUserHighscoreValue, getUserHighscoreDetails } from "../utils/database/main"
import { UserI } from "../utils/types/reqUser"

// TODO: add proper error handling

export async function PATCHUpdateHighScore(req: Request, res: Response, next: NextFunction) {
    // check that accuracy is correct according to netWPM and grossWPM

    const userData = req.user as UserI 
    let  { accuracy, netWPM, grossWPM, text, correctEntries, incorrectEntries, durationInMin } = req.body
    
    if (netWPM > 200 || grossWPM > 200 || netWPM > grossWPM){return}

    let validation = validateNetWPM(correctEntries, incorrectEntries, grossWPM, netWPM, accuracy, durationInMin, userData.userId)
    
    if (!validation){return}

    let outcome = await updateUserHighscoreValue(userData.userId, grossWPM, netWPM, accuracy, text)
    res.send({status: outcome})
}

export async function GETUserPlacement(req: Request, res: Response, next: NextFunction) {
    const userData = req.user as UserI
    
    let placement = await getUserHighscorePlacement(userData.userId)

    res.send("#" + placement.toString())
}


async function validateNetWPM(correctEntries: number, incorrectEntries: number, grossWPM: number, netWPM: number, accuracy: number, durationInMin: number, userId: string){

    let typedLetters = incorrectEntries + correctEntries
    let validateGrossWPM = (typedLetters / 5) / durationInMin

    // Excluding errors which were corrected
    let errorRate = (incorrectEntries / 5) / durationInMin

    // WPM including errors (excluding corrected errors)
    let validateNetWPM = grossWPM - errorRate

    // Including errors which we corrected
    let validateAccuracy = (correctEntries / typedLetters) * 100
    
    let wpmRatio = (netWPM / grossWPM) * 100

    let { netWPM: currentNetWPM } = await getUserHighscoreDetails(userId)

    return (validateGrossWPM === (grossWPM) && validateNetWPM === netWPM &&validateAccuracy === accuracy && ( wpmRatio < validateAccuracy + 10 && wpmRatio > validateAccuracy - 10 ) && validateNetWPM > currentNetWPM )
}