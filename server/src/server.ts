import app from "./config/serverSettings";

import { GETMainPage } from "./controllers/mainPage.controller"
app.get("/", GETMainPage)

import authRouter from "./routes/auth.routes";
app.use("/auth", authRouter)


