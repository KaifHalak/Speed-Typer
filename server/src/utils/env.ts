import path from "path"
import env from "dotenv"
env.config({path: path.join(__dirname, "../", ".env")})

export function envGet(key: string){
    return process.env[key]
}

export default env