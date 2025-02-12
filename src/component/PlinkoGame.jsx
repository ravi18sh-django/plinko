import React, { useEffect, useRef } from "react";

const PlinkoGame = () => {
  const canvasRef = useRef(null); // Reference to the canvas

  // Constants
  const DECIMAL_MULTIPLIER = 10000;
  const WIDTH = 800;
  const HEIGHT = 800;
  const ballRadius = 7;
  const obstacleRadius = 4;
  const gravity = pad(0.2);
  const horizontalFriction = 0.4;
  const verticalFriction = 0.8;

  const balls = [];
  const obstacles = [];
  const sinks = [];

  function pad(n) {
    return n * DECIMAL_MULTIPLIER;
  }

  function unpad(n) {
    return Math.floor(n / DECIMAL_MULTIPLIER);
  }

  // Create obstacles in a pyramid shape
  const rows = 16;
  for (let row = 2; row < rows; row++) {
    const numObstacles = row + 1;
    const y = 0 + row * 35;
    const spacing = 36;
    for (let col = 0; col < numObstacles; col++) {
      const x = WIDTH / 2 - spacing * (row / 2 - col);
      obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
    }
  }

  // Create sinks at the bottom
  const sinkWidth = 36;
  const NUM_SINKS = 15;
  for (let i = 0; i < NUM_SINKS; i++) {
    const x = WIDTH / 2 + (i - 7.5) * sinkWidth + obstacleRadius;
    const y = HEIGHT - 240;
    const width = sinkWidth;
    const height = width;
    sinks.push({ x, y, width, height });
  }

  class Ball {
    constructor(x, y, radius, color) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.color = color;
      this.vx = 0;
      this.vy = 0;
    }

    draw(ctx) {
      ctx.beginPath();
      ctx.arc(unpad(this.x), unpad(this.y), this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }

    update() {
      this.vy += gravity;
      this.x += this.vx;
      this.y += this.vy;

      // Collision with obstacles
      obstacles.forEach((obstacle) => {
        const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
        if (dist < pad(this.radius + obstacle.radius)) {
          const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
          const speed = Math.sqrt(this.vx ** 2 + this.vy ** 2);
          this.vx = Math.cos(angle) * speed * horizontalFriction;
          this.vy = Math.sin(angle) * speed * verticalFriction;

          const overlap = this.radius + obstacle.radius - unpad(dist);
          this.x += pad(Math.cos(angle) * overlap);
          this.y += pad(Math.sin(angle) * overlap);
        }
      });

      // Collision with sinks
      sinks.forEach((sink) => {
        if (
          unpad(this.x) > sink.x - sink.width / 2 &&
          unpad(this.x) < sink.x + sink.width / 2 &&
          unpad(this.y) + this.radius > sink.y - sink.height / 2
        ) {
          this.vx = 0;
          this.vy = 0;
        }
      });
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Initial ball
    const initialBall = new Ball(pad(WIDTH / 2 + 23), pad(50), ballRadius, "red");
    balls.push(initialBall);

    // Draw obstacles
    function drawObstacles() {
      ctx.fillStyle = "white";
      obstacles.forEach((obstacle) => {
        ctx.beginPath();
        ctx.arc(unpad(obstacle.x), unpad(obstacle.y), obstacle.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      });
    }

    // Draw sinks
    function drawSinks() {
      ctx.fillStyle = "green";
      sinks.forEach((sink) => {
        ctx.fillRect(
          sink.x - sink.width / 2,
          sink.y - sink.height / 2,
          sink.width,
          sink.height
        );
      });
    }

    // Add a new ball
    function addBall() {
      const newBall = new Ball(pad(WIDTH / 2 + 13), pad(50), ballRadius, "red");
      balls.push(newBall);
    }

    // Attach event listener for adding balls
    canvas.addEventListener("click", addBall);

    function draw() {
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      drawObstacles();
      drawSinks();
      balls.forEach((ball) => {
        ball.draw(ctx);
        ball.update();
      });
    }

    function update() {
      draw();
      requestAnimationFrame(update);
    }

    update();

    // Cleanup
    return () => {
      canvas.removeEventListener("click", addBall);
    };
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ backgroundColor: "#000", display: "block", margin: "0 auto" }}
      />
    </div>
  );
};

export default PlinkoGame;
