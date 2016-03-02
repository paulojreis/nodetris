var Types           = {
        I : 1,
        L : 2,
        J : 3,
        Z : 4,
        O : 5,
        T : 6
    },
    Orientation     = {
        N : 1,
        E : 2,
        S : 3,
        W : 4
    },
    nTypes          = Object.keys(Types).length,
    nOrientation    = Object.keys(Orientation).length,
    tetrominoModule = {
        getRandomPiece  : getRandomPiece,
        getPieceDefs    : getPieceDefs
    },
    pieceDefs       = [];

function getRandomPiece () {
    return {
        type        : Types[ Object.keys(Types)[Math.random() * nTypes | 0] ],
        orientation : Orientation [ Object.keys(Orientation)[Math.random() * nOrientation | 0] ],
        x           : 0,
        y           : 0,
        rotClock    : rotClock,
        rotCounter  : rotCounter,
        moveLeft    : moveLeft,
        moveRight   : moveRight,
        moveDown    : moveDown
    }
}

function getPieceDefs (type, orientation) {
    return pieceDefs[type][orientation];
}

function rotClock () {
    if (this.orientation === Orientation.W) {
        this.orientation = Orientation.N
    } else {
        this.orientation++;
    }
}

function rotCounter () {
    if (this.orientation === Orientation.N) {
        this.orientation = Orientation.W
    } else {
        this.orientation--;
    }
}

function moveLeft () {
    this.x--;
}

function moveRight () {
    this.x++;
}

function moveDown () {
    this.y++;
}

// I piece.
pieceDefs[Types.I] = [];

pieceDefs[Types.I][Orientation.N] = [
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0]
];

pieceDefs[Types.I][Orientation.E] = [
    [ 0, 0, 0, 0],
    [ 1, 1, 1, 1],
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.I][Orientation.S] = [
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0]
];

pieceDefs[Types.I][Orientation.W] = [
    [ 0, 0, 0, 0],
    [ 1, 1, 1, 1],
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0]
];

// L piece.
pieceDefs[Types.L] = [];

pieceDefs[Types.L][Orientation.N] = [
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.L][Orientation.E] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 1],
    [ 0, 1, 0, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.L][Orientation.S] = [
    [ 0, 1, 1, 0],
    [ 0, 0, 1, 0],
    [ 0, 0, 1, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.L][Orientation.W] = [
    [ 0, 0, 0, 0],
    [ 0, 0, 1, 0],
    [ 1, 1, 1, 0],
    [ 0, 0, 0, 0]
];

// J piece.
pieceDefs[Types.J] = [];

pieceDefs[Types.J][Orientation.N] = [
    [ 0, 0, 1, 0],
    [ 0, 0, 1, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.J][Orientation.E] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 1, 1],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.J][Orientation.S] = [
    [ 0, 1, 1, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.J][Orientation.W] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 1],
    [ 0, 0, 0, 1],
    [ 0, 0, 0, 0]
];

// Z piece.
pieceDefs[Types.Z] = [];

pieceDefs[Types.Z][Orientation.N] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 1, 1],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.Z][Orientation.E] = [
    [ 0, 0, 1, 0],
    [ 0, 1, 1, 0],
    [ 0, 1, 0, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.Z][Orientation.S] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 1, 1],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.Z][Orientation.W] = [
    [ 0, 0, 1, 0],
    [ 0, 1, 1, 0],
    [ 0, 1, 0, 0],
    [ 0, 0, 0, 0]
];

// O piece.
pieceDefs[Types.O] = [];

pieceDefs[Types.O][Orientation.N] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.O][Orientation.E] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.O][Orientation.S] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.O][Orientation.W] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 1, 1, 0],
    [ 0, 0, 0, 0]
];

// O piece.
pieceDefs[Types.T] = [];

pieceDefs[Types.T][Orientation.N] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 0, 0],
    [ 1, 1, 1, 0],
    [ 0, 0, 0, 0]
];

pieceDefs[Types.T][Orientation.E] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 0, 0],
    [ 0, 1, 1, 0],
    [ 0, 1, 0, 0]
];

pieceDefs[Types.T][Orientation.S] = [
    [ 0, 0, 0, 0],
    [ 0, 0, 0, 0],
    [ 1, 1, 1, 0],
    [ 0, 1, 0, 0]
];

pieceDefs[Types.T][Orientation.W] = [
    [ 0, 0, 0, 0],
    [ 0, 1, 0, 0],
    [ 1, 1, 0, 0],
    [ 0, 1, 0, 0]
];

module.exports = tetrominoModule;