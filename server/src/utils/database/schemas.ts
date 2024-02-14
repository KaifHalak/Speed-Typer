import mongoose from "mongoose";

interface userSchemaI {
    username: string,
    password: string,
    highScore: highScoreSchemaI
}

interface highScoreSchemaI {
        text: string,
        wpm: Number,
        dateAchieved: Date
}

// ==== User Schema ==== 

let highScoreSchema = new mongoose.Schema<highScoreSchemaI>({
    text: {
        type: String,
        required: true
    },
    wpm: {
        type: Number,
        required: true
    },
    dateAchieved: {
        type: Date,
        default: Date.now,
        required: true
    }
})

let userSchema = new mongoose.Schema<userSchemaI>({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        match: /^[a-zA-Z0-9_.]*$/, // Allows only alphanumeric characters, dots, and underscores
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    highScore: {
        type: highScoreSchema,
        required: false
    }
});

export let userModel = mongoose.model<userSchemaI>("users", userSchema)
