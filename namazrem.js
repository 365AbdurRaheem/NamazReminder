window.onload = function() {
  setTime();
};

var date = new Date();
const showTime = document.getElementById("showTime");
document.getElementById("showDate").textContent=`${date.getDate().toString().padStart(2,0)} - ${date.getMonth().toString().padStart(2,0)} - ${date.getFullYear()}`
setInterval(() => {
  date = new Date();
  let currentTime = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
  showTime.textContent = "Time: " + currentTime;
}, 1000);

const fajrTime = document.getElementById("fajr");
const p1 = "Fajar";
const zuhrTime = document.getElementById("zuhr");
const p2 = "Zuhr";
const asrTime = document.getElementById("asr");
const p3 = "Asar";
const magribTime = document.getElementById("magrib");
const p4 = "Magrib";
const ishaTime = document.getElementById("isha");
const p5 = "Isha";
const jummaTime = document.getElementById("jumma");
const jp = "Jumma";

let countDownVar = document.getElementById("countDown");

const prayerCall=new Audio("azan1.mp3")

function update(prayerTime, prayer) {
  async function azan(){
    await prayerCall.play();
    clearInterval(prayerInterval);
    countDownVar.textContent="";
  }
  const prayerInterval=setInterval(() => {
    let mins = prayerTime.value.slice(3, 5) - date.getMinutes();
    let secs = 59 - date.getSeconds();
    countDownVar.textContent = `${prayer}: 00 : ${mins==0 && secs ==0? azan() : mins.toString().padStart(2, 0)} : ${secs.toString().padStart(2, 0)}`;
  }, 1000);
}

function setTime() {
  let hours = date.getHours().toString().padStart(2, 0);
  if(date.getDay()==5){
    if(hours == jummaTime.value.slice(0, 2))
    update(jummaTime, jp);
  }
  switch (hours) {
    case fajrTime.value.slice(0, 2):
      update(fajrTime, p1);
      break;
    case zuhrTime.value.slice(0, 2):
      update(zuhrTime, p2);
      break;
    case asrTime.value.slice(0, 2):
      update(asrTime, p3);
      break;
    case magribTime.value.slice(0, 2):
      update(magribTime, p4);
      break;
    case ishaTime.value.slice(0, 2):
      update(ishaTime, p5);
      break;
    default:
      countDownVar.textContent = " There is a time in next prayer! ";
  }
}