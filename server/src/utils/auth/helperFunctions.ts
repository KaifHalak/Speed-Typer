export function validateEmail(email: string){
    const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!pattern.test(email)){
        return "Incorrect email format."
    }
    return true
}

export function validatePassword(password: string){
    let length = 6
    if (password.length < length){
        return "Password must be atleast 6 characters long."
    }
    return true
}

export function validateUsername (username: string): true | {error: string} {
    username = username.trim()
    let allowedPatterns = /^[a-zA-Z0-9_]+$/

    if ( !(username.length >= 3 && username.length <= 20) ){
        return {error : "Username must be between 3 and 20 characters"}
    }

    if ( !(allowedPatterns.test(username)) ){
        return {error: "Only characters from A-Z, a-z, numbers, and underscores are allowed."}
    }

    return true

}

export function validateTermsAndConditions(terms: string){
    if (terms !== "on"){
        return "Please accept the Terms and Conditions"
    }

    return true
}