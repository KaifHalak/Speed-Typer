## Speed Typer Game

This project challenges your typing skills.

[Demo Video](speed-typer-demo-vid.mp4)

## Features

-    Google Auth sign in.
-    Players can view their own high scores.
-    Leaderboard System.

## Installation and Setup

-    Clone the Repository or download the zip file

### Configure Environment Variables:

-    Create a .env file in following dir.
-    You must add the following attributes (cannot be left empty)

```
server/src/.env

.env
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

DB_URL = "" // MUST BE A MONGODB SERVER (You may use Atlas)

SESSION_SECRET = "secret"

```

### Run the Application:

-    Run the following commands

```
Terminal 1
cd client
npm run tail

Terminal 1
cd server
npm run server

```

## Note

-    This is a working prototype and contains spme minor bugs.
-    The "Race Others" tab is still under construction and is not yet functional.
