
//HARE SPEED
setInterval(liebreMove, speed)
//HARE MOVEMENT

function liebreDown() {
    if (liebreY < 700) {
        liebreY += characterSize;
        liebre.style.top = liebreY + "px";
    }
}

function liebreUp() {
    if (liebreY > 0) {
        liebreY -= characterSize;
        liebre.style.top = liebreY + "px";
    }
}

function liebreRight() {
    if (liebreX < 700) {
        liebreX += characterSize;
        liebre.style.left = liebreX + "px";
    }
}

function liebreLeft() {
    if (liebreX > 0) {
        liebreX -= characterSize;
        liebre.style.left = liebreX + "px";
    }
}

//NUMBER RANDOMIZER
function randomize(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function liebreMove() {
    randomNumber = randomize(1, 5)     
    switch (randomNumber) {
        case 1:
        liebreDown();
        break;
        case 2:
        liebreUp();
        break;
        case 3:
        liebreRight();
        break;
        case 4:
        liebreLeft();
        break;
    }
}
