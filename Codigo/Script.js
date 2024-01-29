window.onload = function(){
const gameArena = document.getElementById('gameArena');
const cat = document.getElementById('cat');
const downButton = document.getElementById('downButton');
const upButton = document.getElementById('upButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');


//KEYPRESSES
document.addEventListener("keydown", (e)) {
    console.log(e);
}



//SETS COORDINATES
var yPos= 0;
var xPos=0;
//MOVES DOWN
downButton.onclick = (moveDown)
function moveDown() {
    if (yPos < 700 && yPos >= 0) {
    yPos += 100;
    cat.style.top = yPos+"px";
    }
    }
//MOVES UP
upButton.onclick = (moveUp) 
function moveUp() {
    if (yPos < 800 && yPos >= 100) {
    yPos -= 100;
    cat.style.top = yPos+"px";
    }
    }
//MOVES RIGHT
rightButton.onclick = (moveRight) 
function moveRight() {
    if (xPos < 700 && xPos >= 0) {
    xPos += 100;
    cat.style.left = xPos+"px";
    }
    }
//MOVES LEFT
leftButton.onclick = (moveLeft) 
function moveLeft() {
    if (xPos >= 100 && xPos <800) {
    xPos -= 100;
    cat.style.left = xPos+"px";
    }
    }
};