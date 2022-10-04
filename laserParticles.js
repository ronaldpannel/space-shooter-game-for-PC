class Bullet {
  constructor(x, y, r, velX, velY, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.velX = velX;
    this.velY = velY;
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
function handleBullets() {
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].show();
    bullets[i].update();
    if (
      bullets[i].x > canvas.width ||
      bullets[i].x < 0 ||
      bullets[i].y > canvas.height ||
      bullets[i].y < 0
    ) {
      bullets.splice(i, 1);
    }
  }
}

function bulletEnemyCollision() {
  for (let i = 0; i < bullets.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      let dx = bullets[i].x - enemies[j].x;
      let dy = bullets[i].y - enemies[j].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < bullets[i].r + enemies[j].r) {
        for (let p = 0; p <= bullets[i].r *5; p++) {
          let x = bullets[i].x;
          let y = bullets[i].y;
          let r = 4;
          let velX = (Math.random() + -0.5) * 5;
          let velY = (Math.random() + -0.5) * 5;
          expParticles.push(new ExpParticle(x, y, r, velX, velY));
        }
        if (enemies[j].r > 20) {
          enemies[j].r -= 10;
          bullets.splice(i, 1);
        } else {
          enemies.splice(j, 1);
          bullets.splice(i, 1);
        }
        score+=10
        explosionSound.play();
        highestScores();
      }
    }
  }
}
