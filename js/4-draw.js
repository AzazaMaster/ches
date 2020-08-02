let redraw = () => {
    drawGrid();
    destroyDead();
    drawStaticPieces();
    drawMarkers();
    drawTelegraphedAttack();

    triggerWin();
}

let drawGrid = () => {
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
}

let destroyDead = () => {
    let indices = [];

    //find out # of those, who are dead
    pieceList.forEach((piece) => {
        if (piece.health <= 0) {
            indices.push( pieceList.indexOf( piece ) );
        }
    });

    //destroy them from the array backwards
    indices.slice().reverse().forEach(index => {
        pieceList[index].destroy();
    });
}

let drawStaticPieces = () => {
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
}

let drawMarkers = () => {
    possibleMoves.forEach((marker) => {
        ctx.fillStyle = "rgba(255, 187, 0, .5)";
        ctx.fillRect(marker.x * cellSize - cellSize, marker.y * cellSize - cellSize, cellSize, cellSize);
    })
}

let triggerWin = () => {
    if( pieceList.length === 1 ) {
        console.log("You win!!✨✨✨");
    } else if ( pieceList.length <= 0 ) {
        console.log("It's a draw");
    }
}

let drawTelegraphedAttack = () => {
    tellegraphedAttackSquares.forEach(attack => {
        ctx.fillStyle = "rgba(255, 38, 0, .5)";
        ctx.fillRect(attack.x * cellSize - cellSize / 1.3, attack.y * cellSize - cellSize / 1.3, cellSize / 2, cellSize / 2);
    })
}