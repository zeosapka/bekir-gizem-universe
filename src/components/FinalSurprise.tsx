import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useReward } from "react-rewards";
import { Heart, Sparkles, X } from "lucide-react";
import { UNIVERSE_CONFIG } from "../config/universeConfig";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

interface SkyParticle {
  x: number;
  y: number;
  targetX?: number;
  targetY?: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  radius: number;
  isText: boolean;
  twinklePhase: number;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  targetY: number;
  color: string;
  isTextRocket: boolean;
}

function sampleTextTargets(
  w: number,
  h: number
): { x: number; y: number; color: string }[] {
  const off = document.createElement("canvas");
  off.width = Math.max(320, Math.floor(w));
  off.height = Math.max(200, Math.floor(h * 0.42));
  const octx = off.getContext("2d");
  if (!octx) return [];

  const isNarrow = w < 640;
  const fontSize = isNarrow
    ? Math.max(24, Math.min(34, Math.floor(w * 0.08)))
    : Math.max(38, Math.min(62, Math.floor(w * 0.052)));

  octx.clearRect(0, 0, off.width, off.height);
  octx.fillStyle = "#FFFFFF";
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.font = `700 ${fontSize}px Georgia, "Times New Roman", serif`;

  const cy = off.height * 0.52;
  if (isNarrow) {
    octx.fillText("SENİ ÇOK", off.width / 2, cy - fontSize * 0.65);
    octx.fillText("SEVİYORUM ❤️", off.width / 2, cy + fontSize * 0.65);
  } else {
    octx.fillText("SENİ ÇOK SEVİYORUM", off.width / 2, cy);
  }

  const img = octx.getImageData(0, 0, off.width, off.height).data;
  const step = isNarrow ? 3 : 4;
  const colors = ["#FDE68A", "#BAE6FD", "#A7F3D0", "#FDA4AF", "#FFFFFF"];
  const points: { x: number; y: number; color: string }[] = [];

  for (let y = 0; y < off.height; y += step) {
    for (let x = 0; x < off.width; x += step) {
      const alpha = img[(y * off.width + x) * 4 + 3];
      if (alpha > 130) {
        points.push({
          x,
          y: y + h * 0.05,
          color: colors[(x + y) % colors.length],
        });
      }
    }
  }
  return points;
}

