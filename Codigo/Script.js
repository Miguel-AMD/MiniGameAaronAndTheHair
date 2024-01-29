window.onload = function(){
const gameArena = document.getElementById('gameArena');
const cat = document.getElementById('cat');


//KEYBOARD INPUT
document.addEventListener("keydown", (e) => {
switch (e.key) {
    case "ArrowDown":
    case "s":
        moveDown();
        break
    case "ArrowUp":
    case "w":
        moveUp();
        break
    case "ArrowLeft":
    case "a":
        moveLeft();
        break
    case "ArrowRight":
    case "d":
        moveRight();
        break
} 
});

//SETS COORDINATES
var yPos= 0;
var xPos=0;

//MOVES DOWN
function moveDown() {
    if (yPos < 700 && yPos >= 0) {
    yPos += 100;
    cat.style.top = yPos+"px";
    }
    }

//MOVES UP
function moveUp() {
    if (yPos < 800 && yPos >= 100) {
    yPos -= 100;
    cat.style.top = yPos+"px";
    }
    }


//MOVES RIGHT
function moveRight() {
    if (xPos < 700 && xPos >= 0) {
    xPos += 100;
    cat.style.left = xPos+"px";
    }
    }


//MOVES LEFT
function moveLeft() {
    if (xPos >= 100 && xPos <800) {
    xPos -= 100;
    cat.style.left = xPos+"px";
    }
    }


//END OF CODE
};