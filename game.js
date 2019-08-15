var buttonColours = ["red","blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern= [];
var level = 0;
var started = false;

$(".btn").click(function (){
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
console.log(userClickedPattern);
playSound(userChosenColour);
animatepress(userChosenColour);

checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
if(!started){
$("#level-title").text("Level " + level);
nextSequence();
started = true;
}
});

function nextSequence(){
userClickedPattern = [];
var randomNumber = Math.floor(Math.random() * 4);
var randomChosenColour = buttonColours[randomNumber];

level++;
$("#level-title").text("Level " + level);

gamePattern.push(randomChosenColour);
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

  if(gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence(); }, 1000);
  }

  }else{
    console.log("bad");
    var sound = new Audio('sounds/' + "wrong" + '.mp3');
    sound.play();
    $("body").addClass("game-over");
  $("#level-title").text("Game Over, Press Any Key to Restart");

  setTimeout(function(){
    $("body").removeClass("game-over"); }, 100);
    startOver();
  }
}

function startOver(){
  level = [];
  gamePattern = [];
  started = false;
}


function playSound(name){
  var sound = new Audio('sounds/' + name + '.mp3');
  sound.play();
}

function animatepress(currentColour){
  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed"); }, 80);
}
