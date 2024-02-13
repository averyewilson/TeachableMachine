let classifier = null;
let listening = false;
let label = "waiting for color";
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/TWvbhWaAf/model.json';

function setup() {
  let canvas = createCanvas(320, 240);
  canvas.parent('canvas-container');
}

function startListening() {
  // If the classifier doesn't exist, create a new one
  if (!classifier) {
    classifier = ml5.soundClassifier(soundModelURL, modelReady);
  } else {
    // Otherwise, classify with the existing classifier
    classifier.classify(gotResult);
    label = "listening";
    listening = true; // Set listening to true
  }
  // Enable/disable buttons accordingly
  document.getElementById('startBtn').disabled = true;
  document.getElementById('stopBtn').disabled = false;
}

function stopListening() {
  // Reset classifier and listening state
  classifier = null;
  listening = false;
  // Reset the label
  label = "waiting for color";
  // Enable/disable buttons accordingly
  document.getElementById('startBtn').disabled = false;
  document.getElementById('stopBtn').disabled = true;
}

function draw(){
 background(0);

  if (label == 'waiting for color') {
    background(0);
    textSize(30);
    fill(255);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  } else if (label == 'Red') {
    background(255,0,0);
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  } else if (label == 'Orange') {
    background(255,171,0);
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  } else if (label == 'Yellow') {
    background(250,236,73);
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  } else if (label == 'Green') {
    background(34,161,38);
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  } else if (label == 'Blue') {
    background(29,29,236);
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  } else if (label == 'Purple') {
    background(160,29,236);
    textSize(50);
    fill(255);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  }
  else {
  background(0);
  fill(255);
  textSize(32);
  textAlign(CENTER, CENTER);
  text(label, width / 2, height / 2);
  }
}

// Callback function to be called when the model is loaded
function modelReady() {
  classifier.classify(gotResult);
  label = "listening";
  listening = true; // Set listening to true
}

// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // Check if listening is true before updating the label
  if (listening) {
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
  }
}
