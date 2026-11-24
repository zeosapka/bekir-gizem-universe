import { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Dices, HeartHandshake, RotateCw, Sparkles, Trophy } from "lucide-react";

const DATE_IDEAS = [
  { label: "Yıldız Altında Kahve ☕", color: "#9F1239" },
  { label: "Evde Sinema Maratonu 🎬", color: "#BE123C" },
  { label: "Birlikte Yemek Yapma 🍝", color: "#881337" },
  { label: "Fotoğraf Turu 📸", color: "#E11D48" },
  { label: "Nostalji Şarkı Gecesi 🎶", color: "#9D174D" },
  { label: "Tatlı & Kahve Avı 🍰", color: "#B91C1C" },
  { label: "Uzun Gece Yürüyüşü 🌙", color: "#7F1D1D" },
  { label: "Sürpriz Piknik 🌷", color: "#DB2777" },
];

interface QuizQuestion {
  question: string;
  options: string[];
  sweetReaction: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    question: "Bekir & Gizem için en güzel randevu hangisi?",
    options: [
      "Saatlerce sohbet edilen sıcak bir kahve akşamı ☕",
      "El ele uzun bir sahil/gece yürüyüşü 🌙",
      "Battaniye altında film ve bol kahkaha 🎬",
      "Senin olduğun her yer zaten en güzel randevu ❤️",
    ],
    sweetReaction: "Doğru cevap: Yan yana olunca her yer zaten cennet!",
  },
  {
    question: "Aşkımızı en iyi hangi çiçek anlatıyor?",
    options: [
      "Tutkulu Kadife Gül 🌹",
      "Asil ve Zarif Lale 🌷",
      "Saf ve Işıltılı Papatya 🌼",
      "Üçünün bir arada olduğu bizim 17 Kasım buketimiz 💐",
    ],
    sweetReaction: "Gülün tutkusu, lalenin zarafeti ve papatyanın saf sıcaklığı bir arada!",
  },
  {
    question: "Küçük bir kırgınlıkta ilk adımı kim atar?",
    options: [
      "Bekir hemen gönül alır 🌹",
      "Gizem tek gülüşüyle buzları eritir ✨",
      "İkimiz de dayanamayıp aynı anda yazarız 💌",
      "Zaten 5 dakikadan uzun küs kalamıyoruz 😄",
    ],
    sweetReaction: "Sevgi her zaman gururdan büyük!",
  },
  {
    question: "17 Kasım deyince kalbinde ilk ne uyanıyor?",
    options: [
      "İyi ki yollarımız kesişmiş hissi 💫",
      "Sıcacık bir huzur ve güven 🤍",
      "İlk günkü heyecan ve tatlı gülümseme 🌹",
      "Birlikte yazacağımız koca bir ömür ✨",
    ],
    sweetReaction: "17 Kasım, bizim en güzel başlangıcımız!",
  },
];

