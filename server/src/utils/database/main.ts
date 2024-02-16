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

export async function getUserAllHighscoreDetails(userId: string){
    let document = await userModel.find({_id: userId}).select("highScore -_id")
    return document[0].highScore
}

export async function updateUserHighscoreValue(userId: string, newHighScore: number, accuracy: number, text: string){
    let document = (await userModel.find({_id: userId}))[0]
    document.highScore.dateAchieved = new Date()
    document.highScore.accuracy = accuracy
    document.highScore.text = text
    document.highScore.netWPM = newHighScore

    // document.highScore.placement = (await sortLeaderboardHighscores()).findIndex(document => document.netWPM === newHighScore) + 1

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

// TODO: Limit the number of results

export async function getUserHighscorePlacement(userId: string){

    let highscore = await getUserHighscoreValue(userId)

    let documents = await leaderBoardModel.find()
    documents = bubbleSort<typeof documents[0]>(documents)
    
    let placement = documents.findIndex(document => document.netWPM === highscore) + 1

    return placement
}



// TODO: use a more efficient algo and fix Types

function bubbleSort<mongooseDocument extends {netWPM: Number}>(documents: mongooseDocument[]){
    let ascending = false

    const n = documents.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (ascending){
                if (documents[i].netWPM > documents[i + 1].netWPM) {
                    // Swap elements
                    [documents[i], documents[i + 1]] = [documents[i + 1], documents[i]];
                    swapped = true;
                }
            } else {
                if (documents[i].netWPM < documents[i + 1].netWPM) {
                    // Swap elements
                    [documents[i], documents[i + 1]] = [documents[i + 1], documents[i]];
                    swapped = true;
                }
            }
        }
    } while (swapped);
    return documents
}




