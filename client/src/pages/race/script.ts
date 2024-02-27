import { io, Socket } from "socket.io-client";

import { ServerToClientEvents, ClientToServerEvents } from "../../types/clientSocket";


const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

socket.emit("test");
