var tetromino       = require('./tetromino.js'),
    pieces          = [],
    curPieceIdx     = null,
    States          = {
        WAITING : 1,
        PLAYING : 2,
        OVER    : 3
    },
    WIDTH           = 20,
    HEIGHT          = 20,
    board           = [],
    state           = States.WAITING,
    tetrisModule    = {
        States      : States,
        start       : start,
        tryMove     : tryMove,
        getState    : getState,
        getBoard    : getBoard,
    };

function start () {
    state = States.PLAYING;

    clearBoard();
    addNewPiece();

    updateBoard();
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

        if (!hasValidMoves(curPiece)) {
            addNewPiece();

            if (!hasValidMoves(getCurrentPiece())) {
                state = States.OVER;
            }
        }
    }

    updateBoard();
}

function applyMoveToPiece (move, piece) {
    switch (move) {
        case 'w':
        case 'W':
            piece.rotCounter();
            break;
        case 'a':
        case 'A':
            piece.moveLeft();
            break;
        case 's':
        case 'S':
            piece.rotClock();
            break;
        case 'd':
        case 'D':
            piece.moveRight();
            break;
    }

    piece.moveDown();
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