class ExpParticle {
  constructor(x, y, r, velX, velY) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = velX;
    this.velY = velY;
    this.opacity = 1;
  }
  show() {
    ctx.beginPath();
    ctx.fillStyle = "hsla(" + hue + ", 50%, 50%, " + this.opacity + ")";
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;
    this.opacity -= 0.03;

    for (let i = 0; i < expParticles.length; i++) {
      if (this.opacity <= 0) expParticles.splice(i, 1);
    }
  }
}

function handleExpParticle() {
  for (let i = 0; i < expParticles.length; i++) {
    expParticles[i].show();
    expParticles[i].update();
  }
}
