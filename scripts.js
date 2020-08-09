// start clockbox
function set2fig(num) {
    // 桁数が1桁だったら先頭に0を加えて2桁に調整する
    var ret;
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
    time = nowtime();
    var msg = "現在時刻: " + time[0] + "時" + time[1] + "分" + time[2] + "秒";
    document.getElementById("clockbox").innerHTML = msg;
 }

 setInterval('showClock()',250);
 // end clockbox


 // start transfer
function getlatest() {
    time = nowtime().join(',').replace(/,/g, '');
    
    document.getElementById("next_").innerHTML = next_;
}


 // end transfer

 // start setting
 /*
function _create_dropdownlist(form_name, select_name, select_array) {
	// length
	document[form_name][select_name].length = select_array.length;
	
	// text, value
	var i;
	for ( i=0; i<select_array.length; i++){
		document[form_name][select_name].options[i].text = select_array[i].text;
		document[form_name][select_name].options[i].value = select_array[i].value;
	}
}

args = [
    {text:"長岡", value:0},
    {text:"北長岡", value:1}
]
_create_dropdownlist(form_ ,start_place, args)
*/
 // end setting

 // start modules
function readjson(path) {
    let req = new XMLHttpRequest();						// XMLHttpRequest オブジェクトを生成する
	req.onreadystatechange = function() {				// XMLHttpRequest オブジェクトの状態が変化した際に呼び出されるイベントハンドラ
		if(req.readyState == 4 && req.status == 200){	// サーバーからのレスポンスが完了し、かつ、通信が正常に終了した場合

			return JSON.parse(req.responseText);
		}
	};
	req.open("GET", path, false);				// HTTPメソッドとアクセスするサーバーのURLを指定
	req.send(null);										// 実際にサーバーへリクエストを送信
}

 // end modules