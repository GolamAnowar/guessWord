// /^[A-Za-z]+$/
const inputs = document.querySelector(".inputs"),
hintText = document.querySelector(".hint span"),
typingInput = document.querySelector(".typing-input"),
wrongLetter = document.querySelector(".wrong-letter span"),
guessesLeft = document.querySelector(".guess-left span"),
button = document.querySelector("button");

let currentWord, incorrects = [], corrects = [], maxGuesses = 6;

function randomWord(){
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    hintText.innerHTML = hint;
    let wordDisplay = word.split("").map(() => `<input type="text" disabled>`).join("");
    inputs.innerHTML = wordDisplay;
    console.log(wordDisplay)
}
randomWord();

function initTyping(){
    let userValue = typingInput.value;
    if(userValue.match(/^[A-Za-z]+$/)){
        if(currentWord.includes(userValue)){
            for(let i = 0; i < currentWord.length; i++){
                console.log(i)
                if(currentWord[i] == userValue){
                    corrects.push(userValue);
                    console.log(corrects)
                    console.log("hi")
                    inputs.querySelectorAll("input")[i].value = userValue;
                }
            }
        }else{
            maxGuesses--;
            guessesLeft.innerHTML = maxGuesses;
            incorrects.push(` ${userValue}`);
        }
    }
    wrongLetter.innerHTML = incorrects;
    typingInput.value = "";

    if(currentWord.length == corrects.length){
        return gameOver();
    }
    if(maxGuesses <= 0) return resetgame();
}

function resetgame(){
    for(let i = 0; i < currentWord.length; i++){
        inputs.querySelectorAll("input")[i].value = currentWord[i];
    }
    alert("you lost");
}

function gameOver(){
    setTimeout(() => {
        alert("you won");
    }, 700);
}

function reStart(){
    randomWord();
    incorrects = [], corrects = [], maxGuesses = 6;
    guessesLeft.innerHTML = maxGuesses;
    wrongLetter.innerHTML = incorrects;

}

document.addEventListener("keydown", () => typingInput.focus());
typingInput.addEventListener("input", initTyping);
button.addEventListener("click", reStart);