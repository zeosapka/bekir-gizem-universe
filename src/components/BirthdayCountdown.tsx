import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, CalendarHeart, PartyPopper } from "lucide-react";
import { UNIVERSE_CONFIG } from "../config/universeConfig";

interface TimeElapsed {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  yearsLabel: string;
  isBirthdayReached: boolean;
}

const ANNIVERSARY_START_ISO = "2023-11-17T00:00:00";

function calculateElapsedTime(): TimeElapsed {
  const start = new Date(ANNIVERSARY_START_ISO).getTime();
  const nowDate = new Date();
  const diff = Math.max(0, nowDate.getTime() - start);

  // Takvim yılı & kalan gün hesabı (17 Kasım 2023'ten bugüne)
  const startYear = 2023;
  let years = nowDate.getFullYear() - startYear;
  const thisYearAnniv = new Date(
    nowDate.getFullYear(),
    10,
    17,
    0,
    0,
    0,
    0
  );
  if (nowDate.getTime() < thisYearAnniv.getTime()) {
    years -= 1;
  }
  const lastAnniv = new Date(
    startYear + Math.max(0, years),
    10,
    17,
    0,
    0,
    0,
    0
  );
  const remDays = Math.max(
    0,
    Math.floor((nowDate.getTime() - lastAnniv.getTime()) / (1000 * 60 * 60 * 24))
  );

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    yearsLabel: `${Math.max(0, years)} Yıl • ${remDays} Gün`,
    isBirthdayReached: false,
  };
}

function AnimatedDigitCard({ value, label }: { value: number; label: string }) {
  const formatted = String(value).padStart(2, "0");

  return (
    <div className="relative group flex flex-col items-center justify-center p-5 sm:p-6 md:p-8 rounded-3xl bg-gradient-to-b from-[#084148]/85 to-[#04282D]/90 backdrop-blur-2xl border border-[#F5D58A]/25 shadow-[0_12px_40px_rgba(8,6,17,0.85)] overflow-hidden">
      {/* Köşe Işıltıları */}
      <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-[#0EA5E9]/20 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-[#F5D58A]/15 blur-2xl pointer-events-none" />

      <div className="relative h-14 sm:h-16 md:h-20 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={formatted}
            initial={{ y: 28, opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ y: -28, opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-b from-[#FFF8FC] via-[#A7F3D0] to-[#F5D58A] bg-clip-text text-transparent tabular-nums tracking-wider"
          >
            {formatted}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="mt-2 sm:mt-3 text-xs sm:text-sm tracking-[0.26em] uppercase text-[#F5D58A]/85 font-medium">
        {label}
      </span>
    </div>
  );
}

export function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeElapsed>(() =>
    calculateElapsedTime()
  );
  const [previewBirthdayMode, setPreviewBirthdayMode] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(calculateElapsedTime());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const showCelebrationBanner = timeLeft.isBirthdayReached || previewBirthdayMode;

  return (
    <section
      id="countdown-section"
      className="relative py-16 md:py-24 px-6 max-w-5xl mx-auto"
    >
      <div className="relative rounded-[2.25rem] p-6 sm:p-10 md:p-14 bg-gradient-to-br from-[#06383E]/35 via-[#06383E]/80 to-[#04282D]/90 backdrop-blur-2xl border border-[#F5D58A]/30 shadow-[0_0_70px_rgba(14, 165, 233,0.18)] overflow-hidden">
        {/* Başlık */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06383E]/65 border border-[#A7F3D0]/35 mb-4">
            <CalendarHeart className="w-4 h-4 shrink-0 text-[#A7F3D0]" />
            <span className="text-xs tracking-[0.2em] uppercase text-[#E0F2FE] font-semibold">
              {UNIVERSE_CONFIG.countdown.preTitle} • {timeLeft.yearsLabel}
            </span>
          </div>

          {!showCelebrationBanner ? (
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FFF8FC] font-semibold leading-snug">
              {UNIVERSE_CONFIG.countdown.titlePrefix}{" "}
              <span className="italic text-[#A7F3D0]">
                {UNIVERSE_CONFIG.countdown.titleHighlight}
              </span>
            </h2>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4 py-4"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-[#0EA5E9] to-[#F5D58A] text-[#04282D] shadow-[0_0_40px_rgba(245,213,138,0.6)]">
                <PartyPopper className="w-8 h-8" />
              </div>
              <h2 className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#FFF8FC] via-[#F5D58A] to-[#A7F3D0] bg-clip-text text-transparent tracking-wide">
                {UNIVERSE_CONFIG.countdown.celebrationHeadline}
              </h2>
              <p className="font-serif italic text-xl sm:text-2xl text-[#FFF8FC]/90 max-w-xl mx-auto">
                {UNIVERSE_CONFIG.countdown.celebrationSubtext}
              </p>
            </motion.div>
          )}
        </div>

        {/* Geri Sayım Kartları */}
        {!showCelebrationBanner && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <AnimatedDigitCard
              value={timeLeft.days}
              label={UNIVERSE_CONFIG.countdown.units.days}
            />
            <AnimatedDigitCard
              value={timeLeft.hours}
              label={UNIVERSE_CONFIG.countdown.units.hours}
            />
            <AnimatedDigitCard
              value={timeLeft.minutes}
              label={UNIVERSE_CONFIG.countdown.units.minutes}
            />
            <AnimatedDigitCard
              value={timeLeft.seconds}
              label={UNIVERSE_CONFIG.countdown.units.seconds}
            />
          </div>
        )}

        {/* 21 Kasım Doğum Günü Kutlama Modunu Önizleme Butonu */}
        {!timeLeft.isBirthdayReached && (
          <div className="mt-8 md:mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setPreviewBirthdayMode((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 min-h-[44px] rounded-full text-xs tracking-[0.18em] uppercase text-[#E0F2FE] hover:text-white bg-gradient-to-r from-[#059669]/80 to-[#0284C7]/80 hover:brightness-110 border border-white/35 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0 text-[#F5D58A]" />
              <span>
                {previewBirthdayMode
                  ? UNIVERSE_CONFIG.countdown.showLiveTimerButton
                  : UNIVERSE_CONFIG.countdown.previewBirthdayButton}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
