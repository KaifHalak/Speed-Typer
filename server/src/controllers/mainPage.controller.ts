import { Request, Response, NextFunction } from "express"
import path from "path"


let text = "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius libero quae, reprehenderit optio quam suscipit quidem possimus debitis ut ipsum. Maxime natus molestiae, tempore quas explicabo dolore qui officiis rem!"

export function GETMainPage(req: Request, res:Response, next: NextFunction){
    res.render(path.join(__dirname, "../", "../","../", "client", "public", "index"), {text})
}