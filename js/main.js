/*----- constants -----*/

let tLCorner = ['1'];
let tRCorner = ['10'];
let bLCorner = ['91'];
let bRCorner = ['100'];
let tEdge = ['2', '3', '4', '5', '6', '7', '8', '9']
let rEdge = ['20', '30', '40', '50', '60', '70', '80', '90']
let lEdge = ['11', '21', '31', '41', '51', '61', '71', '81']
let bEdge = ['92', '93', '94', '95', '96', '97', '98', '99']

/*----- app's state (variables) -----*/

let gameStatus;
let revealed;
let revealedZeros;
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
const cells = document.getElementById('board').children;
const msg = document.getElementById('msg');


/*----- event listeners -----*/

document.getElementById('board').addEventListener('click', handleClick);
document.getElementById('board').addEventListener('contextmenu', handleRightClick);
document.getElementById('reset').addEventListener('click', init);

/*----- functions -----*/
//-------------------------------------------------------------main functions here

init();

function handleClick (evt) {
    if (revealed.includes(parseInt(evt.target.id)) || 
        evt.target.id === 'board' || gameStatus !== null || evt.target.classList.contains('1')) return;
    revealed.push(parseInt(evt.target.id));
    if (zeros.includes(parseInt(evt.target.id))) {
        revealedZeros.push(parseInt(evt.target.id));
    }
    for (i = 0; i < 20; i ++) {
       floodZeros();
    }
    checkWin();
    
    render();
}

function handleRightClick (evt) {
    if (revealed.includes(parseInt(evt.target.id)) || 
        evt.target.id === 'board' || gameStatus !== null) {
            return;
        } else if (evt.target.innerHTML === '') {
            evt.target.innerHTML = '🎁';
        } else if (evt.target.innerHTML !== '') {
            evt.target.innerHTML = ''
        }
}

//---------------------------------------------------------secondary functions here

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

function render () {
    renderCells();
    renderMessage();
    renderWin();
    renderLoss();
}

//---------------------------------------------------------------tertiary functions
//-----------------------------------------ONLY RUNS ON INIT

function resetState() {
    
    gameStatus = null;
    revealed = [];
    revealedZeros = [];
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
        cells[i].style.backgroundColor = '#A4D04F';
    }
}

function getMines () {
    for (i =1; i < 25; i++) {
        mines.push(getRandomInt(1, 100));
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getProximous() {
    let counter = 0;
    for (i = 0; i < cells.length; i++) {
        if (mines.includes(parseInt(cells[i].id))) {
        } else if (tLCorner.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) + 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 11)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else if (tRCorner.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) - 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 9)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 10)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else if (bLCorner.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) - 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 9)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 1)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else if (bRCorner.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) - 11)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 1)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else if (tEdge.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) - 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 9)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 11)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else if (rEdge.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) - 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 11)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 9)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else if (bEdge.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) - 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) -10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) -11)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 9)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else if (lEdge.includes(cells[i].id)) {
            if (mines.includes(parseInt(cells[i].id) - 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 9)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 11)) counter += 1;
            evalCounter(counter);
            counter = 0;
        } else {
            if (mines.includes(parseInt(cells[i].id) - 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 9)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 11)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 10)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) + 9)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 1)) counter += 1;
            if (mines.includes(parseInt(cells[i].id) - 11)) counter += 1;
            evalCounter(counter);
            counter = 0;
        }
    }
}
//        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//        supports getProx to reduce redundancy
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

function renderMessage () {
    if (gameStatus === null) {
        msg.innerHTML = "Watch Your Step!!!"
    } else if ( gameStatus === 'W') {
        msg.innerHTML = "That's All of 'Em!"
    } else if ( gameStatus === 'L') {
        msg.innerHTML = 'BOOOOM!'
    }
}

function checkWin () {
    mines.forEach(function(mine) {
        if (revealed.includes(mine)) {
            gameStatus = 'L';
        }
    });
    if (revealed.length + mines.length === cells.length + 4) {
        gameStatus = 'W';
    } 
}

function renderWin () {
    if (gameStatus === 'W') {
        for (i = 0; i < cells.length; i++) {
            if (mines.includes(parseInt(cells[i].id))) {
                cells[i].style.backgroundColor = 'green';
                cells[i].innerHTML = '💣';
            }
        }
    }
}

function renderLoss() {
    if (gameStatus === 'L') {
        for (i = 0; i < cells.length; i++) {
            if (mines.includes(parseInt(cells[i].id))) {
                cells[i].style.backgroundColor = 'red';
                cells[i].innerHTML = '💥';
            }
        }
    }
}

