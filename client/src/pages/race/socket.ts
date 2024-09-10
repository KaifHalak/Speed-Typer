const UI = {
    joinRoom: document.querySelector("#join-room-btn") as HTMLButtonElement
}

import { io, Socket } from "socket.io-client";

import { ServerToClientEvents, ClientToServerEvents } from "../../types/clientSocket";


const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

function addListeners(){
    UI.joinRoom.addEventListener("click", () => {
        
    })
}

