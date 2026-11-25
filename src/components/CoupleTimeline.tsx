import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarHeart, Heart, Sparkles, ChevronDown } from "lucide-react";

interface Milestone {
  id: string;
  badge: string;
  title: string;
  emoji: string;
  summary: string;
  detail: string;
  flowerTag: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "m-17kasim",
    badge: "Bölüm I • 17 Kasım 2023",
    title: "İki Kalbin Aynı Ritimde Buluşması",
    emoji: "🌹",
    summary: "Her şeyin başladığı, zamanın anlam kazandığı o unutulmaz gün.",
    detail:
      "17 Kasım 2023 sadece takvimde bir tarih değil; Gizem ile Bekir'in hikâyesinin ilk satırı, en güzel 'iyi ki'nin başlangıcı.",
    flowerTag: "Kadife Gül • Tutku & Sadakat",
  },
  {
    id: "m-sohbet",
    badge: "Bölüm II • İlk Heyecanlar",
    title: "Saatlerin Nasıl Geçtiğini Unutturan Sohbetler",
    emoji: "☕",
    summary: "Bir kahveyle başlayıp gecelere uzanan içten konuşmalar.",
    detail:
      "Konuşacak konular hiç bitmedi; çünkü insan sevdiğinin yanında susarken bile huzur bulurmuş.",
    flowerTag: "Zarif Lale • İçtenlik & Zarafet",
  },
  {
    id: "m-kahkaha",
    badge: "Bölüm III • Birlikte Gülüşler",
    title: "En Sıradan Günleri Bayram Yapan Anılar",
    emoji: "🌼",
    summary: "Küçük şakalar, ortak şarkılar ve bir bakışla anlaşmalar.",
    detail:
      "Hayatın koşturmacası içinde senin tek bir tebessümün, bütün yorgunluğu bir anda silip götürüyor.",
    flowerTag: "Işıltılı Papatya • Saf Mutluluk",
  },
  {
    id: "m-gelecek",
    badge: "Bölüm IV • Nice 17 Kasımlara",
    title: "El Ele Yürünecek Yeni Yollar",
    emoji: "✨",
    summary: "Birlikte kurulacak hayaller, gezilecek şehirler ve sonsuz sevgi.",
    detail:
      "En güzel anılarımız henüz yaşamadıklarımız... Her yeni yıldönümünde birbirimizi daha da çok severek.",
    flowerTag: "Sonsuz Buket • Gizem & Bekir",
  },
];

const LIKES_KEY = "bekir_gizem_timeline_likes_v1";

function loadLikes(): Record<string, number> {
  try {
    const raw = window.localStorage.getItem(LIKES_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

export function CoupleTimeline() {
  const [openId, setOpenId] = useState<string>(MILESTONES[0].id);
  const [likes, setLikes] = useState<Record<string, number>>(() => loadLikes());

  const handleHeart = (id: string) => {
    setLikes((prev) => {
      const next = { ...prev, [id]: (prev[id] ?? 0) + 1 };
      try {
        window.localStorage.setItem(LIKES_KEY, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  };

  return (
    <section className="relative py-16 md:py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06383E]/55 backdrop-blur-md border border-[#A7F3D0]/40 mb-3">
          <CalendarHeart className="w-3.5 h-3.5 text-[#A7F3D0]" />
          <span className="text-xs tracking-[0.22em] uppercase text-[#E0F2FE] font-medium">
            17 Kasım 2023 • Bizim Zaman Çizelgemiz
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8FC] font-semibold">
          Gizem & Bekir’in <span className="italic text-[#BAE6FD]">Yolculuğu</span>
        </h2>

        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#FFF8FC]/75">
          Başlangıcımızdan bugüne, her durağı sevgiyle işlenmiş hikâyemiz...
        </p>
      </div>

      <div className="relative pl-6 sm:pl-10 space-y-5">
        {/* Vertical glowing timeline rail */}
        <div
          aria-hidden="true"
          className="absolute left-2.5 sm:left-4 top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#6EE7B7] via-[#7DD3FC] to-[#34D399] opacity-75"
        />

        {MILESTONES.map((item, idx) => {
          const isOpen = openId === item.id;
          const heartCount = likes[item.id] ?? 0;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="relative"
            >
              {/* Glowing node dot */}
              <div
                aria-hidden="true"
                className={`absolute -left-[22px] sm:-left-[32px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                  isOpen
                    ? "bg-[#A7F3D0] border-white shadow-[0_0_16px_rgba(167,243,208,0.9)] scale-110"
                    : "bg-[#0EA5E9] border-[#BAE6FD]/80"
                }`}
              />

              <div className="rounded-3xl bg-[#06383E]/65 backdrop-blur-xl border border-white/25 shadow-[0_14px_38px_rgba(6,56,62,0.3)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : item.id)}
                  className="w-full text-left px-5 sm:px-7 py-5 flex items-center justify-between gap-4 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs uppercase tracking-[0.2em] text-[#A7F3D0]">
                        {item.badge}
                      </span>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#0EA5E9]/25 border border-[#BAE6FD]/35 text-[#E0F2FE]">
                        {item.flowerTag}
                      </span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-[#FFF8FC] font-medium">
                      <span className="mr-2">{item.emoji}</span>
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#E0F2FE]/80">{item.summary}</p>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-[#A7F3D0] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-7 pb-5 pt-2 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="font-serif italic text-base sm:text-lg text-white/95 leading-relaxed">
                          “{item.detail}”
                        </p>

                        <button
                          type="button"
                          onClick={() => handleHeart(item.id)}
                          className="inline-flex items-center justify-center gap-2 shrink-0 px-4 py-2 rounded-full bg-gradient-to-r from-[#059669] to-[#0284C7] hover:brightness-110 border border-white/40 text-xs font-medium text-white transition-all active:scale-95"
                        >
                          <Heart className="w-3.5 h-3.5 text-[#A7F3D0] fill-[#A7F3D0]" />
                          <span>Kalp Bırak</span>
                          {heartCount > 0 && (
                            <span className="px-1.5 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                              {heartCount}
                            </span>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <span className="inline-flex items-center gap-1.5 text-xs text-[#F5D58A]/70 tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Her durağa dokunup anıları açabilir ve kalp bırakabilirsiniz
        </span>
      </div>
    </section>
  );
}
