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
