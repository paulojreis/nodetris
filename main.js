var prompt      = require('prompt'),
    clear       = require('cli-clear'),
    chalk       = require('chalk'),
    tetrisGame  = require('./lib/tetris-game.js'),
    movePromptDefs = {
        name        : 'move',
        description : 'Enter your move (w, a, s, d) and return ...',
        type        : 'string'
    };

prompt.message = 'Tetris: ';
prompt.delimiter = '';
prompt.start();
tetrisGame.start();

drawBoard();

prompt.get(movePromptDefs, handleMove);

function handleMove (err, result) { 
    if (/^[wasdWASD]$/.test(result.move)) {
        tetrisGame.tryMove(result.move);
    }

    drawBoard();

    if (tetrisGame.getState() === tetrisGame.States.PLAYING) {
        prompt.get(movePromptDefs, handleMove);
    } else {
        process.exit(1)
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
