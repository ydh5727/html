var oGround = document.getElementById('ground');
var oControl = document.getElementById('control');
var aSpan = oControl.getElementsByTagName('span');
var oSubDiv = createDiv();
oSubDiv.style.display = "none";
oGround.appendChild(oSubDiv);
//创建蛇
var aSnaker = [];
for (var i = 3; i > 0; i--) {
    var oDiv = document.createElement('div');
    oDiv.style.left = i * 20 + 'px';
    oDiv.style.top = '60px';
    oDiv.className = "block snake-block";
    if (i == 3)
        oDiv.style.background = "url(/jscss/demoimg/201403//head.png)";
    else if (i == 2)
        oDiv.style.background = "url(http://www.codefans.net/jscss/demoimg/201403//body.png)";
    else
        oDiv.style.background = "url(http://www.codefans.net/jscss/demoimg/201403//tail.png)";
    //oDiv.innerHTML = 4-i;
    aSnaker.push(oDiv);
    oGround.appendChild(oDiv);
}
var oFood;

function divPos() {
    var iLeft, iTop;
    var flag = false;
    do {
        iLeft = parseInt(Math.random() * 50) * 20 + 'px';
        iTop = parseInt(Math.random() * 25) * 20 + 'px';
        for (var i = 0; i < aSnaker.length; i++) {
            if (iLeft == aSnaker[i].style.left && iTop == aSnaker[i].style.top) {
                flag = true;
                break;
            }
        }
    } while (flag)
    return {
        iLeft: iLeft,
        iTop: iTop
    };
}

function createFood() { //创建食物
    oFood = document.createElement('div');
    oFood.style.left = divPos().iLeft;
    oFood.style.top = divPos().iTop;
    oFood.className = 'block food';
    oGround.appendChild(oFood);
}
createFood();

function createDiv() {
    var oDiv = document.createElement("div");
    oDiv.className = "block";
    oDiv.style.background = "url(http://www.codefans.net/jscss/demoimg/201403//body.png)";
    oDiv.style.position = "absolute";
    return oDiv;
}

function addDiv(tailTop, tailLeft) {
    var oDiv = createDiv();
    oDiv.style.top = tailTop + "px";
    oDiv.style.left = tailLeft + "px";
    oGround.appendChild(oDiv);
    aSnaker.splice(aSnaker.length - 1, 0, oDiv);
}
//食物添加到尾巴的前面后计算尾巴现在应有的坐标
function priTail(headLeft, headTop, tailLeft, tailTop, moveDir) {
    // console.log(tailLeft+','+tailTop+','+headLeft+','+headTop);
    if (tailLeft == headLeft || moveDir == "right" || moveDir == "left") {
        if (tailTop > headTop)
            tailTop -= 20;
        else if (tailTop < headTop)
            tailTop += 20;
        // console.log(tailLeft+','+tailTop+','+headLeft+','+headTop);
    } else if (tailTop == headTop || moveDir == "up" || moveDir == "down") {
        if (tailLeft > headLeft)
            tailLeft -= 20;
        else if (tailLeft > headLeft)
            tailLeft += 20;
        // console.log(tailLeft+','+tailTop+','+headLeft+','+headTop);
    }
    return {
        tailTop: tailTop,
        tailLeft: tailLeft
    };
}
//食物达到一定数量吃到SubDiv就减去一段身体，但计数值仍增长
function subDiv() {}
var sum = 0; //对吃的食物数计数
var moveDir = 'right';

