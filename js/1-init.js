const canvas = document.getElementById('canvas');
canvas.height = canvas.width = 520;
let cellSize = canvas.width / 8;
var ctx = canvas.getContext("2d");

let pieceList = [];
let possibleMoves = [{}];
let tellegraphedAttackSquares = [{}];

let pieceCurrentlyHovered;
let hoveredSquare = {
    x: null,
    y: null
}

//Init
setTimeout(() => {
    redraw();
    console.log("Game started");
}, 100);