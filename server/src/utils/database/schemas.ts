import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

// ==== User Schema ==== 

interface userSchemaI {
    _id: string
    username: string,
    email: string
    password: string,
    highScoreDetails: userHighScoreSchemaI,
    pictureURL: string,
    provider: string
}

interface userHighScoreSchemaI {
        text: string,
        netWPM: Number,
        grossWPM: Number
        dateAchieved: Date,
        accuracy: Number
        _id: String
}

let userHighScoreSchema = new mongoose.Schema<userHighScoreSchemaI>({
    _id: {
        type: String,
        default: uuidv4
    },
    text: {
        type: String,
        default: ""
    },
    netWPM: {
        type: Number,
        default: 0
    },
    grossWPM: {
        type: Number,
        default: 0
    },
    dateAchieved: {
        type: Date,
        default: Date.now,
    },
    accuracy: {
        type: Number,
        default: 0
    }
})

let userSchema = new mongoose.Schema<userSchemaI>({
    _id: {
        type: String,
        default: uuidv4 
    },
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        // match: /^[a-zA-Z0-9_.]*$/, // Allows only alphanumeric characters, dots, and underscores
    },
    password: {
        type: String,
        required: false,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
    },
    highScoreDetails: {
        type: userHighScoreSchema,
        required: true
    },
    pictureURL: {
        type: String,
        default: ""
    },
    provider: {
        type: String,
        default: ""
    }
});

let userModel = mongoose.model<userSchemaI>("users", userSchema)


// ==== Leaderboad Schema ====

interface leaderBoardSchemaI extends userHighScoreSchemaI {
    userId: String
}

let leaderBoardSchema = new mongoose.Schema<leaderBoardSchemaI>({
    _id: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true,
        ref: userModel
    },
    text: {
        type: String,
        default: ""
    },
    grossWPM: {
        type: Number,
        default: 0
    },
    netWPM: {
        type: Number,
        default: 0
    },
    dateAchieved: {
        type: Date,
        default: Date.now,
    },
    accuracy: {
        type: Number,
        default: 0
    }
})

let leaderBoardModel = mongoose.model<leaderBoardSchemaI>("leaderboards", leaderBoardSchema)

export {
    userModel,
    leaderBoardModel,
    userHighScoreSchemaI
}

