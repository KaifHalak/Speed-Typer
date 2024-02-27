import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../utils/types/socketio";
import { Server } from "socket.io";

import { server } from "../config/serverSettings";

const ioConfig = {
  cors: {
    origin: "http://192.168.100.7:3000"
  },
  serveClient: false
}
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, ioConfig);

io.on("connection", (socket) => {

  console.log("socket connection")
  socket.on("test", () => {
    console.log("test")
  })
  

})

