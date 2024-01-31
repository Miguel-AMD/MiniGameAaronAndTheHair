function coordenadasMapa(){
    let Mapa = document.getElementById('Mapa');
    let firstCoords = Mapa.children[0].children[0];
    let coords = firstCoords.getBoundingClientRect();
    return [Math.round(coords.left),Math.round(coords.top)];
}

function getElementFromCoord(x,y){
    return document.getElementById('Mapa').children[x].children[y];
}

function posicionCoordenadaMapa(x,y){
    let C = coordenadasMapa();
    let newX = (C[0]-8)+x*45;
    let newY = (C[1]-8)+y*45;
    return [newX,newY];
}

function muevePersonaje(x,y,IdPersonaje){
    let C = posicionCoordenadaMapa(x,y);
    let A = document.getElementById(IdPersonaje);
    A.style.left = (C[0])+'px';
    A.style.top = (C[1])+'px';
}

muevePersonaje(0,0,'Aaron')
muevePersonaje(4,4,'Liebre')