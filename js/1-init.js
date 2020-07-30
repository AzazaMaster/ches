console.log("started");

const canvas = document.getElementById('canvas');
canvas.height = canvas.width = 520;
let cellSize = canvas.width / 8;
var ctx = canvas.getContext("2d");

let pieceList = [];
let markerImage = {};
markerImage.img = document.createElement("img");
markerImage.img.src = "marker.svg";
let possibleMoves = [{}];

//Init
setTimeout(() => {
    redraw();
}, 100);