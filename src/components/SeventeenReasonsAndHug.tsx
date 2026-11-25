import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Heart,
  Sparkles,
  CalendarHeart,
  Smile,
  Camera,
  MessageCircleHeart,
  RotateCcw,
} from "lucide-react";

const DAILY_REASONS: string[] = [
  "Seni seviyorum çünkü en sıradan günümü bile tek bir gülüşünle bayrama çeviriyorsun.",
  "Seni seviyorum çünkü yanında kendim olabiliyor, en saçma şakalarıma bile seninle gülebiliyorum.",
  "Seni seviyorum çünkü gözlerinin içi güldüğünde dünyadaki bütün dertler susuyor.",
  "Seni seviyorum çünkü 17 Kasım 2023'ten beri kalbimin en güvenli evi sensin.",
  "Seni seviyorum çünkü en yorgun anımda bile sesini duymak bana yeniden güç veriyor.",
  "Seni seviyorum çünkü küçük detaylara verdiğin değerle hayatı güzelleştiriyorsun.",
  "Seni seviyorum çünkü elimi tuttuğunda zaman yavaşlıyor, her şey yerli yerine oturuyor.",
  "Seni seviyorum çünkü sabrın, zarafetin ve kalbinin temizliğiyle her gün yeniden hayran bırakıyorsun.",
  "Seni seviyorum çünkü birlikte susarken bile anlaşabildiğim tek insan sensin.",
  "Seni seviyorum çünkü seninle kurduğumuz her hayal şimdiden gerçeğe dönüşecek kadar güzel.",
  "Seni seviyorum çünkü neşeni, merhametini ve sevgini hiç sakınmadan paylaşıyorsun.",
  "Seni seviyorum çünkü hayatıma girdiğin günden beri 'iyi ki' kelimesinin anlamı sensin.",
];

interface ReasonCard {
  id: number;
  type: "message" | "funny" | "photo";
  title: string;
  content: string;
  imageUrl?: string;
}

const SEVENTEEN_REASONS: ReasonCard[] = [
  {
    id: 1,
    type: "message",
    title: "17 Kasım Başlangıcı",
    content: "17 Kasım 2023'te hayatımın en güzel sayfasını seninle açtığım için.",
  },
  {
    id: 2,
    type: "funny",
    title: "İki Saatlik Tatlı Triplerin",
    content: "Küçük şeylere iki saat trip atsan bile o halini bile ayrı sevdiğim için! 😄❤️",
  },
  {
    id: 3,
    type: "photo",
    title: "Özel Karemiz I",
    content: "Birlikte baktığımız her gökyüzü aynı güzellikte.",
    imageUrl: "./moments/wall-6.png",
  },
  {
    id: 4,
    type: "message",
    title: "Sesindeki Huzur",
    content: "Telefonun ucunda 'Alo' dediğin an bütün yorgunluğum silindiği için.",
  },
  {
    id: 5,
    type: "funny",
    title: "Yemek Seçme Krizi",
    content: "'Ne yesek?' sorusuna 20 dakika 'Fark etmez' deyip sonra en güzel yeri seçtiğin için! 🍝",
  },
  {
    id: 6,
    type: "photo",
    title: "Özel Karemiz II",
    content: "Seninle her mevsim bahar.",
    imageUrl: "./moments/wall-21.png",
  },
  {
    id: 7,
    type: "message",
    title: "Gözlerinin Işıltısı",
    content: "Mutlu olduğunda gözlerinin parlamasını izlemeye doyamadığım için.",
  },
  {
    id: 8,
    type: "message",
    title: "Hayvanlara Olan Sevgin",
    content: "Sokaktaki minik canlara bile sevgiyle yaklaşan o merhametli, kocaman yüreğin için. 🐾💚",
  },
  {
    id: 9,
    type: "message",
    title: "İnce Düşünceliğin",
    content: "En küçük ayrıntıyı bile unutmayan o zarif ve ince düşünceliğinle beni hep mutlu ettiğin için.",
  },
  {
    id: 10,
    type: "photo",
    title: "Özel Karemiz III",
    content: "Aynı yıldızların altında el ele.",
    imageUrl: "./moments/wall-16.png",
  },
  {
    id: 11,
    type: "funny",
    title: "Fotoğraf Çekim Maratonu",
    content: "'Bir tane daha çek, ışık güzel' diye 45. pozda bile aynı enerjide olduğun için! 📸",
  },
  {
    id: 12,
    type: "message",
    title: "Güven Limanım",
    content: "Ne olursa olsun yanımda olduğunu bilmek bana dünyaları verdiği için.",
  },
  {
    id: 13,
    type: "funny",
    title: "Şarkıya Eşlik",
    content: "Sözlerini yarı yanlış söylesen de arabada/yolda en içten konseri verdiğin için! 🎶",
  },
  {
    id: 14,
    type: "photo",
    title: "Özel Karemiz IV",
    content: "Yolculuğumuzun en güzel durakları.",
    imageUrl: "./moments/wall-4.png",
  },
  {
    id: 15,
    type: "message",
    title: "Küçük Sürprizlerin",
    content: "Hiç beklemediğim anlarda gönderdiğin tatlı mesajlarla günümü aydınlattığın için.",
  },
  {
    id: 16,
    type: "funny",
    title: "Kahve Bahane",
    content: "'Sadece bir kahve içip kalkacağız' deyip saatlerce sohbetten kalkamadığımız için! ☕",
  },
  {
    id: 17,
    type: "message",
    title: "17 Kasım Sözüm",
    content: "Seni her geçen gün bir öncekinden daha çok sevdiğim ve hep seveceğim için Gizem'im! ❤️",
  },
];

