import { useEffect, useRef } from "react";

// Lab 5: canvas tank game — Assignment 1 (boundaries) + Assignment 2 (features)
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 600;
const TANK_SIZE = 40;
const TANK_SPEED = 220; // pixels per second
const BULLET_SPEED = 420;
const FIRE_COOLDOWN_MS = 280;

/** Lab 5: clamp numeric value to [min, max] (used for tank boundary fix). */
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * Lab 5 Assignment 1 — core game tick.
 * Moves the tank from keyboard input and ensures the 40×40 tank stays fully inside 800×600.
 */
function updateGame(game, dtSec) {
  const { keys, tank } = game;

  let vx = 0;
  let vy = 0;
  if (keys.ArrowLeft || keys.a || keys.A) vx -= 1;
  if (keys.ArrowRight || keys.d || keys.D) vx += 1;
  if (keys.ArrowUp || keys.w || keys.W) vy -= 1;
  if (keys.ArrowDown || keys.s || keys.S) vy += 1;

  const len = Math.hypot(vx, vy);
  if (len > 0) {
    vx = (vx / len) * TANK_SPEED * dtSec;
    vy = (vy / len) * TANK_SPEED * dtSec;
  }

  tank.x += vx;
  tank.y += vy;

  // Lab 5 Assignment 1 — boundary fix: keep entire tank inside the canvas
  const maxX = CANVAS_WIDTH - TANK_SIZE;
  const maxY = CANVAS_HEIGHT - TANK_SIZE;
  tank.x = clamp(tank.x, 0, maxX);
  tank.y = clamp(tank.y, 0, maxY);

  // Bullets
  for (let i = game.bullets.length - 1; i >= 0; i--) {
    const b = game.bullets[i];
    b.x += b.vx * dtSec;
    b.y += b.vy * dtSec;
    if (
      b.x < -8 ||
      b.x > CANVAS_WIDTH + 8 ||
      b.y < -8 ||
      b.y > CANVAS_HEIGHT + 8
    ) {
      game.bullets.splice(i, 1);
    }
  }

  // Lab 5 Assignment 2 (Enemy targets): bullet vs enemy hit test + score
  for (let ei = game.enemies.length - 1; ei >= 0; ei--) {
    const e = game.enemies[ei];
    for (let bi = game.bullets.length - 1; bi >= 0; bi--) {
      const b = game.bullets[bi];
      if (
        b.x >= e.x &&
        b.x <= e.x + e.w &&
        b.y >= e.y &&
        b.y <= e.y + e.h
      ) {
        game.bullets.splice(bi, 1);
        game.enemies.splice(ei, 1);
        game.score += 100;
        // Lab 5 Assignment 2 (Visual feedback): brief explosion marker at hit
        game.hitFlashes.push({
          x: e.x + e.w / 2,
          y: e.y + e.h / 2,
          t: 0.35
        });
        break;
      }
    }
  }

  // Decay hit flashes
  for (let i = game.hitFlashes.length - 1; i >= 0; i--) {
    const f = game.hitFlashes[i];
    f.t -= dtSec;
    if (f.t <= 0) game.hitFlashes.splice(i, 1);
  }
}

/** Lab 5 Assignment 2 (Landscape): draw sky, distant hills, and ground band. */
function drawLandscape(ctx) {
  const grd = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
  grd.addColorStop(0, "#1a2a4a");
  grd.addColorStop(0.55, "#2d4a6e");
  grd.addColorStop(1, "#1e3d2a");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = "rgba(20, 35, 25, 0.85)";
  ctx.beginPath();
  ctx.moveTo(0, 420);
  ctx.bezierCurveTo(180, 360, 320, 480, 500, 400);
  ctx.bezierCurveTo(620, 340, 720, 440, CANVAS_WIDTH, 380);
  ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.lineTo(0, CANVAS_HEIGHT);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "rgba(45, 80, 50, 0.9)";
  ctx.fillRect(0, CANVAS_HEIGHT - 72, CANVAS_WIDTH, 72);
}

function drawTank(ctx, tank) {
  ctx.save();
  ctx.translate(tank.x + TANK_SIZE / 2, tank.y + TANK_SIZE / 2);
  ctx.rotate(tank.angle);
  ctx.fillStyle = "#6cb85c";
  ctx.strokeStyle = "#2d5a28";
  ctx.lineWidth = 2;
  ctx.fillRect(-TANK_SIZE / 2 + 2, -TANK_SIZE / 2 + 2, TANK_SIZE - 4, TANK_SIZE - 4);
  ctx.strokeRect(-TANK_SIZE / 2 + 2, -TANK_SIZE / 2 + 2, TANK_SIZE - 4, TANK_SIZE - 4);
  ctx.fillStyle = "#3d7a33";
  ctx.fillRect(4, -6, 22, 12);
  ctx.restore();
}

function drawEnemies(ctx, enemies) {
  ctx.fillStyle = "#c44";
  ctx.strokeStyle = "#822";
  for (const e of enemies) {
    ctx.fillRect(e.x, e.y, e.w, e.h);
    ctx.strokeRect(e.x, e.y, e.w, e.h);
  }
}

