document.addEventListener("mousedown", ( e ) => {
    tryToDrag( e );
    if( pieceCurrentlyHovered ) {
        pieceCurrentlyHovered.markup();
    }
});

document.addEventListener("mousemove", ( e ) => {
    imprintHoveredSquared( e );
    imprintHoveredPiece( e ); 
    drawDraggedPiece( e );
});


document.addEventListener("mouseup", (e) => {
    if(pieceCurrentlyHovered != null) {
        possibleMoves.forEach((move) => {
            if( (move.x === hoverSquare.x) && (move.y === hoverSquare.y) ) {
                pieceCurrentlyHovered.x = hoverSquare.x;
                pieceCurrentlyHovered.y = hoverSquare.y;
            }
        })
        pieceList.forEach((piece) => {
            if(piece !== pieceCurrentlyHovered) {
                if(piece.x === pieceCurrentlyHovered.x && piece.y === pieceCurrentlyHovered.y) {
                    let index = pieceList.indexOf(piece);
                    pieceList.splice(index, 1);
                }
            }
        })

        pieceCurrentlyHovered.attack();

        pieceCurrentlyHovered.dragged = false;
        pieceCurrentlyHovered = null;
        possibleMoves = [];

        redraw();
    }
})

let imprintHoveredSquared = (e) => {
    hoverSquare.x = Math.ceil(e.pageX / cellSize);
    hoverSquare.y = Math.ceil(e.pageY / cellSize);
}

let tryToDrag = (e) => {
    pieceList.forEach((piece) => {
        if(piece.x === hoverSquare.x && piece.y === hoverSquare.y) {
            index = pieceList.indexOf(piece);
            if(index >= 0) {
                pieceCurrentlyHovered = pieceList[index];
                pieceCurrentlyHovered.dragged = true;
            }
        }
    })
}

let imprintHoveredPiece = ( e ) => {
    pieceList.forEach((piece) => {
        //Dragging ✅
        if(piece.dragged === true) {
            redraw();
            ctx.drawImage(piece.img, e.pageX - cellSize / 2, e.pageY - cellSize / 2, cellSize, cellSize);
        }
    }) 
}

let drawDraggedPiece = ( e ) => {
    if ( pieceCurrentlyHovered ) {
        pieceCurrentlyHovered.dragged = true;
        redraw();
        ctx.drawImage(pieceCurrentlyHovered.img, e.pageX - cellSize / 2, e.pageY - cellSize / 2, cellSize, cellSize);
    }
}