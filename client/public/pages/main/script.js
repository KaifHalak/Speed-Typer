import { initValues } from "../typingTemplate.js";
const UI = {
    textSection: document.querySelector("#textSection"),
    blurOverlay: document.querySelector("#blurOverlay"),
    resultsModal: document.querySelector("#results-modal"),
    grossWPMText: document.querySelector("#results-modal #gross-wpm"),
    netWPMText: document.querySelector("#results-modal #net-wpm"),
    accuracyText: document.querySelector("#results-modal #accuracy"),
    liveTimerValue: document.querySelector("#timer"),
    liveTimerParent: document.querySelector("#timer-parent"),
    highScoreValue: document.querySelector("#high-score"),
    hiddenFullText: document.querySelector("#hidden-full-text"),
    retryButton: document.querySelector("#retry-button"),
    allLetters: document.querySelectorAll("#textChar")
};
function updateHighScore(grossWPM, netWPM, accuracy) {
    UI.highScoreValue.textContent = Math.round(netWPM).toString();
    let payload = JSON.stringify({
        grossWPM: Math.round(grossWPM),
        netWPM: Math.round(netWPM),
        accuracy: Math.round(accuracy),
        text: UI.hiddenFullText.textContent.trim()
    });
    // TODO: prevent highscore manipulation when sending it to server
    let url = "/user/highscore";
    fetch(url, {
        method: "PATCH",
        headers: { 'Content-Type': 'application/json' },
        body: payload
    })
        .then((res) => {
        if (!res.ok) {
            // throw some error
            return;
        }
        return res.json();
    })
        .then((payload) => {
        // tell user that the highscore has been updated
    })
        .catch(error => {
        // Handle any errors that occur during the fetch operation
        // console.error('There was a problem with the fetch operation:', error);
    });
}
initValues(UI);
// TODO: Fix this type
document.addEventListener("end-typing", (e) => {
    // Extract data from event detail
    let { grossWPM, netWPM, accuracy } = e.detail;
    updateHighScore(grossWPM, netWPM, accuracy);
});
