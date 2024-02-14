const UI = {
    textSection: document.querySelector("#textSection") as HTMLDivElement,
    blurOverlay: document.querySelector("#blurOverlay") as HTMLDivElement,
}

let currentCharIndex = 0
let startTypingFlag: Boolean = false
const excludedKeys = ["Shift", "Control", "Alt"]

let allLetters = document.querySelectorAll("#textChar")
allLetters[currentCharIndex].classList.add("text-highlight")

let startTime: number
let endTime: number
let incorrectChar = 0

function startTyping(e: KeyboardEvent){
    if (!startTypingFlag || currentCharIndex == allLetters.length){
        removeBlur()
        return
    }

    if (excludedKeys.includes(e.key)){
        return
    }

    if (e.key === "Backspace" && currentCharIndex >= 0){
        return backSpace()
    }

    if (e.key == allLetters[currentCharIndex].textContent){
        isIncorrectChar(false)
    } else {
        isIncorrectChar(true)
        incorrectChar++
    }

    allLetters[currentCharIndex].classList.remove("text-highlight")

    currentCharIndex++

    if (currentCharIndex == allLetters.length){
        endTyping()
        return
    }

    allLetters[currentCharIndex].classList.add("text-highlight")
    

}
function backSpace(){
    if (currentCharIndex === 0){
            return 
        }

        let textCharClassList = allLetters[currentCharIndex - 1].classList
        if (textCharClassList.contains("incorrectColor")){
            textCharClassList.remove("incorrectColor")
        } else {
            textCharClassList.remove("correctColor")
        }


        textCharClassList.add("text-highlight")
        allLetters[currentCharIndex].classList.remove("text-highlight")

        currentCharIndex--
}
function isIncorrectChar(flag: boolean){
    if (flag){
        allLetters[currentCharIndex].classList.add("incorrectColor")
    } else {
        allLetters[currentCharIndex].classList.add("correctColor")
    }

}


function endTyping(){
    document.body.removeEventListener("keydown", startTyping)

    endTime = Date.now()
    
    let durationInMin = (endTime - startTime) / 60000

    // WPM exlcuding errors
    let grossWPM = allLetters.length / durationInMin

    // Excluding corrected errors
    let incorrectLetters = document.querySelectorAll(".incorrectColor").length
    let errorRate = incorrectLetters / durationInMin

    // WPM including errors
    let netWPM = grossWPM - errorRate

    // Including corrected errors
    let correctEntries = allLetters.length - incorrectChar
    let accuracy = (correctEntries / allLetters.length) * 100

    let result = {
        grossWPM,
        netWPM,
        accuracy
    }


}


function resetVariables(){
    currentCharIndex = 0
    incorrectChar = 0
    startTypingFlag = false

    // Get new text
    allLetters = document.querySelectorAll("#textChar")
    allLetters[currentCharIndex].classList.add("text-highlight")

    document.body.addEventListener("keydown", startTyping)
}


UI.blurOverlay.addEventListener('click', () => {
    removeBlur()
})

function removeBlur(){
    UI.blurOverlay.classList.add("hidden")
    UI.textSection.classList.remove("blur-sm")
    startTypingFlag = true
    startTime = Date.now()
}

document.body.addEventListener("keydown", startTyping)



