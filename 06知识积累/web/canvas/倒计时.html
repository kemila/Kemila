var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;

//var endTime = new Date(2016, 7, 17, 10, 47, 52); //月份从0开始
//var endTime = new Date(); //月份从0开始
//endTime.setTime(endTime.getTime()+3600*1000);

var curShowTimeSeconds = 0;

var balls = [];
const color = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#669900", "#FF8800", "#FF4444", "#CC0000", "#d6e2f5", "#1ee395"]

window.onload = function () {

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = document.documentElement.clientHeight;
    //为何不对
    console.log("document.body.clientHeight", document.body.clientHeight);
    console.log("document.body.clientWidth", document.body.clientWidth);
    MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
    MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
    RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;


    var canvas = document.getElementById('canvas');
    var context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    curShowTimeSeconds = getCurrentShowTimeSeconds();
    //    console.log("curShowTimeSeconds",curShowTimeSeconds);
    setInterval(
        function () {
            render(context);
            update();
        }, 50
    );


}


function update() {
    var nextShowTimeSeconds = getCurrentShowTimeSeconds();

    var nexthours = parseInt(nextShowTimeSeconds / 3600);
    var nextminutes = parseInt((nextShowTimeSeconds - nexthours * 3600) / 60);
    var nextseconds = parseInt(nextShowTimeSeconds % 60);

    var curhours = parseInt(curShowTimeSeconds / 3600);
    var curminutes = parseInt((curShowTimeSeconds - curhours * 3600) / 60);
    var curseconds = parseInt(curShowTimeSeconds % 60);

    if (nextseconds != curseconds) {
        if (parseInt(curhours / 10) != parseInt(nexthours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curhours / 10));
        }
        if (parseInt(curhours % 10) != parseInt(nexthours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours % 10));
        }
        if (parseInt(curminutes / 10) != parseInt(nextminutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curminutes / 10));
        }
        if (parseInt(curminutes % 10) != parseInt(nextminutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curminutes % 10));
        }
        if (parseInt(curseconds / 10) != parseInt(nextseconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curseconds / 10));
        }
        if (parseInt(curseconds % 10) != parseInt(nextseconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curseconds % 10));
        }
        curShowTimeSeconds = nextShowTimeSeconds;
    }

    updateBalls();


}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.7;
        }
    }
    //利用巧妙的算法cnt 将0-cnt数组位置保存再画面中的小球.之后的位置的小球全部是不要的 然后POP
    var cnt = 0;
    for (var i = 0; i < balls.length; i++) {
        if ((balls[i].x + RADIUS) > 0 && (balls[i].x - RADIUS) < WINDOW_WIDTH) {
            balls[cnt++] = balls[i];
        }

    }
    while (balls.length > cnt) {
        balls.pop();
    }



    //    console.log(balls.length);



}

function addBalls(x, y, num) {

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 6,
                    vy: -5,
                    color: color[Math.floor(Math.random() * 10)]
                }
                balls.push(aBall);
            }
        }
    }





}


function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    //     console.log("endTime.getTime()",endTime.getTime());
    //     console.log("curTime.getTime()",curTime.getTime());
//         console.log("curTime.getHours",curTime.getHours());
//         console.log("curTime.getMinutes",curTime.getMinutes());
//         console.log("curTime.getSeconds",curTime.getSeconds());
    //改写时钟
    var ret = curTime.getHours()*3600+curTime.getMinutes()*60+curTime.getSeconds();
//    ret = Math.round(ret / 1000);
//    console.log("ret",ret);
    return ret;
    
}


function render(cxt) {

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    
//    sleep(100);
//    window.setTimeout(function(){},5000);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = parseInt(curShowTimeSeconds % 60);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);
    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt);
    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();
        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        cxt.closePath();
        cxt.fill();
    }

}


function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0,102,153)";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();

                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);


                cxt.closePath();
                cxt.fill();

            }


        }

    }



}
