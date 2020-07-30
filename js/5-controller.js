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
});

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