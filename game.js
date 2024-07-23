// Colors of the four buttons
btnColours = ["red", "blue", "green", "yellow"];

// An array that stores the game pattern
gamePattern = [];

// An array that stores the pressed buttons
userClickedPattern = [];

// Checks if the game has started
let started = false;

// Current game level
let level = 0;

// $(document).keydown(function() {
//   if (!started) {
//     $(".level").text(`Level ${level}` );
//     nextSequence();
//     started = true;
//   }
// });

// A function that randomly picks a color
function nextSequence() {
  userClickedPattern = [];
  level++;
  $(".level").text(`Level ${level}`);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = btnColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

// A function that detects what button was pressed and pushes that value into the array to store
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

// A function that checks if the user is follwing game pattern
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    // if the user is NOT follwing the game pattern 
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $(".level").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}


// A function that animates the buttion
function animatePress(currentColor) {
  $(`#${currentColor}`).addClass("pressed");
  setTimeout(function () {
    $(`#${currentColor}`).removeClass("pressed");
  }, 100);
}

// A function that plays the button sounds
function playSound(colour) {
  let beat = new Audio(`sounds/${colour}.mp3`);
  console.log(beat)
  beat.play();
}

// A function that restarts the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Function to start the game on touch/click
function startGame() {
  if (!started) {
    $(".level").text(`Level ${level}`);
    nextSequence();
    started = true;
  }
}

// Detect touch/click anywhere on the screen to start the game
$(document).on("click touchstart", function() {
  startGame();
});

// Initialize the game state
$(document).ready(function() {
  $(".level").text("Tap Anywhere to Start");
});

// Add a restart button
const restartButton = $("<button>")
  .text("Restart")
  .addClass("restart-btn")
  .click(function() {
    startOver();
    startGame();
  });

$("body").append(restartButton);


// function mobile() {
//   console.log("1")
//   if (!started) {
//     $(".level").text(`Level ${level}` );
//     nextSequence();
//     console.log("2")
//     started = true;
//   }
// };


// 	// Touch?
// if(window.matchMedia("(pointer: coarse)").matches) {
//     // if touchscreen, start after 3 second
//     let counter = 3;
//     $(".level").text("")
//     let interval = setInterval(function() {
//     $(".level").text(`The game will start in ${counter} seconds`);
//     counter--;

//     if (counter == 0) {
//         clearInterval(interval);
//     }

// }, 1000);

//       setTimeout(() => {

//         mobile();
//       }, 3000);

//     // Height fix (mostly for iOS).
//       window.setTimeout(function() {
//         $window.scrollTop($window.scrollTop() + 1);
//       }, 0);

//   }
