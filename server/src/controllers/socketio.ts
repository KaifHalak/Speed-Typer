import { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData } from "../utils/types/socketio";
import { Server } from "socket.io";
import http from "http"


const ioConfig = {
  cors: {
    origin: "http://192.168.100.7:3000"
  },
  serveClient: false
}

let io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>


export function initServerSocket(server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>){
    io = new Server<
      ClientToServerEvents,
      ServerToClientEvents,
      InterServerEvents,
      SocketData
    >(server, ioConfig);


    manageSocketConnections(io)
}


function manageSocketConnections(io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>){
    io.on("connection", (socket) => {

      
  
})
}



