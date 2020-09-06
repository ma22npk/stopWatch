const timer = document.getElementById('timer');
const start = document.getElementById('start');
const stop = document.getElementById('stop');
const reset = document.getElementById('reset');

//再代入するのでlet
let startTime;
let timeOutId;
let elapsedTime = 0;

function countUp() {
  //現在時間からスタートボタンを押した時間を引く
  const d = new Date(Date.now() - startTime + elapsedTime);
  //padStartで二桁で表示して、それ以下だったら文字列の前をゼロで埋めてという記述
  //padStartは文字列にしか使えないのでStringで囲う必要が有る
  const m = String(d.getMinutes()).padStart(2, '0');
  const s = String(d.getSeconds()).padStart(2, '0');
  const ms = String(d.getMilliseconds()).padStart(3, '0');
  timer.textContent = `${m}:${s}.${ms}`;
  //timeOutIdを戻り値にする
  timeOutId = setTimeout(() => {
    countUp();
  }, 10); //10msごとに
}

function setButtonStateInitial() {
  start.classList.remove('in-active')
  stop.classList.add('in-active')
  reset.classList.add('in-active')
}


function setButtonStateRunning() {
  start.classList.add('in-active')
  stop.classList.remove('in-active')
  reset.classList.add('in-active')
}

function setButtonStateStopped() {
  start.classList.remove('in-active')
  stop.classList.add('in-active')
  reset.classList.remove('in-active')
}

//ページ読み込み時に発動しているように
setButtonStateInitial();

start.addEventListener('click', () => {
if (start.classList.contains('in-active') === true ) {
return;  
}
  setButtonStateRunning();
  startTime = Date.now();
  countUp();
})

stop.addEventListener('click', () => {
if (stop.classList.contains('in-active') === true ) {
return;  
}
  setButtonStateStopped();
  //clearTimeoutで止める
  clearTimeout(timeOutId);
  elapsedTime += Date.now() - startTime;
})
reset.addEventListener('click', () => {
if (reset.classList.contains('in-active') === true ) {
return;  
}
  setButtonStateInitial();
  //clearTimeoutで止める
  timer.textContent = '00:00.000';
  elapsedTime = 0;
})