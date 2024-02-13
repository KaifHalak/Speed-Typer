import express, { urlencoded }  from "express";
import http from "http"
import cors from "cors"
import path from "path"
import passport from "passport"
import cookieSession from "cookie-session";

const EJS_PATH = path.join(__dirname, "../", "../","../", "client", "public")
const STATIC_FILES_PATH = express.static(path.join(__dirname, "../","../", "../", "client", "public"))

const app = express();
const server = http.createServer(app);

app.use(cookieSession({
  name:"speedTyperSession",
  keys: ["key1"],
  maxAge: 24 * 60 * 60 * 1000
}))
app.use(passport.initialize())
app.use(passport.session())
// way around passport error
app.use(function(request, response, next) {
  if (request.session && !request.session.regenerate) {
    request.session.regenerate = (cb: any) => {
      cb()
    }
  }
  if (request.session && !request.session.save) {
    request.session.save = (cb: any) => {
      cb()
    }
  }
  next()
})

passport.serializeUser((user: Express.User, done) => {
  done(null, user)
})

passport.deserializeUser((user: Express.User, done) => {
  done(null, user)
})

app.set('view engine', 'ejs');
app.set('views', EJS_PATH);
app.use(STATIC_FILES_PATH)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())


let PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });

export default app
