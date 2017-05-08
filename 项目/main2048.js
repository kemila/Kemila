var board = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
var score = 0;
var hasConflicted = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];

var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function () {

    newgame();



});



function newgame() {
    //    console.log("111111111111");
    //初始化
    init();
    //生成2个数字
    generateOneNumber();
    generateOneNumber();



}

function init() {

    //    console.log("22222222");
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //            console.log(gridCell);
            gridCell.css('top', getPosTop(i, j));

            gridCell.css('left', getPosLeft(i, j));
            //            console.log(i, j, getPosTop(i, j), getPosLeft(i, j));

        }
        //    console.log(board);

    //    board = [[2, 4, 8, 16], [32, 64, 128, 256], [512, 1024, 2048, 4096], [8192, 16384, 32768, 65536]];
    board = [[2, 4, 2, 4], [4, 0, 0, 0], [2, 0, 0, 0], [4, 0, 0, 0]];
    board = [[0, 0, 0, 2], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    hasConflicted = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];

    updateBoardView();

    score = 0;
    $('#score').text(score);
}

function updateBoardView() {

    $(".number-cell").remove();
    for (var i = 0; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            $("#grid-container").append('<div class = "number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);
            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNumberCell.css('color', getNumberColor(board[i][j]));
                if (board[i][j] > 512) {
                    theNumberCell.css('font-size', '40px')
                }
                if (board[i][j] > 1000) {
                    theNumberCell.css('font-size', '30px')
                }
                theNumberCell.text(board[i][j]);

            }
        }
    hasConflicted = [[false, false, false, false], [false, false, false, false], [false, false, false, false], [false, false, false, false]];
}

function generateOneNumber() {


    if (nospace(board)) {
        return false;
    }

    //随机一个数字和位置;
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));

    while (true) {
        if (board[randx][randy] === 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }

    var randNumber = (Math.random() < 0.5) ? 2 : 4;

    board[randx][randy] = randNumber;

    showNumberWithAnimation(randx, randy, randNumber);


    return true;

}

$(document).keydown(function (event) {
    
    switch (event.keyCode) {
    case 37: //left
            event.preventDefault();
        if (moveLeft()) {
            console.log("left");
            setTimeout("generateOneNumber()", 210);
            setTimeout("isgameover()", 300);
        };
        break;
    case 38: //up
            event.preventDefault();
        if (moveUp()) {
            console.log("up");
            setTimeout("generateOneNumber()", 210);
            setTimeout("isgameover()", 300);
        };
        break;
    case 39: //right
            event.preventDefault();
        if (moveRight()) {
            console.log("right");
            setTimeout("generateOneNumber()", 210);
            setTimeout("isgameover()", 300);
        };
        break;
    case 40: //down
            event.preventDefault();
        if (moveDown()) {
            console.log("down");
            setTimeout("generateOneNumber()", 210);
            setTimeout("isgameover()", 300);
        };
        break;
    default:
        break;
    }
});

document.addEventListener('touchstart', function (event) {
    //    console.log(event);
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;

});

document.addEventListener('touchmove',function(event){
    event.preventDefault();
})
document.addEventListener('touchend', function (event) {
    //    console.log(event);
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    console.log(endx, endy);

    var deltax = endx - startx;
    var deltay = endy - starty;

    if (Math.abs(deltax) < 30 && Math.abs(deltay) < 30) {
        return;
    }
    if (Math.abs(deltax) >= Math.abs(deltay)) {
        if (deltax > 0) {
            //right
            if (moveRight()) {
                console.log("right");
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            };



        } else {
            //left
            if (moveLeft()) {
                console.log("left");
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            };


        }
    } else {
        if (deltay > 0) {
            //down

            if (moveDown()) {
                console.log("down");
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            };

        } else {
            //up
            if (moveUp()) {
                console.log("up");
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            };

        }

    }

});




function isgameover() {
    if (nospace(board) && nomove(board)) {
        gameover();

    }

}

function gameover() {

    alert("Game over");

}

function nomove() {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveDown(board) || canMoveUp(board)) {
        return false;
    }

    return true;


}



function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //移动
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {

                        //移动 计算
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 100);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }

    for (var i = 1; i < 4; i++)
        for (var j = 0; j < 4; j++) {
            if (board[i][j] != 0) {
                for (var k = 0; k < i; k++) {
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        //移动
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflicted[k][j]) {

                        //移动 计算
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 100);
    return true;
}

function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }

    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        //移动
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {

                        //移动 计算
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        updateScore(score);
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 100);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                for (var k = 3; k > i; k--) {
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        //移动
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {

                        //移动 计算
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()", 100);
    return true;
}
