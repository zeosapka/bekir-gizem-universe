import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Send, Heart } from "lucide-react";

const DEFAULT_NOTES = [
  "Her 17 Kasım'da ilk günkü gibi gözlerinin içine bakmaya söz veriyorum. 🌹",
  "Seninle birlikte yeni şehirler keşfetmek, aynı fotoğrafta yaşlanmak istiyorum. ✈️",
  "En zor günümde bile elini tuttuğum an dünya güzelleşiyor. 🌷",
  "Birlikte kahkahalarla geçecek nice kahve akşamlarımız olsun! ☕",
  "Papatya kadar saf, gül kadar tutkulu, lale kadar zarif bir ömür bizim olsun. 🌼",
  "İyi ki 17 Kasım, iyi ki sen, iyi ki biz! ❤️",
];

const JAR_STORAGE_KEY = "bekir_gizem_wish_jar_v1";

function loadUserNotes(): string[] {
  try {
    const raw = window.localStorage.getItem(JAR_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function WishJar() {
  const [userNotes, setUserNotes] = useState<string[]>(() => loadUserNotes());
  const [drawnNote, setDrawnNote] = useState<string>(DEFAULT_NOTES[0]);
  const [inputText, setInputText] = useState("");
  const [justAdded, setJustAdded] = useState(false);

  const allNotes = [...DEFAULT_NOTES, ...userNotes];

  const drawRandom = () => {
    const candidates = allNotes.filter((n) => n !== drawnNote);
    const pool = candidates.length > 0 ? candidates : allNotes;
    const picked = pool[Math.floor(Math.random() * pool.length)];
    setDrawnNote(picked);
  };

  const handleAddNote = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = inputText.trim();
    if (!cleaned) return;
    const next = [...userNotes, cleaned];
    setUserNotes(next);
    setDrawnNote(cleaned);
    setInputText("");
    setJustAdded(true);
    try {
      window.localStorage.setItem(JAR_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
    window.setTimeout(() => setJustAdded(false), 2400);
  };

  return (
    <section className="relative py-16 md:py-24 px-6 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A1026]/55 border border-[#F5D58A]/30 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#F5D58A]" />
          <span className="text-xs tracking-[0.22em] uppercase text-[#F5D58A] font-medium">
            Ortak Dilek & Aşk Kavanozu
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8FC] font-semibold">
          Geleceğe <span className="italic text-[#F5D58A]">Not Bırakın</span>
        </h2>

        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#FFF8FC]/75">
          Kavanozdan rastgele bir aşk notu çekin ya da gelecek 17 Kasımlar için kendi dileğinizi ekleyin.
        </p>
      </div>

      <div className="rounded-[2rem] p-6 sm:p-10 bg-gradient-to-b from-[#230A1A]/90 to-[#11060E]/95 border border-[#F5D58A]/30 shadow-[0_16px_45px_rgba(0,0,0,0.55)]">
        {/* Active Drawn Note Card */}
        <div className="min-h-[140px] flex items-center justify-center rounded-2xl p-6 bg-[#130610]/80 border border-[#F5D58A]/25 text-center mb-6">
          <AnimatePresence mode="wait">
            <motion.p
              key={drawnNote}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="font-serif italic text-xl sm:text-2xl text-[#FFF8FC] leading-relaxed"
            >
              “{drawnNote}”
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={drawRandom}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#E11D48] to-[#F43F5E] hover:brightness-110 text-white text-sm font-semibold shadow-[0_6px_22px_rgba(225,29,72,0.45)] active:scale-95 transition-all"
          >
            <Heart className="w-4 h-4 fill-white" />
            Kavanozdan Yeni Not Çek ({allNotes.length})
          </button>
        </div>

        {/* Add new wish form */}
        <form onSubmit={handleAddNote} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            maxLength={180}
            placeholder="Birlikte gerçekleştirmek istediğiniz bir dilek veya söz yazın..."
            className="flex-1 px-5 py-3.5 rounded-full bg-white/[0.06] border border-[#F5D58A]/25 focus:border-[#F5D58A] focus:outline-none text-sm text-[#FFF8FC] placeholder:text-[#FFF8FC]/45"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#F5D58A] hover:bg-[#fae2a6] text-[#1A0812] font-semibold text-sm transition-colors active:scale-95 shrink-0"
          >
            <Send className="w-4 h-4" />
            Kavanoza At
          </button>
        </form>

        {justAdded && (
          <p className="mt-3 text-center text-xs text-[#F5D58A]">
            ✨ Notunuz 17 Kasım kavanozuna kaydedildi!
          </p>
        )}
      </div>
    </section>
  );
}
