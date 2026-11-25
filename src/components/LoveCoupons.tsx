import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Ticket, CheckCircle2, RotateCcw, Sparkles } from "lucide-react";

interface LoveCoupon {
  id: string;
  code: string;
  emoji: string;
  title: string;
  desc: string;
  validity: string;
}

const COUPONS: LoveCoupon[] = [
  {
    id: "coupon-movie",
    code: "BG-1711-01",
    emoji: "🎬",
    title: "Sınırsız Film Gecesi",
    desc: "Filmi sen seç, patlamış mısır ve battaniye benden; itiraz hakkım yok!",
    validity: "İstediğin herhangi bir akşam geçerli",
  },
  {
    id: "coupon-city",
    code: "BG-1711-02",
    emoji: "✈️",
    title: "Gidilecek Farklı Bir Şehir",
    desc: "Haritadan yeni bir şehir seçiyoruz; yeni sokaklar, yeni anılar ikimizin!",
    validity: "17 Kasım 2023 Hatırası • Süresiz",
  },
  {
    id: "coupon-massage",
    code: "BG-1711-03",
    emoji: "💆",
    title: "15 Dk Şımartma & Masaj",
    desc: "Yorgun bir günün ardından tek dokunuşla aktif olan huzur molası.",
    validity: "İstediğin an kullanılabilir",
  },
  {
    id: "coupon-dinner",
    code: "BG-1711-04",
    emoji: "🍽️",
    title: "Özel Yıldönümü Yemeği",
    desc: "Mekân ve menü tamamen senin seçimin, bütün gece sana özel.",
    validity: "17 Kasım 2023 Hatırası • Süresiz",
  },
];

const STORAGE_KEY = "bekir_gizem_redeemed_coupons_v1";

function loadRedeemed(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function LoveCoupons() {
  const [redeemed, setRedeemed] = useState<string[]>(() => loadRedeemed());

  const redeemCoupon = (id: string) => {
    if (redeemed.includes(id)) return;
    const next = [...redeemed, id];
    setRedeemed(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    confetti({
      particleCount: 45,
      spread: 65,
      origin: { y: 0.7 },
      colors: ["#E11D48", "#F5D58A", "#FB7185", "#FFF8FC"],
    });
  };

  const resetAll = () => {
    setRedeemed([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  return (
    <section className="relative py-16 md:py-24 px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06383E]/55 backdrop-blur-md border border-[#A7F3D0]/40 mb-3">
          <Ticket className="w-3.5 h-3.5 text-[#A7F3D0]" />
          <span className="text-xs tracking-[0.22em] uppercase text-[#E0F2FE] font-medium">
            Sadece İkinize Özel • Aşk Kuponları
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8FC] font-semibold">
          Gizem’in <span className="italic text-[#BAE6FD]">Altın Kupon Defteri</span>
        </h2>

        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#FFF8FC]/75">
          İstediğin kupona dokunup aktif et; ekran görüntüsünü Bekir’e gönderdiğin an geçerli!
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-[#F5D58A]/85">
          <span>
            Kullanılan Kupon:{" "}
            <strong className="text-[#FFF8FC]">
              {redeemed.length} / {COUPONS.length}
            </strong>
          </span>
          {redeemed.length > 0 && (
            <button
              type="button"
              onClick={resetAll}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-[#F5D58A]/30 text-[#F5D58A] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Sıfırla
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {COUPONS.map((coupon, idx) => {
          const isUsed = redeemed.includes(coupon.id);

          return (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className={`relative rounded-3xl p-5 flex flex-col justify-between border transition-all duration-300 backdrop-blur-xl ${
                isUsed
                  ? "bg-[#06383E]/75 border-[#A7F3D0]/70 shadow-[0_12px_34px_rgba(52,211,153,0.22)]"
                  : "bg-[#06383E]/60 border-white/25 hover:border-[#BAE6FD]/60 shadow-[0_14px_38px_rgba(6,56,62,0.3)]"
              }`}
            >
              {/* Decorative ticket notch accents */}
              <div
                aria-hidden="true"
                className="flex items-center justify-between text-[10px] tracking-[0.22em] uppercase text-[#A7F3D0]/85 pb-3 mb-3 border-b border-dashed border-white/20"
              >
                <span>{coupon.code}</span>
                <span className="inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> 17 KASIM 2023
                </span>
              </div>

              <div>
                <div className="text-3xl mb-2">{coupon.emoji}</div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FFF8FC] font-semibold">
                  {coupon.title}
                </h3>
                <p className="mt-2 text-sm text-[#E0F2FE]/85 leading-relaxed">
                  {coupon.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-dashed border-white/20 flex items-center justify-between gap-3">
                <span className="text-[11px] text-[#BAE6FD]/80">{coupon.validity}</span>

                <button
                  type="button"
                  onClick={() => redeemCoupon(coupon.id)}
                  disabled={isUsed}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                    isUsed
                      ? "bg-[#34D399]/20 text-[#A7F3D0] border border-[#A7F3D0]/50 cursor-default"
                      : "bg-gradient-to-r from-[#059669] to-[#0284C7] hover:brightness-110 text-white border border-white/40 shadow-[0_6px_18px_rgba(14,165,233,0.38)] active:scale-95"
                  }`}
                >
                  {isUsed ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Aktif Edildi
                    </>
                  ) : (
                    <span>Kuponu Kullan</span>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
