import mongoose from "mongoose";
import { envGet } from "../env";
import { userModel } from "./schemas";

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
    let document = await userModel.find({_id: userId})
    document[0].highScore.netWPM = newHighScore
    document[0].highScore.dateAchieved = new Date()
    document[0].highScore.accuracy = accuracy
    document[0].highScore.text = text
    await document[0].save()
    return true
}

