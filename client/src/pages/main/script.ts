import { initValues } from "../typingTemplate.js"

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

    hiddenFullText: document.querySelector("#hidden-full-text") as HTMLDivElement,

    retryButton: document.querySelector("#retry-button") as HTMLButtonElement,


    allLetters: document.querySelectorAll("#textChar") as NodeListOf<HTMLDivElement>
}

function updateHighScore(grossWPM: number,netWPM: number, accuracy: number, correctEntries: number, incorrectEntries: number, durationInMin: number){
     UI.highScoreValue.textContent = Math.round(netWPM).toString()

    let payload = JSON.stringify({
            grossWPM, 
            netWPM,
            accuracy,
            correctEntries,
            incorrectEntries,
            durationInMin,
            text: UI.hiddenFullText.textContent!.trim()})

        // TODO: prevent highscore manipulation when sending it to server
        let url = "/user/highscore"
        fetch(url, {
            method: "PATCH",
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

initValues(UI)

// TODO: Fix this type
document.addEventListener("end-typing", (e: any) => {
    // Extract data from event detail
    let { grossWPM, netWPM, accuracy, correctEntries, incorrectEntries, durationInMin } = e.detail
    updateHighScore(grossWPM, netWPM, accuracy, correctEntries, incorrectEntries, durationInMin);
});