function renderCells () {
    for (i = 0; i < cells.length; i++) {
        if (mines.includes(parseInt(cells[i].id )) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = ('B');
            cells[i].style.backgroundColor = 'red';
        } else if (ones.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '1';
            cells[i].style.backgroundColor = 'white';
        } else if (twos.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '2';
            cells[i].style.backgroundColor = 'white';
        } else if (threes.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '3';
            cells[i].style.backgroundColor = 'white';
        } else if (fours.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '4';
            cells[i].style.backgroundColor = 'white';
        } else if (fives.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '5';
            cells[i].style.backgroundColor = 'white';
        } else if (sixes.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '6';
            cells[i].style.backgroundColor = 'white';
        } else if (sevens.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '7';
            cells[i].style.backgroundColor = 'white';
        } else if (eights.includes(parseInt(cells[i].id)) 
            && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].innerHTML = '8';
            cells[i].style.backgroundColor = 'white';
        } else if (zeros.includes(parseInt(cells[i].id)) 
        && revealed.includes(parseInt(cells[i].id ))) {
            cells[i].style.backgroundColor = 'white';
        }
    }
}

function floodZeros () {
    revealedZeros.forEach(function(zCell) {
        if (tLCorner.includes(zCell.toString())) {
            if (revealed.includes(zCell + 1)) {
            } else {
                revealed.push(zCell + 1);
                if (zeros.includes(zCell + 1)) {
                    revealedZeros.push(zCell + 1);
                }
            }
            if (revealed.includes(zCell +10)) {
            } else {
                revealed.push(zCell + 10);
                if (zeros.includes(zCell + 10)) {
                    revealedZeros.push(zCell + 10);
                }
            }
            if (revealed.includes(zCell +11)) {
            } else {
                revealed.push(zCell + 11);
                if (zeros.includes(zCell + 11)) {
                    revealedZeros.push(zCell + 11);
                }
            }
        } else if (tRCorner.includes(zCell.toString())) {
            if (revealed.includes(zCell - 1)) {
            } else {
                revealed.push(zCell - 1);
                if (zeros.includes(zCell - 1)) {
                    revealedZeros.push(zCell - 1);
                }
            }
            if (revealed.includes(zCell + 9)) {
            } else {
                revealed.push(zCell + 9);
                if (zeros.includes(zCell + 9)) {
                    revealedZeros.push(zCell + 9);
                }
            }
            if (revealed.includes(zCell + 10)) {
            } else {
                revealed.push(zCell + 10);
                if (zeros.includes(zCell + 10)) {
                    revealedZeros.push(zCell + 10);
                }
            }
        } else if (bLCorner.includes(zCell.toString())) {
            if (revealed.includes(zCell - 10)) {
            } else {
                revealed.push(zCell - 10);
                if (zeros.includes(zCell - 10)) {
                    revealedZeros.push(zCell - 10);
                }
            }
            if (revealed.includes(zCell - 9)) {
            } else {
                revealed.push(zCell - 9);
                if (zeros.includes(zCell - 9)) {
                    revealedZeros.push(zCell - 9);
                }
            }
            if (revealed.includes(zCell + 1)) {
            } else {
                revealed.push(zCell + 1);
                if (zeros.includes(zCell + 1)) {
                    revealedZeros.push(zCell + 1);
                }
            }
        } else if (bRCorner.includes(zCell.toString())) {
            if (revealed.includes(zCell - 11)) {
            } else {
                revealed.push(zCell - 11);
                if (zeros.includes(zCell - 11)) {
                    revealedZeros.push(zCell - 11);
                }
            }
            if (revealed.includes(zCell - 10)) {
            } else {
                revealed.push(zCell - 10);
                if (zeros.includes(zCell - 10)) {
                    revealedZeros.push(zCell - 10);
                }
            }
            if (revealed.includes(zCell - 1)) {
            } else {
                revealed.push(zCell - 1);
                if (zeros.includes(zCell - 1)) {
                    revealedZeros.push(zCell - 1);
                }
            }
        } else if (tEdge.includes(zCell.toString())) {
            if (revealed.includes(zCell - 1)) {
            } else {
                revealed.push(zCell - 1);
                if (zeros.includes(zCell - 1)) {
                    revealedZeros.push(zCell - 1);
                }
            }
            if (revealed.includes(zCell + 1)) {
            } else {
                revealed.push(zCell + 1);
                if (zeros.includes(zCell + 1)) {
                    revealedZeros.push(zCell + 1);
                }
            }
            if (revealed.includes(zCell + 9)) {
            } else {
                revealed.push(zCell + 9);
                if (zeros.includes(zCell + 9)) {
                    revealedZeros.push(zCell + 9);
                }
            }
            if (revealed.includes(zCell + 10)) {
            } else {
                revealed.push(zCell + 10);
                if (zeros.includes(zCell + 10)) {
                    revealedZeros.push(zCell + 10);
                }
            }
            if (revealed.includes(zCell + 11)) {
            } else {
                revealed.push(zCell + 11);
                if (zeros.includes(zCell + 11)) {
                    revealedZeros.push(zCell + 11);
                }
            }
        } else if (rEdge.includes(zCell.toString())) {
            if (revealed.includes(zCell - 10)) {
            } else {
                revealed.push(zCell - 10);
                if (zeros.includes(zCell - 10)) {
                    revealedZeros.push(zCell - 10);
                }
            }
            if (revealed.includes(zCell - 11)) {
            } else {
                revealed.push(zCell - 11);
                if (zeros.includes(zCell - 11)) {
                    revealedZeros.push(zCell - 11);
                }
            }
            if (revealed.includes(zCell - 1)) {
            } else {
                revealed.push(zCell - 1);
                if (zeros.includes(zCell - 1)) {
                    revealedZeros.push(zCell - 1);
                }
            }
            if (revealed.includes(zCell + 10)) {
            } else {
                revealed.push(zCell + 10);
                if (zeros.includes(zCell + 10)) {
                    revealedZeros.push(zCell + 10);
                }
            }
            if (revealed.includes(zCell + 9)) {
            } else {
                revealed.push(zCell + 9);
                if (zeros.includes(zCell + 9)) {
                    revealedZeros.push(zCell + 9);
                }
            }
        } else if (bEdge.includes(zCell.toString())) {
            if (revealed.includes(zCell - 1)) {
            } else {
                revealed.push(zCell - 1);
                if (zeros.includes(zCell - 1)) {
                    revealedZeros.push(zCell - 1);
                }
            }
            if (revealed.includes(zCell + 1)) {
            } else {
                revealed.push(zCell + 1);
                if (zeros.includes(zCell + 1)) {
                    revealedZeros.push(zCell + 1);
                }
            }
            if (revealed.includes(zCell - 10)) {
            } else {
                revealed.push(zCell - 10);
                if (zeros.includes(zCell - 10)) {
                    revealedZeros.push(zCell - 10);
                }
            }
            if (revealed.includes(zCell - 11)) {
            } else {
                revealed.push(zCell - 11);
                if (zeros.includes(zCell - 11)) {
                    revealedZeros.push(zCell - 11);
                }
            }
            if (revealed.includes(zCell - 9)) {
            } else {
                revealed.push(zCell - 9);
                if (zeros.includes(zCell - 9)) {
                    revealedZeros.push(zCell - 9);
                }
            }
        } else if (lEdge.includes(zCell.toString())) {
            if (revealed.includes(zCell - 10)) {
            } else {
                revealed.push(zCell - 10);
                if (zeros.includes(zCell - 10)) {
                    revealedZeros.push(zCell - 10);
                }
            }
            if (revealed.includes(zCell - 9)) {
            } else {
                revealed.push(zCell - 9);
                if (zeros.includes(zCell - 9)) {
                    revealedZeros.push(zCell - 9);
                }
            }
            if (revealed.includes(zCell + 1)) {
            } else {
                revealed.push(zCell + 1);
                if (zeros.includes(zCell + 1)) {
                    revealedZeros.push(zCell + 1);
                }
            }
            if (revealed.includes(zCell + 10)) {
            } else {
                revealed.push(zCell + 10);
                if (zeros.includes(zCell + 10)) {
                    revealedZeros.push(zCell + 10);
                }
            }
            if (revealed.includes(zCell + 11)) {
            } else {
                revealed.push(zCell + 11);
                if (zeros.includes(zCell + 11)) {
                    revealedZeros.push(zCell + 11);
                }
            }
        } else {
            if (revealed.includes(zCell - 10)) {
            } else {
                revealed.push(zCell - 10);
                if (zeros.includes(zCell - 10)) {
                    revealedZeros.push(zCell - 10);
                }
            }
            if (revealed.includes(zCell - 9)) {
            } else {
                revealed.push(zCell - 9);
                if (zeros.includes(zCell - 9)) {
                    revealedZeros.push(zCell - 9);
                }
            }
            if (revealed.includes(zCell + 1)) {
            } else {
                revealed.push(zCell + 1);
                if (zeros.includes(zCell + 1)) {
                    revealedZeros.push(zCell + 1);
                }
            }
            if (revealed.includes(zCell + 11)) {
            } else {
                revealed.push(zCell + 11);
                if (zeros.includes(zCell + 11)) {
                    revealedZeros.push(zCell + 11);
                }
            }
            if (revealed.includes(zCell + 10)) {
            } else {
                revealed.push(zCell + 10);
                if (zeros.includes(zCell + 10)) {
                    revealedZeros.push(zCell + 10);
                }
            }
            if (revealed.includes(zCell + 9)) {
            } else {
                revealed.push(zCell + 9);
                if (zeros.includes(zCell + 9)) {
                    revealedZeros.push(zCell + 9);
                }
            }
            if (revealed.includes(zCell - 1)) {
            } else {
                revealed.push(zCell - 1);
                if (zeros.includes(zCell - 1)) {
                    revealedZeros.push(zCell - 1);
                }
            }
            if (revealed.includes(zCell - 11)) {
            } else {
                revealed.push(zCell - 11);
                if (zeros.includes(zCell - 11)) {
                    revealedZeros.push(zCell - 11);
                }
            }
        }
    })
    
}