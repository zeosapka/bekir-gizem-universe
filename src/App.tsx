import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { CosmicBackground } from "./components/CosmicBackground";
import { TouchHeartBursts } from "./components/TouchHeartBursts";
import { MusicPlayer } from "./components/MusicPlayer";
import { FlowerBloomIntro } from "./components/FlowerBloomIntro";
import { OpeningPortal } from "./components/OpeningPortal";
import { HeroCelebration } from "./components/HeroCelebration";
import { BirthdayCountdown } from "./components/BirthdayCountdown";
import { CoupleTimeline } from "./components/CoupleTimeline";
import { InteractiveLoveLetter } from "./components/InteractiveLoveLetter";
import { LoveCoupons } from "./components/LoveCoupons";
import { FireworksCelebration } from "./components/FireworksCelebration";
import { OurLittleMoments } from "./components/OurLittleMoments";
import { CoupleQuizAndWheel } from "./components/CoupleQuizAndWheel";
import { SenaGameCorner } from "./components/SenaGameCorner";
import { SenaSurpriseGifts } from "./components/SenaSurpriseGifts";
import { WishJar } from "./components/WishJar";
import { FinalSurprise } from "./components/FinalSurprise";
import { UNIVERSE_CONFIG } from "./config/universeConfig";
import { useViewportMetrics } from "./hooks/useViewportMetrics";

export function App() {
  const [hasFlowerBloomed, setHasFlowerBloomed] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  useViewportMetrics();

  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle at 20% 22%, rgba(167, 243, 208, 0.34) 0%, transparent 50%), radial-gradient(circle at 80% 24%, rgba(186, 230, 253, 0.34) 0%, transparent 50%), linear-gradient(135deg, #169882 0%, #1DB59A 32%, #24A4C8 68%, #1D82C4 100%)",
      }}
      className="relative w-full max-w-full min-h-[100dvh] overflow-x-hidden text-[#FFF8FC] selection:bg-[#34D399]/35 selection:text-[#FFF8FC]"
    >
      {/* Persistent Cosmic Starfield & Rising Hearts */}
      <CosmicBackground />

      {/* Interactive Touch / Tap Heart Bursts */}
      <TouchHeartBursts />

      {/* Optional Romantic Music Box / MP3 Player (Never autoplays) */}
      <MusicPlayer />

      {/* 0. Initial Procedural Flower Blooming Layer (Plays once before OpeningPortal) */}
      {!hasFlowerBloomed && (
        <FlowerBloomIntro onComplete={() => setHasFlowerBloomed(true)} />
      )}

      {/* First Impression Fullscreen Portal */}
      {hasFlowerBloomed && !hasEntered && (
        <OpeningPortal onEnterUniverse={() => setHasEntered(true)} />
      )}

      {/* Main Universe Experience */}
      {hasEntered && (
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="relative z-10 w-full max-w-full overflow-x-hidden pb-16"
        >
          {/* 1. Hero Celebration Screen */}
          <HeroCelebration />

          {/* Ornamental Divider */}
          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto opacity-50">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#F5D58A]" />
            <Sparkles className="w-4 h-4 text-[#F5D58A]" />
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#F5D58A]" />
          </div>

          {/* 2. Real-Time Anniversary Countdown to 17 Nov */}
          <BirthdayCountdown />

          {/* 2.5. Bekir & Gizem'in 17 Kasım Aşk Zaman Çizelgesi */}
          <CoupleTimeline />

          {/* 3. Interactive Golden Wax-Sealed Love Letter */}
          <InteractiveLoveLetter />

          {/* 3.5. Gizem'in Altın Aşk Kupon Defteri */}
          <LoveCoupons />

          {/* 4. Fullscreen Make A Wish Fireworks Celebration */}
          <FireworksCelebration />

          {/* 5. Our Little Moments 3D Gallery */}
          <OurLittleMoments />

          {/* 5.3. Randevu Çarkı & 17 Kasım Çift Uyum Testi */}
          <CoupleQuizAndWheel />

          {/* 5.5. Mini Games Corner */}
          <SenaGameCorner />

          {/* 5.8. 5 Interactive Surprise Gift Boxes */}
          <SenaSurpriseGifts />

          {/* 5.9. Ortak Dilek & Aşk Kavanozu */}
          <WishJar />

          {/* 6. Final Surprise Button & Finale */}
          <FinalSurprise />

          {/* Romantic Footer */}
          <footer className="relative z-10 pt-12 pb-8 px-6 text-center border-t border-[#F5D58A]/15 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-[#F5D58A]/80">
              <span>{UNIVERSE_CONFIG.siteTitle}</span>
              <Heart className="w-3.5 h-3.5 text-[#E83E70] fill-[#E83E70]" />
              <span>{UNIVERSE_CONFIG.birthdayDisplayDate}</span>
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}

export default App;
