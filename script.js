var amplitude = 40;
const input = document.getElementById('input');

var interval = null;

// create web audio api elements
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();

// create Oscillator node
const oscillator = audioCtx.createOscillator();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";
oscillator.start();
gainNode.gain.value = 0;

notenames = new Map();
notenames.set("C", 261.6);
notenames.set("D", 293.7);
notenames.set("E", 329.6);
notenames.set("F", 349.2);
notenames.set("G", 392.0);
notenames.set("A", 440);
notenames.set("B", 493.9);

function frequency(pitch) {
    freq = pitch / 10000;
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);
}


function handle() {
    audioCtx.resume();
    gainNode.gain.value = 0;
    var usernotes = String(input.value);
    frequency(notenames.get(usernotes)); 
    drawWave();
}



//define canvas variables
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = ctx.canvas.width;
var height = ctx.canvas.height;

var counter = 0;

function drawWave() {
    // clears everything inside canvas 
    ctx.clearRect(0, 0, width, height);

    x = 0;
    y = height/2;

    // move pointer to left-most middle of canvas to start drawing wave there
    ctx.moveto(x, y);

    ctx.beginPath();
    counter = 0;
    interval = setInterval(line, 20);
}

function line() {
    y = height/2 + (amplitude * Math.sin(2 * Math.PI * freq * x));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;

    //increase counter by 1 to show how long interval has been run
    counter++;

    if(counter > 50) {
        clearInterval(interval);
    }
}
