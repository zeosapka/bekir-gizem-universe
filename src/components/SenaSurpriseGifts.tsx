import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Gift,
  Heart,
  Sparkles,
  Star,
  Moon,
  Mail,
  Flower2,
  X,
  CheckCircle2,
  RotateCcw,
} from "lucide-react";
import { UNIVERSE_CONFIG } from "../config/universeConfig";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";

const STORAGE_KEY = "bekir_gizem_opened_gifts_v1";

type GardenFlowerSpecies =
  | "rose"
  | "orchid"
  | "sunflower"
  | "tulip"
  | "lily"
  | "sakura";

interface BloomingFlowerNode {
  id: number;
  x: number;
  y: number;
  size: number;
  hue: string;
  species: GardenFlowerSpecies;
  delay: number;
}

const GARDEN_SPECIES: GardenFlowerSpecies[] = [
  "rose",
  "orchid",
  "sunflower",
  "tulip",
  "lily",
  "sakura",
];

function RealisticGardenFlowerSvg({
  species,
  hue,
  size,
}: {
  species: GardenFlowerSpecies;
  hue: string;
  size: number;
}) {
  return (
    <svg
      viewBox="0 0 64 64"
      style={{ width: size, height: size }}
      className="drop-shadow-[0_4px_10px_rgba(15,61,62,0.24)]"
    >
      {/* Yeşil Yapraklar */}
      <ellipse
        cx="21"
        cy="50"
        rx="9"
        ry="4.5"
        transform="rotate(-26 21 50)"
        fill="#16A34A"
      />
      <ellipse
        cx="43"
        cy="50"
        rx="9"
        ry="4.5"
        transform="rotate(26 43 50)"
        fill="#22C55E"
      />

      {species === "rose" && (
        <g>
          {[0, 72, 144, 216, 288].map((deg) => (
            <ellipse
              key={deg}
              cx="32"
              cy="19"
              rx="10"
              ry="12"
              fill={hue}
              stroke="rgba(255,255,255,0.45)"
              strokeWidth="0.9"
              transform={`rotate(${deg} 32 30)`}
            />
          ))}
          {[36, 108, 180, 252, 324].map((deg) => (
            <ellipse
              key={deg}
              cx="32"
              cy="23"
              rx="7.5"
              ry="9"
              fill="#FB7185"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="0.8"
              transform={`rotate(${deg} 32 30)`}
            />
          ))}
          <circle cx="32" cy="30" r="6" fill="#9F1239" />
          <circle cx="32" cy="30" r="3" fill="#FDA4AF" />
        </g>
      )}

      {species === "orchid" && (
        <g>
          {[0, 120, 240].map((deg) => (
            <ellipse
              key={deg}
              cx="32"
              cy="16"
              rx="7"
              ry="13"
              fill={hue}
              stroke="rgba(255,255,255,0.65)"
              strokeWidth="0.9"
              transform={`rotate(${deg} 32 30)`}
            />
          ))}
          <ellipse cx="22" cy="31" rx="9" ry="7" fill="#E879F9" stroke="#FAF5FF" strokeWidth="0.9" />
          <ellipse cx="42" cy="31" rx="9" ry="7" fill="#E879F9" stroke="#FAF5FF" strokeWidth="0.9" />
          <path d="M26,32 Q32,44 38,32 Q32,27 26,32 Z" fill="#FACC15" stroke="#9333EA" strokeWidth="1" />
          <circle cx="32" cy="30" r="3" fill="#FFFBEB" />
        </g>
      )}

      {species === "sunflower" && (
        <g>
          {Array.from({ length: 12 }, (_, idx) => idx * 30).map((deg) => (
            <ellipse
              key={deg}
              cx="32"
              cy="13"
              rx="4.5"
              ry="12"
              fill={deg % 60 === 0 ? "#FACC15" : "#F59E0B"}
              stroke="#FEF9C3"
              strokeWidth="0.7"
              transform={`rotate(${deg} 32 30)`}
            />
          ))}
          <circle cx="32" cy="30" r="10.5" fill="#78350F" stroke="#FDE047" strokeWidth="1.2" />
          <circle cx="29" cy="28" r="1.3" fill="#FDE047" opacity="0.7" />
          <circle cx="35" cy="31" r="1.3" fill="#FDE047" opacity="0.7" />
          <circle cx="31" cy="33" r="1.3" fill="#FDE047" opacity="0.7" />
        </g>
      )}

      {species === "tulip" && (
        <g>
          <rect x="30.5" y="34" width="3" height="17" rx="1.5" fill="#15803D" />
          <path d="M20,32 C17,16 26,10 32,20 C38,10 47,16 44,32 C42,40 22,40 20,32 Z" fill={hue} stroke="#FFF7ED" strokeWidth="1" />
          <path d="M25,33 C24,18 32,12 32,12 C32,12 40,18 39,33 C37,39 27,39 25,33 Z" fill="#FDBA74" opacity="0.55" />
        </g>
      )}

      {species === "lily" && (
        <g>
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <path
              key={deg}
              d="M32,30 C26,20 27,10 32,5 C37,10 38,20 32,30 Z"
              fill={deg % 120 === 0 ? "#FFFFFF" : "#E0F2FE"}
              stroke={hue}
              strokeWidth="1"
              transform={`rotate(${deg} 32 30)`}
            />
          ))}
          <circle cx="32" cy="30" r="4.5" fill="#FACC15" />
          {[30, 150, 270].map((deg) => (
            <line
              key={deg}
              x1="32"
              y1="30"
              x2="32"
              y2="20"
              stroke="#EA580C"
              strokeWidth="1.2"
              transform={`rotate(${deg} 32 30)`}
            />
          ))}
        </g>
      )}

      {species === "sakura" && (
        <g>
          {[0, 72, 144, 216, 288].map((deg) => (
            <path
              key={deg}
              d="M32,30 C23,22 22,10 29,9 C31,9 32,12 32,12 C32,12 33,9 35,9 C42,10 41,22 32,30 Z"
              fill={hue}
              stroke="#FFF1F2"
              strokeWidth="1"
              transform={`rotate(${deg} 32 30)`}
            />
          ))}
          <circle cx="32" cy="30" r="5" fill="#FDE047" />
        </g>
      )}
    </svg>
  );
}

