var tetromino       = require('./tetromino.js'),
    pieces          = [],
    curPieceIdx     = null,
    States          = {
        WAITING     : 1,
        PLAYING     : 2,
        OVER        : 3
    },
    Moves           = {
        MoveLeft    : 1,
        MoveRight   : 2,
        MoveDown    : 3,
        RotCounter  : 4,
        RotClock    : 5
    },
    WIDTH           = 20,
    HEIGHT          = 20,
    DEF_INTERVAL    = 1000,
    board           = [],
    state           = States.WAITING,
    updateInterval  = null,
    tetrisModule    = {
        States      : States,
        Moves       : Moves,
        start       : start,
        tryMove     : tryMove,
        getState    : getState,
        getBoard    : getBoard,
    };

function start (interval) {
    interval = interval || DEF_INTERVAL;

    state = States.PLAYING;

    clearBoard();
    addNewPiece();
    updateBoard();

    updateInterval = setInterval(
        tryMove.bind(this, Moves.MoveDown),
        interval
    );
}

function tryMove (move) {
    var curPiece        = getCurrentPiece(),
        curPieceClone   = Object.assign({}, curPiece);

    if (state !== States.PLAYING) {
        return;
    }

    applyMoveToPiece(move, curPieceClone);

    if (isPiecePositionValid(curPieceClone)) {
        applyMoveToPiece(move, curPiece);
    }

    if (!canGoDown(curPiece)) {
        addNewPiece();
        if (!hasValidMoves(getCurrentPiece())) {
            state = States.OVER;
       }
    }
    updateBoard();
}

function applyMoveToPiece (move, piece) {
    switch (move) {
        case Moves.RotCounter:
            piece.rotCounter();
            break;
        case Moves.MoveLeft:
            piece.moveLeft();
            break;
        case Moves.RotClock:
            piece.rotClock();
            break;
        case Moves.MoveRight:
            piece.moveRight();
            break;
        case Moves.MoveDown:
            piece.moveDown();
            break;
    }
}

function hasValidMoves (piece) {
    var pieceClone = Object.assign({}, piece);
    pieceClone.rotCounter();
    pieceClone.moveDown();
    
    if (isPiecePositionValid(pieceClone)) {
        return true;
    }

    pieceClone = Object.assign({}, piece);
    pieceClone.moveLeft();
    pieceClone.moveDown();
    
    if (isPiecePositionValid(pieceClone)) {
        return true;
    }

    pieceClone = Object.assign({}, piece);
    pieceClone.rotClock();
    pieceClone.moveDown();
    
    if (isPiecePositionValid(pieceClone)) {
        return true;
    }

    pieceClone = Object.assign({}, piece);
    pieceClone.moveRight();
    pieceClone.moveDown();
    
    if (isPiecePositionValid(pieceClone)) {
        return true;
    }

    return false;
}

function canGoDown (piece) {
    var pieceClone = Object.assign({}, piece);
    pieceClone.moveDown();
    
    if (isPiecePositionValid(pieceClone)) {
        return true;
    }

    return false;
}

function isPiecePositionValid (piece) {
    var pieceDefs       = tetromino.getPieceDefs(piece.type, piece.orientation),
        pieceHeight     = pieceDefs.length,
        pieceWidth      = pieceDefs[0].length;

    for (var pieceLocalY = 0; pieceLocalY < pieceHeight; pieceLocalY++) {
        for (var pieceLocalX = 0; pieceLocalX < pieceWidth; pieceLocalX++) {
            if (pieceDefs[pieceLocalY][pieceLocalX]) {
                var x = pieceLocalX + piece.x,
                    y = pieceLocalY + piece.y;

                if (x < 0 || x === WIDTH - 1) {
                    return false;
                }

                if (y < 0 || y === HEIGHT) {
                    return false;
                }

                if (hasCollision(x, y)) {
                    return false;
                }
            }
        }
    }

    return true;
}

function hasCollision (testX, testY) {
    var curPiece = getCurrentPiece();

    for (var i = 0, n = pieces.length; i < n; i++) {
        var piece       = pieces[i];
            pieceDefs   = tetromino.getPieceDefs(piece.type, piece.orientation),
            pieceHeight = pieceDefs.length,
            pieceWidth  = pieceDefs[0].length;

        if (piece === curPiece) {
            continue;
        }

        for (var pieceLocalY = 0; pieceLocalY < pieceHeight; pieceLocalY++) {
            for (var pieceLocalX = 0; pieceLocalX < pieceWidth; pieceLocalX++) {

                if (pieceDefs[pieceLocalY][pieceLocalX] &&
                    pieceLocalX + piece.x === testX &&
                    pieceLocalY + piece.y === testY) {

                    return true;
                }
            }
        }
    }

    return false;
}

function getBoard () {
    return board;
}

function updateBoard () {
    clearBoard();

    for (var i = 0, n = pieces.length; i < n; i++) {
        var piece       = pieces[i];
            pieceDefs   = tetromino.getPieceDefs(piece.type, piece.orientation),
            pieceHeight = pieceDefs.length,
            pieceWidth  = pieceDefs[0].length;

        for (var pieceLocalY = 0; pieceLocalY < pieceHeight; pieceLocalY++) {
            for (var pieceLocalX = 0; pieceLocalX < pieceWidth; pieceLocalX++) {

                if (pieceDefs[pieceLocalY][pieceLocalX] &&
                    piece.y + pieceLocalY > -1) {
                   board[piece.y + pieceLocalY][piece.x + pieceLocalX] = 1;
                }
            }
        }
    }
}

function clearBoard () {
    for (var y = 0; y < HEIGHT; y++) {
        board[y] = [];

        for (var x = 0; x < WIDTH; x++) {
            board[y][x] = 0;
        }
    }
}

function addNewPiece () {
    var newPiece = tetromino.getRandomPiece();

    newPiece.x = Math.random() * (WIDTH - 4) | 0;;
    newPiece.y = -1;

    curPieceIdx = pieces.push(newPiece) - 1;
}

function getState () {
    return state;
}

function getCurrentPiece () {
    return pieces[curPieceIdx];
}

module.exports = tetrisModule;