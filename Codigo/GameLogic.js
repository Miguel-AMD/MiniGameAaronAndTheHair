import {HTMLMapMaker, randomMapGenerator, getRandomElementFromList, getRandomNumberInRange, MapExample, clearMap} from './Script.js';
import {muevePersonaje, posicionCoordenadaMapa, coordenadasMapa, getElementFromCoord} from './calculadoraCoords.js';


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GameRunner(){
    let self = this;
    //Necesitamos varias variables globales que nos permitan tener control de la puntuación
    self.nivelesSuperados = 0;
    self.temporizador = undefined;
    self.cultivosMuertos = 0;
    self.cultivosSalvados = 0;
    //Generamos el mapa
    self.mapa = undefined;
    self.genRandomMap = function(){
        let strMap = randomMapGenerator(getRandomNumberInRange(5,20));
        self.mapa = new Map(HTMLMapMaker(strMap,true));
        self.temporizador = 90;
        self.cultivosSalvados += self.mapa[3];
        return undefined;
    }
    
    //En mapa tenemos todos los datos y métodos relacionados con el mapa, la matriz, los puntos de spawn y el número de cultivos
    
    //Inicializamos los personajes.
    self.aaron = new Character('Aaron');
    self.liebre = new Character('Liebre');
    //
    

    //Definimos los atributos y procedimientos relacionados con el mapa.
    //Definimos la condición de colisión
    self.captureCheck = function(){
        let posA = self.aaron.getPosition();
        let posL = self.liebre.getPosition();
        let cond = posA[0] === posL[0] && posA[1] === posL[1];
        return cond;
    }
    self.wallCheck = function(row,col,movement){
        switch (movement){
            case 'up':
                if (self.limitPassedCheck(row-1,col)){return true};
                if (self.mapa.getCellType(row-1,col) === 'w'){return true;}
                return false;
                break;
            case 'down':
                if (self.limitPassedCheck(row+1,col)){return true};
                if (self.mapa.getCellType(row+1,col) === 'w'){return true;}
                return false;
                break;
            case 'left':
                if (self.limitPassedCheck(row,col-1)){return true};
                if (self.mapa.getCellType(row,col-1) === 'w'){return true;}
                return false;
                break;
            case 'right':
                if (self.limitPassedCheck(row,col+1)){return true};
                if (self.mapa.getCellType(row,col+1) === 'w'){return true;}
                return false;
                break;
        }
        
    }
    self.limitPassedCheck = function(row,col){
        let cond1 = row<0;
        let cond2 = col<0;
        let cond3 = row>self.mapa.getLimits()[0];
        let cond4 = col>self.mapa.getLimits()[1];
        return (cond1 || cond2 || cond3 || cond4);
    }
    // Los métodos referidos al movimiento de los personajes
    self.moveCharacter = function(character,dir){
        let characPos = character.getPosition();
        
        //Comprobamos que se puede mover
        if (!self.wallCheck(characPos[0],characPos[1],dir)){
            character.moveDir(dir);
        }
    }

    self.moveMainCharacter = function(e){
        let key=e.key;
        const keyMap = {
            'ArrowUp': 'up','w':'up',
            'ArrowDown': 'down','s': 'down',
            'ArrowLeft': 'left','a': 'left',
            'ArrowRight': 'right','d': 'right'
        };
        let dir = keyMap[key];
        self.moveCharacter(self.aaron,dir);
    }

    //Le ponemos un cooldown al movimiento del conejo
    self.staticRabbit = false;
    self.moveRabbit = function(){
        const moves = ['up','down','left','right'];
        let dir = getRandomElementFromList(moves)[1];
        self.moveCharacter(self.liebre,dir);
    }

    self.cropSteppedCheck = function(row,col){
        return self.mapa.getCellType(row,col) === 'c';
    }

    self.changeCropState = function(row,col){
        if (self.cropSteppedCheck(row,col)){
            let e = getElementFromCoord(row,col);
            e.className = 'Celda Suelo CultivoMuerto';
            self.cultivosMuertos++;
            self.cultivosSalvados--;
        }
    }

    self.finishCooldownRabbit = function(){self.staticRabbit = false;}
    self.updateTimeRabbit = 200;
    self.movementSteps = function(){
        if(!self.staticRabbit){
            self.moveRabbit();
            self.staticRabbit = true;
            setTimeout(self.finishCooldownRabbit,self.updateTimeRabbit);
            //50 ms para poder poner un intervalo de ejecución de 25ms
            //y poder capturar con ello la liebre sin mucho problema.
        };
        let aPos = self.aaron.getPosition();
        let rPos = self.liebre.getPosition();
        self.changeCropState(aPos[0],aPos[1]);
        self.changeCropState(rPos[0],rPos[1]);

        let captured = self.captureCheck();
        if (captured){
            self.nivelesSuperados++;
            sleep(1500);
            self.reloadGame();
        }
        return captured;
    }
    //Añadimos el temporizador
    self.timerSet = function(){
        self.temporizador--;
        let e = document.getElementById('PTimer');
        e.innerText = self.temporizador + '';
    }
    self.timerSteps = function(){
        let check = self.temporizador <= 0;
        if (check){
            let e = document.getElementById('FinJuego');
            e.style.visibility='visible';
            clearInterval(self.timerIdGame);
            clearInterval(self.timerIdTemporizador);
        }
        return check;}
    //Se reduce en uno cada segundo el contador de tiempo.
    

    //Añadimos una variable para comprobar si se debe salir o no del juego.
    self.outLoopCondition = false;
    self.stopGame = false;
    self.gameSteps = function(){
        self.outLoopCondition = self.movementSteps() || self.timerSteps();
        if (self.outLoopCondition){
            clearInterval(self.timerIdGame);
            clearInterval(self.timerIdTemporizador);
        }
    }
    self.updateTime = 50;
    
    self.runGameIter = function(){
        //Iniciamos el movimiento del personaje
        document.addEventListener('keydown',self.moveMainCharacter);
        self.genRandomMap();
        let aS = self.mapa.getCharacterSpawn();
        let rS = self.mapa.getRabbitSpawn();
        self.aaron.setPosition(aS[0],aS[1]);
        self.liebre.setPosition(rS[0],rS[1]);
        
        self.timerIdGame = setInterval(self.gameSteps,self.updateTime);
        self.timerIdTemporizador = setInterval(self.timerSet,1000);
    }

    self.reloadGame = function(){
        //clearInterval(self.timerIdTemporizador);
        //clearInterval(self.timerIdGame);
        sleep(1000);
        clearMap();
        self.updateScore();
        self.runGameIter();
    }

    self.updateScore = function(){
        let e = document.getElementById('PMapaNivel');
        e.innerText = self.nivelesSuperados + '';

        let e1 = document.getElementById('PNivel');
        let e2 = document.getElementById('PCultivosPerdidos');
        let e3 = document.getElementById('PCultivosSalvados');
        let e4 = document.getElementById('PLiebresCapturadas');

        e1.innerText = self.nivelesSuperados+'';
        e2.innerText = self.cultivosMuertos +'';
        e3.innerText = self.cultivosSalvados+'';
        e4.innerText = self.nivelesSuperados+'';
    }
}


