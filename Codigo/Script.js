function HTMLMapMaker (string){
    const cellMap = {'s': 'Suelo', 'w': 'Muro', 'c': 'Cultivo'};

    //Pasamos el string a matriz para poder leer primero las columnas y despues las filas
    let Matriz = [];
    var rows = string.split('\n');
    //Counters
    let rowCounter = 0;
    let colCounterList = [];
    for (let r of rows){
        if (r.length === 0){continue;}
        rowCounter++;
        let col = r.split(' ');
        let Mrow = [];
        let colCounter = 0;
        for (let c of col){
            Mrow.push(c);
            colCounter++
        }
        Matriz.push(Mrow);
        colCounterList.push(colCounter);
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
    let Mapa = document.getElementById('Mapa')
    Mapa.style['grid-template-columns'] = `repeat(${ncolumnas},5vh)`
    Mapa.style['grid-template-rows'] = `repeat(${nfilas},5vh)`
    Mapa.style['width'] = `${nfilas*5}vh`
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
}

function randomMapGenerator (squareSide=20){
    let finalString = ``;
    let colCounter = 0;
    const Values = ['s','w','c'];
    for (let c=0; c<squareSide*squareSide; c++){
        if (colCounter === squareSide){finalString+='\n'; colCounter*=0;}
        let randEl = getRandomElementFromList(Values)[1];
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

const MapExample = `
s s s s s
c c w w s
c c w s s
s w w s c
s s s s s
`

HTMLMapMaker(randomMapGenerator(Math.floor(Math.random()*20)));

