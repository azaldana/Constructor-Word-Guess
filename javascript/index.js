var Word = require("./word.js");
var inquirer = require("inquirer");

var alphabet = "abcdefghijklmnopqrstuvwxyz";
var wordList = ["horse", "dog", "monkey", "rhino", "lizard", "snake", "lion", "cheetah", "zebra", "giraffe", "elephant", "penguin", "baboon", "dolphin"];

var computerChoice = wordList[Math.floor(Math.random() * wordList.length)];

var randomWord = new Word(computerChoice);
var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];
var guessesLeft = 15;

function playGame() {
    if (requireNewWord === true) {
        computerChoice = Math.floor(Math.random() * wordList.length);
        randomWord = new Word(computerChoice);

        requireNewWord = false;
    }

    // if letter is guessed correctly //
    var completedWord = [];

    // separate each letter that is guessed //
    randomWord.letterArray.forEach(completeCheck);

    console.log(completedWord, computerChoice);

    if (completedWord.join('') != computerChoice) {
        inquirer.prompt([
            {
                type: "input",
                message: "Select a letter from A to Z:",
                name: "userinput"
            }
        ]).then(function(input) {

            if (!alphabet.includes(input.userinput) ||
                input.userinput.length > 1) {
                console.log("Please try again");
                playGame();

            } else if (incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput)) {
                console.log("That letter has already been guessed. Try Again");
                playGame();
            } else {
                var wordCheckArray = [];

                randomWord.userGuess(input.userinput);

                randomWord.letterArray.forEach(wordCheck);

                // console.log(wordCheckArray, completedWord);

                if (wordCheckArray.join("") === completedWord.join("")) {
                    console.log("\nIncorrect\n");
                    incorrectLetters.push(input.userinput);
                    guessesLeft--;
                } else {
                    console.log("\nCorrect!\n");
                    correctLetters.push(input.userinput);
                    guessesLeft--;
                }
                randomWord.createWordString();

                console.log("Guesses Left: " + guessesLeft + "\n");
                console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");

                if (guessesLeft > 0) {
                    playGame();
                } else {
                    console.log("Sorry You've Lost.");
                    console.log("The correct answer was " + computerChoice + ".\n");
                    restartGame();
                }

                function wordCheck(key) {
                    wordCheckArray.push(key.guessedLetter);
                }
            }

        })

    } else {
        console.log("You Win! \n");
        restartGame();
    }

    function completeCheck(key) {
        completedWord.push(key.guessedLetter);
        // if (key.guessedLetter){
        //     completedWord.push(key.letter);
        // } else {
        //     completedWord.push(' ');
        // }
    }
}

function restartGame() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to keep playing?",
            name: "restart"
        }
    ]).then(function(response) {
        if (response.restart) {
            requireNewWord = true;
            incorrectLetters = [];
            correctLetters = [];
            guessesLeft = 15;
            playGame();

        } else {
            console.log("Okay thanks for playing!");
        }
    })
}

playGame();





// index.js: The file containing the playGame for the course of the game, which depends on Word.js and:


// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses