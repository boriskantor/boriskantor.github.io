const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const table = document.querySelector("#table");

canvasCtx.width = parseFloat(window.innerWidth);
canvasCtx.height = parseFloat(window.innerHeight)*0.9;
canvasElement.width = parseFloat(window.innerWidth);
canvasElement.height = parseFloat(window.innerHeight)*0.9;

var wTemp = parseFloat(window.innerWidth);
var hTemp = parseFloat(window.innerHeight)*0.9;

function reportWindowSize() {
    
    canvasCtx.width = parseFloat(window.innerWidth);
    canvasCtx.height = parseFloat(window.innerHeight)*0.9;
    canvasElement.width = parseFloat(window.innerWidth);
    canvasElement.height = parseFloat(window.innerHeight)*0.9;
    wTemp = parseFloat(window.innerWidth);
    hTemp = parseFloat(window.innerHeight)*0.9;
}

window.onresize = reportWindowSize;


const bass = document.querySelector("#bass");
const drums = document.querySelector("#drums");
const epic = document.querySelector("#epic");
const high = document.querySelector("#high");
const lead = document.querySelector("#lead");
const vocal = document.querySelector("#vocal");
const base = document.querySelector("#base");

reset();



var bassEnded = true;
var drumsEnded = true;
var epicEnded = true;
var highEnded = true;
var leadEnded = true;
var vocalEnded = true;

base.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);

drums.addEventListener('ended', function() {
    document.getElementById("drumsT").style.opacity = 0.3;
    document.getElementById("drumsT").style.background = "#000000";
    document.getElementById("drumsT").style.color = "#FFFFFF";
    document.getElementById("drumsT").style.borderWidth = "2px";
    bassEnded = true;
}, false);

bass.addEventListener('ended', function() {
    document.getElementById("bassT").style.opacity = 0.3;
    document.getElementById("bassT").style.background = "#000000";
    document.getElementById("bassT").style.color = "#FFFFFF";
    document.getElementById("bassT").style.borderWidth = "2px";
    drumsEnded = true;
}, false);
epic.addEventListener('ended', function() {
    document.getElementById("epicT").style.opacity = 0.3;
    document.getElementById("epicT").style.background = "#000000";
    document.getElementById("epicT").style.color = "#FFFFFF";
    document.getElementById("epicT").style.borderWidth = "2px";
    epicEnded = true;
}, false);
high.addEventListener('ended', function() {
    document.getElementById("highT").style.opacity = 0.3;
    document.getElementById("highT").style.background = "#000000";
    document.getElementById("highT").style.color = "#FFFFFF";
    document.getElementById("highT").style.borderWidth = "2px";
    highEnded = true;
}, false);
lead.addEventListener('ended', function() {
    document.getElementById("leadT").style.opacity = 0.3;
    document.getElementById("leadT").style.background = "#000000";
    document.getElementById("leadT").style.color = "#FFFFFF";
    document.getElementById("leadT").style.borderWidth = "2px";
    leadEnded = true;
}, false);
vocal.addEventListener('ended', function() {
    document.getElementById("vocalT").style.opacity = 0.3;
    document.getElementById("vocalT").style.background = "#000000";
    document.getElementById("vocalT").style.color = "#FFFFFF";
    document.getElementById("vocalT").style.borderWidth = "2px";
    vocalEnded = true;
}, false);

var done = false;

var pause = false;

function pauseClicked(){
    if(pause){
        base.play();
        document.getElementById("baseStatus").src="./soundON.png";
        document.getElementById("sound").src="./iconanimation.gif";
        pause = false;
    }else{
        base.pause();
        document.getElementById("baseStatus").src="./soundOFF.png";
        document.getElementById("sound").src="./stopped.png";
        pause = true;
    }
}

function reset(){
    document.getElementById("highT").style.opacity = 0.3;
    document.getElementById("highT").style.background = "#000000";
    document.getElementById("highT").style.color = "#FFFFFF";
    document.getElementById("highT").style.borderWidth = "2px";
    
    document.getElementById("leadT").style.opacity = 0.3;
    document.getElementById("leadT").style.background = "#000000";
    document.getElementById("leadT").style.color = "#FFFFFF";
    document.getElementById("leadT").style.borderWidth = "2px";
    
    document.getElementById("bassT").style.opacity = 0.3;
    document.getElementById("bassT").style.background = "#000000";
    document.getElementById("bassT").style.color = "#FFFFFF";
    document.getElementById("bassT").style.borderWidth = "2px";
    
    document.getElementById("epicT").style.opacity = 0.3;
    document.getElementById("epicT").style.background = "#000000";
    document.getElementById("epicT").style.color = "#FFFFFF";
    document.getElementById("epicT").style.borderWidth = "2px";
    
    document.getElementById("vocalT").style.opacity = 0.3;
    document.getElementById("vocalT").style.background = "#000000";
    document.getElementById("vocalT").style.color = "#FFFFFF";
    document.getElementById("vocalT").style.borderWidth = "2px";
    
    document.getElementById("drumsT").style.opacity = 0.3;
    document.getElementById("drumsT").style.background = "#000000";
    document.getElementById("drumsT").style.color = "#FFFFFF";
    document.getElementById("drumsT").style.borderWidth = "2px";
}

