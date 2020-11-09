/*----- constants -----*/



/*----- app's state (variables) -----*/



/*----- cached element references -----*/



/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleClick);
document.getElementById('reset').addEventListener('click', handleClick);

/*----- functions -----*/

//-------------------------------------------------------------main functions here

function handleClick (evt) {
    if (evt.target.id === 'board') return;
    if (evt.target.id === 'reset') init();
    console.log(evt.target.id);
}







//---------------------------------------------------------secondary functions here

function init () {
    console.log("Init isn't built yet!");
}

