const UI = {
    textSection: document.querySelector("#textSection") as HTMLDivElement,
    blurOverlay: document.querySelector("#blurOverlay") as HTMLDivElement,
}

let startTypingFlag: Boolean = false
let currentIndex = 0
const excludedKeys = ["Shift", "Control", "Alt"]

const text = "<%= text %>";
const allTextChar = document.querySelectorAll("#textChar")

allTextChar[currentIndex].classList.add("text-highlight")

document.body.addEventListener("keydown", (e: KeyboardEvent) => {

    if (!startTypingFlag){
        RemoveBlur()
        return
    }

    if (excludedKeys.includes(e.key)){
        return
    }

    if (e.key === "Backspace" && currentIndex >= 0){

        if (currentIndex === 0){
            return
        }

        let textCharClassList = allTextChar[currentIndex - 1].classList

        if (textCharClassList.contains("incorrectColor")){
            textCharClassList.remove("incorrectColor")
        } else {
            textCharClassList.remove("correctColor")
        }

        allTextChar[currentIndex].classList.remove("text-highlight")
        allTextChar[currentIndex - 1].classList.add("text-highlight")

        currentIndex--
        return
    } 

 
    if (e.key == text[currentIndex]){
        isIncorrectChar(false)
    } else {
        isIncorrectChar(true)
    }

    allTextChar[currentIndex].classList.remove("text-highlight")
    allTextChar[currentIndex + 1].classList.add("text-highlight")
    currentIndex++
    
})

UI.blurOverlay.addEventListener('click', () => {
    RemoveBlur()
})

function RemoveBlur(){
    UI.blurOverlay.classList.add("hidden")
    UI.textSection.classList.remove("blur-sm")
    startTypingFlag = true
}

function isIncorrectChar(flag: boolean){
    if (!flag){
        allTextChar[currentIndex].classList.add("incorrectColor")
    } else {
        allTextChar[currentIndex].classList.add("correctColor")
    }

}



