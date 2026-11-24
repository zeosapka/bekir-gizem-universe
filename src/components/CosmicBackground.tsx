import { useEffect, useRef } from "react";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

interface CosmicStar {
  xNorm: number; // 0..1 normalized X (orientation değişiminde anında yeni genişliğe yayılır!)
  yNorm: number; // 0..1 normalized Y
  size: number;
  speedY: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  isSparkle: boolean;
}

const STAR_COLORS = ["#FFFFFF", "#A7F3D0", "#BAE6FD", "#F5D58A"];

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { particleCountMultiplier, isReducedMotion } = usePerformanceProfile();
  const isReducedMotionRef = useRef(isReducedMotion);
  isReducedMotionRef.current = isReducedMotion;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const starCount = Math.max(28, Math.round(72 * particleCountMultiplier));
    const stars: CosmicStar[] = [];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        xNorm: ((i * 73 + 17) % 100) / 100 + (Math.random() * 0.02 - 0.01),
        yNorm: ((i * 41 + 29) % 100) / 100,
        size: 1.1 + (i % 4) * 0.65,
        speedY: 0.00012 + (i % 5) * 0.00006,
        twinkleSpeed: 1.2 + (i % 4) * 0.55,
        twinklePhase: i * 0.85,
        color: STAR_COLORS[i % STAR_COLORS.length],
        isSparkle: i % 5 === 0,
      });
    }

    let rafId: number | null = null;
    let isCancelled = false;

    const renderStars = (now: number) => {
      if (isCancelled) return;

      // ÖNEMLİ: canvas.style.width / height ASLA inline piksel olarak atanmaz!
      // CSS (w-full h-full) tarayıcı tarafından yönetilir; biz yalnızca clientWidth/Height okuruz.
      const cssW = Math.max(300, canvas.clientWidth || window.innerWidth || 1024);
      const cssH = Math.max(300, canvas.clientHeight || window.innerHeight || 768);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const bufW = Math.round(cssW * dpr);
      const bufH = Math.round(cssH * dpr);

      if (canvas.width !== bufW || canvas.height !== bufH) {
        canvas.width = bufW;
        canvas.height = bufH;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const timeSec = now * 0.001;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        if (!isReducedMotionRef.current) {
          s.yNorm -= s.speedY;
          if (s.yNorm < -0.02) {
            s.yNorm = 1.02;
          }
        }

        const x = s.xNorm * cssW;
        const y = s.yNorm * cssH;
        const alpha = isReducedMotionRef.current
          ? 0.55
          : 0.22 + 0.65 * (0.5 + 0.5 * Math.sin(timeSec * s.twinkleSpeed + s.twinklePhase));

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;

        if (s.isSparkle) {
          const r = s.size * 1.45;
          ctx.beginPath();
          ctx.moveTo(x, y - r);
          ctx.lineTo(x + r * 0.25, y - r * 0.25);
          ctx.lineTo(x + r, y);
          ctx.lineTo(x + r * 0.25, y + r * 0.25);
          ctx.lineTo(x, y + r);
          ctx.lineTo(x - r * 0.25, y + r * 0.25);
          ctx.lineTo(x - r, y);
          ctx.lineTo(x - r * 0.25, y - r * 0.25);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();
      rafId = window.requestAnimationFrame(renderStars);
    };

    rafId = window.requestAnimationFrame(renderStars);

    return () => {
      isCancelled = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [particleCountMultiplier]);

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dengeli Açık Yeşil ve Mavi Tonlarında Çok Katmanlı Arka Plan */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: [
            "radial-gradient(circle at 20% 22%, rgba(110, 231, 183, 0.34) 0%, transparent 52%)",
            "radial-gradient(circle at 80% 24%, rgba(125, 211, 252, 0.34) 0%, transparent 52%)",
            "radial-gradient(circle at 28% 78%, rgba(52, 211, 153, 0.24) 0%, transparent 55%)",
            "radial-gradient(circle at 75% 76%, rgba(56, 189, 248, 0.28) 0%, transparent 55%)",
            "linear-gradient(135deg, #136F63 0%, #17857B 34%, #1C7DA6 68%, #1E5F8E 100%)",
          ].join(", "),
        }}
      />

      {/* Normalize Koordinatlı (0..1) Yıldız Kanvası: Yön değişiminde inline piksel kilidi olmadan anında yeni boyuta yayılır */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Subtle Rising Ambient Hearts (GPU-accelerated CSS) */}
      {!isReducedMotion && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {[...Array(8)].map((_, idx) => (
            <span
              key={idx}
              className="ambient-rising-heart select-none"
              style={{
                left: `${10 + idx * 11.5}%`,
                animationDelay: `${idx * 2.1}s`,
                animationDuration: `${14 + (idx % 4) * 3}s`,
                fontSize: `${12 + (idx % 3) * 5}px`,
                opacity: 0.22,
              }}
            >
              {idx % 3 === 0 ? "✦" : "♥"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
