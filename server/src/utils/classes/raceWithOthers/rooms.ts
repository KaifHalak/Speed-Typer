import Player from "./player"

class Room {

    declare data: RoomI

    constructor(){
        this.data = {}
    }   

    CreateRoom(roomId: string, admin: Player){

        let newRoom = {
            playerCount: 1,
            players: [admin]
        }

        this.data[roomId] = newRoom

    }

    JoinRoom(roomId: string, player: Player){

        // Check if room exists
        if (!(roomId in this.data)){
            return {error: "room does not exist"}
        }

        this.data[roomId].players.push(player)
        this.data[roomId].playerCount++

        return {status: "player joined room successfully"}

    }

    

}

let rooms = new Room()

export default rooms

// let player1 = new Player("Ayesha", "")
// let player2 = new Player("Usman", "")

// let rooms = new Room()
// rooms.CreateRoom("room1", player1)
// console.log(rooms.JoinRoom("room1", player2))

// console.log(rooms.data)



interface RoomI {
    [roomId : string]: {  
        playerCount: number,
        players: Player[]
    }
}