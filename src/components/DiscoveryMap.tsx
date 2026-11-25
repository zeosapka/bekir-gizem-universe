import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Compass,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  Heart,
  MapPin,
  Trophy,
  RotateCcw,
} from "lucide-react";

interface MapRegion {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  question: string;
  options: string[];
  correctIndex: number;
  rewardTitle: string;
  rewardNote: string;
  targetSectionId?: string;
}

const MAP_REGIONS: MapRegion[] = [
  {
    id: "past",
    number: 1,
    title: "1. Bölge: Geçmişimiz",
    subtitle: "Hikâyemizin başladığı o ilk kıvılcım",
    emoji: "🌹",
    question: "Bekir & Gizem'in güzel hikâyesi takvimde hangi özel günde başladı?",
    options: ["17 Kasım 2023", "1 Ocak 2024", "14 Şubat 2023"],
    correctIndex: 0,
    rewardTitle: "Geçmişimiz Kilidi Açıldı!",
    rewardNote:
      "17 Kasım 2023 — İyi ki yollarımız kesişti, iyi ki o gün bizim günümüz oldu. ❤️",
    targetSectionId: "countdown-section",
  },
  {
    id: "know-each-other",
    number: 2,
    title: "2. Bölge: Birbirimizi Tanıyoruz",
    subtitle: "En tatlı huylarımız ve uyumumuz",
    emoji: "🐾",
    question: "Gizem'in en güzel ve merhametli yönlerinden biri hangisidir?",
    options: [
      "Hayvanlara olan sonsuz sevgisi ve merhameti 🐾",
      "Sadece yağmurlu havaları sevmesi",
      "Hiç konuşmaması",
    ],
    correctIndex: 0,
    rewardTitle: "Uyum Bölgesi Açıldı!",
    rewardNote:
      "İki saatlik tatlı triplerin de, kocaman hayvan sevgin de benim en sevdiğim yanların! 💚",
  },
  {
    id: "little-secrets",
    number: 3,
    title: "3. Bölge: Küçük Sırlarımız",
    subtitle: "Yalnızca ikimizin bildiği detaylar",
    emoji: "💌",
    question: "Bu evrendeki bütün yıldızların, güllerin, lalelerin ve papatyaların sırrı kime ait?",
    options: [
      "Rastgele bir yolcuya",
      "Yalnızca Gizem & Bekir'in 17 Kasım aşkına ✨",
      "Gökyüzündeki bulutlara",
    ],
    correctIndex: 1,
    rewardTitle: "Küçük Sırlar Açıldı!",
    rewardNote:
      "Aşağıdaki 17 Neden kartlarında ve Mektup'ta sana sakladığım sırları keşfedebilirsin. 💌",
  },
  {
    id: "our-dreams",
    number: 4,
    title: "4. Bölge: Hayallerimiz",
    subtitle: "El ele yürüyeceğimiz yarınlar",
    emoji: "✈️",
    question: "Kupon defterimizdeki en güzel gelecek planlarımızdan biri hangisi?",
    options: [
      "Birlikte gidilecek farklı bir şehir & yeni anılar ✈️",
      "Evde ayrı odalarda oturmak",
      "Hiç fotoğraf çekilmemek",
    ],
    correctIndex: 0,
    rewardTitle: "Hayaller Bölgesi Açıldı!",
    rewardNote:
      "Birlikte gezeceğimiz şehirler, güleceğimiz akşamlar ve nice 17 Kasımlar bizi bekliyor! 💙",
  },
];

const MAP_STORAGE_KEY = "bekir_gizem_discovery_map_v1";

