const canvas = document.getElementById('canvas');
canvas.height = canvas.width = 520;
let cellSize = canvas.width / 8;
var ctx = canvas.getContext("2d");

let pieceList = [];
let markerImage = {};
markerImage.img = document.createElement("img");
markerImage.img.src = "marker.svg";
let possibleMoves = [{}];

class Piece {
    constructor(startingPositionX, startingPositionY, type, color) {
        this.type = type;
        this.dragged = false;
        this.img = document.createElement("img");
        this.img.src = `${color}${type}.svg`;
        this.x = startingPositionX;
        this.y = startingPositionY;
        this.health = 4
    }
    destroy() {
        index = pieceList.indexOf(this);
        pieceList.splice(index, 1);
    }
}

class Rook extends Piece {
    constructor(startingPositionX, startingPositionY, color) {
        super(startingPositionX, startingPositionY, "Rook", color);
    }
    markup() {
        let xx = this.x;
        let yy = this.y;
        for (let i = 1; i <= 8; i++) {
            for (let j = 1; j <= 8; j++) {
                if ( !(i === xx && j === yy) ) {
                    if( i === xx || j === yy ) {
                        possibleMoves.push({
                            x: i, 
                            y: j,
                        });
                    }
                }
            }
        }
    }
    attack() {
        let xx = this.x;
        // let yy = this.y;
        pieceList.forEach((piece) => {
            if(piece.x === xx - 1) {
                piece.health = piece.health - 1;
            }
        })
    }
}

class Horse extends Piece {
    constructor(startingPositionX, startingPositionY, color) {
        super(startingPositionX, startingPositionY, "Horse", color);
    }
    markup() {
        let xx = this.x;
        let yy = this.y;
        for(let i = -2; i <= 2; i++) {
            if (i === 0) {

            } else if (i%2 === 0) {
                possibleMoves.push({ x: xx+i, y: yy+(i/2) });
                possibleMoves.push({ x: xx+i, y: yy-(i/2) });
            } else if (i%2 !== 0) {
                possibleMoves.push({ x: xx+i, y: yy+(i*2) });
                possibleMoves.push({ x: xx+i, y: yy-(i*2) });
            }
        }
    }
    attack() {

    }
}

pieceList[pieceList.length] = new Rook(1, 1, "white");
pieceList[pieceList.length] = new Rook(5, 1, "white");
pieceList[pieceList.length] = new Rook(7, 1, "white");

pieceList[pieceList.length] = new Horse(2, 8, "black");
pieceList[pieceList.length] = new Horse(4, 8, "black");
pieceList[pieceList.length] = new Horse(6, 8, "black");

let redraw = () => {
    // Draw background
    ctx.fillStyle = "blanchedalmond";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Draw a grid
    ctx.lineWidth = 1;
    ctx.strokeStyle = "black";
    // vertical
    for (let i = 1; i <= 7; i++) {
        ctx.beginPath();
        ctx.moveTo(0, cellSize * i);
        ctx.lineTo(canvas.width, cellSize * i);
        ctx.stroke();
    }
    //horizontal
    for (let i = 1; i <= 7; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.floor(cellSize * i), 0);
        ctx.lineTo(Math.floor(cellSize * i), canvas.width);
        ctx.stroke();
    }

    pieceList.forEach((piece) => {
        if (piece.health <= 0) {
            piece.destroy();
        }
    });
    
    pieceList.forEach((piece) => {
        if (piece.dragged != true) {
            let absX = piece.x * cellSize;
            let absY = piece.y * cellSize;
            ctx.drawImage(piece.img, absX - cellSize, absY - cellSize, cellSize, cellSize);

            //HEALTH
            for(let health = 1; health <= piece.health; health++) {
                ctx.fillStyle = "Tomato";
                ctx.fillRect(absX - cellSize + 2 + 12 * (health - 1), absY - cellSize + 2, 10, 5);
                ctx.fill();
            }
        }
    });

    possibleMoves.forEach((marker) => {
        ctx.drawImage(markerImage.img, marker.x * cellSize - cellSize, marker.y * cellSize - cellSize, cellSize, cellSize);
    });

    
}
//Init
setTimeout(() => {
    redraw();
}, 100);



//CONTROLLER
let dragged = false;
let currentHover;
let currentCellX;
let currentCellY;

let tryToDrag = (e) => {
    pieceList.forEach((piece) => {
        if(piece.x === currentCellX && piece.y === currentCellY) {
            index = pieceList.indexOf(piece);
            if(index >= 0) {
                currentHover = pieceList[index];
                currentHover.markup();
                redraw();
            }
        }
    })

}


document.addEventListener("mousedown", (e) => {
    tryToDrag(e);
})


//current cell
document.addEventListener("mousemove", (e) => {
    //Find out what cell is cursor in
    currentCellX = Math.ceil(e.pageX / cellSize);
    currentCellY = Math.ceil(e.pageY / cellSize);

    if (currentHover) {
        currentHover.dragged = true;
        redraw();
        ctx.drawImage(currentHover.img, e.pageX - cellSize / 2, e.pageY - cellSize / 2, cellSize, cellSize);
    }

    //Find out what piece is hovered
    pieceList.forEach((piece) => {
        //Dragging ✅
        if(piece.dragged === true) {
            redraw();
            ctx.drawImage(piece.img, e.pageX - cellSize / 2, e.pageY - cellSize / 2, cellSize, cellSize);
        }
    })    
})


document.addEventListener("mouseup", (e) => {
    if(currentHover != null) {
        possibleMoves.forEach((move) => {
            if( (move.x === currentCellX) && (move.y === currentCellY) ) {
                currentHover.x = currentCellX;
                currentHover.y = currentCellY;
            }
        })
        pieceList.forEach((piece) => {
            if(piece !== currentHover) {
                if(piece.x === currentHover.x && piece.y === currentHover.y) {
                    let index = pieceList.indexOf(piece);
                    pieceList.splice(index, 1);
                }
            }
        })

        currentHover.attack();

        currentHover.dragged = false;
        currentHover = null;
        possibleMoves = [];

        redraw();
    }

    //Winning screen
    if(pieceList.length <= 1) {
        console.log("You win!✨✨✨");
    }
})