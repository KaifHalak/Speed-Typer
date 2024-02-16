const UI = {
    textSection: document.querySelector("#textSection") as HTMLDivElement,
    blurOverlay: document.querySelector("#blurOverlay") as HTMLDivElement,

    resultsModal: document.querySelector("#results-modal") as HTMLDialogElement,
    grossWPMText: document.querySelector("#results-modal #gross-wpm") as HTMLDivElement,
    netWPMText: document.querySelector("#results-modal #net-wpm") as HTMLDivElement,
    accuracyText: document.querySelector("#results-modal #accuracy") as HTMLDivElement,

    liveWPMValue: document.querySelector("#live-gross-wpm") as HTMLDivElement,
    liveTimerValue: document.querySelector("#timer") as HTMLDivElement,

    highScoreValue: document.querySelector("#high-score") as HTMLDivElement,

    hiddenFullText: document.querySelector("#hidden-full-text") as HTMLDivElement
}

let startTime: number
let endTime: number

let currentCharIndex = 0
// Count of all errors made (excluding errors which got corrected)
let incorrectCharCount = 0
let startTypingFlag: Boolean = false
const excludedKeys = ["Shift", "Control", "Alt"]

const liveWPMIntervalInMS = 0.3 * 1000

let liveWPMInterval: NodeJS.Timeout 
let liveTimerInterval: NodeJS.Timeout 

let allLetters = document.querySelectorAll("#textChar")
allLetters[currentCharIndex].classList.add("text-highlight")


function startTyping(e: KeyboardEvent){

    if (e.key === "Backspace" && currentCharIndex >= 0){
        // Don't do anything if still on the first char
        if (currentCharIndex === 0){
            return
        }
        // do letter style changes
        return backSpace()
    }

    if (excludedKeys.includes(e.key)){
        return
    }

    if (e.key == allLetters[currentCharIndex].textContent){
        isIncorrectChar(false)
    } else {
        isIncorrectChar(true)
        incorrectCharCount++
    }

    currentCharIndex++

    if (currentCharIndex == allLetters.length){
        endTyping()
        return
    }

    allLetters[currentCharIndex - 1].classList.remove("text-highlight")
    allLetters[currentCharIndex].classList.add("text-highlight")
    
}

function backSpace(){
    allLetters[currentCharIndex - 1].classList.remove("correctColor")
    allLetters[currentCharIndex - 1].classList.remove("incorrectColor")

    allLetters[currentCharIndex].classList.remove("text-highlight")
    allLetters[currentCharIndex - 1].classList.add("text-highlight")

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
    startTypingFlag = false
    endTime = Date.now()

    document.body.removeEventListener("keydown", bodyEventListener)

    let durationInMin = (endTime - startTime) / 60000

    // WPM exlcuding errors
    let typedLetters = document.querySelectorAll(".incorrectColor").length + document.querySelectorAll(".correctColor").length
    let grossWPM = (typedLetters / 5) / durationInMin

    // Excluding errors which were corrected
    let incorrectLetters = document.querySelectorAll(".incorrectColor").length
    let errorRate = (incorrectLetters / 5) / durationInMin

    // WPM including errors (excluding corrected errors)
    let netWPM = grossWPM - errorRate

    // Including errors which we corrected
    let correctEntries = allLetters.length - incorrectCharCount
    let accuracy = (correctEntries / allLetters.length) * 100

    UI.grossWPMText.textContent = Math.round(grossWPM).toString()
    UI.netWPMText.textContent = Math.round(netWPM).toString()
    UI.accuracyText.textContent = Math.round(accuracy).toString() + "%"
    
    UI.resultsModal.showModal()

    if (netWPM > Number(UI.highScoreValue.textContent)){
       updateHighScore(netWPM, accuracy)

    }

    

}


function resetVariablesForRetry(){
    UI.liveWPMValue.textContent = "0"
    UI.liveTimerValue.textContent = "0s"

    currentCharIndex = 0
    incorrectCharCount = 0

    allLetters.forEach((eachLetter) => {
        eachLetter.classList.remove("correctColor")
        eachLetter.classList.remove("incorrectColor")
        eachLetter.classList.remove("text-highlight")
    })

    allLetters[currentCharIndex].classList.add("text-highlight")

    document.body.addEventListener("keydown", bodyEventListener)

    addBlur()
}


UI.blurOverlay.addEventListener('click', () => {
    removeBlur()
})

document.body.addEventListener("keydown", bodyEventListener)

function bodyEventListener(e: KeyboardEvent){
     if (!startTypingFlag){
        removeBlur()

        startTypingFlag = true
        startTime = Date.now()

        liveWPMInterval = setInterval(updateLiveWPM, liveWPMIntervalInMS)
        liveTimerInterval = setInterval(updateLiveTimer, 1 * 1000)

        return
    }

    startTyping(e)
}

function removeBlur(){
    UI.blurOverlay.classList.add("hidden")
    UI.textSection.classList.remove("blur-sm")
}

function addBlur(){
    UI.blurOverlay.classList.remove("hidden")
    UI.textSection.classList.add("blur-sm")
}

function updateLiveWPM(){

    if (!startTypingFlag){
        clearInterval(liveWPMInterval)
    }

     endTime = Date.now()
            
    let durationInMin = (endTime - startTime) / 60000

    // WPM exlcuding errors
    let typedLetters = document.querySelectorAll(".incorrectColor").length + document.querySelectorAll(".correctColor").length
            
    let liveGrossWPM = (typedLetters / 5) / durationInMin

    UI.liveWPMValue.textContent = Math.round(liveGrossWPM).toString()
}

function updateLiveTimer(){
    if (!startTypingFlag){
        clearInterval(liveTimerInterval)
    }

    let currentValue = parseInt(UI.liveTimerValue.textContent!);
    currentValue++;
    UI.liveTimerValue.textContent =  currentValue.toString() + "s"
}

function updateHighScore(netWPM: number, accuracy: number){
     UI.highScoreValue.textContent = Math.round(netWPM).toString()

    let payload = JSON.stringify({newHighScore: Math.round(netWPM),
                 accuracy: Math.round(accuracy),
                    text: UI.hiddenFullText.textContent!.trim()})

        // TODO: prevent highscore manipulation when sending it to server
        let url = "/user/update-highscore"
        fetch(url, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: payload
        })
        .then((res) => {
            if (!res.ok){
                // throw some error
                return
            }

            return res.json()
        })
        .then((payload) => {
            // tell user that the highscore has been updated
        })
        .catch(error => {
            // Handle any errors that occur during the fetch operation
            // console.error('There was a problem with the fetch operation:', error);
        });
}




