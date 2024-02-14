import { Request, Response, NextFunction } from "express"
import path from "path"


let text = "Hello"

export function GETMainPage(req: Request, res:Response, next: NextFunction){
    res.render(path.join(__dirname, "../", "../","../", "client", "public", "index"), {text: text})
}