function move() {
    //蛇身整体移动
    for (var i = aSnaker.length - 1; i > 0; i--) {
        aSnaker[i].style.left = aSnaker[i - 1].style.left;
        aSnaker[i].style.top = aSnaker[i - 1].style.top;
        //console.log(i+','+aSnaker[i].style.left+','+aSnaker[i].style.top);
    }
    var snakeHead = aSnaker[0];
    var headLeft = parseInt(snakeHead.style.left);
    var headTop = parseInt(snakeHead.style.top);
    switch (moveDir) {
        case "left":
            headLeft -= 20;
            break;
        case "right":
            headLeft += 20;
            break;
        case "up":
            headTop -= 20;
            break;
        case "down":
            headTop += 20;
            break;
    }
    snakeHead.style.left = headLeft + 'px';
    snakeHead.style.top = headTop + 'px';
    aSnaker[0].id = "h-" + moveDir;
    //与蛇身相撞结束游戏
    for (var i = 1; i < aSnaker.length; i++) {
        if (snakeHead.style.left == aSnaker[i].style.left && snakeHead.style.top == aSnaker[i].style.top) {
            reStart();
        }
    }
    //撞墙游戏结束
    if (snakeHead.style.left < "0px" || snakeHead.style.top < "0px" || snakeHead.style.top == "500px" || snakeHead.style.left == "1000px") {
        reStart();
    }
    var snakeTail = aSnaker[aSnaker.length - 1]; //获取当前的尾巴
    //尾巴的转向，根据前一个的位置设置方向
    if (snakeTail.style.top < aSnaker[aSnaker.length - 2].style.top)
        snakeTail.id = "t-down";
    else if (snakeTail.style.top > aSnaker[aSnaker.length - 2].style.top)
        snakeTail.id = "t-up";
    if (snakeTail.style.left > aSnaker[aSnaker.length - 2].style.left)
        snakeTail.id = "t-left";
    else if (snakeTail.style.left < aSnaker[aSnaker.length - 2].style.left)
        snakeTail.id = "";
    var tailLeft = parseInt(snakeTail.style.left);
    var tailTop = parseInt(snakeTail.style.top);
    //食物达到一定数量吃到SubDiv就减去一段身体，但计数值仍增长
    var random = parseInt(Math.random() * 8);
    if (random == 6 && sum > 50 && oSubDiv.style.display == "none") {
        oSubDiv.style.display = "block";
        oSubDiv.style.left = divPos().iLeft;
        oSubDiv.style.top = divPos().iTop;
        //if(oSubDiv){
        if (snakeHead.style.left == oSubDiv.style.left && snakeHead.style.top == oSubDiv.style.top) {
            console.log(aSnaker.length);
            snakeTail.style.left = aSnaker[aSnaker.length - 2].style.left;
            snakeTail.style.top = aSnaker[aSnaker.length - 2].style.top;
            aSnaker.splice(aSnaker.length - 3, aSnaker.length - 2);
            oSubDiv.style.display = "none";
            console.log(aSnaker.length);
        }
        var t = setTimeout('oSubDiv.style.display="none"', 5000);
        //sum++;
    }
    //吃到的食物添加到尾巴的前面，分别改变尾巴和食物的定位坐标值
    if (snakeHead.style.left == oFood.style.left && snakeHead.style.top == oFood.style.top) {
        tailLeft = snakeTail.style.left;
        tailTop = snakeTail.style.top;
        oFood.style.background = "url(http://www.codefans.net/jscss/demoimg/201403//body.png)";
        oFood.style.top = tailTop + "px";
        oFood.style.left = tailLeft + "px";
        sum++;
        aSnaker.splice(aSnaker.length - 1, 0, oFood);
        tailTop = priTail(headLeft, headTop, tailLeft, tailTop, moveDir).tailTop;
        tailLeft = priTail(headLeft, headTop, tailLeft, tailTop, moveDir).tailLeft;
        if (sum > 10 && sum < 20) { //食物达到一定数量有奖励
            addDiv(tailTop, tailLeft);
            sum++;
        }
        tailTop = priTail(headLeft, headTop, tailLeft, tailTop, moveDir).tailTop;
        tailLeft = priTail(headLeft, headTop, tailLeft, tailTop, moveDir).tailLeft;
        if (sum > 20 && sum < 40) { //继续奖励，不过吃的太多也会死的更快
            addDiv(tailTop, tailLeft);
            sum++;
        }
        aSpan[1].innerHTML = "已吃食物" + sum + "个";
        tailTop = priTail(headLeft, headTop, tailLeft, tailTop, moveDir).tailTop;
        tailLeft = priTail(headLeft, headTop, tailLeft, tailTop, moveDir).tailLeft;
        snakeTail.style.left = tailLeft + 'px';
        snakeTail.style.top = tailTop + 'px';
        createFood();
    }
}
var timer;
var timerFlag = true;
var oStart = document.getElementById('start');
oStart.onclick = function () {
    if ((timerFlag && oStart.innerHTML != "结束") || oPurse.innerHTML == "恢复") {
        oStart.innerHTML = "结束";
        openTimer();
        timerFlag = false;
    } else if (this.innerHTML == "结束") {
        clearInterval(timer);
        //reStart();
    }
};
var oPurse = document.getElementById('purse');
oPurse.onclick = function () {
    if (!timerFlag && this.innerHTML != "恢复" && oStart.innerHTML == "结束") {
        this.innerHTML = "恢复";
        clearInterval(timer);
        timerFlag = !timerFlag;
    } else {
        oStart.onclick();
        this.innerHTML = "暂停";
        timerFlag = !timerFlag;
    }
};
var perTime = 300;

function openTimer() {
    timer = setInterval(function () { //定时器
        move();
        //alert(oStart.innerHTML);
    }, perTime);
}
//设置时间间隔，以改变速度
var oSpeed = document.getElementById('speed');
var aLi = oSpeed.getElementsByTagName('li');
for (var i = 0; i < aLi.length; i++) { //通过改变perTimer 改变时间
    (function (index) {
        if (index < 3) {
            aLi[index].onclick = function () {
                clearInterval(timer);
                switch (index) {
                    case 0:
                        perTime = 400;
                        break;
                    case 1:
                        perTime = 200;
                        break;
                    case 2:
                        perTime = 60;
                        break;
                }
                if (oStart.innerHTML == "结束")
                    openTimer();
            };
        } else if (index == 3) {
            aLi[index].onclick = function () {
                clearInterval(timer);
                if (perTime >= 50) {
                    perTime += 50;
                }
                if (oStart.innerHTML == "结束")
                    openTimer();
            };
        } else if (index == 4) {
            aLi[index].onclick = function () {
                clearInterval(timer);
                if (perTime < 1000) {
                    perTime -= 50;
                }
                if (oStart.innerHTML == "结束")
                    openTimer();
            };
        }
    })(i);
}

function reStart() { //重新开始
    clearInterval(timer);
    var msg = confirm("此次游戏失败，要重新开始吗？");
    //alert("Game Over");
    if (msg)
        window.location.reload();
}
document.onkeydown = function (e) { //设置转向
    e = e || window.event;
    var keyCode = e.which || e.keyCode;
    switch (keyCode) {
        case 37:
            if (moveDir != "right") {
                moveDir = "left";
            }
            break;
        case 38:
            if (moveDir != "down") {
                moveDir = "up";
            }
            break;
        case 39:
            if (moveDir != "left") {
                moveDir = "right";
            }
            break;
        case 40:
            if (moveDir != "up") {
                moveDir = "down";
            }
            break;
    }
}