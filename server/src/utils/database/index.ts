import mongoose from "mongoose";
import { envGet } from "../env";

export async function startServer(){
    await mongoose.connect(envGet("DB_URL")!)
    .catch((err: Error) => {
        throw err
    })
    console.log(envGet("DB_URL")! + " DB connected")
}

