export default class Player {

    private username: string
    private pictureURL: string
    private userId: string

    constructor(userId: string, username: string, pictureURL: string){
        this.username = username
        this.pictureURL = pictureURL
        this.userId = userId

        
    }


    GetUserData(){
        return {
            username: this.username,
            pictureURL: this.pictureURL
        }
    }



}
