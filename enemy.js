class Enemy {
  constructor(x, y, r, velX, velY, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = velX;
    this.velY = velY;
    this.acc = 0.5;
    this.color = color;
  }
  show() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x = this.x + this.velX;
    this.y = this.y + this.velY;
  }
}
function initEnemies() {
  let r = Math.random() * (40 - 5) + 5;
  let x;
  let y;
  if (Math.random() < 0.5) {
    x = Math.random() < 0.5 ? 0 - r : canvas.width + r;
    y = Math.random() * canvas.height;
  } else {
    x = Math.random() * canvas.width;
    y = Math.random() < 0.5 ? 0 - r : canvas.height + r;
  }
  let hue = Math.random() * 359;
  let color = "hsla(" + hue + ", 50%, 50%, 59)";
  angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
  let velX = Math.cos(angle);
  let velY = Math.sin(angle);
  if (frame % 100 === 0) {
    enemies.unshift(new Enemy(x, y, r, velX, velY, color));
  }
}

function handleEnemies() {
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].show();
    enemies[i].update();
  }
}
function playerEnemyCollision() {
  for (let i = 0; i < enemies.length; i++) {
    let dx = player.x - enemies[i].x;
    let dy = player.y - enemies[i].y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < player.r + enemies[i].r) {
      highestScores();
      ctx.font = "25px Aerial";
      ctx.fillStyle = "white";
      ctx.fillText(
        " Game Over Your Score was : " + score,
        canvas.width/2 -170,
        canvas.height / 2 - 70
      ); 
      explosionSound.play();
      startBtn.style.display = 'block'
      hsResetBtn.style.display = 'block'
      cancelAnimationFrame(animationId);
    }
  }
}
