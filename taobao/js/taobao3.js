var oPrev = document.getElementById("prev"),
    oNext = document.getElementById("next"),
    oMain = document.getElementsByClassName("main")[0],
    oList = document.getElementsByClassName("list")[0],
    oLi = oList.getElementsByTagName("li"),
    oContainer = document.getElementsByClassName("container")[0];
var timer,
    timer2,
    index = 0,
    flag = true;

function moveImg(dis){
    flag = false;
    var time = 400;
    var eachTime = 20;
    var eachDis = dis / (time / eachTime);
    var newLeft = oMain.offsetLeft + dis;
    function eachMove(){
        if(dis > 0 && oMain.offsetLeft < newLeft || dis < 0 && oMain.offsetLeft > newLeft){
            oMain.style.left = oMain.offsetLeft + eachDis + "px";
        }
        else{
            clearInterval(timer);
            oMain.style.left = newLeft + "px";
            if(newLeft == -3120){
                oMain.style.left = -520 + "px";
            } 
            if(newLeft == 0){
                oMain.style.left = -2600 + "px";
            }
            flag = true;
        }
    }
    timer = setInterval(eachMove, eachTime);
}
oPrev.onclick = function(){
    if(flag == false) return;
    moveImg(520);
    if(index == 0){
        index = 4;
    }
    else{
        index--;
    }
    oLiStyle();
}
oNext.onclick = function(){
    if(flag == false) return;
    moveImg(-520);
    if(index == 4){
        index = 0;
    }
    else{
        index++;
    }
    oLiStyle();
}

function oLiStyle(){
    document.getElementsByClassName("active")[0].className = "";
    oLi[index].className = "active";
}
for(var i = 0;i < oLi.length;i++){
    (function (j){
        oLi[j].onclick = function(){
            var offset = (j - index) * -520;
            moveImg(offset);
            index = j;
            oLiStyle();
        }
    })(i);
}

timer2 = setInterval(oNext.onclick,2000);
oContainer.onmouseover = function(){
    clearInterval(timer2);
}
oContainer.onmouseout = function(){
    timer2 = setInterval(oNext.onclick,2000);
}

