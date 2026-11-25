import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, MapPin, Moon, Compass } from "lucide-react";

interface StarPoint {
  name: string;
  raDeg: number; // Right Ascension in degrees (hours * 15)
  decDeg: number; // Declination in degrees
  mag: number; // Apparent magnitude (brighter = smaller)
}

interface ConstellationDef {
  id: string;
  nameTr: string;
  meaning: string;
  stars: StarPoint[];
  edges: [number, number][];
}

// Serdivan, Sakarya (40.76° K, 30.36° D) • 17 Kasım 2023, ~20:00 (17:00 UTC) -> LST ≈ 341.86°
const LAT_DEG = 40.76;
const LST_DEG = 341.86;

const CONSTELLATIONS: ConstellationDef[] = [
  {
    id: "cassiopeia",
    nameTr: "Cassiopeia (Kraliçe)",
    meaning: "Başucuna yakın parlayan meşhur 'W' şekli — o gece tam tepenizdeydi.",
    stars: [
      { name: "Caph", raDeg: 2.3, decDeg: 59.15, mag: 2.28 },
      { name: "Schedar", raDeg: 10.1, decDeg: 56.54, mag: 2.24 },
      { name: "Gamma Cas", raDeg: 14.2, decDeg: 60.72, mag: 2.15 },
      { name: "Ruchbah", raDeg: 21.45, decDeg: 60.24, mag: 2.68 },
      { name: "Segin", raDeg: 28.6, decDeg: 63.67, mag: 3.35 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
  },
  {
    id: "cygnus",
    nameTr: "Cygnus (Kuğu)",
    meaning: "Batı gökyüzünde kanatlarını açmış Kuzey Haçı — zarafetin simgesi.",
    stars: [
      { name: "Deneb", raDeg: 310.36, decDeg: 45.28, mag: 1.25 },
      { name: "Sadr", raDeg: 305.56, decDeg: 40.26, mag: 2.23 },
      { name: "Albireo", raDeg: 292.68, decDeg: 27.96, mag: 3.05 },
      { name: "Gienah", raDeg: 311.55, decDeg: 33.97, mag: 2.48 },
      { name: "Fawaris", raDeg: 296.24, decDeg: 45.13, mag: 2.86 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [3, 1],
      [1, 4],
    ],
  },
  {
    id: "lyra",
    nameTr: "Lyra (Lir / Vega)",
    meaning: "Batı ufkuna doğru parlayan mavi-beyaz Vega yıldızı ile uyumun simgesi.",
    stars: [
      { name: "Vega", raDeg: 279.23, decDeg: 38.78, mag: 0.03 },
      { name: "Sheliak", raDeg: 282.52, decDeg: 33.36, mag: 3.52 },
      { name: "Sulafat", raDeg: 284.74, decDeg: 32.69, mag: 3.25 },
    ],
    edges: [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
  },
  {
    id: "pegasus",
    nameTr: "Pegasus (Kanatlı At)",
    meaning: "Güney gökyüzünün merkezinde duran Büyük Sonbahar Karesi.",
    stars: [
      { name: "Markab", raDeg: 346.19, decDeg: 15.21, mag: 2.49 },
      { name: "Scheat", raDeg: 345.94, decDeg: 28.08, mag: 2.44 },
      { name: "Algenib", raDeg: 3.31, decDeg: 15.18, mag: 2.83 },
      { name: "Alpheratz", raDeg: 2.1, decDeg: 29.09, mag: 2.06 },
    ],
    edges: [
      [0, 1],
      [1, 3],
      [3, 2],
      [2, 0],
    ],
  },
  {
    id: "andromeda",
    nameTr: "Andromeda",
    meaning: "Pegasus'tan doğuya uzanan parlak yıldız zinciri.",
    stars: [
      { name: "Alpheratz", raDeg: 2.1, decDeg: 29.09, mag: 2.06 },
      { name: "Mirach", raDeg: 17.43, decDeg: 35.62, mag: 2.07 },
      { name: "Almach", raDeg: 30.97, decDeg: 42.33, mag: 2.1 },
    ],
    edges: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    id: "taurus",
    nameTr: "Taurus & Ülker (Pleiades)",
    meaning: "Doğu ufkundan yükselen kızıl Aldebaran ve Ülker yıldız kümesi.",
    stars: [
      { name: "Aldebaran", raDeg: 68.98, decDeg: 16.51, mag: 0.87 },
      { name: "Elnath", raDeg: 81.57, decDeg: 28.61, mag: 1.65 },
      { name: "Alcyone", raDeg: 56.87, decDeg: 24.11, mag: 2.85 },
    ],
    edges: [
      [2, 0],
      [0, 1],
    ],
  },
  {
    id: "perseus",
    nameTr: "Perseus",
    meaning: "Kuzeydoğuda Cassiopeia ile Ülker arasında uzanan parıltılı yay.",
    stars: [
      { name: "Mirfak", raDeg: 51.08, decDeg: 49.86, mag: 1.79 },
      { name: "Algol", raDeg: 47.04, decDeg: 40.96, mag: 2.12 },
      { name: "Atik", raDeg: 58.53, decDeg: 31.88, mag: 2.85 },
    ],
    edges: [
      [0, 1],
      [1, 2],
    ],
  },
  {
    id: "auriga",
    nameTr: "Auriga (Capella)",
    meaning: "Kuzeydoğuda altın sarısı ışığıyla parlayan Capella yıldızı.",
    stars: [
      { name: "Capella", raDeg: 79.17, decDeg: 46.0, mag: 0.08 },
      { name: "Menkalinan", raDeg: 89.88, decDeg: 44.95, mag: 1.9 },
    ],
    edges: [[0, 1]],
  },
];

function projectStar(
  raDeg: number,
  decDeg: number,
  cx: number,
  cy: number,
  radius: number
) {
  const rad = Math.PI / 180;
  const lat = LAT_DEG * rad;
  const dec = decDeg * rad;
  const ha = (LST_DEG - raDeg) * rad;

  const sinAlt =
    Math.sin(dec) * Math.sin(lat) +
    Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  const alt = Math.asin(Math.max(-1, Math.min(1, sinAlt)));

  const cosAz =
    (Math.sin(dec) - Math.sin(alt) * Math.sin(lat)) /
    (Math.cos(alt) * Math.cos(lat) || 1e-6);
  let az = Math.acos(Math.max(-1, Math.min(1, cosAz)));
  if (Math.sin(ha) > 0) {
    az = Math.PI * 2 - az;
  }

  const altDeg = alt / rad;
  if (altDeg < -2) return null;

  // Zenith = center, Horizon (alt=0) = outer edge. North up, East left (standard sky chart looking up).
  const r = ((90 - Math.max(0, altDeg)) / 90) * radius;
  const x = cx - r * Math.sin(az);
  const y = cy - r * Math.cos(az);
  return { x, y, altDeg };
}

export function StarMapSection() {
  const [selectedId, setSelectedId] = useState<string>("cassiopeia");

  const projected = useMemo(() => {
    const cx = 220;
    const cy = 220;
    const r = 188;

    return CONSTELLATIONS.map((c) => {
      const pts = c.stars.map((s) => ({
        ...s,
        pos: projectStar(s.raDeg, s.decDeg, cx, cy, r),
      }));
      return { ...c, pts };
    });
  }, []);

  // Subtle background field stars deterministically placed inside the disc
  const bgStars = useMemo(() => {
    const list: { x: number; y: number; r: number; o: number }[] = [];
    for (let i = 0; i < 85; i++) {
      const angle = ((i * 137.5) % 360) * (Math.PI / 180);
      const dist = Math.sqrt(((i * 29 + 11) % 100) / 100) * 184;
      list.push({
        x: 220 + Math.cos(angle) * dist,
        y: 220 + Math.sin(angle) * dist,
        r: 0.6 + (i % 3) * 0.45,
        o: 0.35 + (i % 5) * 0.12,
      });
    }
    return list;
  }, []);

  const activeConstellation =
    CONSTELLATIONS.find((c) => c.id === selectedId) ?? CONSTELLATIONS[0];

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#06383E]/60 backdrop-blur-md border border-[#A7F3D0]/45 mb-3">
          <Compass className="w-3.5 h-3.5 text-[#A7F3D0]" />
          <span className="text-xs tracking-[0.22em] uppercase text-[#E0F2FE] font-semibold">
            Serdivan, Sakarya • 17 Kasım 2023
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-white font-semibold">
          O Gecenin <span className="italic text-[#BAE6FD]">Yıldız Haritası</span>
        </h2>

        <p className="mt-3 font-serif italic text-lg sm:text-xl text-[#E0F2FE]/85">
          17 Kasım 2023 akşamı saat 19:00–21:00 arası Serdivan semalarındaki gerçek gökyüzü...
        </p>
      </div>

      <div className="rounded-[2.25rem] p-6 sm:p-10 bg-[#06383E]/70 backdrop-blur-xl border border-white/25 shadow-[0_20px_60px_rgba(4,40,45,0.36)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Dairesel Gökyüzü Haritası */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-[430px] aspect-square rounded-full p-2 bg-gradient-to-br from-[#A7F3D0]/60 via-[#BAE6FD]/50 to-[#FDE68A]/50 shadow-[0_0_55px_rgba(56,189,248,0.28)]"
          >
            <svg
              viewBox="0 0 440 440"
              className="w-full h-full rounded-full bg-[radial-gradient(circle_at_50%_45%,#0B4F5C_0%,#052E38_62%,#031C24_100%)]"
            >
              {/* Altitude guide rings */}
              <circle
                cx="220"
                cy="220"
                r="188"
                fill="none"
                stroke="rgba(186,230,253,0.35)"
                strokeWidth="1.2"
              />
              <circle
                cx="220"
                cy="220"
                r="125"
                fill="none"
                stroke="rgba(167,243,208,0.16)"
                strokeDasharray="3 4"
              />
              <circle
                cx="220"
                cy="220"
                r="62"
                fill="none"
                stroke="rgba(167,243,208,0.16)"
                strokeDasharray="3 4"
              />

              {/* Cardinal directions */}
              <text
                x="220"
                y="22"
                fill="#A7F3D0"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                K (Kuzey)
              </text>
              <text
                x="220"
                y="428"
                fill="#A7F3D0"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                G (Güney)
              </text>
              <text
                x="18"
                y="224"
                fill="#BAE6FD"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                D
              </text>
              <text
                x="422"
                y="224"
                fill="#BAE6FD"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                B
              </text>

              {/* Background stars */}
              {bgStars.map((s, idx) => (
                <circle
                  key={idx}
                  cx={s.x}
                  cy={s.y}
                  r={s.r}
                  fill="#FFFFFF"
                  opacity={s.o}
                />
              ))}

              {/* Constellations */}
              {projected.map((c) => {
                const isSelected = c.id === selectedId;
                return (
                  <g
                    key={c.id}
                    onClick={() => setSelectedId(c.id)}
                    className="cursor-pointer"
                  >
                    {c.edges.map(([a, b], edgeIdx) => {
                      const pA = c.pts[a]?.pos;
                      const pB = c.pts[b]?.pos;
                      if (!pA || !pB) return null;
                      return (
                        <line
                          key={edgeIdx}
                          x1={pA.x}
                          y1={pA.y}
                          x2={pB.x}
                          y2={pB.y}
                          stroke={isSelected ? "#FDE68A" : "rgba(186,230,253,0.5)"}
                          strokeWidth={isSelected ? 1.8 : 1.05}
                        />
                      );
                    })}

                    {c.pts.map((star, sIdx) => {
                      if (!star.pos) return null;
                      const starRadius = Math.max(2.1, 4.4 - star.mag * 0.7);
                      return (
                        <g key={sIdx}>
                          <circle
                            cx={star.pos.x}
                            cy={star.pos.y}
                            r={starRadius * 2.1}
                            fill={
                              isSelected
                                ? "rgba(253,230,138,0.28)"
                                : "rgba(167,243,208,0.16)"
                            }
                          />
                          <circle
                            cx={star.pos.x}
                            cy={star.pos.y}
                            r={starRadius}
                            fill={isSelected ? "#FDE68A" : "#FFFFFF"}
                          />
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
          </motion.div>
        </div>

        {/* Sağ Bilgi & Takımyıldızı Seçici */}
        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-2xl p-4 bg-[#04282D]/70 border border-white/20 space-y-2">
            <div className="flex items-center gap-2 text-xs text-[#A7F3D0] font-semibold uppercase tracking-wider">
              <MapPin className="w-3.5 h-3.5" />
              <span>Serdivan, Sakarya • 40.76° K, 30.36° D</span>
            </div>
            <p className="text-sm text-white/90">
              <strong>Tarih &amp; Saat:</strong> 17 Kasım 2023 • ~20:00
            </p>
            <div className="flex items-center gap-2 text-xs text-[#BAE6FD]">
              <Moon className="w-3.5 h-3.5 text-[#FDE68A]" />
              <span>
                O geceki Ay evresi: <strong>%20 İlk Hilal 🌒</strong>
              </span>
            </div>
          </div>

          {/* Seçili Takımyıldızı Açıklaması */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-[#0D9488]/35 to-[#0284C7]/35 border border-[#A7F3D0]/40">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#FDE68A] font-semibold mb-1 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {activeConstellation.nameTr}
            </p>
            <p className="font-serif italic text-lg text-white leading-relaxed">
              “{activeConstellation.meaning}”
            </p>
          </div>

          {/* Takımyıldızı Butonları */}
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#E0F2FE]/75 mb-2.5">
              Haritada İncelemek İçin Dokun:
            </p>
            <div className="flex flex-wrap gap-2">
              {CONSTELLATIONS.map((c) => {
                const active = c.id === selectedId;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedId(c.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                      active
                        ? "bg-gradient-to-r from-[#059669] to-[#0284C7] text-white border border-white/60 shadow"
                        : "bg-white/10 hover:bg-white/20 text-[#E0F2FE] border border-white/20"
                    }`}
                  >
                    {c.nameTr}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
