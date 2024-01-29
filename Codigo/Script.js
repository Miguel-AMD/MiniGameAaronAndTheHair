window.onload = function(){
const gameArena = document.getElementById('gameArena');
 const cat = document.getElementById('cat');
const downButton = document.getElementById('downButton');



downButton.onclick = (yMove)
onkeydown 
var yPos= 0;
var xPos=0;
function yMove() {
    yPos += 100
    cat.style.top = yPos+"px";
}

//only activate downKey if the top side is between Y positions 0 and containersize-height (700 in this case)
if yPos < 700 || yPos > 0 {

}

};