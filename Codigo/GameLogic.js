import {HTMLMapMaker, randomMapGenerator, getRandomElementFromList} from './Script.js';
import {MuevePersonaje, posicionCoordenadaMapa, coordenadasMapa, getElementFromCoord} from './calculadoraCoords.js';

function GameRunner(){
    //Necesitamos varias variables globales que nos permitan tener control de la puntuación
    this.nivelesSuperados = 0;
    this.temporizadorInicial = 300;
    this.cultivosMuertos = 0;
    this.cultivosSalvados = 0;
    //Generamos el mapa
    this.strMap = randomMapGenerator(getRandomNumberInRange(5,20));
    this.mapa = Map(strMap);
    //En mapa tenemos todos los datos y métodos relacionados con el mapa, la matriz, los puntos de spawn y el número de cultivos
    
    //Inicializamos los personajes.
    this.aaron = Character('Aaron');
    this.liebre = Character('Liebre');
    //


    //Definimos los atributos y procedimientos relacionados con el mapa.
    //Definimos la condición de colisión
    this.captureCheck = function(){
        let posA = this.aaron.getPosition();
        let posL = this.liebre.getPosition();
        return posA[0] === posL[0] && posA[1] === posL[1]
    }
    this.wallCheck = function(x,y,movement){
        switch (movement){
            case 'up':
                return (this.mapa.getCellType(x,y-1) === 'w' || this.limitPassedCheck(x,y-1));
            case 'down':
                return (this.mapa.getCellType(x,y+1) === 'w' || this.limitPassedCheck(x,y+1));
            case 'left':
                return (this.mapa.getCellType(x-1,y) === 'w' || this.limitPassedCheck(x-1,y));
            case 'right':
                return (this.mapa.getCellType(x+1,y) === 'w' || this.limitPassedCheck(x+1,y));
        }
    }
    this.limitPassedCheck = function(x,y){
        let cond1 = x<0;
        let cond2 = y<0;
        let cond3 = x>this.mapa.getXLimit();
        let cond4 = y>this.mapa.getYLimit();
        return (cond1 || cond2 || cond3 || cond4);
    }

    this.moveCharacter = function(character,dir){
        let characPos = character.getPosition();
        //Comprobamos que se puede mover
        if (!this.wallCheck(characPos[0],characPos[1]),dir){
            character.moveDir(dir);
        }
    }

    this.moveMainCharacter = function(key){
        const keyMap = {
            'ArrowUp': 'up','w':'up',
            'ArrowDown': 'down','s': 'down',
            'ArrowLeft': 'left','a': 'left',
            'ArrowRight': 'right','d': 'right'
        };
        let dir = keyMap[key];
        this.moveCharacter(this.aaron,dir);
    }

    this.moveRabbit = function(){
        const moves = ['up','down','left','right'];
        let dir = getRandomElementFromList(moves);
        this.moveCharacter(this.liebre,dir);
    }

    this.cropSteppedCheck = function(x,y){
        return this.mapa.getCellType(x,y) === 'c';
    }

    this.changeCropState = function(x,y){
        let e = getElementFromCoord(x,y);
        e.style.className = 'CultivoMuerto';
    }

    this.movementSteps = function(){
        document.addEventListener('keydown',this.moveMainCharacter);
        this.moveRabbit();
        let aPos = this.aaron.getPosition();
        let rPos = this.liebre.getPosition();

        return this.captureCheck();
    }
}




function Map(strMap){
    this.mapData = HTMLMapMaker(strMap);
    this.getCellType = function(row,col){return this.mapData[0][row][col];}
    this.getCharacterSpawn = function(){return this.mapData[1];}
    this.getRabbitSpawn = function(){return this.mapData[2];}
    this.getTotalCrops = function(){return this.mapData[3];}
    this.getLimits = function(){return [this.mapData[0].length-1, this.mapData[0][0].length-1];}
    this.getXLimit = function(){this.getLimits()[0];}
    this.getYLimit = function(){this.getLimits()[1];}
}


function Character(name){
    this.name=name;
    this.x=0;
    this.y=0;
    this.setPosition = function(x,y){this.x=x; this.y=y;}
    this.moveUp = function(){this.y--; this.mueveSprite(this.x,this.y);}
    this.moveDown = function(){this.y++; this.mueveSprite(this.x,this.y);}
    this.moveLeft = function(){this.x--; this.mueveSprite(this.x,this.y);}
    this.moveRight = function(){this.x++; this.mueveSprite(this.x,this.y);}
    this.getPosition = function(){return [this.x,this.y];}
    this.mueveSprite = function(newX,newY){this.muevePersonaje(newX,newY,this.name);}
    this.moveDir = function(dir){
        switch (dir){
            case 'up':
                this.moveUp();
            case 'down':
                this.moveDown();
            case 'left':
                this.moveLeft();
            case 'right':
                this.moveRight();
        }
    }
}
