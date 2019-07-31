function loadScript(url, callback) {
    var script = document.createElement("script");
    script.type = "text/javascript";
    if (script.readState) { //兼容IE浏览器
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                // callback();
                tools[callback]();
            }
        }
    } else { //兼容Safari、Chrome、Firefox、Opera浏览器
        script.onload = function () {
            // callback();
            tools[callback]();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}
// loadScript("../js/demo.js",function(){
//     test();
// });
loadScript("../js/demo.js", "test");
loadScript("../js/demo.js", "test2");
loadScript("../js/demo.js", "test3");



