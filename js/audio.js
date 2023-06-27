function positiveSound() {
    let audio = new Audio('./sound/positive1.mp3');
    audio.play();
}

function negativeSound() {
    let audio = new Audio('./sound/negative1.mp3');
    audio.play();
}

function choiceSound() {
    let audio = new Audio('./sound/choice2.mp3');
    audio.volume = 0.5;
    audio.play();
}

