function coordenadasMapa(){
    let Mapa = document.getElementById('Mapa');
    let firstCoords = Mapa.children[0].children[0];
    let coords = firstCoords.getBoundingClientRect();
    return [Math.round(coords.left),Math.round(coords.top)];
}

function getElementFromCoord(row,col){
    return document.getElementById('Mapa').children[col].children[row];
}

function posicionCoordenadaMapa(row,col){
    let C = coordenadasMapa();
    let xPos = (C[0]-8)+col*45;
    let yPos = (C[1]-10)+row*45;
    return [xPos,yPos];
}

function muevePersonaje(row,col,IdPersonaje){
    let C = posicionCoordenadaMapa(row,col);
    let A = document.getElementById(IdPersonaje);
    A.style.left = (C[0])+'px';
    A.style.top = (C[1])+'px';
}

//muevePersonaje(0,0,'Aaron')
//muevePersonaje(4,4,'Liebre')

export {muevePersonaje, posicionCoordenadaMapa, coordenadasMapa, getElementFromCoord}