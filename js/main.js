/*----- constants -----*/

//only in const for now, refactor to calculate based on changing grid eventually
let tLCorner = ['1'];
let tRCorner = ['10'];
let bLCorner = ['91'];
let bRCorner = ['100'];
let tEdge = ['2', '3', '4', '5', '6', '7', '8', '9']
let rEdge = ['20', '30', '40', '50', '60', '70', '80', '90']
let lEdge = ['11', '21', '31', '41', '51', '61', '71', '81']
let bEdge = ['92', '93', '94', '95', '96', '97', '98', '99']


/*----- app's state (variables) -----*/

let revealed;
let mines;
let proximous;
let zeros;
let ones;
let twos;
let threes;
let fours;
let fives;
let sixes;
let sevens;
let eights;

/*----- cached element references -----*/

//cache of cells for iteration in render
const cells = document.getElementById('board').childNodes;

/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', init);

/*----- functions -----*/
//-------------------------------------------------------------main functions here

init();

function handleClick (evt) {
    //only allow certain clicks
    if (revealed.includes(parseInt(evt.target.id)) || 
        evt.target.id === 'board' ) return;
    console.log(evt.target.id);

    //updates state
    revealed.push(parseInt(evt.target.id));
    
    render();
}

//---------------------------------------------------------secondary functions here
//any function that plugs directly into the clickHandler (as few as possible)
//ONLY RUNS ON INIT
function init () {
    //reset
    resetState();
    resetBoard();
    //build state
    getMines();
    getProximous();
    //display
    render();
}
//RUNS DURING GAMEPLAY
function render () {
    renderCells();
    //rendermessage
}
//---------------------------------------------------------------tertiary functions
//-----------------------------------------ONLY RUNS ON INIT

function resetState() {
    revealed = [];
    mines = [];
    proximous = [];
    zeros = [];
    ones = [];
    twos = [];
    threes = [];
    fours = [];
    fives = [];
    sixes = [];
    sevens = [];
    eights = [];
}
function resetBoard () {
    for (i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
}
function getMines () {
    //i<x x is how many mines to plant! later change based on diff selected
    for (i =1; i < 11; i++) {
        mines.push(getRandomInt(1, 100));
    }
}
//simply generates a random number for getMines fx above
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
//need to evaluate surrounding cells, if cell is on the edge, evaluate only actually adjacent,
//with varying dif, refactor to cal corners and edges on it's own, then run evaluations
function getProximous() {
    let counter = 0;
    for (i = 0; i < cells.length; i++) {
        if (mines.includes(parseInt(cells[i].id))) {
            return;
        } else if (tLCorner.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) + 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 11)) counter += 1;
            evalCounter(counter);
        } else if (tRCorner.includes(cells[i].id)) {
            //cells[i].innerHTML = 'C2';
        } else if (bLCorner.includes(cells[i].id)) {
            //cells[i].innerHTML = 'C3';
        } else if (bRCorner.includes(cells[i].id)) {
            //cells[i].innerHTML = 'C4';
        } else if (tEdge.includes(cells[i].id)) {
            //cells[i].innerHTML = 'TE';
        } else if (rEdge.includes(cells[i].id)) {
            //cells[i].innerHTML = 'RE';
        } else if (bEdge.includes(cells[i].id)) {
            //cells[i].innerHTML = 'BE';
        } else if (lEdge.includes(cells[i].id)) {
            //cells[i].innerHTML = 'LE';
        } else {
            //cells[i].innerHTML = 'mid';
        }
    }
}

function evalCounter (counter) {
    if (counter === 0) {
        zeros.push(parseInt(cells[i].id));
    } else if (counter === 1) {
            ones.push(parseInt(cells[i].id));
        } else if ( counter === 2) {
            twos.push(parseInt(cells[i].id));
        } else if (counter === 3) {
            threes.push(parseInt(cells[i].id));
        } else if (counter === 4) {
            fours.push(parseInt(cells[i].id));
        } else if (counter === 5) {
            fives.push(parseInt(cells[i].id));
        } else if (counter === 6) {
            sixes.push(parseInt(cells[i].id));
        } else if (counter === 7) {
            sevens.push(parseInt(cells[i].id));
        } else if (counter === 8) {
            eights.push(parseInt(cells[i].id));
        }
}
//----------------------------------------RUNS DURING GAMEPLAY

function renderCells () {
    //is it revealed?
    //if yes, check if it's a zero, 
    for (i = 0; i < cells.length; i++) {
        if (cells[i].nodeName.toLowerCase() === 'div' && mines.includes(parseInt(cells[i].id))) {
            cells[i].innerHTML = ('B');
        }
        // is it a zero? 
        // if yes, write code to reveal adjacents based on grid positoin, then call renderCells again.
    }
}




