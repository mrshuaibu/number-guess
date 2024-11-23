'use strict';

const playAgainButton = document.querySelector('.play-again');
const guessesDisplay = document.querySelector('.guesses p');
const levelDisplay = document.querySelector('.level p');
const scoreDisplay = document.querySelector('.score p');
const numberDisplay = document.querySelector('.number p');
const inputField = document.querySelector('.input-area');
const messageDisplay = document.querySelector('.message-display p');

let randomNumber;
let guesses;
let score;
let level = 1;

function startNewGame() {
    const maxNumber = level * 10; 
    randomNumber = Math.floor(Math.random() * maxNumber) + 1;
    guesses = 5; 
    score = 0;

    guessesDisplay.textContent = `Guesses: ${guesses}`;
    scoreDisplay.textContent = `Score: ${score}`;
    levelDisplay.textContent = `Level: ${level}`;
    numberDisplay.textContent = '??'; 

    messageDisplay.textContent = `Guess a number between 1 and ${maxNumber}.`;

    inputField.value = '';
}

function checkGuess() {
    const userGuess = parseInt(inputField.value);
    
    if (isNaN(userGuess)) {
        messageDisplay.textContent = 'Please enter a valid number!';
        return;
    }

    guesses--; 
    guessesDisplay.textContent = `Guesses: ${guesses}`;

    if (userGuess === randomNumber) {
        score += 100;

        if (level < 5) {
            level++;  
        }

        scoreDisplay.textContent = `Score: ${score}`;
        levelDisplay.textContent = `Level: ${level}`;
        messageDisplay.textContent = 'Congratulations! You guessed it right!';
        numberDisplay.textContent = randomNumber;
        inputField.value = ''; 

        setTimeout(startNewGame, 2000); 
        return; 
    }

    if (guesses === 0) {
        messageDisplay.textContent = `Game Over! The correct number was ${randomNumber}.`;
        numberDisplay.textContent = randomNumber; 
        inputField.value = ''; 

        inputField.disabled = true;
        return;  
    }

    if (userGuess < randomNumber) {
        messageDisplay.textContent = 'Too low! Try again.';
    } else if (userGuess > randomNumber) {
        messageDisplay.textContent = 'Too high! Try again.';
    }

    inputField.value = ''; 
}

inputField.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

playAgainButton.addEventListener('click', () => {
    level = 1; 
    inputField.disabled = false; 
    startNewGame();
});

startNewGame();