const HUG_MESSAGES = [
  "Şu an yanına ışınlanıp sana sımsıkı sarıldığımı hisset! 🫂💙",
  "Bu sarılma bütün stresini alıp yerine sıcacık huzur bıraksın biricik aşkım. 💚",
  "Bekir'den Gizem'e: 17 Kasım 2023'ten beri en sevdiğim yer senin kolların! 🫂✨",
  "Sonsuz sarılma hakkın aktif — ne zaman istersen tek tık uzağındayım! ❤️",
];

const HUG_COUNT_KEY = "bekir_gizem_hug_count_v1";
const OPEN_CARDS_KEY = "bekir_gizem_17_reasons_open_v1";

function getDayOfYearIndex(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const day = Math.floor(diff / (1000 * 60 * 60 * 24));
  return day % DAILY_REASONS.length;
}

function loadNumber(key: string, fallback = 0): number {
  try {
    const val = Number(window.localStorage.getItem(key));
    return Number.isFinite(val) ? val : fallback;
  } catch {
    return fallback;
  }
}

function loadOpenCards(): number[] {
  try {
    const raw = window.localStorage.getItem(OPEN_CARDS_KEY);
    return raw ? (JSON.parse(raw) as number[]) : [];
  } catch {
    return [];
  }
}

export function SeventeenReasonsAndHug() {
  const todayIdx = useMemo(() => getDayOfYearIndex(), []);
  const [reasonIdx, setReasonIdx] = useState(todayIdx);

  // Endless hug state
  const [hugCount, setHugCount] = useState<number>(() =>
    loadNumber(HUG_COUNT_KEY, 0)
  );
  const [showHugBurst, setShowHugBurst] = useState(false);
  const [hugMsg, setHugMsg] = useState(HUG_MESSAGES[0]);

  // 17 cards state
  const [openedIds, setOpenedIds] = useState<number[]>(() => loadOpenCards());

  const handleNextReason = () => {
    setReasonIdx((prev) => (prev + 1) % DAILY_REASONS.length);
  };

  const handleSendHug = () => {
    const nextCount = hugCount + 1;
    setHugCount(nextCount);
    setHugMsg(HUG_MESSAGES[nextCount % HUG_MESSAGES.length]);
    setShowHugBurst(true);
    try {
      window.localStorage.setItem(HUG_COUNT_KEY, String(nextCount));
    } catch {
      // ignore
    }
    confetti({
      particleCount: 55,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#A7F3D0", "#BAE6FD", "#34D399", "#38BDF8", "#FFFFFF"],
    });
    window.setTimeout(() => setShowHugBurst(false), 2600);
  };

  const toggleCard = (id: number) => {
    setOpenedIds((prev) => {
      const next = prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id];
      try {
        window.localStorage.setItem(OPEN_CARDS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const openAllCards = () => {
    const all = SEVENTEEN_REASONS.map((r) => r.id);
    setOpenedIds(all);
    try {
      window.localStorage.setItem(OPEN_CARDS_KEY, JSON.stringify(all));
    } catch {
      // ignore
    }
  };

  const closeAllCards = () => {
    setOpenedIds([]);
    try {
      window.localStorage.removeItem(OPEN_CARDS_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto space-y-14">
      {/* 1. HER GÜN BİR NEDEN + SONSUZ SARILMA BUTONU */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Her Gün Bir Neden */}
        <div className="rounded-[2rem] p-6 sm:p-8 bg-[#06383E]/65 backdrop-blur-xl border border-white/25 shadow-[0_16px_45px_rgba(4,40,45,0.32)] flex flex-col justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-[#A7F3D0]/40 mb-4">
              <CalendarHeart className="w-3.5 h-3.5 text-[#A7F3D0]" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#E0F2FE] font-semibold">
                Her Gün Bir Neden
              </span>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={reasonIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="font-serif italic text-xl sm:text-2xl text-white leading-relaxed"
              >
                “{DAILY_REASONS[reasonIdx]}”
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-3">
            <span className="text-xs text-[#BAE6FD]/80">
              {reasonIdx === todayIdx
                ? "✨ Bugünün özel nedeni"
                : `Neden #${reasonIdx + 1}`}
            </span>
            <button
              type="button"
              onClick={handleNextReason}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/30 text-xs font-medium text-white transition-all active:scale-95 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A7F3D0]" />
              Başka Neden Gör
            </button>
          </div>
        </div>

        {/* Sonsuz Sarılma Butonu */}
        <div className="relative rounded-[2rem] p-6 sm:p-8 bg-gradient-to-br from-[#0D9488]/75 via-[#06383E]/75 to-[#0284C7]/75 backdrop-blur-xl border border-white/30 shadow-[0_16px_45px_rgba(14,165,233,0.28)] flex flex-col items-center justify-center text-center overflow-hidden">
          <AnimatePresence>
            {showHugBurst && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0, scale: 1.2 }}
                className="pointer-events-none mb-2 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 border border-white/40 text-sm text-white font-medium"
              >
                <span className="text-xl animate-bounce">🫂</span>
                <span>Sımsıkı Sarıldı!</span>
                <span className="text-xl animate-bounce">💚</span>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-xs uppercase tracking-[0.22em] text-[#A7F3D0] font-semibold mb-2">
            Sonsuz Sarılma Butonu
          </p>

          <p className="font-serif italic text-lg sm:text-xl text-white/95 max-w-md mb-5">
            {hugMsg}
          </p>

          <motion.button
            type="button"
            whileTap={{ scale: 0.92 }}
            onClick={handleSendHug}
            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#10B981] to-[#0EA5E9] hover:brightness-110 border-2 border-white/75 text-white font-semibold text-sm uppercase tracking-[0.16em] shadow-[0_10px_30px_rgba(16,185,129,0.4)] cursor-pointer transition-all"
          >
            <span className="text-lg">🫂</span>
            <span>Sarılma Gönder</span>
            <Heart className="w-4 h-4 fill-white text-white" />
          </motion.button>

          {hugCount > 0 && (
            <p className="mt-3 text-xs text-[#E0F2FE]/85">
              Toplam Gönderilen Sarılma:{" "}
              <strong className="text-[#A7F3D0]">{hugCount}</strong> 🫂
            </p>
          )}
        </div>
      </div>

      {/* 2. BEKİR'İN 17 NEDENİ (17 KASIM'A ÖZEL 17 KART) */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06383E]/60 backdrop-blur-md border border-[#A7F3D0]/40 mb-3">
            <Heart className="w-3.5 h-3.5 text-[#A7F3D0] fill-[#A7F3D0]" />
            <span className="text-xs tracking-[0.22em] uppercase text-[#E0F2FE] font-medium">
              17 Kasım’a Özel • 17 Kart
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl text-white font-semibold">
            Bekir’in <span className="italic text-[#BAE6FD]">17 Nedeni</span>
          </h2>

          <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#E0F2FE]/85">
            Gizem’i sevmenin 17 farklı nedeni... Kapalı kartlara dokunup tek tek aç!
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-xs">
            <span className="text-[#A7F3D0]">
              Açılan Kart:{" "}
              <strong className="text-white">
                {openedIds.length} / {SEVENTEEN_REASONS.length}
              </strong>
            </span>
            <button
              type="button"
              onClick={openAllCards}
              className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white transition-colors cursor-pointer"
            >
              Hepsini Aç
            </button>
            {openedIds.length > 0 && (
              <button
                type="button"
                onClick={closeAllCards}
                className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[#BAE6FD] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Kapat
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SEVENTEEN_REASONS.map((card) => {
            const isOpen = openedIds.includes(card.id);
            const TypeIcon =
              card.type === "photo"
                ? Camera
                : card.type === "funny"
                ? Smile
                : MessageCircleHeart;

            return (
              <motion.button
                key={card.id}
                type="button"
                layout
                onClick={() => toggleCard(card.id)}
                className={`group text-left rounded-3xl border transition-all duration-300 cursor-pointer overflow-hidden min-h-[168px] flex flex-col justify-between p-5 ${
                  isOpen
                    ? "bg-[#06383E]/80 border-[#A7F3D0]/70 shadow-[0_12px_34px_rgba(16,185,129,0.22)]"
                    : "bg-[#04282D]/70 hover:bg-[#06383E]/80 border-white/25 hover:border-[#BAE6FD]/60 shadow-[0_10px_28px_rgba(4,40,45,0.25)]"
                }`}
              >
                {!isOpen ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#059669]/40 to-[#0284C7]/40 border border-[#A7F3D0]/50 flex items-center justify-center mb-2.5 group-hover:scale-110 transition-transform">
                      <span className="font-serif font-bold text-lg text-white">
                        {card.id}
                      </span>
                    </div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[#BAE6FD] font-semibold">
                      17 Kasım • Neden #{card.id}
                    </p>
                    <span className="mt-1.5 text-[11px] text-[#A7F3D0]/85">
                      Açmak için dokun ✨
                    </span>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="space-y-3 w-full"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] text-[#A7F3D0] font-semibold">
                        <TypeIcon className="w-3.5 h-3.5" />
                        #{card.id} • {card.title}
                      </span>
                      <Heart className="w-3.5 h-3.5 text-[#BAE6FD] fill-[#BAE6FD] shrink-0" />
                    </div>

                    {card.imageUrl && (
                      <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-white/20">
                        <img
                          src={card.imageUrl}
                          alt={card.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#06383E]/70 via-transparent to-transparent" />
                        <span className="absolute bottom-1.5 right-2 text-[9px] text-[#A7F3D0] font-semibold">
                          B&amp;G • 17.11.23
                        </span>
                      </div>
                    )}

                    <p className="font-serif italic text-base text-white/95 leading-relaxed">
                      “{card.content}”
                    </p>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
