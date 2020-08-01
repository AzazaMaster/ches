class Piece {
    constructor(startingPositionX, startingPositionY, type, color) {
        this.type = type;
        this.dragged = false;
        this.img = document.createElement("img");
        this.img.src = `assets/${color}/${type}.svg`;
        this.x = startingPositionX;
        this.y = startingPositionY;
        this.health = 4;
    }
    destroy() {
        index = pieceList.indexOf(this);
        pieceList.splice(index, 1);
    }
}

class LaserBot extends Piece {
    constructor(startingPositionX, startingPositionY, color) {
        super(startingPositionX, startingPositionY, "laserBot", color);
        this.health = 2;
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
        pieceList.forEach((piece) => {
            if(piece.x === xx - 1) {
                piece.health = piece.health - 1;
            }
        })
    }
}

class BlastBot extends Piece {
    constructor(startingPositionX, startingPositionY, color) {
        super(startingPositionX, startingPositionY, "blastBot", color);
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
        pieceList.forEach((piece) => {
            if( ( (piece.x === this.x - 1) || (piece.x === this.x + 1) ) && (piece.y === this.y) || 
                ( (piece.y === this.y - 1) || (piece.y === this.y + 1) ) && (piece.x === this.x) )  {
                piece.health = piece.health - 1;
            }
        })
    }
}

class HealBot extends Piece {
    constructor(startingPositionX, startingPositionY, color) {
        super(startingPositionX, startingPositionY, "healBot", color);
        this.health = 2;
    }
    markup() {
        for(let i = -2; i <= 2; i++) {
            console.log(i)
            if (i === 0) {

            } else {
                if (this.x + i > 0 && this.x + i <= 8) {
                    if ( !checkAnyPieceInPosition(this.x + i, this.y) ) {
                        possibleMoves.push({ x: this.x + i, y: this.y });
                    }
                }
                
                if (this.y + i > 0 && this.y + i <= 8) {
                    if ( !checkAnyPieceInPosition(this.x, this.y + i) ) {
                        possibleMoves.push({ x: this.x, y: this.y + i });
                    }
                }
            }
        }
    }
    attack() {
        pieceList.forEach((piece) => {
            if( ( (piece.x === this.x - 1) || (piece.x === this.x + 1) ) &&
                (piece.y === this.y) ) {
                piece.health = piece.health + 1;
            }
        })
    }
}

let checkAnyPieceInPosition = (x, y) => {
    return pieceList.some( piece => ( piece.dragged === false ) && ( piece.y === y ) && ( piece.x === x ) );
}