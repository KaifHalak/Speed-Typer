import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

interface userSchemaI {
    _id: string
    username: string,
    email: string
    password: string,
    highScore: highScoreSchemaI,
    pictureURL: string,
    provider: string
}

interface highScoreSchemaI {
        text: string,
        netWPM: Number,
        dateAchieved: Date,
        accuracy: Number
        _id?: Number
}

// ==== User Schema ==== 

let highScoreSchema = new mongoose.Schema<highScoreSchemaI>({
    text: {
        type: String,
        default: ""
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
    },
    _id: {
        type: String,
        required: false
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
    highScore: {
        type: highScoreSchema,
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

export let userModel = mongoose.model<userSchemaI>("users", userSchema)
