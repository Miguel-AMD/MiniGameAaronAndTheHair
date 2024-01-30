window.onload = function(){
const gameArena = document.getElementById('gameArena');
const cat = document.getElementById('cat');
const mouse = document.getElementById('mouse')

//MOUSE MOVEMENT
//all constraints must be valid. if in-bounds, moves at a random x or y location
const speed = 500;
var mouseY= 0;
var mouseX=700;
    

setInterval(mouseMove, speed)
//MOUSE MOVEMENT SETTINGS
function mouseDown() {
    if (mouseY < 700) {
        mouseY += 100;
        mouse.style.top = mouseY + "px";
    }
}

function mouseUp() {
    if (mouseY > 0) {
        mouseY -= 100;
        mouse.style.top = mouseY + "px";
    }
}

function mouseRight() {
    if (mouseX <= 700) { // Adjusted for the right boundary, considering the mouse's size
        mouseX -= 100;
        mouse.style.left = mouseX + "px";
    }
}

function mouseLeft() {
    if (mouseX >= 0) { // Ensures mouseX doesn't go below 0
        mouseX -= 100;
        mouse.style.left = mouseX + "px";
    }
}

//NUMBER RANDOMIZER
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function mouseMove() {
    randomNumber = randomize(1, 4)     
    switch (randomNumber) {
        case 1:
        mouseDown();
        break;
        case 2:
        mouseUp();
        break;
        case 3:
        mouseRight();
        break;
        case 4:
        mouseLeft();
        break;
    }
}

//KEYBOARD DIRECTIONAL INPUT
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