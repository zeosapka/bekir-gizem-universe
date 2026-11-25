import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useReward } from "react-rewards";
import { Heart, Sparkles, X } from "lucide-react";
import { UNIVERSE_CONFIG } from "../config/universeConfig";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

interface FireworkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
}

export function FinalSurprise() {
  const [isOpen, setIsOpen] = useState(false);
  const fireworksCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const { particleCountMultiplier, isReducedMotion } = usePerformanceProfile();

  const { reward: triggerReward } = useReward("sena-surprise-reward", "emoji", {
    emoji: ["❤️", "💚", "💙", "✨", "🌸"],
    elementCount: Math.round(38 * particleCountMultiplier),
    spread: 110,
    startVelocity: 32,
  });

  // Konfeti yağmuru
  useEffect(() => {
    if (!isOpen) return;

    const duration = 5500;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: isReducedMotion ? 2 : 5,
        angle: 60,
        spread: 65,
        origin: { x: 0, y: 0.65 },
        colors: ["#0EA5E9", "#10B981", "#F59E0B", "#E11D48", "#FFFFFF"],
      });
      confetti({
        particleCount: isReducedMotion ? 2 : 5,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.65 },
        colors: ["#0EA5E9", "#10B981", "#F59E0B", "#E11D48", "#FFFFFF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    const timer = window.setTimeout(frame, 400);
    return () => window.clearTimeout(timer);
  }, [isOpen, isReducedMotion]);

  // Arka plan havai fişek kanvası (aydınlık tema üzerinde canlı patlamalar)
  useEffect(() => {
    if (!isOpen || isReducedMotion) return;
    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: FireworkParticle[] = [];
    const colors = [
      "#0284C7",
      "#059669",
      "#E11D48",
      "#F59E0B",
      "#7C3AED",
      "#FFFFFF",
    ];

    const spawnBurst = (bx: number, by: number) => {
      const count = 34;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
        const speed = 1.8 + Math.random() * 3.6;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 2 + Math.random() * 2.2,
        });
      }
    };

    let rafId = 0;
    let lastBurst = 0;

    const render = (now: number) => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      if (now - lastBurst > 780) {
        lastBurst = now;
        spawnBurst(
          w * (0.15 + Math.random() * 0.7),
          h * (0.14 + Math.random() * 0.45)
        );
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.045;
        p.alpha -= 0.014;
        if (p.alpha <= 0.02) {
          particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, isReducedMotion]);

  const handleOpenSurprise = () => {
    triggerReward();
    setIsOpen(true);
  };

  const floatingHeartCount = Math.max(
    18,
    Math.round(38 * particleCountMultiplier)
  );

  return (
    <section className="relative py-20 md:py-28 px-6 max-w-4xl mx-auto text-center">
      <div className="relative flex flex-col items-center justify-center">
        <span
          id="sena-surprise-reward"
          className="pointer-events-none absolute"
        />

        <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E0F2FE] mb-6 font-medium">
          {UNIVERSE_CONFIG.surprise.preTitle}
        </p>

        <motion.button
          type="button"
          onClick={handleOpenSurprise}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className="group relative inline-flex items-center justify-center gap-4 px-8 sm:px-14 py-6 min-h-[68px] rounded-full font-serif font-bold text-lg sm:text-2xl tracking-[0.12em] uppercase text-white bg-gradient-to-r from-[#059669] via-[#0EA5E9] to-[#0284C7] bg-[length:200%_100%] hover:bg-right border-2 border-white/75 shadow-[0_12px_40px_rgba(14,165,233,0.45)] transition-all duration-500 cursor-pointer"
        >
          <Heart className="w-7 h-7 shrink-0 text-white fill-[#A7F3D0] group-hover:scale-125 transition-transform" />
          <span>{UNIVERSE_CONFIG.surprise.buttonText}</span>
          <Sparkles className="w-6 h-6 shrink-0 text-[#BAE6FD]" />
        </motion.button>
      </div>

      {/* TAM EKRAN AYDINLIK FİNAL MODALI (Havai Fişek + Konfeti + Kalpler + Seni Çok Seviyorum) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65 }}
            style={{
              backgroundImage: [
                "radial-gradient(circle at 22% 24%, rgba(167, 243, 208, 0.55) 0%, transparent 55%)",
                "radial-gradient(circle at 80% 28%, rgba(186, 230, 253, 0.6) 0%, transparent 55%)",
                "linear-gradient(135deg, #CBEFFF 0%, #DFF9EC 50%, #C2E8FF 100%)",
              ].join(", "),
            }}
            className="fixed inset-0 w-full h-full z-[70] flex flex-col items-center justify-center p-6 overflow-hidden select-none"
          >
            {/* Havai Fişek Kanvası */}
            <canvas
              ref={fireworksCanvasRef}
              className="pointer-events-none fixed inset-0 w-full h-full z-10 block"
            />

            {/* Yükselen Kalpler & Işıltılar */}
            {!isReducedMotion && (
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden z-10"
                aria-hidden="true"
              >
                {[...Array(floatingHeartCount)].map((_, idx) => {
                  const left = (idx * 97) % 100;
                  const delay = (idx % 10) * 0.35;
                  const duration = 5.5 + (idx % 6) * 1.1;
                  const size = 16 + (idx % 5) * 6;
                  return (
                    <motion.span
                      key={idx}
                      initial={{
                        opacity: 0,
                        y: "55vh",
                        x: `${left - 50}vw`,
                        scale: 0.4,
                      }}
                      animate={{
                        opacity: [0, 0.9, 0],
                        y: "-55vh",
                        scale: [0.5, 1.15, 0.85],
                      }}
                      transition={{
                        duration,
                        delay,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        fontSize: `${size}px`,
                      }}
                    >
                      {idx % 4 === 0
                        ? "✨"
                        : idx % 3 === 0
                        ? "💚"
                        : idx % 2 === 0
                        ? "💙"
                        : "❤️"}
                    </motion.span>
                  );
                })}
              </div>
            )}

            {/* Kapatma Butonu */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={UNIVERSE_CONFIG.surprise.closeAriaLabel}
              style={{
                marginTop: "env(safe-area-inset-top, 0px)",
                marginRight: "env(safe-area-inset-right, 0px)",
              }}
              className="fixed top-4 right-4 sm:top-5 sm:right-6 md:top-6 md:right-8 z-[75] inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[48px] rounded-full bg-white/85 backdrop-blur-xl border border-[#7DD3FC] text-xs sm:text-sm uppercase tracking-[0.18em] text-[#0F3D3E] font-semibold hover:bg-[#0EA5E9] hover:text-white active:scale-95 transition-all cursor-pointer touch-manipulation shadow-md"
            >
              <X className="w-4 h-4 shrink-0" />
              <span>{UNIVERSE_CONFIG.surprise.closeButtonText}</span>
            </button>

            {/* Merkez Aydınlık Final Mesajı */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative z-20 max-w-3xl mx-auto text-center space-y-6 px-6 py-8 sm:p-10 rounded-[2.25rem] bg-white/70 backdrop-blur-xl border-2 border-white shadow-[0_20px_70px_rgba(14,165,233,0.28)]"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#0EA5E9] p-1 shadow-[0_10px_30px_rgba(14,165,233,0.35)]">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <Heart className="w-10 h-10 text-[#E11D48] fill-[#E11D48] animate-pulse" />
                </div>
              </div>

              <p className="font-serif font-extrabold text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#0F766E] via-[#0284C7] to-[#E11D48] bg-clip-text text-transparent tracking-wide">
                SENİ ÇOK SEVİYORUM GİZEM ❤️
              </p>

              <h2 className="font-serif italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#0F3D3E] leading-snug">
                &ldquo;{UNIVERSE_CONFIG.surprise.mainMessage}&rdquo;
              </h2>

              <p className="font-serif font-bold text-xl sm:text-2xl text-[#0F766E]">
                {UNIVERSE_CONFIG.surprise.subMessage}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    confetti({
                      particleCount: Math.round(90 * particleCountMultiplier),
                      spread: 120,
                      origin: { y: 0.6 },
                      colors: [
                        "#0EA5E9",
                        "#10B981",
                        "#F59E0B",
                        "#E11D48",
                        "#FFFFFF",
                      ],
                    });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#10B981] hover:brightness-105 border-2 border-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-white shadow-[0_10px_28px_rgba(14,165,233,0.35)] transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Daha Fazla Konfeti &amp; Havai Fişek Yağdır</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
