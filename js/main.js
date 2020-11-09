/*----- constants -----*/



/*----- app's state (variables) -----*/

let alreadyClicked = [];
let hiddenCells = [...Array(100).keys()];
let visibleCells = [];

/*----- cached element references -----*/



/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', handleClick);

/*----- functions -----*/
//-------------------------------------------------------------main functions here

function handleClick (evt) {
    //if this, bail (s)
    if (alreadyClicked.includes(evt.target.id))
        if (evt.target.id !== 'reset') return;
    if (evt.target.id === 'board') return;
    if (evt.target.id === 'reset') init();
    console.log(evt.target.id);
    alreadyClicked.push(evt.target.id);
}

//---------------------------------------------------------secondary functions here

function init () {
    console.log("Init is under construction!");
    //reset all state
    alreadyClicked = [];

    //set all to hidden
    hiddenCells = [...Array(100).keys()];
}

function renderBoard () {
    //set all to hidden
}

//---------------------------------------------------------------tertiary functions

function hideBoard () {
    console.log("hideBoard is under construction!");
}