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
const getlatest = (startandendpoint) =>  {
    const startpoint = startandendpoint[0];
    const endpoint = startandendpoint[1];
    //const time = nowtime().join(',').replace(/,/g, '');
    const time = '215900';
    
    const name = gettimetablefilename(readjson('data/00.json'), startpoint, endpoint);
    const jsondata = readjson('data/' + name[0] + '.json')
    const jsondata_2 = (name.lenght == 2) ? readjson('data/' + name[1] + '.json'):[];
    let count = 0;
    const timeofInt = parseInt(time, 10)
    for(timetableone of jsondata.concat(jsondata_2)) {
        const timetableoneofInt = parseInt(timetableone[startpoint] + "00", 10)
        if(timeofInt < timetableoneofInt && count < 10) {
            if(timetableone[endpoint] == "pass") {
                continue;
            }
            if(count == 0) {
                document.getElementById('next_').textContent = '';
                document.getElementById("next_").textContent = "発車まであと" + remainingtime(timeofInt, timetableoneofInt) + '';
                document.getElementById('next_about').textContent = arvanddep(timetableone, startpoint, endpoint);
                if(timetableone['車種'] == '特急') {

                    //document.getElementById("next_about").insertAdjacentHTML('afterend', '※乗車には特急券が必要になります');
                }
            }
            ++count;
        }    
    }
    if(count == 0) {
        document.getElementById("next_").textContent = "本日の終電は過ぎちゃいました";
    } else if (count == 1) {
        document.getElementById("next_").insertAdjacentHTML('afterbegin', "終電です！！！");
    }
}


 // end transfer

 // start setting
const gettimetablefilename = (data, startpoint, endpoint) => {
    const filenames = []
    for(i in data) {
        if(data[i].stop.indexOf(startpoint) != -1 && data[i].stop.indexOf(startpoint) < data[i].stop.indexOf(endpoint)) {
                filenames.push(data[i].number);
        }
    }
    return filenames;
}
 // end setting

 // start modules

const arvanddep = (timetableone, startpoint, endpoint) => {
    return timetableone["車種"] +': ' + startpoint + timetableone[startpoint].slice(0, 2) + ':' + timetableone[startpoint].slice(2, 4) + '発 -> ' + endpoint + timetableone[endpoint].slice(0, 2) + ':' + timetableone[endpoint].slice(2, 4) + '着';
}
const getstartandendpoint =() => {
    return ['長岡', '新潟'];
} 

 const readjson = path => {
    let jsondata;
    $.ajaxSetup({ async: false }); // Ajax通信を同期通信にする
    $.getJSON(path, data => {
        jsondata = data;
    })
    $.ajaxSetup({ async: true }); // Ajax通信を非同期通信に戻す
    return jsondata;
};

const remainingtime = (time, timetableone) => {
    time - timetableone
    const min = 1;
    const sec = 2;
    return min.toFixed() + '分' + sec.toFixed() + '秒'
}

 // end modules

//start ivent
setInterval('showClock()',500);
setInterval(()=>getlatest(getstartandendpoint()),500);

//end ivent