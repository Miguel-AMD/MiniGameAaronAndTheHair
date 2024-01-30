function HTMLMapMaker (string, generateRabbitSpawn=true){
    const cellMap = {'s': 'Suelo', 'w': 'Muro', 'c': 'Cultivo', 'o': 'Suelo Spawn', 'r': 'Suelo RabbitSpawn'};

    //Pasamos el string a matriz para poder leer primero las columnas y despues las filas
    let Matriz = [];
    var rows = string.split('\n');
    //Counters
    let rowCounter = 0;
    let colCounterList = [];

    let row = 0;
    let column = 0;
    let spawnCoords = [];
    for (let r of rows){
        if (r.length === 0){continue;}
        rowCounter++;
        let col = r.split(' ');
        let Mrow = [];
        let colCounter = 0;
        for (let c of col){
            Mrow.push(c);
            colCounter++

            column++
            if (c === 'o'){spawnCoords.push(row); spawnCoords.push(column);}
        }
        Matriz.push(Mrow);
        colCounterList.push(colCounter);

        row++
        column*=0;
    }
    //Generamos el spawn del conejo si se nos pide.
    if (generateRabbitSpawn){
        let RabbitCoords = getRandomOppositeCoords(Matriz,spawnCoords[0],spawnCoords[1]);
        Matriz[RabbitCoords[0]][RabbitCoords[1]] = 'r';
        //console.log(spawnCoords,RabbitCoords);
    }
    
    //Comprobamos que la matriz es cuadrada.
    for (let cC of colCounterList){
        if (cC !== rowCounter){
            console.log(rowCounter, colCounterList);
            console.log('Mapa mal hecho');
            return undefined;
        }
    }
    //Leemos la matriz 
    let nfilas = Matriz.length;
    let ncolumnas = Matriz[0].length;
    /**/
    let npixelesCelda = 45;
    /**/
    let Mapa = document.getElementById('Mapa')
    Mapa.style['grid-template-columns'] = `repeat(${ncolumnas},${npixelesCelda}px)`
    Mapa.style['grid-template-rows'] = `repeat(${nfilas},${npixelesCelda}px)`
    Mapa.style['width'] = `${ncolumnas*npixelesCelda}px`
    Mapa.style['height'] = `${nfilas*npixelesCelda}px`
    
    for (let c=0; c<ncolumnas; c++){
        let ColumnaHTML = document.createElement('div');
        ColumnaHTML.className = 'Columna';
        for (let f=0; f<nfilas; f++){
            let cellType = Matriz[f][c];
            /**/
            let CeldaHTML = document.createElement('div');
            CeldaHTML.className = 'Celda '+ cellMap[cellType]
            ColumnaHTML.appendChild(CeldaHTML);
        }
        Mapa.appendChild(ColumnaHTML);
    }
    return Matriz;
}

function randomMapGenerator (squareSide=20){
    let finalString = ``;
    let colCounter = 0;
    const Values = ['s','w','c','o'];
    let contadorSpawn = 0;
    let contadorRabbitSpawn = 0;
    for (let c=0; c<squareSide*squareSide; c++){
        if (colCounter === squareSide){finalString+='\n'; colCounter*=0;}
        let randEl = getRandomElementFromList(Values)[1];
        if (randEl === 'o'){if (contadorSpawn>0){randEl = 's';}contadorSpawn++}
        if (randEl === 'r'){if (contadorRabbitSpawn>0){randEl = 's';}contadorRabbitSpawn++}
        if (colCounter === squareSide-1){finalString+=randEl;}
        else {finalString += randEl + ' '}
        colCounter++;
    }
    return finalString;
}

function getRandomElementFromList(arr){
    let index = Math.floor(Math.random()*arr.length)
    return [index,arr[index]];
}

function getRandomNumberInRange(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}


function getRandomOppositeCoords(arr,row,col){
    let nRows = arr.length;
    let nCols = arr[0].length;

    let newRowMin = nRows-row;
    let newColMin = nCols-col;
    let newRow;
    let newCol;

    if (newRowMin>nRows/2){newRow = getRandomNumberInRange(newRowMin-3,nRows-1);}
    else {newRow = getRandomNumberInRange(0,newRowMin);}

    if (newColMin>nCols/2){newCol = getRandomNumberInRange(newColMin-3,nCols-1);}
    else {newCol = getRandomNumberInRange(0,newColMin);}

    return [newRow,newCol];
}

const MapExample = `
s s s s s
c c w w r
c c w s s
s w w s c
o s s s s
`

HTMLMapMaker(randomMapGenerator(getRandomNumberInRange(5,20)));
//HTMLMapMaker(MapExample,false);

