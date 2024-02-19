import path from "path"
import env from "dotenv"
env.config({path: path.join(__dirname, "../", ".env")})

function envGet(key: string){
    return process.env[key]
}

export default envGet