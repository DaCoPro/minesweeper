/*----- constants -----*/



/*----- app's state (variables) -----*/

let alreadyClicked;
let mines;
let proximous;

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
//resets gameplay
function init () {
    resetState();
    plantMines();
    render();
}
//during gameplay
function render () {
    renderCells();
}
//---------------------------------------------------------------tertiary functions
//-----------------------------------------ONLY RUNS ON INIT

function resetState() {
    alreadyClicked = [];
    mines = [];
}

function plantMines () {
    //i<x x is how many mines to plant! later change based on diff selected
    for (i =1; i < 11; i++) {
        mines.push(getRandomInt(1, 100));
    }
    console.log(mines);
}

//simply generates a random number for plantMines fx above
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

//----------------------------------------RUNS DURING GAMEPLAY
function renderCells () {
    //resets the html at each click
    for (i = 0; i < cells.length; i++) {
        cells[i].innerHTML = '';
    }
    for (i = 0; i < cells.length; i++) {
        //need to also preclude mines from showing on hidden squares && alreadyClicked.includes(parseInt(cells[i].id))
        if (cells[i].nodeName.toLowerCase() === 'div' && mines.includes(parseInt(cells[i].id))) {
            cells[i].innerHTML = ('B');
        }
        // if statement here covering proximity vals
        // include here render for 
    }
}




