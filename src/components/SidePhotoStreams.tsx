import { useMemo } from "react";
import { Heart, Sparkles } from "lucide-react";

export interface SidePhotoItem {
  id: string;
  imageUrl: string;
  caption: string;
  emoji: string;
}

/**
 * Sağ ve sol yan akış şeritleri için C:\Users\Legolas\Downloads\wallpaper içindeki 38 görsel.
 * Sayfa her açıldığında rastgele karıştırılarak yanarlı dönerli, yarı şeffaf ve filigranlı olarak akar.
 */
export const SIDE_STREAM_PHOTOS: SidePhotoItem[] = Array.from(
  { length: 38 },
  (_, index) => ({
    id: `wall-${index + 1}`,
    imageUrl: `./moments/wall-${index + 1}.png`,
    caption: "17 Kasım 2023",
    emoji: index % 3 === 0 ? "🌹" : index % 3 === 1 ? "🌷" : "🌼",
  })
);

function shuffleItems(items: SidePhotoItem[]): SidePhotoItem[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function StreamCard({ item }: { item: SidePhotoItem }) {
  return (
    <div className="relative w-full rounded-2xl p-[1.5px] bg-gradient-to-br from-[#A7F3D0]/70 via-[#7DD3FC]/75 to-[#FDE68A]/65 shadow-[0_10px_28px_rgba(4,40,45,0.28)] opacity-60">
      <div className="relative w-full aspect-[3/4] rounded-[calc(1rem-1.5px)] overflow-hidden bg-[#06383E]/55 backdrop-blur-md flex flex-col items-center justify-center">
        {item.imageUrl ? (
          <>
            <img
              src={item.imageUrl}
              alt={item.caption}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            {/* Site rengiyle uyumlu yarı şeffaf yeşil-mavi renk filtresi */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-[#06383E]/75 via-[#0EA5E9]/15 to-[#10B981]/20"
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-3 text-center">
            <span className="text-2xl mb-1.5 drop-shadow">{item.emoji}</span>
            <p className="font-serif italic text-xs text-white/90 leading-snug">
              {item.caption}
            </p>
            <Sparkles className="w-3 h-3 text-[#A7F3D0]/70 mt-1.5" />
          </div>
        )}

        {/* Köşe Filigran (Watermark) */}
        <div className="absolute inset-x-0 bottom-0 px-2.5 py-1.5 flex items-center justify-between bg-gradient-to-t from-[#04282D]/85 to-transparent">
          <span className="text-[9px] tracking-[0.14em] uppercase text-[#E0F2FE]/85 truncate">
            {item.caption}
          </span>
          <span className="inline-flex items-center gap-0.5 text-[9px] text-[#A7F3D0] font-semibold shrink-0">
            <Heart className="w-2.5 h-2.5 fill-[#A7F3D0]" />
            17.11.23
          </span>
        </div>
      </div>
    </div>
  );
}

export function SidePhotoStreams() {
  const leftTrack = useMemo(() => {
    const shuffled = shuffleItems(SIDE_STREAM_PHOTOS);
    return [...shuffled, ...shuffled];
  }, []);

  const rightTrack = useMemo(() => {
    const shuffled = shuffleItems(SIDE_STREAM_PHOTOS);
    return [...shuffled, ...shuffled];
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden xl:block fixed inset-0 pointer-events-none z-[5] overflow-hidden"
    >
      {/* Sol Yan Akan Fotoğraf Şeridi (Yukarı Akış) */}
      <div className="absolute left-3 2xl:left-6 top-0 bottom-0 w-36 2xl:w-44 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <div className="flex flex-col gap-5 animate-stream-up">
          {leftTrack.map((item, idx) => (
            <StreamCard key={`left-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>

      {/* Sağ Yan Akan Fotoğraf Şeridi (Aşağı Akış) */}
      <div className="absolute right-3 2xl:right-6 top-0 bottom-0 w-36 2xl:w-44 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]">
        <div className="flex flex-col gap-5 animate-stream-down">
          {rightTrack.map((item, idx) => (
            <StreamCard key={`right-${item.id}-${idx}`} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
