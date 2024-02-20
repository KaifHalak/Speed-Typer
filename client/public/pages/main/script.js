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
    retryButton: document.querySelector("#retry-button")
};
let startTime;
let endTime;
let currentCharIndex = 0;
// Count of all errors made (excluding errors which got corrected)
let incorrectCharCount = 0;
let startTypingFlag = false;
const excludedKeys = ["Shift", "Control", "Alt"];
let liveTimerInterval;
let allLetters = document.querySelectorAll("#textChar");
allLetters[currentCharIndex].classList.add("text-highlight");
function startTyping(e) {
    var _a;
    if (e.key === "Backspace" && currentCharIndex >= 0) {
        // Don't do anything if still on the first char
        if (currentCharIndex === 0) {
            return;
        }
        // do letter style changes
        return backSpace();
    }
    if (excludedKeys.includes(e.key)) {
        return;
    }
    if (e.key == allLetters[currentCharIndex].textContent) {
        isIncorrectChar(false);
    }
    else {
        if (!((_a = allLetters[currentCharIndex].textContent) === null || _a === void 0 ? void 0 : _a.trim())) {
            isIncorrectChar(true, "space");
        }
        else {
            isIncorrectChar(true);
        }
        incorrectCharCount++;
    }
    currentCharIndex++;
    if (currentCharIndex == allLetters.length) {
        endTyping();
        return;
    }
    allLetters[currentCharIndex - 1].classList.remove("text-highlight");
    allLetters[currentCharIndex].classList.add("text-highlight");
}
function backSpace() {
    allLetters[currentCharIndex - 1].classList.remove("correctColor");
    allLetters[currentCharIndex - 1].classList.remove("incorrectColor");
    allLetters[currentCharIndex - 1].classList.remove("incorrectColorSpace");
    allLetters[currentCharIndex].classList.remove("text-highlight");
    allLetters[currentCharIndex - 1].classList.add("text-highlight");
    currentCharIndex--;
}
function isIncorrectChar(flag, space = "") {
    if (flag) {
        allLetters[currentCharIndex].classList.add("incorrectColor");
        if (space) {
            allLetters[currentCharIndex].classList.add("incorrectColorSpace");
        }
    }
    else {
        allLetters[currentCharIndex].classList.add("correctColor");
    }
}
function endTyping() {
    startTypingFlag = false;
    endTime = Date.now();
    document.body.removeEventListener("keydown", bodyEventListener);
    let durationInMin = (endTime - startTime) / 60000;
    // WPM exlcuding errors
    let typedLetters = document.querySelectorAll(".incorrectColor").length + document.querySelectorAll(".correctColor").length;
    let grossWPM = (typedLetters / 5) / durationInMin;
    // Excluding errors which were corrected
    let incorrectLetters = document.querySelectorAll(".incorrectColor").length;
    let errorRate = (incorrectLetters / 5) / durationInMin;
    // WPM including errors (excluding corrected errors)
    let netWPM = grossWPM - errorRate;
    // Including errors which we corrected
    let correctEntries = allLetters.length - incorrectCharCount;
    let accuracy = (correctEntries / allLetters.length) * 100;
    UI.grossWPMText.textContent = Math.round(grossWPM).toString();
    UI.netWPMText.textContent = Math.round(netWPM).toString();
    UI.accuracyText.textContent = Math.round(accuracy).toString() + "%";
    UI.resultsModal.showModal();
    if (netWPM > Number(UI.highScoreValue.textContent)) {
        updateHighScore(grossWPM, netWPM, accuracy);
    }
}
function resetVariablesForRetry() {
    UI.liveTimerValue.textContent = "0s";
    currentCharIndex = 0;
    incorrectCharCount = 0;
    allLetters.forEach((eachLetter) => {
        eachLetter.classList.remove("correctColor");
        eachLetter.classList.remove("incorrectColor");
        eachLetter.classList.remove("incorrectColorSpace");
        eachLetter.classList.remove("text-highlight");
    });
    allLetters[currentCharIndex].classList.add("text-highlight");
    document.body.addEventListener("keydown", bodyEventListener);
    addBlur();
}
UI.retryButton.addEventListener("click", () => {
    resetVariablesForRetry();
    UI.retryButton.blur();
});
UI.blurOverlay.addEventListener('click', () => {
    removeBlur();
});
document.body.addEventListener("keydown", bodyEventListener);
function bodyEventListener(e) {
    if (!startTypingFlag) {
        removeBlur();
        return;
    }
    startTyping(e);
}
function removeBlur() {
    UI.blurOverlay.classList.add("hidden");
    UI.textSection.classList.remove("blur-md");
    UI.liveTimerParent.classList.remove("opacity-0");
    startTypingFlag = true;
    startTime = Date.now();
    liveTimerInterval = setInterval(updateLiveTimer, 1 * 1000);
}
function addBlur() {
    UI.blurOverlay.classList.remove("hidden");
    UI.textSection.classList.add("blur-md");
    UI.liveTimerParent.classList.add("opacity-0");
}
function updateLiveTimer() {
    if (!startTypingFlag) {
        clearInterval(liveTimerInterval);
    }
    let currentValue = parseInt(UI.liveTimerValue.textContent);
    currentValue++;
    UI.liveTimerValue.textContent = currentValue.toString() + "s";
}
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
export {};
