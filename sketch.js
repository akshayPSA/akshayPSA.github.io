const FR = 60;
let L,
  ctrls,
  n = 15,
  c = 0,
  dc = 0.25;

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent("cover");
  L = (width < height ? width : height) / 2;
  frameRate(FR);
  noStroke();
  smooth();
  background(0);
  ctrls = [];
  for (let i = 0; i < n; i++) {
    ctrls.push(new Point());
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

function draw() {
  background("rgba(0,0,0, 0.04)");
  drawingContext.beginPath();
  drawingContext.moveTo(
    (ctrls[0].x + ctrls[n - 1].x) / 2,
    (ctrls[0].y + ctrls[n - 1].y) / 2
  );
  for (let p = 0; p < n; p++) {
    let q = p + 1;
    if (q == n) q = 0;
    drawingContext.quadraticCurveTo(
      ctrls[p].x,
      ctrls[p].y,
      (ctrls[p].x + ctrls[q].x) / 2,
      (ctrls[p].y + ctrls[q].y) / 2
    );
    ctrls[p].update();
  }
  //drawingContext.strokeStyle = `hsl(${round(180 + c)}deg, 100%, 70%)`;
  drawingContext.strokeStyle = `hsl(274deg, 93%, 73%)`;
  drawingContext.shadowBlur = (L * 30) / 432;
  //drawingContext.shadowColor = `hsl(${round(180 + c)}deg, 100%, 50%)`;
  drawingContext.shadowColor = `hsl(259deg, 68%, 62%)`;
  drawingContext.lineWidth = (L * 2) / 432;

  drawingContext.stroke();
  drawingContext.shadowColor = "transparent";
  c += dc;
  if (c >= 170 || c <= 0) dc = -dc;
}

class Point {
  constructor() {
    this.ang = random(0, 2 * PI);
    this.dang = random(-0.5, 0.5) / 10;
    this.r = (2 * L) / 3;
    this.x = width / 2 + this.r * cos(this.ang);
    this.y = height / 2 + this.r * sin(this.ang);
  }

  update() {
    this.ang += this.dang;
    this.x = width / 2 + this.r * cos(this.ang);
    this.y = height / 2 + this.r * sin(this.ang);
  }
}
