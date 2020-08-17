// start clockbox
const set2fig = num  => {
    // 桁数が1桁だったら先頭に0を加えて2桁に調整する
    let ret;
    if( num < 10 ) { ret = "0" + num; }
    else { ret = num; }
    return ret;
 };

const nowtime = ()=> {
    const nowTime = new Date();
    const nowHour = set2fig(nowTime.getHours());
    const nowMin  = set2fig(nowTime.getMinutes());
    const nowSec  = set2fig(nowTime.getSeconds());
    return [nowHour, nowMin, nowSec];
};

const showClock = () => {
    const time = nowtime();
    const msg = "現在時刻: " + time[0] + "時" + time[1] + "分" + time[2] + "秒";
    document.getElementById("clockbox").innerHTML = msg;
};

 // end clockbox


 // start transfer
const getlatest = () =>  {
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
 const readjson = path => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        let changeTimes = 0;
        req.onreadystatechange = () => {
            changeTimes++;
            if (changeTimes == 1) return
            console.log('readyState : '+req.readyState);
            console.log('req.status : '+req.status);
            if (changeTimes == 2 && req.readyState == 4 && req.status == 200) {
                resolve(req.responseText);
            } else {
                reject('ERROR!!!!');
            };
        };
        req.open('GET', path, false);
        req.send(null);
    })
};
 // end modules

//start ivent

setInterval('showClock()',250);

//end ivent