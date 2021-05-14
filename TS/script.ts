const colors = ['#778DA9', '#1B263B', '#2C423F', '#E0E1DD'];
const backgroundColor = '#0D1B2A';
const width = Math.min(window.innerWidth, 600);
const height = Math.min(window.innerHeight, 600);
const totalFrames = 1000;
let frameCount = 0;


function easeInQuint(x: number): number {
  return x * x * x;
}

function easeOutQuart(x: number): number {
return 1 - pow(1 - x, 4);
}

function setup() {
  createCanvas(width, height);
  noiseSeed(50);
  let bg = color(backgroundColor);
  background(bg);
}

function draw() {
    frameCount += 4;

    let frameDelta = 2 * Math.PI * (frameCount % totalFrames) / totalFrames;

    let bg = color(backgroundColor);
    background(bg);

    let xStart = 0;
    let yStart = 0;
    let w = xStart + width;
    let h = yStart + height;

    let yDistance = 10;
    let xDistance = 10;

    for (let y = yStart; y < h; y+= yDistance) {
      for (let x = xStart; x < w; x+= xDistance) {
            let _x = x;

            let noiseOffset = frameDelta;
            let offsetY = noise(x * 0.01, -noiseOffset + y * 0.01) * 2.5;
            offsetY = Math.pow(offsetY, 6);
        
            let _y = y - Math.abs(Math.sin(frameDelta) * offsetY);
        
            let size = Math.abs(Math.sin(frameDelta) * (offsetY / 10))
            size = Math.max(size, 1);
            
            let pct = Math.abs(Math.sin(frameDelta) * (offsetY / 50));
            let colorA = color(colors[0]);
            let colorB = color(colors[3]);
            let colorC = color(colors[2]);
            pct = easeInQuint(pct);
            let _color = lerpColor(colorA, colorB, pct);

            let restPCT = Math.abs(Math.sin(frameDelta));
            restPCT = easeOutQuart(restPCT);
            _color = lerpColor(colorC, _color, restPCT);
        
            strokeWeight(1);
            stroke(_color);
            fill(_color);

            circle(_x, _y, size);
       }
    }
}