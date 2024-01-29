window.onload = function(){
const gameArena = document.getElementById('gameArena');
const cat = document.getElementById('cat');
const mouse = document.getElementById('mouse')

//MOUSE MOVEMENT
//all constraints must be valid. if in-bounds, moves at a random x or y location
const speed = 500;
mouse.setInterval(mouseMove, speed)
function mouseMove() {
    function randomize(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    randomNumber = randomize(1, 4)     
    var yPos= 0;
    var xPos=0;
    function mouseDown() {
        if (yPos < 700 && yPos >= 0) {
        yPos += 100;
        mouse.style.top = yPos+"px";}
        }
    function mouseUp() {
        if (yPos < 800 && yPos >= 100) {
        yPos -= 100;
        mouse.style.top = yPos+"px";}
        }
    function mouseRight() {
        if (xPos < 700 && xPos >= 0) {
        xPos += 100;
        mouse.style.left = xPos+"px";}
        }
    function mouseLeft() {
        if (xPos >= 100 && xPos <800) {
        xPos -= 100;
        mouse.style.left = xPos+"px";}
        }
    switch (randomNum) {
        case "1":
        mouseDown();
        case "2":
        mouseUp();
        case "3":
        mouseRight();
        case "4":
        mouseLeft();
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