export function SenaSurpriseGifts() {
  const cfg = UNIVERSE_CONFIG.surpriseGiftsSection;
  const { isReducedMotion, particleCountMultiplier } = usePerformanceProfile();

  // Sayfa yenilendiğinde kutu durumlarının tutarlı kalması için localStorage senkronizasyonu
  const [openedBoxIds, setOpenedBoxIds] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Hediye açılma animasyonu aşaması:
  // "shaking" (sallanma) -> "untying" (kurdele çözülmesi) -> "lid-opening" (kapak açılması & ışıklar) -> modal
  const [animatingBoxId, setAnimatingBoxId] = useState<number | null>(null);
  const [animPhase, setAnimPhase] = useState<
    "idle" | "shaking" | "untying" | "lid-opening"
  >("idle");
  const [activeModalBoxId, setActiveModalBoxId] = useState<number | null>(null);

  // 2. Kutu (Sonsuz Çiçekler) için dinamik çiçek bahçesi durumu
  const [flowers, setFlowers] = useState<BloomingFlowerNode[]>([]);
  // 3. Kutu (Küçük Bir Yıldız) için dilek sayacı
  const [starWishCount, setStarWishCount] = useState(1);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(openedBoxIds));
    } catch {
      // ignore storage quota errors in private mode
    }
  }, [openedBoxIds]);

  const spawnInitialFlowers = () => {
    const palette = [
      "#E11D48", // Canlı Gül Kırmızısı
      "#F97316", // Sıcak Mercan Turuncu
      "#EAB308", // Güneş Sarısı
      "#9333EA", // Doğal Leylak Moru
      "#0284C7", // Gökyüzü Mavisi
      "#EC4899", // Bahar Pembesi
    ];
    const initial: BloomingFlowerNode[] = [];
    for (let i = 0; i < 12; i++) {
      initial.push({
        id: i + 1,
        x: 10 + ((i * 23) % 80),
        y: 15 + ((i * 29) % 66),
        size: 40 + (i % 4) * 9,
        hue: palette[i % palette.length],
        species: GARDEN_SPECIES[i % GARDEN_SPECIES.length],
        delay: i * 0.06,
      });
    }
    setFlowers(initial);
  };

  const addMoreFlowers = () => {
    const palette = [
      "#E11D48",
      "#F97316",
      "#EAB308",
      "#9333EA",
      "#0284C7",
      "#EC4899",
    ];
    setFlowers((prev) => {
      const nextId = prev.length + 1;
      const added: BloomingFlowerNode[] = [
        {
          id: nextId,
          x: 12 + Math.random() * 76,
          y: 14 + Math.random() * 68,
          size: 40 + Math.random() * 18,
          hue: palette[nextId % palette.length],
          species: GARDEN_SPECIES[nextId % GARDEN_SPECIES.length],
          delay: 0,
        },
        {
          id: nextId + 1,
          x: 12 + Math.random() * 76,
          y: 14 + Math.random() * 68,
          size: 38 + Math.random() * 16,
          hue: palette[(nextId + 1) % palette.length],
          species: GARDEN_SPECIES[(nextId + 1) % GARDEN_SPECIES.length],
          delay: 0.06,
        },
        {
          id: nextId + 2,
          x: 12 + Math.random() * 76,
          y: 14 + Math.random() * 68,
          size: 42 + Math.random() * 14,
          hue: palette[(nextId + 2) % palette.length],
          species: GARDEN_SPECIES[(nextId + 2) % GARDEN_SPECIES.length],
          delay: 0.12,
        },
      ];
      return [...prev.slice(-24), ...added];
    });
  };

  const handleBoxClick = (boxId: number) => {
    if (animatingBoxId !== null) return;

    const markOpenedAndShowModal = () => {
      setOpenedBoxIds((prev) =>
        prev.includes(boxId) ? prev : [...prev, boxId]
      );
      if (boxId === 2) {
        spawnInitialFlowers();
      }
      if (boxId === 3) {
        setStarWishCount(1);
      }
      setAnimatingBoxId(null);
      setAnimPhase("idle");
      setActiveModalBoxId(boxId);

      // Kutu açıldığında pembe ve altın parçacık patlaması
      const isGrand = boxId === 5;
      confetti({
        particleCount: Math.max(
          30,
          Math.round((isGrand ? 110 : 65) * particleCountMultiplier)
        ),
        spread: isGrand ? 130 : 95,
        origin: { y: 0.58 },
        colors: ["#0EA5E9", "#A7F3D0", "#F5D58A", "#FFF8FC"],
        scalar: isGrand ? 1.2 : 1.0,
      });
    };

    if (isReducedMotion) {
      markOpenedAndShowModal();
      return;
    }

    // 1. Aşama: Kutu hafifçe sallansın
    setAnimatingBoxId(boxId);
    setAnimPhase("shaking");

    window.setTimeout(() => {
      // 2. Aşama: Kurdele çözülsün
      setAnimPhase("untying");
    }, 380);

    window.setTimeout(() => {
      // 3. Aşama: Kutu kapağı açılsın ve içinden pembe ışıklar/kalpler yükselsin
      setAnimPhase("lid-opening");
    }, 720);

    window.setTimeout(() => {
      // 4. Aşama: Sürpriz modalı açılsın
      markOpenedAndShowModal();
    }, 1180);
  };

  const activeBox = cfg.boxes.find((b) => b.id === activeModalBoxId) || null;
  const openedCount = openedBoxIds.length;

  return (
    <section
      id="surprise-gifts-section"
      className="relative py-16 md:py-24 px-5 sm:px-6 max-w-6xl mx-auto"
    >
      {/* Bölüm Başlığı */}
      <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06383E]/55 border border-[#F5D58A]/35 mb-3 shadow-[0_0_25px_rgba(14, 165, 233,0.25)]">
          <Gift className="w-4 h-4 text-[#F5D58A]" />
          <span className="text-xs tracking-[0.22em] uppercase text-[#F5D58A] font-semibold">
            {cfg.badgeText} • {openedCount} / {cfg.boxes.length}
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#FFF8FC] font-semibold">
          {cfg.title}
        </h2>

        <p className="mt-4 font-serif italic text-xl sm:text-2xl text-[#FFF8FC]/85 leading-relaxed">
          &ldquo;{cfg.subtitle}&rdquo;
        </p>
      </div>

      {/* 5 Hediye Kutusu Grid Düzeni (iPad Dikeyde 2+2+1, Yatay ve Masaüstünde 3+2 / 5'li Uyumlu) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 sm:gap-6">
        {cfg.boxes.map((box, idx) => {
          const isOpened = openedBoxIds.includes(box.id);
          const isAnimatingThis = animatingBoxId === box.id;
          const isGrand = !!box.isGrandSpecial;

          // İlk 3 kutu lg ekranlarda 2'şer birim (3 sütun), son 2 kutu 3'er birim (2 geniş sütun),
          // sm (iPad dikey) ekranlarda 5. kutu 2 sütunu birden kaplar
          const gridSpanClass =
            idx < 3
              ? "lg:col-span-2"
              : idx === 3
              ? "lg:col-span-3"
              : "sm:col-span-2 lg:col-span-3";

          return (
            <motion.div
              key={box.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className={gridSpanClass}
            >
              <button
                type="button"
                onClick={() => handleBoxClick(box.id)}
                aria-label={`${box.numberLabel}. Kutu: ${box.title}`}
                className={`group relative w-full min-h-[240px] sm:min-h-[255px] rounded-[2rem] p-6 sm:p-7 text-center flex flex-col items-center justify-between overflow-hidden transition-all duration-500 cursor-pointer touch-manipulation select-none bg-gradient-to-br ${
                  box.boxGradient
                } ${
                  isGrand
                    ? "border-2 border-[#F5D58A]/80 shadow-[0_0_55px_rgba(245,213,138,0.3)]"
                    : isOpened
                    ? "border-2 border-[#A7F3D0]/65 shadow-[0_0_35px_rgba(14, 165, 233,0.28)]"
                    : "border border-[#F5D58A]/35 shadow-[0_15px_45px_rgba(8,6,17,0.85)] hover:border-[#F5D58A]/75"
                } active:scale-[0.98]`}
              >
                {/* Arka plan romantik ışıltı halesi */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500 group-hover:opacity-75"
                  style={{
                    background: `radial-gradient(circle at 50% 38%, ${box.accentColor}33 0%, transparent 68%)`,
                  }}
                />

                {/* Üst Numara Rozeti ve Açıldı Durumu */}
                <div className="relative z-20 w-full flex items-center justify-between gap-2">
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#06383E]/85 border border-[#F5D58A]/50 font-serif font-bold text-base text-[#F5D58A] shadow-md">
                    {box.numberLabel}
                  </span>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.16em] font-medium border ${
                      isOpened
                        ? "bg-[#F5D58A]/20 border-[#F5D58A]/70 text-[#F5D58A]"
                        : "bg-[#06383E]/70 border-[#A7F3D0]/35 text-[#A7F3D0]"
                    }`}
                  >
                    {isOpened ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F5D58A]" />
                        <span>{cfg.openedBadgeText}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3 h-3 text-[#A7F3D0]" />
                        <span>{cfg.unopenedBadgeText}</span>
                      </>
                    )}
                  </span>
                </div>

                {/* MERKEZ 3B HEDİYE KUTUSU, KURDELE VE FİYONK ANİMASYONU */}
                <div
                  className={`relative z-20 my-3 flex flex-col items-center justify-center ${
                    isAnimatingThis && animPhase === "shaking"
                      ? "animate-gift-wobble"
                      : ""
                  }`}
                >
                  {/* Kutu İçinden Yükselen Işıklar ve Kalpler (Kapak Açılırken) */}
                  <AnimatePresence>
                    {isAnimatingThis &&
                      (animPhase === "untying" ||
                        animPhase === "lid-opening") && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.4, y: 15 }}
                          animate={{ opacity: 1, scale: 1.35, y: -28 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.45 }}
                          className="pointer-events-none absolute -top-8 flex items-center justify-center gap-2"
                        >
                          <Heart className="w-6 h-6 text-[#A7F3D0] fill-[#A7F3D0]" />
                          <Sparkles className="w-7 h-7 text-[#F5D58A]" />
                          <Heart className="w-6 h-6 text-[#0EA5E9] fill-[#0EA5E9]" />
                        </motion.div>
                      )}
                  </AnimatePresence>

                  {/* Fiyonk (Bow) & Kutu Kapağı (Lid) */}
                  <motion.div
                    animate={
                      isAnimatingThis && animPhase === "lid-opening"
                        ? { y: -26, rotate: -14, opacity: 0.25 }
                        : isOpened
                        ? { y: -4 }
                        : { y: [0, -3, 0] }
                    }
                    transition={
                      isAnimatingThis
                        ? { duration: 0.38, ease: "easeOut" }
                        : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
                    }
                    className="relative z-20 flex flex-col items-center"
                  >
                    {/* Parlayan Fiyonk Kanatları */}
                    <motion.div
                      animate={
                        isAnimatingThis &&
                        (animPhase === "untying" || animPhase === "lid-opening")
                          ? { scaleX: 1.45, scaleY: 0.35, opacity: 0.2 }
                          : { scaleX: 1, scaleY: 1, opacity: 1 }
                      }
                      transition={{ duration: 0.32 }}
                      className="flex items-center justify-center -mb-1"
                    >
                      <span
                        className="w-6 h-3.5 rounded-full border-2 -mr-1 rotate-[-22deg] shadow-[0_0_12px_rgba(245,213,138,0.6)]"
                        style={{
                          borderColor: box.ribbonColor,
                          backgroundColor: `${box.ribbonColor}44`,
                        }}
                      />
                      <span
                        className="w-3 h-3 rounded-full z-10 shadow-sm"
                        style={{ backgroundColor: box.ribbonColor }}
                      />
                      <span
                        className="w-6 h-3.5 rounded-full border-2 -ml-1 rotate-[22deg] shadow-[0_0_12px_rgba(245,213,138,0.6)]"
                        style={{
                          borderColor: box.ribbonColor,
                          backgroundColor: `${box.ribbonColor}44`,
                        }}
                      />
                    </motion.div>

                    {/* Kutu Kapağı */}
                    <div
                      className="w-24 sm:w-28 h-5 rounded-lg border shadow-md flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: isGrand ? "#8E1D47" : "#5E1538",
                        borderColor: "#F5D58A99",
                      }}
                    >
                      <div
                        className="w-3.5 h-full"
                        style={{ backgroundColor: box.ribbonColor }}
                      />
                    </div>
                  </motion.div>

                  {/* Kutu Gövdesi + Dikey ve Yatay Kurdele */}
                  <div
                    className="relative w-20 sm:w-24 h-16 sm:h-18 -mt-0.5 rounded-b-2xl border flex items-center justify-center shadow-[0_10px_25px_rgba(8,6,17,0.75)] overflow-hidden"
                    style={{
                      backgroundColor: isGrand ? "#5E1133" : "#3B0D24",
                      borderColor: "#F5D58A66",
                    }}
                  >
                    {/* Dikey Kurdele */}
                    <motion.div
                      animate={
                        isAnimatingThis &&
                        (animPhase === "untying" || animPhase === "lid-opening")
                          ? { scaleY: 0.2, opacity: 0.25 }
                          : { scaleY: 1, opacity: 1 }
                      }
                      className="w-3.5 h-full"
                      style={{ backgroundColor: box.ribbonColor }}
                    />
                    {/* Yatay Kurdele */}
                    <motion.div
                      animate={
                        isAnimatingThis &&
                        (animPhase === "untying" || animPhase === "lid-opening")
                          ? { scaleX: 0.2, opacity: 0.25 }
                          : { scaleX: 1, opacity: 1 }
                      }
                      className="absolute inset-x-0 h-3"
                      style={{ backgroundColor: box.ribbonColor }}
                    />

                    {/* Kutu Üzerindeki Küçük Kalp / Numara Mührü */}
                    <div className="relative z-10 w-7 h-7 rounded-full bg-[#06383E] border border-[#F5D58A] flex items-center justify-center shadow-md">
                      <Heart className="w-3.5 h-3.5 text-[#0EA5E9] fill-[#0EA5E9]" />
                    </div>
                  </div>
                </div>

                {/* Alt Kutu Başlığı */}
                <div className="relative z-20 space-y-1">
                  <h3 className="font-serif font-semibold text-xl sm:text-2xl text-[#FFF8FC] group-hover:text-[#F5D58A] transition-colors">
                    {box.numberLabel}. Kutu — {box.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#FFF8FC]/70 font-serif italic">
                    {box.shortHint}
                  </p>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* SÜRPRİZ HEDİYE İÇERİK MODALI (Dikey ve Yatay iPad Uyumlu, Taşma Yapmaz) */}
      <AnimatePresence>
        {activeBox && (
          <motion.div
            key={`gift-modal-${activeBox.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalBoxId(null)}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 pt-16 sm:p-6 md:p-10 bg-[#04282D]/90 backdrop-blur-2xl overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[86dvh] overflow-y-auto overscroll-contain rounded-[2.25rem] p-6 sm:p-10 bg-gradient-to-br from-[#DCF5FF] via-[#E8FCF3] to-[#C8EEFF] border-2 border-white shadow-[0_25px_85px_rgba(14,165,233,0.35)] text-center text-[#0F3D3E]"
            >
              {/* Sağ Üst Kapatma Butonu */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#0EA5E9]/20">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/80 border border-[#7DD3FC] text-xs uppercase tracking-[0.2em] text-[#0F4C5C] font-semibold">
                  <Gift className="w-3.5 h-3.5 text-[#0EA5E9]" />
                  <span>
                    {activeBox.numberLabel}. Sürpriz • {activeBox.title}
                  </span>
                </span>

                <button
                  type="button"
                  onClick={() => setActiveModalBoxId(null)}
                  aria-label={cfg.closeModalAriaLabel}
                  className="flex items-center justify-center w-11 h-11 rounded-full bg-white/85 border border-[#7DD3FC] text-[#0F3D3E] hover:bg-[#0EA5E9] hover:text-white active:scale-95 transition-all cursor-pointer touch-manipulation"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 1. KUTU İÇERİĞİ: SANA BİR MEKTUP 💌 */}
              {activeBox.id === 1 && (
                <div className="space-y-6 py-2">
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2.6, repeat: Infinity }}
                    className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#10B981] to-[#0EA5E9] p-1 shadow-[0_10px_30px_rgba(14,165,233,0.3)] flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Mail className="w-9 h-9 text-[#0D9488]" />
                    </div>
                  </motion.div>

                  <h3 className="font-serif text-3xl sm:text-4xl text-[#0F3D3E] font-semibold italic">
                    {activeBox.headline}
                  </h3>

                  <div className="p-6 sm:p-8 rounded-3xl bg-white/80 border border-[#A7F3D0] shadow-sm">
                    <p className="font-serif italic text-xl sm:text-2xl text-[#0F3D3E] leading-relaxed">
                      &ldquo;{activeBox.message}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs uppercase tracking-[0.22em] text-[#0F766E] font-semibold">
                    {activeBox.subNote}
                  </p>
                </div>
              )}

              {/* 2. KUTU İÇERİĞİ: SONSUZ ÇİÇEKLER 🌸 */}
              {activeBox.id === 2 && (
                <div className="space-y-6 py-2">
                  <div
                    onClick={addMoreFlowers}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") addMoreFlowers();
                    }}
                    className="relative w-full h-56 sm:h-64 rounded-3xl bg-gradient-to-b from-[#CBEFFF] via-[#E3FAEE] to-[#BDEFD2] border-2 border-white shadow-inner overflow-hidden cursor-pointer select-none"
                  >
                    {flowers.map((fl) => (
                      <motion.div
                        key={fl.id}
                        initial={{ scale: 0, rotate: -45, opacity: 0 }}
                        animate={{ scale: 1, rotate: 0, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 15,
                          delay: fl.delay,
                        }}
                        style={{
                          left: `${fl.x}%`,
                          top: `${fl.y}%`,
                        }}
                        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      >
                        <RealisticGardenFlowerSvg
                          species={fl.species}
                          hue={fl.hue}
                          size={fl.size}
                        />
                      </motion.div>
                    ))}
                    <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/85 border border-[#7DD3FC] text-[11px] uppercase tracking-[0.18em] text-[#0F4C5C] font-semibold shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#0EA5E9]" />
                        <span>{activeBox.subNote}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="font-serif italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#0F3D3E] leading-snug">
                    &ldquo;{activeBox.message}&rdquo;
                  </h3>

                  <button
                    type="button"
                    onClick={addMoreFlowers}
                    className="inline-flex items-center gap-2 px-6 py-3 min-h-[46px] rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#10B981] hover:brightness-105 border-2 border-white text-xs uppercase tracking-[0.2em] font-semibold text-white shadow-[0_8px_22px_rgba(14,165,233,0.3)] transition-all cursor-pointer touch-manipulation"
                  >
                    <Flower2 className="w-4 h-4 text-white" />
                    <span>Daha Fazla Çiçek Açtır 🌸</span>
                  </button>
                </div>
              )}

              {/* 3. KUTU İÇERİĞİ: KÜÇÜK BİR YILDIZ ✨ */}
              {activeBox.id === 3 && (
                <div className="space-y-6 py-2">
                  <div
                    onClick={() => {
                      setStarWishCount((c) => c + 1);
                      confetti({
                        particleCount: Math.max(
                          25,
                          Math.round(50 * particleCountMultiplier)
                        ),
                        spread: 90,
                        origin: { y: 0.55 },
                        colors: ["#FACC15", "#0EA5E9", "#10B981", "#FFFFFF"],
                      });
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setStarWishCount((c) => c + 1);
                      }
                    }}
                    className="relative w-full h-56 sm:h-64 rounded-3xl bg-gradient-to-b from-[#BAE6FD] via-[#D8F3FF] to-[#D1FAE5] border-2 border-white flex flex-col items-center justify-center overflow-hidden cursor-pointer select-none shadow-inner"
                  >
                    {/* Kayan Yıldız Hüzmesi */}
                    <motion.div
                      key={starWishCount}
                      initial={{ x: -160, y: 60, opacity: 0, scale: 0.5 }}
                      animate={{
                        x: [0, 0],
                        y: [0, 0],
                        opacity: 1,
                        scale: [1, 1.18, 1],
                      }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                      className="relative flex items-center justify-center w-28 h-28 rounded-full bg-white/75 border-2 border-[#FACC15] shadow-[0_0_50px_rgba(250,204,21,0.6)]"
                    >
                      <Star className="w-16 h-16 text-[#F59E0B] fill-[#FACC15]" />
                    </motion.div>

                    <span className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/85 border border-[#7DD3FC] text-[11px] uppercase tracking-[0.18em] text-[#0F4C5C] font-semibold">
                      <Sparkles className="w-3 h-3 text-[#0EA5E9]" />
                      <span>{activeBox.subNote}</span>
                    </span>
                  </div>

                  <h3 className="font-serif italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#0F3D3E] leading-snug">
                    &ldquo;{activeBox.message}&rdquo;
                  </h3>
                </div>
              )}

              {/* 4. KUTU İÇERİĞİ: BİRLİKTE GELECEK HAYALLERİMİZ 🌙 */}
              {activeBox.id === 4 && (
                <div className="space-y-6 py-2">
                  <motion.div
                    animate={{ rotate: [-5, 5, -5] }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#10B981] p-1 shadow-[0_10px_30px_rgba(14,165,233,0.3)] flex items-center justify-center"
                  >
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Moon className="w-9 h-9 text-[#0284C7] fill-[#BAE6FD]" />
                    </div>
                  </motion.div>

                  <h3 className="font-serif text-2xl sm:text-4xl text-[#0F3D3E] font-semibold italic">
                    {activeBox.headline}
                  </h3>

                  <p className="font-serif italic text-lg sm:text-xl text-[#134E4A] leading-relaxed">
                    &ldquo;{activeBox.message}&rdquo;
                  </p>

                  {activeBox.futureDreams && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                      {activeBox.futureDreams.map((dream, dIdx) => (
                        <motion.div
                          key={dIdx}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: dIdx * 0.12 }}
                          className="p-4 rounded-2xl bg-white/85 border border-[#7DD3FC] text-sm sm:text-base text-[#0F3D3E] font-medium flex items-center gap-2.5 shadow-sm"
                        >
                          <span>{dream}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs uppercase tracking-[0.2em] text-[#0F766E] font-semibold">
                    {activeBox.subNote}
                  </p>
                </div>
              )}

              {/* 5. KUTU İÇERİĞİ: EN BÜYÜK SÜRPRİZ ❤️ */}
              {activeBox.id === 5 && (
                <div className="space-y-6 py-3">
                  <div className="relative py-4 flex items-center justify-center">
                    <div className="pointer-events-none absolute w-44 h-44 rounded-full bg-[#38BDF8]/30 blur-2xl animate-pulse" />
                    <motion.div
                      animate={{ scale: [1, 1.18, 1, 1.14, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity }}
                      className="relative z-10 w-28 h-28 rounded-full bg-gradient-to-br from-[#10B981] via-[#0EA5E9] to-[#FDE68A] p-1 shadow-[0_12px_40px_rgba(14,165,233,0.38)] flex items-center justify-center"
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Heart className="w-14 h-14 text-[#0D9488] fill-[#0D9488]" />
                      </div>
                    </motion.div>
                  </div>

                  <h3 className="font-serif italic font-bold text-2xl sm:text-4xl md:text-5xl text-[#0F3D3E] leading-tight">
                    &ldquo;{activeBox.message}&rdquo;
                  </h3>

                  <p className="text-xs sm:text-sm uppercase tracking-[0.24em] text-[#0F766E] font-semibold">
                    {activeBox.subNote}
                  </p>
                </div>
              )}

              {/* Alt Kapat / Hediyelere Dön Butonu */}
              <div className="pt-6 mt-6 border-t border-[#0EA5E9]/20 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setActiveModalBoxId(null)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 min-h-[48px] rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#10B981] hover:brightness-105 border-2 border-white text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-white shadow-[0_10px_28px_rgba(14,165,233,0.32)] active:scale-95 transition-all cursor-pointer touch-manipulation"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{cfg.closeModalButtonText}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
