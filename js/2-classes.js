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
