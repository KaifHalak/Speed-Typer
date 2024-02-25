import { Router } from "express"

const raceRouter = Router()

import { GETRace } from "../controllers/mainPage.controller"

raceRouter.get("/", GETRace)

export default raceRouter