const LOVE_100_LANGUAGES: [string, string][] = [
  ["Türkçe", "Seni çok seviyorum"],
  ["İngilizce", "I love you"],
  ["İspanyolca", "Te amo"],
  ["Fransızca", "Je t'aime"],
  ["İtalyanca", "Ti amo"],
  ["Almanca", "Ich liebe dich"],
  ["Portekizce", "Eu te amo"],
  ["Rusça", "Ya lyublyu tebya"],
  ["Arapça", "Uhibbuki"],
  ["Japonca", "Aishiteru"],
  ["Korece", "Saranghae"],
  ["Çince", "Wo ai ni"],
  ["Yunanca", "S'agapo"],
  ["Hollandaca", "Ik hou van jou"],
  ["İsveççe", "Jag älskar dig"],
  ["Norveççe", "Jeg elsker deg"],
  ["Danca", "Jeg elsker dig"],
  ["Fince", "Minä rakastan sinua"],
  ["Lehçe", "Kocham cię"],
  ["Çekçe", "Miluji tě"],
  ["Slovakça", "Ľúbim ťa"],
  ["Macarca", "Szeretlek"],
  ["Rumence", "Te iubesc"],
  ["Bulgarca", "Obicham te"],
  ["Sırpça", "Volim te"],
  ["Hırvatça", "Volim te"],
  ["Boşnakça", "Volim te"],
  ["Arnavutça", "Të dua"],
  ["Azerice", "Mən səni sevirəm"],
  ["Özbekçe", "Men seni sevaman"],
  ["Kazakça", "Men seni jaqsı köremin"],
  ["Kırgızca", "Men seni süyöm"],
  ["Türkmence", "Men seni söýýärin"],
  ["Farsça", "Dooset daram"],
  ["Hintçe", "Main tumse pyaar karta hoon"],
  ["Urduca", "Mujhe tumse pyaar hai"],
  ["Bengalce", "Ami tomake bhalobashi"],
  ["Pencapça", "Main tainu pyaar karda haan"],
  ["Tamilce", "Naan unnai kadhalikkiren"],
  ["Teluguca", "Nenu ninnu premistunnanu"],
  ["Tayca", "Phom rak khun"],
  ["Vietnamca", "Anh yêu em"],
  ["Endonezce", "Aku cinta kamu"],
  ["Malayca", "Saya cinta padamu"],
  ["Tagalog", "Mahal kita"],
  ["Svahili", "Nakupenda"],
  ["Zuluca", "Ngiyakuthanda"],
  ["Afrikaans", "Ek het jou lief"],
  ["Amharca", "Ewedihalehu"],
  ["İbranice", "Ani ohev otach"],
  ["Katalanca", "T'estimo"],
  ["Baskça", "Maite zaitut"],
  ["Galiçyaca", "Quérote"],
  ["İrlandaca", "Tà grà agam duit"],
  ["İskoçça", "Tha gaol agam ort"],
  ["Galce", "Rwy'n dy garu di"],
  ["İzlandaca", "Ég elska þig"],
  ["Letonca", "Es tevi mīlu"],
  ["Litvanca", "Aš tave myliu"],
  ["Estonca", "Ma armastan sind"],
  ["Ukraynaca", "Ya tebe kokhayu"],
  ["Belarusça", "Ya cyabe kakhayu"],
  ["Gürcüce", "Miqvarxar"],
  ["Makedonca", "Te sakam"],
  ["Slovence", "Ljubim te"],
  ["Maltaca", "Inħobbok"],
  ["Latince", "Te amo"],
  ["Esperanto", "Mi amas vin"],
  ["Hawaiice", "Aloha wau iā 'oe"],
  ["Maorice", "Aroha ahau ki a koe"],
  ["Samoaca", "Ou te alofa ia te oe"],
  ["Tibetçe", "Nga khyed rang la dga' po yod"],
  ["Moğolca", "Bi chamd hairtai"],
  ["Nepalce", "Ma timilai maya garchu"],
  ["Sinhalaca", "Mama oyata adarei"],
  ["Kmerce", "Bong srolanh oun"],
  ["Laoca", "Khoi hak jao"],
  ["Birmanca", "Chit pa de"],
  ["Cava Dili", "Aku tresno sliramu"],
  ["Sunda Dili", "Abdi bogoh ka anjeun"],
  ["Korsikaca", "Ti tengu caru"],
  ["Lüksemburgca", "Ech hunn dech gär"],
  ["Kürtçe", "Ez ji te hez dikim"],
  ["Zazaca", "Ez to ra hez kena"],
  ["Lazca", "Ma si maoropen"],
  ["Çerkezce", "Se wo s'shiyag'u"],
  ["Tatarca", "Min sine yaratam"],
  ["Başkurtça", "Min hine yaratam"],
  ["Uygurca", "Men sini söyimen"],
  ["Kırım Tatarcası", "Men seni sevem"],
  ["Gagavuzca", "Bän seni severim"],
  ["Chichewa", "Ndimakukonda"],
  ["Yoruba", "Mo ni fe re"],
  ["Igbo", "A hụrụ m gị n'anya"],
  ["Hausa", "Ina sonki"],
  ["Somali", "Waan ku jeclahay"],
  ["Malgaşça", "Tiako ianao"],
  ["Kinyarwanda", "Ndagukunda"],
  ["Shona", "Ndinokuda"],
  ["Aymara", "Munsmawa"],
];

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
        origin: { x: 0, y: 0.68 },
        colors: ["#38BDF8", "#34D399", "#FDE68A", "#FB7185", "#FFFFFF"],
      });
      confetti({
        particleCount: isReducedMotion ? 2 : 5,
        angle: 120,
        spread: 65,
        origin: { x: 1, y: 0.68 },
        colors: ["#38BDF8", "#34D399", "#FDE68A", "#FB7185", "#FFFFFF"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    const timer = window.setTimeout(frame, 400);
    return () => window.clearTimeout(timer);
  }, [isOpen, isReducedMotion]);

  // Yukarıda Patlayan & "SENİ ÇOK SEVİYORUM GİZEM" Yazısı Çıkaran Havai Fişek Motoru
  useEffect(() => {
    if (!isOpen || isReducedMotion) return;
    const canvas = fireworksCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: SkyParticle[] = [];
    const rockets: Rocket[] = [];
    const burstColors = [
      "#FDE68A",
      "#38BDF8",
      "#34D399",
      "#FB7185",
      "#C084FC",
      "#FFFFFF",
    ];

    let textTargets: { x: number; y: number; color: string }[] = [];
    let lastW = 0;
    let lastH = 0;

    const spawnBurst = (bx: number, by: number, count = 42) => {
      const baseColor =
        burstColors[Math.floor(Math.random() * burstColors.length)];
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
        const speed = 1.6 + Math.random() * 4.2;
        particles.push({
          x: bx,
          y: by,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: i % 3 === 0 ? "#FFFFFF" : baseColor,
          radius: 1.8 + Math.random() * 2.2,
          isText: false,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    const explodeTextFirework = (originX: number, originY: number) => {
      // Eski yazı parçacıklarını temizle
      for (let i = particles.length - 1; i >= 0; i--) {
        if (particles[i].isText) particles.splice(i, 1);
      }

      for (let i = 0; i < textTargets.length; i++) {
        const t = textTargets[i];
        particles.push({
          x: originX + (Math.random() - 0.5) * 18,
          y: originY + (Math.random() - 0.5) * 18,
          targetX: t.x,
          targetY: t.y,
          vx: (Math.random() - 0.5) * 6,
          vy: (Math.random() - 0.5) * 6,
          alpha: 0.95,
          color: t.color,
          radius: 1.65,
          isText: true,
          twinklePhase: Math.random() * Math.PI * 2,
        });
      }
      spawnBurst(originX, originY, 36);
    };

    let rafId = 0;
    let lastAmbient = 0;
    let lastTextLaunch = -9999;

    const render = (now: number) => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (w !== lastW || h !== lastH) {
        lastW = w;
        lastH = h;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        textTargets = sampleTextTargets(w, h);
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // İlk anda ve her 7.5 saniyede bir yazılı havai fişek roketi fırlat
      if (now - lastTextLaunch > 7500) {
        lastTextLaunch = now;
        rockets.push({
          x: w * 0.5,
          y: h * 0.85,
          vy: -10.5,
          targetY: h * 0.24,
          color: "#FDE68A",
          isTextRocket: true,
        });
      }

      // Yanlarda dekoratif havai fişek roketleri
      if (now - lastAmbient > 1150) {
        lastAmbient = now;
        rockets.push({
          x: w * (0.14 + Math.random() * 0.72),
          y: h * 0.9,
          vy: -(8.2 + Math.random() * 2.5),
          targetY: h * (0.12 + Math.random() * 0.25),
          color: burstColors[Math.floor(Math.random() * burstColors.length)],
          isTextRocket: false,
        });
      }

      // Roketleri çiz & patlat
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.vy *= 0.985;

        ctx.save();
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.isTextRocket ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (r.y <= r.targetY || r.vy > -1.8) {
          if (r.isTextRocket) {
            explodeTextFirework(r.x, r.y);
          } else {
            spawnBurst(r.x, r.y);
          }
          rockets.splice(i, 1);
        }
      }

      // Parçacıkları güncelle & çiz
      const timeSec = now * 0.005;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.isText && p.targetX !== undefined && p.targetY !== undefined) {
          p.x += (p.targetX - p.x) * 0.09;
          p.y += (p.targetY - p.y) * 0.09;
          const twinkle = 0.68 + 0.32 * Math.sin(timeSec + p.twinklePhase);
          ctx.globalAlpha = p.alpha * twinkle;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.045;
          p.alpha -= 0.015;
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
    Math.round(34 * particleCountMultiplier)
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

      {/* HAFİF KARANLIK AŞAĞIDAN YUKARI RENK GEÇİŞLİ & YAZILI HAVAİ FİŞEKLİ FİNAL */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              backgroundImage:
                "linear-gradient(to top, #136F63 0%, #0D4B5C 36%, #072942 70%, #041528 100%)",
            }}
            className="fixed inset-0 w-full h-full z-[70] flex flex-col items-center justify-end pb-8 sm:pb-12 px-4 overflow-hidden select-none"
          >
            {/* Yukarıda Patlayan Yazılı Havai Fişek Kanvası */}
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
                  const size = 15 + (idx % 5) * 5;
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
                        opacity: [0, 0.85, 0],
                        y: "-55vh",
                        scale: [0.5, 1.12, 0.85],
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
              className="fixed top-4 right-4 sm:top-5 sm:right-6 md:top-6 md:right-8 z-[75] inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 min-h-[46px] sm:min-h-[48px] rounded-full bg-[#06383E]/85 backdrop-blur-xl border border-[#A7F3D0]/50 text-xs sm:text-sm uppercase tracking-[0.18em] text-white font-semibold hover:bg-[#0EA5E9] active:scale-95 transition-all cursor-pointer touch-manipulation shadow-lg"
            >
              <X className="w-4 h-4 shrink-0 text-[#A7F3D0]" />
              <span>{UNIVERSE_CONFIG.surprise.closeButtonText}</span>
            </button>

            {/* Alt-Orta Mesaj Kartı (Üstteki yazılı havai fişeği kapatmaz) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.35 }}
              className="relative z-20 max-w-2xl w-full mx-auto text-center space-y-4 px-5 py-6 sm:p-8 rounded-[2rem] bg-[#06383E]/65 backdrop-blur-xl border border-white/25 shadow-[0_18px_55px_rgba(4,21,40,0.5)]"
            >
              {isReducedMotion && (
                <p className="font-serif font-extrabold text-2xl sm:text-4xl text-[#FDE68A]">
                  SENİ ÇOK SEVİYORUM ❤️
                </p>
              )}

              <h2 className="font-serif italic font-semibold text-xl sm:text-3xl text-white leading-snug">
                &ldquo;{UNIVERSE_CONFIG.surprise.mainMessage}&rdquo;
              </h2>

              {/* 100 Dilde Seni Seviyorum (Önce Türkçe, sonra diğer 99 dil) */}
              <div className="rounded-2xl bg-[#04282D]/65 border border-[#A7F3D0]/30 p-3.5 sm:p-4 text-left">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#FDE68A] font-semibold text-center mb-2.5">
                  100 Dilde Seni Seviyorum • Önce Türkçe ❤️
                </p>
                <div className="max-h-28 sm:max-h-32 overflow-y-auto pr-1 flex flex-wrap items-center justify-center gap-1.5">
                  {LOVE_100_LANGUAGES.map(([lang, phrase], idx) => (
                    <span
                      key={`${lang}-${idx}`}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] ${
                        idx === 0
                          ? "bg-gradient-to-r from-[#059669] to-[#0284C7] text-white font-semibold border border-white/60 shadow"
                          : "bg-white/10 text-[#E0F2FE]/90 border border-white/15"
                      }`}
                    >
                      <span className="text-[#A7F3D0] font-medium">{lang}:</span>
                      <span>{phrase}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    confetti({
                      particleCount: Math.round(90 * particleCountMultiplier),
                      spread: 120,
                      origin: { y: 0.65 },
                      colors: [
                        "#38BDF8",
                        "#34D399",
                        "#FDE68A",
                        "#FB7185",
                        "#FFFFFF",
                      ],
                    });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-full bg-gradient-to-r from-[#059669] to-[#0284C7] hover:brightness-110 border border-white/45 text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-white shadow-[0_8px_26px_rgba(14,165,233,0.4)] transition-all cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 shrink-0 text-[#FDE68A]" />
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
