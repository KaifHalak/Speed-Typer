import mongoose from "mongoose";
import { envGet } from "../env";

import { userModel, leaderBoardModel } from "./schemas";

export async function startDBServer(){
    await mongoose.connect(envGet("DB_URL")!)
    .catch((err: Error) => {
        throw err
    })
    console.log(envGet("DB_URL")! + " DB connected")
}

// add DB error handling

export async function getUserHighscoreValue(userId: string){
    let document = await userModel.find({_id: userId}).select("highScore -_id")
    let highScore = document[0].highScore
    return highScore.netWPM
}

export async function updateUserHighscoreValue(userId: string, newHighScore: number, accuracy: number, text: string){
    let document = (await userModel.find({_id: userId}))[0]
    document.highScore.dateAchieved = new Date()
    document.highScore.accuracy = accuracy
    document.highScore.text = text
    document.highScore.netWPM = newHighScore

    await updateLeaderboardHighscore(document.highScore._id, newHighScore, document.highScore.dateAchieved, accuracy, text, userId)

    await document.save()
    return true
}

export async function updateLeaderboardHighscore(highscoreId: String, newHighScore: number, dateAchieved: Date, accuracy: number, text: string, userId: String){
    let document = (await leaderBoardModel.find({_id: highscoreId}))[0]
    

    if (!document){
        document = await leaderBoardModel.create({ _id: highscoreId, userId: userId })
    }

    document.netWPM = newHighScore
    document.text = text
    document.dateAchieved = dateAchieved
    document.accuracy = accuracy

    await document.save()
    return true
}