export function CoupleQuizAndWheel() {
  const [activeTab, setActiveTab] = useState<"wheel" | "quiz">("wheel");

  // Wheel state
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);

  // Quiz state
  const [qIndex, setQIndex] = useState(0);
  const [reaction, setReaction] = useState<string | null>(null);
  const [quizDone, setQuizDone] = useState(false);

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedIdea(null);

    const sliceAngle = 360 / DATE_IDEAS.length;
    const winningIndex = Math.floor(Math.random() * DATE_IDEAS.length);
    const targetSliceCenter = winningIndex * sliceAngle + sliceAngle / 2;
    const extraSpins = 360 * (4 + Math.floor(Math.random() * 2));
    // Pointer is at top (0 deg); rotate wheel clockwise so winning slice lands at top
    const nextRotation =
      rotation - (rotation % 360) + extraSpins + (360 - targetSliceCenter);

    setRotation(nextRotation);

    window.setTimeout(() => {
      setIsSpinning(false);
      setSelectedIdea(DATE_IDEAS[winningIndex].label);
      confetti({
        particleCount: 55,
        spread: 70,
        origin: { y: 0.65 },
        colors: ["#E11D48", "#F5D58A", "#FB7185", "#FFF8FC"],
      });
    }, 3600);
  };

  const handleQuizChoice = () => {
    const current = QUIZ_QUESTIONS[qIndex];
    setReaction(current.sweetReaction);

    window.setTimeout(() => {
      setReaction(null);
      if (qIndex + 1 < QUIZ_QUESTIONS.length) {
        setQIndex((prev) => prev + 1);
      } else {
        setQuizDone(true);
        confetti({
          particleCount: 75,
          spread: 85,
          origin: { y: 0.6 },
          colors: ["#E11D48", "#F5D58A", "#FB7185", "#FFF8FC"],
        });
      }
    }, 1150);
  };

  const restartQuiz = () => {
    setQIndex(0);
    setReaction(null);
    setQuizDone(false);
  };

  return (
    <section className="relative py-16 md:py-24 px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4A1026]/55 border border-[#F5D58A]/30 mb-3">
          <HeartHandshake className="w-3.5 h-3.5 text-[#F5D58A]" />
          <span className="text-xs tracking-[0.22em] uppercase text-[#F5D58A] font-medium">
            İkinize Özel İnteraktif Köşe
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#FFF8FC] font-semibold">
          Randevu Çarkı & <span className="italic text-[#F5D58A]">Uyum Testi</span>
        </h2>

        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#FFF8FC]/75">
          Bir sonraki randevunuzu şansa bırakın ya da 17 Kasım uyum testini birlikte çözün!
        </p>

        {/* Tab switcher */}
        <div className="mt-6 inline-flex p-1.5 rounded-full bg-[#1C0815]/90 border border-[#F5D58A]/25">
          <button
            type="button"
            onClick={() => setActiveTab("wheel")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === "wheel"
                ? "bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white shadow-[0_4px_18px_rgba(225,29,72,0.45)]"
                : "text-[#FFF8FC]/75 hover:text-[#FFF8FC]"
            }`}
          >
            <Dices className="w-4 h-4" />
            Randevu Çarkı
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("quiz")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
              activeTab === "quiz"
                ? "bg-gradient-to-r from-[#E11D48] to-[#F43F5E] text-white shadow-[0_4px_18px_rgba(225,29,72,0.45)]"
                : "text-[#FFF8FC]/75 hover:text-[#FFF8FC]"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Çift Uyum Testi
          </button>
        </div>
      </div>

      <div className="rounded-[2rem] p-6 sm:p-10 bg-gradient-to-b from-[#230A1A]/90 to-[#11060E]/95 border border-[#F5D58A]/30 shadow-[0_18px_50px_rgba(0,0,0,0.55)]">
        {activeTab === "wheel" ? (
          <div className="flex flex-col items-center">
            {/* Pointer */}
            <div className="relative flex flex-col items-center">
              <div
                aria-hidden="true"
                className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-[#F5D58A] drop-shadow-[0_2px_8px_rgba(245,213,138,0.8)] z-20 -mb-2"
              />

              {/* Spinning SVG Wheel */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80">
                <motion.svg
                  viewBox="0 0 200 200"
                  className="w-full h-full drop-shadow-[0_12px_30px_rgba(225,29,72,0.35)]"
                  animate={{ rotate: rotation }}
                  transition={{ duration: 3.5, ease: [0.17, 0.84, 0.22, 1] }}
                >
                  <circle cx="100" cy="100" r="98" fill="#1C0815" stroke="#F5D58A" strokeWidth="3" />
                  {DATE_IDEAS.map((idea, i) => {
                    const count = DATE_IDEAS.length;
                    const startAngle = (i * 360) / count - 90;
                    const endAngle = ((i + 1) * 360) / count - 90;
                    const rad = (deg: number) => (deg * Math.PI) / 180;
                    const x1 = 100 + 95 * Math.cos(rad(startAngle));
                    const y1 = 100 + 95 * Math.sin(rad(startAngle));
                    const x2 = 100 + 95 * Math.cos(rad(endAngle));
                    const y2 = 100 + 95 * Math.sin(rad(endAngle));
                    const midAngle = (startAngle + endAngle) / 2;
                    const textX = 100 + 62 * Math.cos(rad(midAngle));
                    const textY = 100 + 62 * Math.sin(rad(midAngle));

                    return (
                      <g key={idea.label}>
                        <path
                          d={`M 100 100 L ${x1} ${y1} A 95 95 0 0 1 ${x2} ${y2} Z`}
                          fill={idea.color}
                          stroke="#F5D58A"
                          strokeWidth="0.9"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="#FFF8FC"
                          fontSize="7"
                          fontWeight="600"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${midAngle + 90}, ${textX}, ${textY})`}
                        >
                          {idea.label.split(" ").slice(0, 2).join(" ")}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="100" cy="100" r="18" fill="#160611" stroke="#F5D58A" strokeWidth="2.5" />
                  <text
                    x="100"
                    y="101"
                    fill="#F5D58A"
                    fontSize="8.5"
                    fontWeight="700"
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    B♥G
                  </text>
                </motion.svg>
              </div>
            </div>

            <button
              type="button"
              onClick={spinWheel}
              disabled={isSpinning}
              className="mt-7 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E11D48] via-[#F43F5E] to-[#E11D48] text-white font-semibold text-sm tracking-wide shadow-[0_8px_26px_rgba(225,29,72,0.5)] hover:brightness-110 active:scale-95 transition-all disabled:opacity-60"
            >
              <RotateCw className={`w-4 h-4 ${isSpinning ? "animate-spin" : ""}`} />
              {isSpinning ? "Çark Dönüyor..." : "Bir Sonraki Randevuyu Seç!"}
            </button>

            {selectedIdea && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 px-6 py-4 rounded-2xl bg-[#F5D58A]/15 border border-[#F5D58A]/50 text-center"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#F5D58A]">
                  Çarkın Seçtiği Randevu
                </p>
                <p className="mt-1 font-serif text-2xl text-[#FFF8FC] font-semibold">
                  {selectedIdea}
                </p>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            {quizDone ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-16 h-16 mx-auto rounded-full bg-[#F5D58A]/20 border border-[#F5D58A]/60 flex items-center justify-center mb-4">
                  <Trophy className="w-8 h-8 text-[#F5D58A]" />
                </div>
                <p className="text-xs uppercase tracking-[0.24em] text-[#F5D58A]">
                  17 Kasım Uyum Sertifikası
                </p>
                <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-[#FFF8FC] font-bold">
                  %100 — Mükemmel Uyum! ❤️
                </h3>
                <p className="mt-3 font-serif italic text-lg text-[#FFF8FC]/80">
                  Bekir & Gizem: Gülün tutkusu, lalenin zarafeti ve papatyanın saf sevgisi gibi birbirini tamamlayan iki kalp.
                </p>
                <button
                  type="button"
                  onClick={restartQuiz}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#F5D58A]/40 text-sm text-[#F5D58A] transition-colors"
                >
                  <RotateCw className="w-4 h-4" />
                  Testi Tekrar Çöz
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#F5D58A]/80 mb-4">
                  <span>
                    Soru {qIndex + 1} / {QUIZ_QUESTIONS.length}
                  </span>
                  <span>Bekir & Gizem</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#FFF8FC] font-medium mb-6">
                  {QUIZ_QUESTIONS[qIndex].question}
                </h3>

                <div className="space-y-3">
                  {QUIZ_QUESTIONS[qIndex].options.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      disabled={Boolean(reaction)}
                      onClick={handleQuizChoice}
                      className="w-full text-left px-5 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-[#E11D48]/25 border border-[#F5D58A]/20 hover:border-[#F5D58A]/55 text-sm sm:text-base text-[#FFF8FC]/90 transition-all active:scale-[0.99] disabled:opacity-60"
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                {reaction && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-5 p-4 rounded-2xl bg-[#F5D58A]/15 border border-[#F5D58A]/45 text-center font-serif italic text-base text-[#FFF8FC]"
                  >
                    ✨ {reaction}
                  </motion.div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
