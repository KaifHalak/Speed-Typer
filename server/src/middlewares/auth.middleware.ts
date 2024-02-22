import { Request, Response, NextFunction } from "express"

export async function authUser(req: Request, res: Response, next: NextFunction) {
    if (!(req.user && req.isAuthenticated())){
        // TODO: redirect where?
        return res.redirect("/")
    }
    return next()
}