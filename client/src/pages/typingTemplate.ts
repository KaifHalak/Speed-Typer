let UI : UIInterface

let startTime: number
let endTime: number

let currentCharIndex = 0
// Count of all errors made (excluding errors which got corrected)
let incorrectCharCount = 0
let startTypingFlag: Boolean = false
const excludedKeys = ["Shift", "Control", "Alt"]

let liveTimerInterval: NodeJS.Timeout 

export function initValues(globalVariables: UIInterface){
    UI = globalVariables
    UI.allLetters[currentCharIndex].classList.add("text-highlight")
    eventListeners()


}

function eventListeners(){
    document.body.addEventListener("keydown", bodyEventListener)

    UI.blurOverlay.addEventListener('click', () => {
        removeBlur()
    })

    UI.retryButton.addEventListener("click", () => {
        resetVariablesForRetry()
        UI.retryButton.blur()
    })
}

function resetVariablesForRetry(){
    UI.liveTimerValue.textContent = "0s"

    currentCharIndex = 0
    incorrectCharCount = 0

    UI.allLetters.forEach((eachLetter) => {
        eachLetter.classList.remove("correctColor")
        eachLetter.classList.remove("incorrectColor")
        eachLetter.classList.remove("incorrectColorSpace")
        eachLetter.classList.remove("text-highlight")
    })

    UI.allLetters[currentCharIndex].classList.add("text-highlight")

    document.body.addEventListener("keydown", bodyEventListener)

    addBlur()
}

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

    if (e.key == UI.allLetters[currentCharIndex].textContent){
        isIncorrectChar(false)
    } else {

        if (!UI.allLetters[currentCharIndex].textContent?.trim()){
            isIncorrectChar(true, "space")
        }
        else {
             isIncorrectChar(true)
        }
        incorrectCharCount++
    }

    currentCharIndex++

    if (currentCharIndex == UI.allLetters.length){
        endTyping()
        return
    }

    UI.allLetters[currentCharIndex - 1].classList.remove("text-highlight")
    UI.allLetters[currentCharIndex].classList.add("text-highlight")
    
}

function backSpace(){
    UI.allLetters[currentCharIndex - 1].classList.remove("correctColor")
    UI.allLetters[currentCharIndex - 1].classList.remove("incorrectColor")
    UI.allLetters[currentCharIndex - 1].classList.remove("incorrectColorSpace")

    UI.allLetters[currentCharIndex].classList.remove("text-highlight")
    UI.allLetters[currentCharIndex - 1].classList.add("text-highlight")

    currentCharIndex--
}

function isIncorrectChar(flag: boolean, space: string = ""){
    if (flag){
        UI.allLetters[currentCharIndex].classList.add("incorrectColor")
        if (space){
            UI.allLetters[currentCharIndex].classList.add("incorrectColorSpace")
        }
    } else {
        UI.allLetters[currentCharIndex].classList.add("correctColor")
    }

}


function endTyping(){
    
    startTypingFlag = false
    endTime = Date.now()

    document.body.removeEventListener("keydown", bodyEventListener)

    let durationInMin = (endTime - startTime) / 60000

    // WPM exlcuding errors

    // let typedLetters = extra.incorrectLetters.length + extra.correctLetters.length
    let typedLetters = document.querySelectorAll(".incorrectColor").length + document.querySelectorAll(".correctColor").length
    let grossWPM = (typedLetters / 5) / durationInMin

    // Excluding errors which were corrected
    let incorrectEntries = document.querySelectorAll(".incorrectColor").length
    let errorRate = (incorrectEntries / 5) / durationInMin

    // WPM including errors (excluding corrected errors)
    let netWPM = grossWPM - errorRate

    // Including errors which we corrected
    let correctEntries = UI.allLetters.length - incorrectCharCount
    let accuracy = (correctEntries / typedLetters) * 100

    UI.grossWPMText.textContent = Math.round(grossWPM).toString()
    UI.netWPMText.textContent = Math.round(netWPM).toString()
    UI.accuracyText.textContent = Math.round(accuracy).toString() + "%"
    
    UI.resultsModal.showModal()

    if (netWPM > Number(UI.highScoreValue.textContent)){
        let endTypingEvent = new CustomEvent("end-typing", { detail: {
            grossWPM, netWPM, accuracy, correctEntries, incorrectEntries, durationInMin 
        } })
        document.dispatchEvent(endTypingEvent)
    }

    
}


function bodyEventListener(e: KeyboardEvent){
     if (!startTypingFlag){
        removeBlur()

        return
    }

    startTyping(e)
}

function removeBlur(){
    UI.blurOverlay.classList.add("hidden")
    UI.textSection.classList.remove("blur-md")
    UI.liveTimerParent.classList.remove("opacity-0")

    startTypingFlag = true
    startTime = Date.now()

    liveTimerInterval = setInterval(updateLiveTimer, 1 * 1000)
}

function addBlur(){
    UI.blurOverlay.classList.remove("hidden")
    UI.textSection.classList.add("blur-md")
    UI.liveTimerParent.classList.add("opacity-0")
}

function updateLiveTimer(){
    if (!startTypingFlag){
        clearInterval(liveTimerInterval)
    }

    let currentValue = parseInt(UI.liveTimerValue.textContent!);
    currentValue++;
    UI.liveTimerValue.textContent =  currentValue.toString() + "s"
}


interface UIInterface {  
    allLetters: NodeListOf<HTMLDivElement> 

    grossWPMText: HTMLDivElement,
    netWPMText: HTMLDivElement,
    accuracyText: HTMLDivElement,
    resultsModal: HTMLDialogElement,

    blurOverlay: HTMLDivElement,
    textSection: HTMLDivElement,

    liveTimerParent: HTMLDivElement,
    liveTimerValue:HTMLDivElement,

    retryButton: HTMLButtonElement
    highScoreValue: HTMLDivElement
}

