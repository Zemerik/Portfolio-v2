import React, { useRef, useEffect } from "react";

const STAR_COUNT = 120;
const STAR_COLORS = ["#fff", "#c9e7ff", "#ffe3c9"];
const STAR_MIN_RADIUS = 0.4;
const STAR_MAX_RADIUS = 1.2;
const STAR_MIN_VEL = 0.004;
const STAR_MAX_VEL = 0.05;

function random(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

function createStar(width: number, height: number) {
  return {
    x: random(0, width),
    y: random(0, height),
    r: random(STAR_MIN_RADIUS, STAR_MAX_RADIUS),
    color: STAR_COLORS[Math.floor(random(0, STAR_COLORS.length))],
    vel: random(STAR_MIN_VEL, STAR_MAX_VEL) * (Math.random() > 0.5 ? 1 : -1),
    alpha: random(0.7, 1)
  };
}

const StarField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      starsRef.current = Array.from({
        length: STAR_COUNT
      }, () => createStar(canvas.width, canvas.height));
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    let animationId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of starsRef.current) {
        // Animate star "twinkling"
        star.alpha += random(-0.008, 0.008);
        star.alpha = Math.max(0.6, Math.min(star.alpha, 1));
        // Move star slightly
        star.x += star.vel;
        if (star.x < 0 || star.x > canvas.width) {
          star.x = (star.x + canvas.width) % canvas.width;
        }
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.shadowColor = star.color;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none"
      }}
      aria-hidden="true"
    />
  );
};

export default StarField;

