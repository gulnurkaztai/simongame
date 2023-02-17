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

$(document).keydown(function() {
  if (!started) {
    $(".level").text(`Level ${level}` );
    nextSequence();
    started = true;
  }
});

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
  beat.play();
}

// A function that restarts the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function mobile() {
    started = true;
    $(".level").text(`Level ${level}` );
    nextSequence();
};


	// Touch?
  if(window.matchMedia("(pointer: coarse)").matches) {
    // touchscreen
          mobile();

    // Height fix (mostly for iOS).
      window.setTimeout(function() {
        $window.scrollTop($window.scrollTop() + 1);
      }, 0);
}





