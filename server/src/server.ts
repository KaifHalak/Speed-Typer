import app from "./config/serverSettings";

import { GETMainPage } from "./controllers/mainPage.controller"
app.get("/", GETMainPage)


