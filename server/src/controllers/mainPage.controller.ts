import { Request, Response, NextFunction } from "express"
import path from "path"


let text = "The quick brown fox jumps over the lazy dog. This sentence is often used to test typewriters and computer keyboards due to its use of every letter in the English alphabet. It is also a popular pangram, a sentence that contains every letter of the alphabet at least once."
// let text = 'Hello'

export function GETMainPage(req: Request, res:Response, next: NextFunction){
    res.render(path.join(__dirname, "../", "../","../", "client", "public", "index"), {text: text})
}