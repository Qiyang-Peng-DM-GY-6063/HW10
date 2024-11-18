let slider;
let song;
let mFFT;

function preload() {
  song = loadSound("./Yellow_Submarin_1min.m4a");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  slider = createSlider(50, 300, 150); 
  slider.position(10, 10);
  slider.size(120);

  mFFT = new p5.FFT();
}

function draw() {
  background(255);

  let SUBMARINESIZE = slider.value();

  mFFT.analyze();

  let energyH = mFFT.getEnergy("highMid");
  let diamH = map(energyH, 0, 255, 10, 60);

  let energyM = mFFT.getEnergy("mid");
  let diamM = map(energyM, 0, 255, 10, 60);

  let energyB = mFFT.getEnergy("bass");
  let diamB = map(energyB, 0, 255, 10, 60);

  drawSubmarine(width / 2, height / 2, SUBMARINESIZE, diamH, diamM, diamB);
}

function drawSubmarine(x, y, size, diamH, diamM, diamB) {
  push(); 
  translate(x, y); 
  scale(size / 10); 

  fill(255, 204, 0); 
  noStroke();
  ellipse(0, 0, 200, 100); 

  rectMode(CENTER);
  fill(255, 204, 0);
  rect(0, -50, 60, 40); 

  stroke(0, 100, 200,160);
  ellipse(-50, 0, diamB, diamB); // Left 
  ellipse(0, 0, diamM, diamM);   // Center 
  ellipse(50, 0, diamH, diamH);  // Right

  fill(200, 80, 10);
  ellipse(-50, 0, 32); 
  ellipse(0, 0, 32);   
  ellipse(50, 0, 32);

  noStroke();
  fill(25);
  ellipse(110, 0, 20, 40); 


  pop();
}

function mouseClicked() {
  if (!song.isPlaying()) {
    song.play();
  }
}
