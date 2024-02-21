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
    retryButton: document.querySelector("#retry-button"),
    allLetters: document.querySelectorAll("#textChar")
};
import { initValues } from "../typingTemplate.js";
initValues(UI);
