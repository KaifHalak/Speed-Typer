const UI = {
    joinRoom: document.querySelector("#join-room-btn")
};
import { io } from "socket.io-client";
const socket = io();
function addListeners() {
    UI.joinRoom.addEventListener("click", () => {
    });
}
