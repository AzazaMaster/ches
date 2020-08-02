document.addEventListener("mousedown", ( e ) => {
    tryToDrag( e );
    if( pieceCurrentlyHovered ) {
        pieceCurrentlyHovered.markup();
    }
});

document.addEventListener("mousemove", ( e ) => {
    imprintHoveredSquared( e );
    imprintHoveredPiece( e );

    if (pieceCurrentlyHovered) {    
        drawDraggedPiece( e );
        showPossibleAttack( e );
    }
});


document.addEventListener("mouseup", (e) => {
    if(pieceCurrentlyHovered != null) {
        validateMove();
        pieceCurrentlyHovered.dragged = false;
        tellegraphedAttackSquares = [{}];
        pieceCurrentlyHovered = null;
        possibleMoves = [];
        redraw();
    }
})

let imprintHoveredSquared = (e) => {
    hoveredSquare.x = Math.ceil(e.pageX / cellSize);
    hoveredSquare.y = Math.ceil(e.pageY / cellSize);
}

let tryToDrag = (e) => {
    pieceList.forEach((piece) => {
        if(piece.x === hoveredSquare.x && piece.y === hoveredSquare.y) {
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

let destroyPieceOnLanding = () => {
    pieceList.forEach((piece) => {
        if(piece !== pieceCurrentlyHovered) {
            if ( piece.x === pieceCurrentlyHovered.x && piece.y === pieceCurrentlyHovered.y ) {
                piece.destroy();
            }
        }
    })
}

let validateMove = () => {
    possibleMoves.forEach((move) => {
        if( (move.x === hoveredSquare.x) && (move.y === hoveredSquare.y) ) {
            pieceCurrentlyHovered.x = hoveredSquare.x;
            pieceCurrentlyHovered.y = hoveredSquare.y;

            destroyPieceOnLanding();
            pieceCurrentlyHovered.attack();
        }
    })
}

let showPossibleAttack = ( e ) => {
    //HERE???
    tellegraphedAttackSquares = [{}];

    possibleMoves.forEach(possibleSquare => {
        if ( hoveredSquare.x === possibleSquare.x && hoveredSquare.y === possibleSquare.y ) {
            pieceCurrentlyHovered.telegraphAttack(hoveredSquare.x, hoveredSquare.y);
        }
    })
}