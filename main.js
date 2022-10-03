/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const scores = document.getElementById("score");
let highestScore = document.getElementById("hScore");
const startBtn = document.getElementById("startBtn");
const hsResetBtn = document.getElementById("hsResetBtn");

let player;
let bullet;
let bullets = [];
let enemy;
let enemies = [];
let expParticles = []
let particleArray = [];
let angle;
let frame = 0;
let animationId;
let hue = 0;
let score = 0;
let highScore = localStorage.getItem("sSHighScore") || 0;
player = new Player(
  canvas.width / 2,
  canvas.height / 2,
  15,
  "hsl(159, 90%, 61%)"
);

function animate() {
  animationId = requestAnimationFrame(animate);
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleBgStars();
  handleBullets();
  player.show();
  initEnemies();
  handleEnemies();
  bulletEnemyCollision();
  playerEnemyCollision();
  handleExpParticle();
  hue++;
  frame++;
  highestScores();
  scores.innerHTML = score;
  highestScore.innerHTML = highScore;
}

animate();
init();

canvas.addEventListener("click", function (e) {
  angle = Math.atan2(
    e.clientY - canvas.height / 2,
    e.clientX - canvas.width / 2
  );
  let x = canvas.width / 2;
  let y = canvas.height / 2;
  let r = 6;
  let velX = Math.cos(angle) * 6;
  let velY = Math.sin(angle) * 6;
  let color = "white";
  bullet = new Bullet(x, y, r, velX, velY, color);
  bullets.push(bullet);
});
function highestScores() {
  if (score > parseInt(localStorage.getItem("sSHighScore"))) {
    localStorage.setItem("sSHighScore", score);
    let hsScore = localStorage.getItem("sSHighScore");
    highestScore = hsScore;
  }
}
startBtn.addEventListener("click", function (e) {
  e.preventDefault();
  location.reload();
});
hsResetBtn.addEventListener("click", function () {
  localStorage.setItem("sSHighScore", 0);
  location.reload();
});

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  this.location.reload();
});
