function coordenadasMapa(){
    let Mapa = document.getElementById('Mapa');
    let coords = Mapa.getBoundingClientRect();
    return [Math.round(coords.left),Math.round(coords.top)];
}

function posicionPersonaje(){
    let C = coordenadasMapa();
    let A = document.getElementById('Aaron');
    A.style.left = (C[0]-5)+'px'; //No se porque el menos 5 pero hay que ponerlo
    A.style.top = (C[1]+11)+'px';
}

//posicionPersonaje();

function posicionCoordenadaMapa(x,y){
    let C = coordenadasMapa();
    let newX = (C[0]-5)+x*45;
    let newY = (C[1]+11)+y*45;
    return [newX,newY];
}

function MuevePersonaje(x,y,IdPersonaje){
    let C = posicionCoordenadaMapa(x,y);
    let A = document.getElementById(IdPersonaje);
    A.style.left = (C[0])+'px'; //No se porque el menos 5 pero hay que ponerlo
    A.style.top = (C[1])+'px';
}

MuevePersonaje(4,4,'Liebre')