import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { Sparkles, Heart } from "lucide-react";
import { UNIVERSE_CONFIG } from "../config/universeConfig";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";
import { useViewportMetrics } from "../hooks/useViewportMetrics";

interface OpeningPortalProps {
  onEnterUniverse: () => void;
}

function traceCenteredHeartPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  const r = radius;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 0.36);
  ctx.bezierCurveTo(
    cx - r * 0.12,
    cy - r * 0.95,
    cx - r * 1.05,
    cy - r * 0.88,
    cx - r * 1.05,
    cy - r * 0.25
  );
  ctx.bezierCurveTo(
    cx - r * 1.05,
    cy + r * 0.32,
    cx - r * 0.35,
    cy + r * 0.68,
    cx,
    cy + r * 1.02
  );
  ctx.bezierCurveTo(
    cx + r * 0.35,
    cy + r * 0.68,
    cx + r * 1.05,
    cy + r * 0.32,
    cx + r * 1.05,
    cy - r * 0.25
  );
  ctx.bezierCurveTo(
    cx + r * 1.05,
    cy - r * 0.88,
    cx + r * 0.12,
    cy - r * 0.95,
    cx,
    cy - r * 0.36
  );
  ctx.closePath();
}

export function OpeningPortal({ onEnterUniverse }: OpeningPortalProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heartCoreRef = useRef<HTMLDivElement>(null);
  const portalCanvasRef = useRef<HTMLCanvasElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion, particleCountMultiplier } = usePerformanceProfile();
  const viewport = useViewportMetrics();

  const handleEnterClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    // Trigger pink & gold particle burst
    const count = Math.round(95 * particleCountMultiplier);
    confetti({
      particleCount: count,
      spread: 110,
      origin: { y: 0.55 },
      colors: ["#E83E70", "#FF91B5", "#F5D58A", "#FFF8FC"],
      scalar: 1.15,
      ticks: 220,
    });

    if (isReducedMotion) {
      setTimeout(() => {
        onEnterUniverse();
      }, 450);
      return;
    }

    // Kalp ikonunun ekrandaki tam merkez koordinatını al
    let originX = window.innerWidth / 2;
    let originY = window.innerHeight * 0.34;
    if (heartCoreRef.current) {
      const rect = heartCoreRef.current.getBoundingClientRect();
      originX = rect.left + rect.width / 2;
      originY = rect.top + rect.height / 2;
    }

    const portalState = { progress: 0 };

    const renderHeartWaveFrame = () => {
      const canvas = portalCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const vpW = Math.max(
        300,
        Math.round(canvas.clientWidth || window.innerWidth || 1024)
      );
      const vpH = Math.max(
        300,
        Math.round(canvas.clientHeight || window.innerHeight || 768)
      );
      if (
        canvas.width !== Math.round(vpW * dpr) ||
        canvas.height !== Math.round(vpH * dpr)
      ) {
        canvas.width = Math.round(vpW * dpr);
        canvas.height = Math.round(vpH * dpr);
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, vpW, vpH);

      const p = portalState.progress;
      const maxDiag = Math.hypot(vpW, vpH) * 1.45;

      const waves = [
        {
          delay: 0,
          c0: "#FFFFFF",
          c1: "#BAE6FD",
          c2: "#38BDF8",
          alpha: 0.96,
        },
        {
          delay: 0.12,
          c0: "#FFFFFF",
          c1: "#A7F3D0",
          c2: "#10B981",
          alpha: 0.98,
        },
        {
          delay: 0.24,
          c0: "#1DB59A",
          c1: "#169882",
          c2: "#1D82C4",
          alpha: 1,
        },
      ];

      for (const w of waves) {
        const localT = Math.max(0, Math.min(1, (p - w.delay) / (1 - w.delay)));
        if (localT <= 0.001) continue;
        const easedT = Math.pow(localT, 2.35);
        const radius = 24 + easedT * maxDiag;

        ctx.save();
        ctx.globalAlpha = w.alpha;
        const grad = ctx.createRadialGradient(
          originX,
          originY,
          radius * 0.05,
          originX,
          originY,
          radius * 1.15
        );
        grad.addColorStop(0, w.c0);
        grad.addColorStop(0.48, w.c1);
        grad.addColorStop(1, w.c2);

        traceCenteredHeartPath(ctx, originX, originY, radius);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.lineWidth = Math.max(2, 5 * (1 - localT));
        ctx.strokeStyle = "rgba(245, 213, 138, 0.85)";
        ctx.stroke();
        ctx.restore();
      }

      ctx.restore();
    };

    const tl = gsap.timeline({
      onComplete: () => {
        onEnterUniverse();
      },
    });

    if (contentWrapperRef.current) {
      tl.to(
        contentWrapperRef.current,
        {
          opacity: 0,
          y: -18,
          duration: 0.42,
          ease: "power2.inOut",
        },
        0
      );
    }

    tl.to(
      portalState,
      {
        progress: 1,
        duration: 1.25,
        ease: "power3.inOut",
        onUpdate: renderHeartWaveFrame,
      },
      0
    );

    if (containerRef.current) {
      tl.to(
        containerRef.current,
        {
          opacity: 0,
          duration: 0.38,
          ease: "power2.out",
        },
        0.96
      );
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        paddingTop: "max(4.25rem, env(safe-area-inset-top, 0px))",
        paddingBottom:
          "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.75rem))",
        backgroundImage: [
          "radial-gradient(circle at 20% 22%, rgba(167, 243, 208, 0.42) 0%, transparent 52%)",
          "radial-gradient(circle at 82% 24%, rgba(186, 230, 253, 0.42) 0%, transparent 52%)",
          "radial-gradient(circle at 50% 82%, rgba(110, 231, 183, 0.24) 0%, transparent 56%)",
          "linear-gradient(135deg, #169882 0%, #1DB59A 32%, #24A4C8 68%, #1D82C4 100%)",
        ].join(", "),
      }}
      className="fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-center px-5 sm:px-6 overflow-y-auto overflow-x-hidden select-none"
    >
      {/* Canva Tarzı Zarif Botanik Çerçeve */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-4 sm:inset-7 rounded-[2rem] border border-white/25 shadow-[inset_0_0_60px_rgba(255,255,255,0.12)] z-0"
      />

      {/* TAM EKRAN Vektörel Kalp Geçiş Kanvası — Asla kare kutu kesilmesi yapmaz */}
      <canvas
        ref={portalCanvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-40 block"
      />

      {/* Subtle Ambient Rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[20rem] h-[20rem] md:w-[30rem] md:h-[30rem] rounded-full border border-white/20 animate-ping [animation-duration:6s]" />
        <div className="absolute w-[15rem] h-[15rem] md:w-[22rem] md:h-[22rem] rounded-full border border-[#A7F3D0]/35 animate-pulse" />
      </div>

      {/* Heart Portal Core */}
      <div
        ref={heartCoreRef}
        className={`relative z-20 flex items-center justify-center ${
          viewport.isCompactHeight ? "mb-4" : "mb-6 md:mb-8"
        }`}
      >
        <div className="relative flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-[#34D399] via-[#38BDF8] to-[#FDE68A] p-[2px] shadow-[0_0_50px_rgba(56,189,248,0.55)]">
          <div className="flex items-center justify-center w-full h-full rounded-full bg-[#06383E]/85 backdrop-blur-md">
            <motion.div
              animate={
                isReducedMotion
                  ? {}
                  : {
                      scale: [1, 1.16, 1, 1.12, 1],
                      filter: [
                        "drop-shadow(0 0 12px rgba(52,211,153,0.7))",
                        "drop-shadow(0 0 28px rgba(186,230,253,0.95))",
                        "drop-shadow(0 0 12px rgba(52,211,153,0.7))",
                      ],
                    }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart
                className="w-12 h-12 md:w-14 md:h-14 text-[#6EE7B7] fill-[#6EE7B7]"
                strokeWidth={1.5}
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Text & Call to Action */}
      <div
        ref={contentWrapperRef}
        className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white/95 leading-relaxed tracking-wide px-2 drop-shadow-[0_2px_16px_rgba(6,56,62,0.35)]"
        >
          &ldquo;{UNIVERSE_CONFIG.opening.quote}&rdquo;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="mt-6 md:mt-8 space-y-2"
        >
          <h1 className="font-serif font-semibold text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-[#FFFFFF] via-[#D1FAE5] to-[#E0F2FE] bg-clip-text text-transparent drop-shadow-[0_2px_20px_rgba(6,56,62,0.45)]">
            {UNIVERSE_CONFIG.opening.greeting}
          </h1>

          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#06383E]/55 backdrop-blur-md border border-[#A7F3D0]/45">
            <Sparkles className="w-3.5 h-3.5 text-[#A7F3D0]" />
            <span className="text-xs sm:text-sm md:text-base tracking-[0.28em] uppercase text-[#E0F2FE] font-medium">
              {UNIVERSE_CONFIG.opening.dateText}
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#BAE6FD]" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="mt-9 md:mt-11"
        >
          <button
            type="button"
            onClick={handleEnterClick}
            disabled={isTransitioning}
            className="group relative inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 min-h-[58px] rounded-full font-sans font-semibold text-sm sm:text-base tracking-[0.2em] uppercase text-white bg-gradient-to-r from-[#059669] via-[#0D9488] to-[#0284C7] bg-[length:200%_100%] hover:bg-right border border-white/60 shadow-[0_10px_35px_rgba(14,165,233,0.45)] active:scale-95 transition-all duration-500 cursor-pointer"
          >
            <span>{UNIVERSE_CONFIG.opening.buttonText}</span>
            <Sparkles className="w-4 h-4 text-[#A7F3D0] group-hover:rotate-45 transition-transform duration-300" />
          </button>
        </motion.div>
      </div>
    </div>
  );
}
