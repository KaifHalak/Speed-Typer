import { Router } from "express"

const raceRouter = Router()

import { GETPreRaceLobby } from "../controllers/mainPage.controller"

raceRouter.get("/lobby", GETPreRaceLobby)

export default raceRouter