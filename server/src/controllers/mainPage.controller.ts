import { Request, Response, NextFunction } from "express"
import path from "path"
import { v4 as uuidv4 } from 'uuid';

import { getUserHighscoreDetails, getLeaderboardData, getLeaderboardUserData } from "../utils/database/main"
import { userHighScoreSchemaI } from "../utils/database/schemas"
import { UserI } from "../utils/types/reqUser"
import { generateRandomText } from "../utils/textGen/gen"

import Room from "../utils/classes/raceWithOthers/rooms";
import Player from "../utils/classes/raceWithOthers/player";

const MAIN_PAGE = path.join(__dirname, "../", "../", "../", "client", "public", "pages", "main", "index")
const LEADERBOARD_PAGE = path.join(__dirname, "../", "../", "../", "client", "public", "pages","leaderboardPage", "index.ejs")
const LEADERBOARD_TEXT = path.join(__dirname, "../", "../", "../", "client", "public", "pages","leaderboardTextReplay",  "index.ejs")
const PAGE_NOT_FOUND = path.join(__dirname, "../", "../", "../", "client", "public", "pages","404Page",  "index.ejs")
const PRE_RACE_LOBBY = path.join(__dirname, "../", "../", "../", "client", "public", "pages","race",  "preRaceLobby.ejs")

const ROOM_ID_LEN = 8

export async function GETMainPage(req: Request, res: Response, next: NextFunction) {
    let pictureURL: string | null = null

    let highScoreDetails: userHighScoreSchemaI | null = null

    const userData = req.user as UserI

    if (userData && req.isAuthenticated()) {
        pictureURL = userData.pictureURL
        highScoreDetails = await getUserHighscoreDetails(userData.userId)
    }

    let paragraphs = 1
    let sentences = 8
    let text = generateRandomText(paragraphs, sentences)[0]

    res.render(MAIN_PAGE, { text, pictureURL, highScoreDetails })
}


export async function GETLeaderboardPage(req: Request, res: Response, next: NextFunction) {
    let pictureURL = ""
    
    let leaderboardData = await getLeaderboardData()

    const userData = req.user as UserI
    if (userData && req.isAuthenticated()){
        pictureURL = userData.pictureURL
    }
// TODO: change variable name to navbar: {pictureURL}
    res.render(LEADERBOARD_PAGE, {leaderboardData, pictureURL})
}


export async function GETLeaderboardText(req: Request, res: Response, next: NextFunction) {

    let leaderboardId = req.params.id

    let pictureURL: string | null = null

    const userData = req.user as UserI

    if (userData && req.isAuthenticated()) {
        pictureURL = userData.pictureURL
    }

    let { highScoreDetails, placement } = await getLeaderboardUserData(leaderboardId)

    
    if (!highScoreDetails){return next()}

    res.render(LEADERBOARD_TEXT, { text: highScoreDetails.text, pictureURL, highScoreDetails, placement: `#${placement}` })
}

export async function pageNotFound(req: Request, res: Response, next: NextFunction) {
    let pictureURL: string = ''

    const userData = req.user as UserI

    if (userData && req.isAuthenticated()) {
        pictureURL = userData.pictureURL
    }

   return res.status(404).render(PAGE_NOT_FOUND, {pictureURL})
}   


let rooms = new Room()


export async function GETPreRaceLobby(req: Request, res: Response, next: NextFunction) {

    const userData = req.user as UserI

    let roomId = generateRandomRoomID()
    let currentUserDetails = {pictureURL: userData.pictureURL, username: userData.username}
    let currentLobbyDetails = {inviteCode: roomId}

    let admin = new Player(userData.userId, userData.username, userData.pictureURL)
    rooms.CreateRoom(roomId, admin)

   return res.render(PRE_RACE_LOBBY, {currentUserDetails, currentLobbyDetails})
}  






function generateRandomRoomID(){
    return uuidv4().slice(0, ROOM_ID_LEN)
}

