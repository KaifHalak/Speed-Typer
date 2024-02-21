const UI = {
    textSection: document.querySelector("#textSection") as HTMLDivElement,
    blurOverlay: document.querySelector("#blurOverlay") as HTMLDivElement,

    resultsModal: document.querySelector("#results-modal") as HTMLDialogElement,
    grossWPMText: document.querySelector("#results-modal #gross-wpm") as HTMLDivElement,
    netWPMText: document.querySelector("#results-modal #net-wpm") as HTMLDivElement,
    accuracyText: document.querySelector("#results-modal #accuracy") as HTMLDivElement,

    liveTimerValue: document.querySelector("#timer") as HTMLDivElement,
    liveTimerParent: document.querySelector("#timer-parent") as HTMLDivElement,

    highScoreValue: document.querySelector("#high-score") as HTMLDivElement,

    retryButton: document.querySelector("#retry-button") as HTMLButtonElement,


    allLetters: document.querySelectorAll("#textChar") as NodeListOf<HTMLDivElement>
}

import { initValues } from "../typingTemplate.js"
initValues(UI)


