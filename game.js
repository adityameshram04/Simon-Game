var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = false;

$(document).keypress(function(){
    if(start === false)
    {
        $("h1").text("Level " + level);
        nextSequence();
        start = true;
    }
});


$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);  
    playSound(userChosenColor); 
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success")

        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }

    else
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    
    }

}

function nextSequence(){

    userClickedPattern = [];

    level++;
    
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);

    var randomChoosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChoosenColor);

}

function playSound(name) {

    var audio = new Audio("sounds/"+ name + ".mp3");
    audio.play();

}

function animatePress(currentColor) {

    $( "#" + currentColor).addClass("pressed");
    //setTimout is used to delay a piece of code  
    setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
    },100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;

}