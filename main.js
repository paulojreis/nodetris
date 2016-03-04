var clear       = require('cli-clear'),
    chalk       = require('chalk'),
    keypress    = require('keypress'),
    tetrisGame  = require('./lib/tetris-game.js'),
    updateInterval;

// make `process.stdin` begin emitting "keypress" events
keypress(process.stdin);

// listen for the "keypress" event
process.stdin.on('keypress', handleKeypress);

process.stdin.setRawMode(true);
process.stdin.resume();

updateInterval = setInterval(update, 1000);

tetrisGame.start();
drawBoard();

function update () {
    tetrisGame.tryMove(tetrisGame.Moves.MoveDown);
    drawBoard();
}

function handleKeypress (char, key) { 
    var move;

    if (key && key.ctrl && key.name == 'c') {
        process.exit(1);
    }
    
    switch (key.name) {
        case 'left':
            move = tetrisGame.Moves.MoveLeft;
            break;
        case 'right':
            move = tetrisGame.Moves.MoveRight;
            break;
        case 'up':
            move = tetrisGame.Moves.RotCounter;
            break;
        case 'down':
            move = tetrisGame.Moves.RotClock;
            break;
        case 'space':
            move = tetrisGame.Moves.MoveDown;
            break;
    }

    if (move) {
        tetrisGame.tryMove(move);
    }

    if (tetrisGame.getState() === tetrisGame.States.PLAYING) {
        // TODO Draw in update cycle, not in every keypress.
        drawBoard();
    } else {
        process.exit(1);
    }
}

function drawBoard () {
    var boardModel  = tetrisGame.getBoard(),
        boardView   = '',
        boardHeight = boardModel.length,
        boardWidth  = boardModel[0].length;

    for (var y = 0; y < boardHeight; y++) {
        boardView += chalk.white('*');
        for (var x = 0; x < boardWidth; x++) {
            boardView += boardModel[y][x] ? chalk.cyan('*') :' ';
        }
        boardView += chalk.white('*\n');
    }

    for (var x = 0; x < boardWidth + 2; x++) { 
        boardView += chalk.white('*');
    }

    clear();
    console.log(boardView);
}
