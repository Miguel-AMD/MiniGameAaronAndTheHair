const aaron = document.getElementById('aaron');
const characterSize = 45;
var mapX = //x coodrinate of map
var mapY = //Y coordinate of map

//SETS COORDINATES
var aaronY= //y coordinate of aaron's spawn point
var aaronX= //x coord

//MOVES DOWN
function moveDown() {
    if (aaronY < (mapY - characterSize) && aaronY >= 0) {
    aaronY += characterSize;
    aaron.style.top = aaronY+"px";
    }
    }

//MOVES UP
function moveUp() {
    if (aaronY < mapY && aaronY >= characterSize) {
    aaronY -= characterSize;
    aaron.style.top = aaronY+"px";
    }
    }


//MOVES RIGHT
function moveRight() {
    if (aaronX < (mapX - characterSize) && aaronX >= 0) {
        aaronX += characterSize;
    aaron.style.left = aaronX+"px";
    }
    }


//MOVES LEFT
function moveLeft() {
    if (aaronX >= characterSize && aaronX <mapX) {
    aaronX -= characterSize;
    aaron.style.left = aaronX+"px";
    }
    }
//CONTROLS KEYBOARD MOVEMENT
document.addEventListener("keydown", function(e) {
    setTimeout(function() {
        if (aaronX < liebreX + characterSize &&
            aaronX + characterSize > liebreX &&
            aaronY < liebreY + characterSize &&
            characterSize + aaronY > liebreY) 
            {console.log("collision!");} //win condition
        else {
            switch (e.key) {
            case "ArrowDown":
            case "s":
                moveDown();
                break;
            case "ArrowUp":
            case "w":
                moveUp();
                break;
            case "ArrowLeft":
            case "a":
                moveLeft();
                break;
            case "ArrowRight":
            case "d":
                moveRight();
                break;}     
        }
    }, speed);
});