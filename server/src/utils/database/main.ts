import mongoose from "mongoose";
import envGet  from "../env";

import { userModel, leaderBoardModel } from "./schemas";

export async function startDBServer(){
    await mongoose.connect(envGet("DB_URL")!)
    .catch((err: Error) => {
        throw err
    })
    console.log(envGet("DB_URL")! + " DB connected")
}

// add DB error handling
// TODO: maybe change to leaderboardModel when retrieving highscore details?
export async function getUserHighscoreDetails(userId: string){
    let document = await userModel.find({_id: userId})
    return document[0].highScoreDetails
}

export async function updateUserHighscoreValue(userId: string, grossWPM: number, netWPM: number, accuracy: number, text: string){
    let document = (await userModel.find({_id: userId}))[0]

    let currentDate = new Date()

    document.highScoreDetails.dateAchieved = currentDate
    document.highScoreDetails.accuracy = accuracy
    document.highScoreDetails.text = text
    document.highScoreDetails.netWPM = netWPM
    document.highScoreDetails.grossWPM = grossWPM

    await updateLeaderboardHighscore(document.highScoreDetails._id, grossWPM, netWPM, currentDate, accuracy, text, userId)

    await document.save()
    return true
}

export async function updateLeaderboardHighscore(highscoreId: String, grossWPM: Number, netWPM: number, dateAchieved: Date, accuracy: number, text: string, userId: String){
    let document = (await leaderBoardModel.find({_id: highscoreId}))[0]
    
    if (!document){
        document = await leaderBoardModel.create({ _id: highscoreId, userId: userId })
    }
    
    document.netWPM = netWPM
    document.grossWPM = grossWPM
    document.text = text
    document.dateAchieved = dateAchieved
    document.accuracy = accuracy
    await document.save()
    return true
}

// TODO: Limit the number of results

export async function getUserHighscorePlacement(userId: string){

    let highscore = (await userModel.find({_id: userId}))[0].highScoreDetails.netWPM

    let documents = await leaderBoardModel.find()
    documents = bubbleSort<typeof documents[0]>(documents)
    
    let placement = documents.findIndex(document => document.netWPM === highscore) + 1

    return placement
}

export async function getLeaderboardData(){
    let documents = await leaderBoardModel.find()
    .select("-__v")
    .populate({
        path: "userId",
        select: "pictureURL username -_id"
    })
    documents = bubbleSort<typeof documents[0]>(documents)
    return documents
}

export async function getLeaderboardUserData(leaderboardId: string){
    let documents = await leaderBoardModel.find({_id: leaderboardId})
    .select("-_id -__v")
    .populate({
        path: "userId",
        select: "pictureURL username -_id"
    })

    let allUsers = await leaderBoardModel.find()
    allUsers =  bubbleSort<typeof allUsers[0]>(allUsers)

    let placement = allUsers.findIndex(document => document.netWPM === documents[0].netWPM) + 1

    return {highScoreDetails: documents[0], placement}
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