function handDetected(result){
    
    const array = [];
    for (let i = 0; i < result.length; i++) {
        let x = result[i].x;
        let y = result[i].y;
        array.push(whichField(x,y));
    }
    if(arrayAllSame(array)){
        triggered(array[0]);
        
    }
    
}

function arrayAllSame(array){
    let first = array[0];
    var count = 0;
    for (let i = 0; i < array.length; i++) {
        if(array[i] == first){
            count = count + 1;
        }
    }
    if(count == array.length){
        return true;
    }else{
        return false;
    }
}

function whichField(x,y){
    if(y<0.5){
        if(x<0.33){
            return "Bass";
        }else if(x<0.66){
            return "Lead";
        }else{
            return "High";
        }
    }else{
        if(x<0.33){
            return "Drums";
        }else if(x<0.66){
            return "Vocal";
        }else{
            return "Epic";
        }
    }
}

function triggered(field){
    if(field == "Bass"){
        if(bassEnded){
            bass.pause();
            bass.currentTime = 0;
            bassEnded = false;
        }
        bass.play();
        console.log("Bass");
        document.getElementById("bassT").style.background = "#3FBAFF";
        document.getElementById("bassT").style.color = "#000000";
        document.getElementById("bassT").style.borderWidth = "3px";
    }else if(field == "Lead"){
        if(leadEnded){
            lead.pause();
            lead.currentTime = 0;
            leadEnded = false;
        }
        lead.play();
        console.log("Lead");
        document.getElementById("leadT").style.background = "#3FBAFF";
        document.getElementById("leadT").style.color = "#000000";
        document.getElementById("leadT").style.borderWidth = "3px";
    }else if(field == "High"){
        if(highEnded){
            high.pause();
            high.currentTime = 0;
            highEnded = false;
        }
        high.play();
        console.log("High");
        document.getElementById("highT").style.background = "#3FBAFF";
        document.getElementById("highT").style.color = "#000000";
        document.getElementById("highT").style.borderWidth = "3px";
    }else if(field == "Drums"){
        if(drumsEnded){
            drums.pause();
            drums.currentTime = 0;
            drumsEnded = false;
        }
        drums.play();
        console.log("Drums");
        document.getElementById("drumsT").style.background = "#3FBAFF";
        document.getElementById("drumsT").style.color = "#000000";
        document.getElementById("drumsT").style.borderWidth = "3px";
    }else if(field == "Vocal"){
        if(vocalEnded){
            vocal.pause();
            vocal.currentTime = 0;
            vocalEnded = false;
        }
        vocal.play();
        console.log("Vocal");
        document.getElementById("vocalT").style.background = "#3FBAFF";
        document.getElementById("vocalT").style.color = "#000000";
        document.getElementById("vocalT").style.borderWidth = "3px";
    }else if(field == "Epic"){
        if(epicEnded){
            epic.pause();
            epic.currentTime = 0;
            epicEnded = false;
        }
        epic.play();
        console.log("Epic");
        document.getElementById("epicT").style.background = "#3FBAFF";
        document.getElementById("epicT").style.color = "#000000";
        document.getElementById("epicT").style.borderWidth = "3px";
    }
}

function onResults(results) {
    if(pause){
    
    }else{
    base.play();
    }
    
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
    
  if (results.multiHandLandmarks) {
        
      for (let i = 0; i < results.multiHandLandmarks.length; i++) {
        handDetected(results.multiHandLandmarks[i]);
      }
    for (const landmarks of results.multiHandLandmarks) {
      drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                     {color: '#3FBAFF', lineWidth: 3});
      drawLandmarks(canvasCtx, landmarks, {color: '#3FBAFF', lineWidth: 3});
    }
  }
  canvasCtx.restore();
}

const hands = new Hands({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
}});
hands.setOptions({
  maxNumHands: 2,
  minDetectionConfidence: 0.85,
  minTrackingConfidence: 0.85
});
hands.onResults(onResults);

const camera = new Camera(videoElement, {
  onFrame: async () => {
    camera.g.width = wTemp;
    camera.g.height = hTemp;
      console.log(camera);
    await hands.send({image: videoElement});
  },
    width: wTemp,
    height: hTemp
});


camera.start();

