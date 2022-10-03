class Universe {
  constructor(moveRadius, step, position, size) {
    this.moveRadius = moveRadius;
    this.step = step;
    this.position = position;
    this.size = size;
  }
  draw() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(
      Math.cos(this.position) * this.moveRadius + canvas.width / 2,
      Math.sin(this.position) * this.moveRadius + canvas.height / 2,
      this.size,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.closePath();
  }
  update() {
    this.position += this.step;
    this.draw();
  }
}
function init() {
  particleArray = [];
  for (let i = 0; i < canvas.width; i++) {
    let moveRadius = Math.random() * canvas.width;
    let step = Math.random() * 0.00055 + 0.00055;
    let position = Math.random() * (Math.PI * 2);
    let size = Math.random() * 2 + 0.75;
    particleArray.push(new Universe(moveRadius, step, position, size));
  }
}


function handleBgStars() {
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
    particleArray[i].draw();
  }
}
