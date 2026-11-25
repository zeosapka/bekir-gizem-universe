import { useState, type ChangeEvent } from "react";
import { motion } from "framer-motion";
import { Camera, Heart, Sparkles, ImagePlus, RotateCcw } from "lucide-react";

interface FrameSlot {
  id: string;
  label: string;
  caption: string;
  emoji: string;
  isCenter?: boolean;
}

const FRAME_SLOTS: FrameSlot[] = [
  {
    id: "slot-left",
    label: "En Güzel Anımız",
    caption: "Gülüşümüz & Neşemiz",
    emoji: "🌷",
  },
  {
    id: "slot-center",
    label: "Gizem & Bekir",
    caption: "Birlikte En Güzel Karemiz",
    emoji: "❤️",
    isCenter: true,
  },
  {
    id: "slot-right",
    label: "Biricik Aşkım",
    caption: "Seninle Güzel Günlerimiz",
    emoji: "🌼",
  },
];

const PHOTO_STORAGE_KEY = "bekir_gizem_banner_photos_v1";

function loadSavedPhotos(): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(PHOTO_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function RomanticShowcaseBanner() {
  const [photos, setPhotos] = useState<Record<string, string>>(() =>
    loadSavedPhotos()
  );

  const handlePhotoUpload = (
    slotId: string,
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) return;
      setPhotos((prev) => {
        const next = { ...prev, [slotId]: result };
        try {
          window.localStorage.setItem(PHOTO_STORAGE_KEY, JSON.stringify(next));
        } catch {
          // ignore quota overflow on large images
        }
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const clearPhotos = () => {
    setPhotos({});
    try {
      window.localStorage.removeItem(PHOTO_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const hasAnyPhoto = Object.keys(photos).length > 0;

  return (
    <section className="relative py-14 md:py-20 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Yanarlı Dönerli (Iridescent Shimmer) Romantik Banner */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.65 }}
        className="relative p-[2px] rounded-[2rem] bg-gradient-to-r from-[#6EE7B7] via-[#7DD3FC] to-[#FDE68A] shadow-[0_14px_45px_rgba(14,165,233,0.32)] overflow-hidden"
      >
        <div className="relative rounded-[calc(2rem-2px)] bg-[#06383E]/80 backdrop-blur-2xl px-5 sm:px-8 py-8 sm:py-10 overflow-hidden">
          {/* Yumuşak hareketli ışık hüzmeleri */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -left-16 w-64 h-64 rounded-full bg-[#34D399]/20 blur-3xl animate-pulse"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 -right-16 w-64 h-64 rounded-full bg-[#38BDF8]/25 blur-3xl animate-pulse"
          />

          {/* Banner Başlık */}
          <div className="relative z-10 text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#A7F3D0]/45 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#A7F3D0]" />
              <span className="text-[11px] sm:text-xs tracking-[0.22em] uppercase text-[#E0F2FE] font-semibold">
                Gizem &amp; Bekir • Özel Fotoğraf Vitrini
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#BAE6FD]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-semibold bg-gradient-to-r from-[#FFFFFF] via-[#A7F3D0] to-[#BAE6FD] bg-clip-text text-transparent">
              Gizem &amp; Bekir’in Özel Kareleri
            </h2>

            <p className="mt-2.5 font-serif italic text-base sm:text-lg text-[#E0F2FE]/85">
              Ortadaki ve yanlardaki çerçevelere dokunup dilediğiniz en güzel fotoğraflarınızı ekleyebilirsiniz — site rengiyle uyumlu{" "}
              <span className="text-[#A7F3D0] font-medium">
                G &amp; B filigranı
              </span>{" "}
              otomatik uygulanır.
            </p>

            {hasAnyPhoto && (
              <button
                type="button"
                onClick={clearPhotos}
                className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/25 text-xs text-[#E0F2FE] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                Fotoğrafları Temizle
              </button>
            )}
          </div>

          {/* Yanlarda ve Ortada 3'lü Estetik Fotoğraf Alanı */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-7 items-center">
            {FRAME_SLOTS.map((slot) => {
              const photoUrl = photos[slot.id];

              return (
                <label
                  key={slot.id}
                  className={`group relative block cursor-pointer rounded-[1.75rem] p-[2px] bg-gradient-to-br from-[#A7F3D0]/75 via-[#BAE6FD]/75 to-[#FDE68A]/70 shadow-[0_14px_38px_rgba(4,40,45,0.45)] transition-transform duration-300 hover:-translate-y-1 ${
                    slot.isCenter ? "md:scale-105 md:z-10" : ""
                  }`}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handlePhotoUpload(slot.id, e)}
                    className="sr-only"
                  />

                  <div
                    className={`relative w-full overflow-hidden rounded-[calc(1.75rem-2px)] bg-[#04282D]/90 flex flex-col items-center justify-center ${
                      slot.isCenter
                        ? "aspect-[4/5] min-h-[290px]"
                        : "aspect-[4/4.5] min-h-[245px]"
                    }`}
                  >
                    {photoUrl ? (
                      <>
                        <img
                          src={photoUrl}
                          alt={slot.label}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        {/* Site Rengine Uyumlu Yumuşak Yeşil-Mavi Renk Filtresi (Color Harmony Overlay) */}
                        <div
                          aria-hidden="true"
                          className="absolute inset-0 bg-gradient-to-t from-[#06383E]/80 via-[#0EA5E9]/10 to-[#10B981]/15 pointer-events-none"
                        />
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#059669]/35 to-[#0284C7]/35 border border-[#A7F3D0]/45 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                          <ImagePlus className="w-6 h-6 text-[#A7F3D0]" />
                        </div>
                        <span className="text-2xl mb-1">{slot.emoji}</span>
                        <p className="font-serif text-lg sm:text-xl text-white font-medium">
                          {slot.label}
                        </p>
                        <p className="mt-1 text-xs text-[#BAE6FD]/80">
                          {slot.caption}
                        </p>
                        <span className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/25 text-[11px] text-[#A7F3D0]">
                          <Camera className="w-3 h-3" />
                          Fotoğraf Seç / Ekle
                        </span>
                      </div>
                    )}

                    {/* Otomatik Filigran (Watermark) Katmanı */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5 flex items-center justify-between bg-gradient-to-t from-[#04282D]/90 via-[#04282D]/45 to-transparent pointer-events-none">
                      <span className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#E0F2FE]/90 font-medium">
                        {slot.label}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/25 text-[10px] text-[#A7F3D0] font-semibold tracking-wider">
                        <Heart className="w-2.5 h-2.5 fill-[#A7F3D0]" />
                        G &amp; B
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
