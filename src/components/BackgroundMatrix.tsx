import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  z: number;
  ox: number; // original X for oscillation
  oy: number; // original Y
  oz: number; // original Z
  color: string;
  size: number;
  speed: number;
}

export default function BackgroundMatrix() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  // Interaction coordinates
  const mouseRef = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const particleCount = isMobile ? 60 : 130;
    const particles: Particle[] = [];
    const colors = ["#d4af37", "#ca8a04", "#b45309", "#78350f", "#f59e0b"];

    // Initialize 3D particles revolving in space
    for (let i = 0; i < particleCount; i++) {
      // Cylindrical/spherical volume distribution
      const theta = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 500;
      const py = (Math.random() - 0.5) * 800;

      const px = Math.cos(theta) * radius;
      const pz = Math.sin(theta) * radius;

      particles.push({
        x: px,
        y: py,
        z: pz,
        ox: px,
        oy: py,
        oz: pz,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
        speed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1),
      });
    }

    // Set up ResizeObserver to handle fluid mutations
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: newW, height: newH } = entries[0].contentRect;
      canvas.width = newW;
      canvas.height = newH;
      width = newW;
      height = newH;
    });

    resizeObserverRef.current = resizeObserver;
    resizeObserver.observe(container);

    // Track cursor moves smoothly
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.tx = (x - rect.width / 2) * 0.5;
      mouseRef.current.ty = (y - rect.height / 2) * 0.5;
    };

    // Support touch orientation on mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        mouseRef.current.tx = (x - rect.width / 2) * 0.4;
        mouseRef.current.ty = (y - rect.height / 2) * 0.4;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animationId: number;
    let rotationAngle = 0;

    // Render loop
    const render = () => {
      // Fade canvas slightly for motion blur / streak visual style
      ctx.fillStyle = "rgba(3, 7, 18, 0.2)";
      ctx.fillRect(0, 0, width, height);

      // Dampened cursor move interpolation
      const mouse = mouseRef.current;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      // Slow global spin
      rotationAngle += 0.0005;

      const cosRot = Math.cos(rotationAngle);
      const sinRot = Math.sin(rotationAngle);

      const fov = 350; // Camera focal length
      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate and draw grid-like starfield
      particles.forEach((p) => {
        // Slow rotation around Y axis
        const rx1 = p.ox * cosRot - p.oz * sinRot;
        const rz1 = p.ox * sinRot + p.oz * cosRot;

        // Apply mouse sway in 3D
        const ry1 = p.oy + mouse.y * (p.oz / 400);
        const finalX = rx1 + mouse.x * (p.oz / 400);

        // Project 3D coordinate onto 2D viewport
        const distanceToScreen = rz1 + 800; // Offset on Z
        
        if (distanceToScreen > 10) {
          const scale = fov / distanceToScreen;
          const sx = centerX + finalX * scale;
          const sy = centerY + ry1 * scale;

          if (sx >= 0 && sx <= width && sy >= 0 && sy <= height) {
            // Draw particle glow
            ctx.beginPath();
            const alpha = Math.min(1, Math.max(0.1, scale * 1.5));
            ctx.fillStyle = p.color;
            ctx.globalAlpha = alpha;
            ctx.arc(sx, sy, p.size * scale * 0.8, 0, Math.PI * 2);
            ctx.fill();

            // Inter-node network grid web lines for sick cyber effect
            if (!isMobile) {
              particles.forEach((target) => {
                if (target !== p && Math.abs(target.oy - p.oy) < 120) {
                  const dx = target.ox - p.ox;
                  const dy = target.oy - p.oy;
                  const dz = target.oz - p.oz;
                  const distSquare = dx * dx + dy * dy + dz * dz;

                  if (distSquare < 15000) {
                    const rX2 = target.ox * cosRot - target.oz * sinRot;
                    const rZ2 = target.ox * sinRot + target.oz * cosRot;
                    const rY2 = target.oy + mouse.y * (target.oz / 400);
                    const finalX2 = rX2 + mouse.x * (target.oz / 400);
                    const scale2 = fov / (rZ2 + 800);

                    const sx2 = centerX + finalX2 * scale2;
                    const sy2 = centerY + rY2 * scale2;

                    const lineAlpha = (1 - Math.sqrt(distSquare) / 122) * 0.12 * alpha;
                    if (lineAlpha > 0) {
                      ctx.beginPath();
                      ctx.strokeStyle = p.color;
                      ctx.globalAlpha = lineAlpha;
                      ctx.lineWidth = 0.5;
                      ctx.moveTo(sx, sy);
                      ctx.lineTo(sx2, sy2);
                      ctx.stroke();
                    }
                  }
                }
              });
            }
          }
        }
      });

      ctx.globalAlpha = 1.0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 bg-[#020204] overflow-hidden select-none pointer-events-none"
    >
      <canvas ref={canvasRef} className="block w-full h-full pointer-events-none" />
      
      {/* Radiant atmospheric background blur bubbles */}
      <div className="absolute top-[20%] left-[15%] w-[45vw] h-[45vw] rounded-full bg-amber-955/10 blur-[130px] animated-glow-1 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[15%] w-[40vw] h-[40vw] rounded-full bg-stone-900/15 blur-[150px] animated-glow-2 pointer-events-none" />
    </div>
  );
}