function loadUnlocked(): string[] {
  try {
    const raw = window.localStorage.getItem(MAP_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function DiscoveryMap() {
  const [unlockedIds, setUnlockedIds] = useState<string[]>(() => loadUnlocked());
  const [activeRegionId, setActiveRegionId] = useState<string>("past");
  const [wrongMsg, setWrongMsg] = useState<string | null>(null);

  const activeRegion =
    MAP_REGIONS.find((r) => r.id === activeRegionId) ?? MAP_REGIONS[0];
  const allFourUnlocked = MAP_REGIONS.every((r) => unlockedIds.includes(r.id));

  const handleSelectRegion = (region: MapRegion, index: number) => {
    // Allow clicking any unlocked region OR the next sequential region
    const prevUnlocked =
      index === 0 || unlockedIds.includes(MAP_REGIONS[index - 1].id);
    if (!prevUnlocked && !unlockedIds.includes(region.id)) {
      setWrongMsg(
        `Önce "${MAP_REGIONS[index - 1].title}" görevini tamamlayarak bu bölgeyi açmalısın ✨`
      );
      return;
    }
    setWrongMsg(null);
    setActiveRegionId(region.id);
  };

  const handleAnswer = (optIdx: number) => {
    if (optIdx === activeRegion.correctIndex) {
      setWrongMsg(null);
      if (!unlockedIds.includes(activeRegion.id)) {
        const next = [...unlockedIds, activeRegion.id];
        setUnlockedIds(next);
        try {
          window.localStorage.setItem(MAP_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        confetti({
          particleCount: next.length === MAP_REGIONS.length ? 95 : 50,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#A7F3D0", "#BAE6FD", "#34D399", "#0EA5E9", "#FFFFFF"],
        });
      }
    } else {
      setWrongMsg("Küçük bir ipucu: Kalbinin bildiği en doğru cevabı seç ❤️");
    }
  };

  const resetMap = () => {
    setUnlockedIds([]);
    setActiveRegionId("past");
    setWrongMsg(null);
    try {
      window.localStorage.removeItem(MAP_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative py-14 md:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06383E]/60 backdrop-blur-md border border-[#A7F3D0]/45 mb-3">
          <Compass className="w-4 h-4 text-[#A7F3D0]" />
          <span className="text-xs tracking-[0.22em] uppercase text-[#E0F2FE] font-semibold">
            Harita Modu • İnteraktif Keşif
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-white font-semibold">
          Gizem’in <span className="italic text-[#BAE6FD]">Keşif Yolculuğu</span>
        </h2>

        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#E0F2FE]/85">
          Haritadaki bölgeleri sırayla açarak 5. Final Hazinesi’ne ulaş! (Aşağıdaki tüm bölümleri de istediğin an özgürce gezebilirsin.)
        </p>
      </div>

      <div className="rounded-[2rem] p-5 sm:p-8 bg-[#06383E]/65 backdrop-blur-xl border border-white/25 shadow-[0_18px_50px_rgba(4,40,45,0.34)]">
        {/* 5 Bölge Harita Rotası */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
          {MAP_REGIONS.map((region, idx) => {
            const isUnlocked = unlockedIds.includes(region.id);
            const isAvailable =
              idx === 0 || unlockedIds.includes(MAP_REGIONS[idx - 1].id);
            const isActive = activeRegionId === region.id;

            return (
              <button
                key={region.id}
                type="button"
                onClick={() => handleSelectRegion(region, idx)}
                className={`relative text-left p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[112px] ${
                  isActive
                    ? "bg-gradient-to-br from-[#059669]/65 to-[#0284C7]/65 border-white shadow-[0_0_24px_rgba(56,189,248,0.35)] scale-[1.02]"
                    : isUnlocked
                    ? "bg-[#0D9488]/35 border-[#A7F3D0]/60 hover:bg-[#0D9488]/50"
                    : isAvailable
                    ? "bg-white/10 border-white/30 hover:bg-white/15"
                    : "bg-[#04282D]/60 border-white/15 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xl">{region.emoji}</span>
                  {isUnlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-[#A7F3D0]" />
                  ) : isAvailable ? (
                    <Unlock className="w-4 h-4 text-[#BAE6FD]" />
                  ) : (
                    <Lock className="w-4 h-4 text-white/45" />
                  )}
                </div>

                <div>
                  <p className="text-xs font-semibold text-white leading-snug">
                    {region.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-[#E0F2FE]/75 line-clamp-2">
                    {region.subtitle}
                  </p>
                </div>
              </button>
            );
          })}

          {/* 5. Bölge: Büyük Final Hazinesi */}
          <div
            className={`relative p-4 rounded-2xl border flex flex-col justify-between min-h-[112px] transition-all duration-500 ${
              allFourUnlocked
                ? "bg-gradient-to-br from-[#10B981]/70 via-[#0EA5E9]/70 to-[#FDE68A]/35 border-white shadow-[0_0_28px_rgba(167,243,208,0.45)]"
                : "bg-[#04282D]/60 border-white/15 opacity-70"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xl">💎</span>
              {allFourUnlocked ? (
                <Trophy className="w-4 h-4 text-[#FDE68A]" />
              ) : (
                <Lock className="w-4 h-4 text-white/45" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold text-white leading-snug">
                5. Bölge: Kalbin Hazinesi
              </p>
              <p className="mt-0.5 text-[10px] text-[#E0F2FE]/80">
                {allFourUnlocked
                  ? "Tüm harita açıldı! ✨"
                  : "İlk 4 bölgeyi aç"}
              </p>
            </div>
          </div>
        </div>

        {/* Aktif Bölge Görev Kartı */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRegion.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28 }}
            className="rounded-3xl p-5 sm:p-7 bg-[#04282D]/70 border border-white/20"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#A7F3D0] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{activeRegion.title}</span>
              </div>

              {unlockedIds.length > 0 && (
                <button
                  type="button"
                  onClick={resetMap}
                  className="inline-flex items-center gap-1 text-[11px] text-[#BAE6FD]/80 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Haritayı Sıfırla
                </button>
              )}
            </div>

            {unlockedIds.includes(activeRegion.id) ? (
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10B981]/25 border border-[#A7F3D0]/50 text-xs text-[#A7F3D0] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeRegion.rewardTitle}
                </div>
                <p className="font-serif italic text-xl sm:text-2xl text-white leading-relaxed">
                  “{activeRegion.rewardNote}”
                </p>
                {activeRegion.number < MAP_REGIONS.length && (
                  <button
                    type="button"
                    onClick={() =>
                      setActiveRegionId(MAP_REGIONS[activeRegion.number].id)
                    }
                    className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#059669] to-[#0284C7] text-white text-xs font-semibold border border-white/40 cursor-pointer hover:brightness-110 transition-all"
                  >
                    Sonraki Bölgeye Geç →
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="font-serif text-xl sm:text-2xl text-white font-medium">
                  {activeRegion.question}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activeRegion.options.map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => handleAnswer(i)}
                      className="text-left px-4 py-3.5 rounded-2xl bg-white/10 hover:bg-[#0EA5E9]/30 border border-white/25 hover:border-[#A7F3D0] text-sm text-white transition-all active:scale-[0.98] cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {wrongMsg && (
                  <p className="text-xs text-[#FDE68A] font-medium">
                    {wrongMsg}
                  </p>
                )}
              </div>
            )}

            {allFourUnlocked && (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 pt-5 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6 text-[#A7F3D0] fill-[#A7F3D0] shrink-0" />
                  <p className="text-sm text-[#E0F2FE]">
                    <strong>Tebrikler Gizem!</strong> Bütün haritayı tamamladın — Bekir’den sana sonsuz sevgi ve 17 Kasım hazinesi! 💎
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
