// start clockbox
function set2fig(num) {
    // 桁数が1桁だったら先頭に0を加えて2桁に調整する
    let ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
 }

function nowtime() {
    const nowTime = new Date();
    const nowHour = set2fig(nowTime.getHours());
    const nowMin  = set2fig(nowTime.getMinutes());
    const nowSec  = set2fig(nowTime.getSeconds());
    return [nowHour, nowMin, nowSec];
}
 function showClock() {
    const time = nowtime();
    const msg = "現在時刻: " + time[0] + "時" + time[1] + "分" + time[2] + "秒";
    document.getElementById("clockbox").innerHTML = msg;
 }

 setInterval('showClock()',250);
 // end clockbox


 // start transfer
function getlatest() {
    const time = nowtime().join(',').replace(/,/g, '');

    //document.getElementById("next_").innerHTML = next_;
    document.getElementById("next_").innerHTML = time;
}


 // end transfer

 // start setting
function gettimetablefilename(data, startpoint, endpoint) {
    for(i in data) {
        if(data[i].stop.indexOf(startpoint) < data[i].stop.indexOf(endpoint)) {
                console.log(data[i].stop);
        }
        
    }
}
 // end setting

 // start modules
function readjson(path) {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(req.readyState == 4 && req.status == 200){
            console.log(req.responseText);
        }
    };
    req.open("GET", path, false);
    req.send(null);
}



 // end modules