function Map(mapData){
    let self = this;
    self.mapData = mapData;
    
    self.getCellType = function(row,col){return self.mapData[0][row][col];}
    self.getCharacterSpawn = function(){return self.mapData[1];}
    self.getRabbitSpawn = function(){return self.mapData[2];}
    self.getTotalCrops = function(){return self.mapData[3];}
    self.getLimits = function(){return [self.mapData[0].length-1, self.mapData[0][0].length-1];}
    self.getRowLimit = function(){self.getLimits()[0];}
    self.getColLimit = function(){self.getLimits()[1];}
}


function Character(name){
    let self = this;
    self.name=name;
    self.row=0;
    self.col=0;
    self.stepsCounter = 0;
    self.setPosition = function(row,col){self.row=row; self.col=col; self.mueveSprite(self.row,self.col);}
    self.moveUp = function(){self.row--; self.mueveSprite(self.row,self.col);}
    self.moveDown = function(){self.row++; self.mueveSprite(self.row,self.col);}
    self.moveLeft = function(){self.col--; self.mueveSprite(self.row,self.col);}
    self.moveRight = function(){self.col++; self.mueveSprite(self.row,self.col);}
    self.getPosition = function(){return [self.row,self.col];}
    self.mueveSprite = function(newRow,newCol){muevePersonaje(newRow,newCol,self.name);}
    self.moveDir = function(dir){
        switch (dir){
            case 'up':
                self.moveUp();
                break;
            case 'down':
                self.moveDown();
                break;
            case 'left':
                self.moveLeft();
                break;
            case 'right':
                self.moveRight();
                break;
        }
        self.stepsCounter++;
    }
    self.getSteps = function(){return self.stepsCounter;}
}




function startGameKey(key){
    if (key === 'ArrowUp'){game.runIter();}
}

function runGame(){
    const game = new GameRunner();
    game.reloadGame();
}

runGame();