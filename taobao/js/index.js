var oPrev = document.getElementById("prev"),
    oNext = document.getElementById("next"),
    oMain = document.getElementsByClassName("main")[0],
    oList = document.getElementsByClassName("list")[0],
    oLi = oList.getElementsByTagName("li"),
    oContainer = document.getElementsByClassName("container")[0];

// console.log(oList);
// console.log(oLi);
var timer, timer2
oLiLength = oLi.length,
    flag = true,
    index = 0;
// console.log(oLiLength);
// console.log(oLi.length);
//上、下翻页//offsetLeft:当前的left值
function moveImg(dis) {
    flag = false;
    var time = 400; //每次轮播的时间
    var eachTime = 20; //每次移动一小步的时间20ms
    var eachDis = dis / (time / eachTime)//每次移动的距离
    var newLeft = oMain.offsetLeft + dis;//移动的目标点=当前的left值+移动的距离
    function eachMove() {
        if (dis > 0 && oMain.offsetLeft < newLeft || dis < 0 && oMain.offsetLeft > newLeft) {
            oMain.style.left = oMain.offsetLeft + eachDis + "px";
        }
        else {
            clearInterval(timer);  //清空计时器，防止图片划跑
            oMain.style.left = newLeft + "px";  //强制挪到目标点
            if (newLeft == -3120) {
                oMain.style.left = -520 + "px";
            }
            if (newLeft == 0) {
                oMain.style.left = -2600 + "px";
            }
            flag = true;
        }
    }
    timer = setInterval(eachMove, eachTime);
}

oPrev.onclick = function () {
    if (flag == false) return;
    moveImg(520);
    if (index == 0) {
        index = 4;
    }
    else {
        index--;
    }
    oLiStyle();
}
oNext.onclick = function () {
    if (flag == false) return;
    moveImg(-520);
    if (index == 4) {
        index = 0;
    }
    else {
        index++;
    }
    oLiStyle();
}

//小圆点---样式函数
function oLiStyle() {
    oList.getElementsByClassName("active")[0].className = " ";
    oLi[index].className = "active";
}

for (var i = 0; i < oLi.length; i++) {
    (function (j) {
        oLi[j].onclick = function () {
            var offset = (j - index) * -520; //在index更新之前计算好
            moveImg(offset);
            index = j;
            oLiStyle();
        }
    }(i)); // 闭包, 用立即执行函数(function (){}()); 包裹绑定的事件，当读到立即执行函数它便会执行
}

//自动轮播
timer2 = setInterval(oNext.onclick, 2000);
oContainer.onmouseover = function () {
    clearInterval(timer2);
}
oContainer.onmouseout = function () {
    timer2 = setInterval(oNext.onclick, 2000);
}