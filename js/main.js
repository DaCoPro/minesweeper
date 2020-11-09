/*----- constants -----*/

//only in const for now, refactor to calculate based on changing grid eventually
let corners = ['1', '10', '91', '100']
let tEdge = ['2', '3', '4', '5', '6', '7', '8', '9']
let rEdge = ['20', '30', '40', '50', '60', '70', '80', '90']
let lEdge = ['11', '21', '31', '41', '51', '61', '71', '81']
let bEdge = ['92', '93', '94', '95', '96', '97', '98', '99']


/*----- app's state (variables) -----*/

let alreadyClicked;
let mines;
let proximous;
let empties;


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
    if (alreadyClicked.includes(parseInt(evt.target.id)) || 
        evt.target.id === 'board' ) return;
    console.log(evt.target.id);

    //updates state
    alreadyClicked.push(parseInt(evt.target.id));
    
    render();
}

//---------------------------------------------------------secondary functions here
//any function that plugs directly into the clickHandler (as few as possible)
//ONLY RUNS ON INIT
function init () {
    resetState();
    resetBoard();
    getMines();
    getProximous();
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
    alreadyClicked = [];
    mines = [];
    proximous = [];
    empties = [];
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
    console.log(mines);
}
//simply generates a random number for getMines fx above
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//need to evaluate surrounding cells, if cell is on the edge, evaluate only actually adjacent,
//with varying dif, refactor to cal corners and edges on it's own, then run evaluations
function getProximous(cell) {
    for (i = 0; i < cells.length; i++) {
        //corner cases
        if (cells[i].id === "1") {
            //cells[i].innerHTML = 'C1';
        } else if (cells[i].id === '10') {
            //cells[i].innerHTML = 'C2';
        } else if (cells[i].id === '91') {
            //cells[i].innerHTML = 'C3';
        } else if (cells[i].id === '100') {
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

//----------------------------------------RUNS DURING GAMEPLAY
function renderCells () {
    //resets the html at each click
    for (i = 0; i < cells.length; i++) {
        //need to also preclude mines from showing on hidden squares && alreadyClicked.includes(parseInt(cells[i].id))
        if (cells[i].nodeName.toLowerCase() === 'div' && mines.includes(parseInt(cells[i].id))) {
            cells[i].innerHTML = ('B');
        }
        // if statement here covering proximity vals
        // include here render for 
    }
}




