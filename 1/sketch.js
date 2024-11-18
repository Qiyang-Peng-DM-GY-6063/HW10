let slider;
let song;
let samples;

function preload() {
  song = loadSound("Yellow_Submarine_Full.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(50, 300, 20); 
  slider.position(10, 10);
  slider.size(120);

  samples = song.getPeaks();
}

function draw() {
  background(255);

  let SUBMARINESIZE = slider.value();

  drawAudioBubbles();
  drawSubmarine(width / 2, height / 2, SUBMARINESIZE);
}

function drawAudioBubbles() {
  for (let idx = 0; idx < samples.length; idx += int(samples.length / 200)) {
    let x = map(idx, 0, samples.length - 1, 0, width);
    let y = map(samples[idx], -1, 1, 0, height);
    let size = map(samples[idx], -1, 1, 10, 70); // size 
    draw3DBubble(x, y, size);
  }
}

function draw3DBubble(x, y, size) {
  push();
  translate(x, y);

  // Shadow
  noStroke();
  fill(50, 50, 50, 80);
  ellipse(5, 5, size * 0.9, size * 0.9);

  // Main Bubble
  noStroke();
  fill(0, 100, 200);
  ellipse(0, 0, size, size);

  // Highlight
  fill(255, 255, 255, 180);
  ellipse(-size / 4, -size / 4, size / 5, size / 5);

  pop();
}

function drawSubmarine(x, y, size) {
  push(); 
  translate(x+15, y+15); 
  scale(size / 10); 

  fill(50, 50, 50, 80);
  noStroke();
  ellipse(0, 0, 200, 100); 

  rectMode(CENTER);
  fill(50, 50, 50, 80);
  rect(0, -50, 60, 40); 

  fill(50, 50, 50, 80);
  ellipse(-50, 0, 32); 
  ellipse(0, 0, 32);   
  ellipse(50, 0, 32);

  fill(50, 50, 50, 80);
  ellipse(110, 0, 20, 40); 

  pop();

  push(); 
  translate(x, y); 
  scale(size / 10); 

  fill(255, 204, 0); 
  noStroke();
  ellipse(0, 0, 200, 100); 

  rectMode(CENTER);
  fill(255, 204, 0);
  rect(0, -50, 60, 40); 

  fill(0, 100, 200, 160);
  ellipse(-50, 0, 32); 
  ellipse(0, 0, 32);   
  ellipse(50, 0, 32);

  fill(150);
  ellipse(110, 0, 20, 40); 

  pop();
}

function mouseClicked() {
  if (!song.isPlaying()) {
    song.play();
  }
}