function drawBullets(ctx, bullets) {
  ctx.fillStyle = "#ffeb3b";
  for (const b of bullets) {
    ctx.beginPath();
    ctx.arc(b.x, b.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }
}

/** Lab 5 Assignment 2 (Visual feedback): expanding ring + glow at enemy hits. */
function drawHitFlashes(ctx, hitFlashes) {
  for (const f of hitFlashes) {
    const alpha = Math.max(0, f.t / 0.35);
    const r = (1 - alpha) * 48 + 8;
    ctx.strokeStyle = `rgba(255, 200, 80, ${alpha * 0.9})`;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(f.x, f.y, r, 0, Math.PI * 2);
    ctx.stroke();
  }
}

function aimFromTank(tank, targetX, targetY) {
  const cx = tank.x + TANK_SIZE / 2;
  const cy = tank.y + TANK_SIZE / 2;
  return Math.atan2(targetY - cy, targetX - cx);
}

export default function TankGame() {
  const canvasRef = useRef(null);
  const gameRef = useRef(null);
  const keysRef = useRef({});
  const lastFireRef = useRef(0);
  const mouseRef = useRef({ x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 });

  useEffect(() => {
    // Lab 5: initial game state (enemies = Assignment 2 Option A)
    gameRef.current = {
      tank: {
        x: CANVAS_WIDTH / 2 - TANK_SIZE / 2,
        y: CANVAS_HEIGHT / 2 - TANK_SIZE / 2,
        angle: 0
      },
      bullets: [],
      enemies: [
        { x: 120, y: 100, w: 36, h: 36 },
        { x: 640, y: 120, w: 36, h: 36 },
        { x: 400, y: 80, w: 36, h: 36 },
        { x: 200, y: 300, w: 36, h: 36 },
        { x: 600, y: 340, w: 36, h: 36 }
      ],
      hitFlashes: [],
      score: 0,
      keys: keysRef.current
    };

    const onKeyDown = (e) => {
      keysRef.current[e.key] = true;
    };
    const onKeyUp = (e) => {
      keysRef.current[e.key] = false;
    };

    const canvas = canvasRef.current;
    const onMouseMove = (ev) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = CANVAS_WIDTH / rect.width;
      const scaleY = CANVAS_HEIGHT / rect.height;
      mouseRef.current = {
        x: (ev.clientX - rect.left) * scaleX,
        y: (ev.clientY - rect.top) * scaleY
      };
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas?.addEventListener("mousemove", onMouseMove);

    let raf = 0;
    let last = performance.now();

    const loop = (now) => {
      const game = gameRef.current;
      if (!game) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      game.keys = keysRef.current;

      game.tank.angle = aimFromTank(
        game.tank,
        mouseRef.current.x,
        mouseRef.current.y
      );

      updateGame(game, dt);

      const ctx = canvas?.getContext("2d");
      if (ctx) {
        drawLandscape(ctx);
        drawEnemies(ctx, game.enemies);
        drawTank(ctx, game.tank);
        drawHitFlashes(ctx, game.hitFlashes);
        drawBullets(ctx, game.bullets);

        ctx.fillStyle = "rgba(0,0,0,0.45)";
        ctx.fillRect(12, 12, 200, 36);
        ctx.fillStyle = "#e8f0ff";
        ctx.font = "16px system-ui, sans-serif";
        ctx.fillText(`Score: ${game.score}`, 24, 34);
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    const onMouseDown = (ev) => {
      if (ev.button !== 0) return;
      const now = performance.now();
      if (now - lastFireRef.current < FIRE_COOLDOWN_MS) return;
      lastFireRef.current = now;
      const game = gameRef.current;
      if (!game) return;
      const t = game.tank;
      const cx = t.x + TANK_SIZE / 2;
      const cy = t.y + TANK_SIZE / 2;
      const ang = t.angle;
      game.bullets.push({
        x: cx + Math.cos(ang) * 24,
        y: cy + Math.sin(ang) * 24,
        vx: Math.cos(ang) * BULLET_SPEED,
        vy: Math.sin(ang) * BULLET_SPEED
      });
    };
    canvas?.addEventListener("mousedown", onMouseDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas?.removeEventListener("mousemove", onMouseMove);
      canvas?.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <div className="tankGameWrap">
      <div className="panel">
        <h2>Lab 5 — Tank Canvas Game</h2>
        <p>
          Assignment 1: tank movement is clamped so the 40×40 tank cannot leave the
          800×600 canvas. Assignment 2: enemy targets, landscape background, and hit
          visual feedback.
        </p>
        <ul className="tankHelpList">
          <li>WASD or arrow keys — move the tank</li>
          <li>Mouse — aim turret</li>
          <li>Left click — fire (short cooldown)</li>
        </ul>
      </div>
      <div className="tankCanvasOuter">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="tankCanvas"
        />
      </div>
    </div>
  );
}
