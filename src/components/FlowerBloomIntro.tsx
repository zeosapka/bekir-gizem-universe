import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { Heart, Sparkles } from "lucide-react";
import { UNIVERSE_CONFIG } from "../config/universeConfig";
import { usePerformanceProfile } from "../hooks/usePerformanceProfile";
import { useViewportMetrics } from "../hooks/useViewportMetrics";

interface FlowerBloomIntroProps {
  onComplete: () => void;
}

type FlowerType = "rose" | "tulip" | "daisy";

interface RosePetalSpec {
  layer: number;
  angle: number;
  maxLength: number;
  maxWidth: number;
  openDelay: number;
  curlFactor: number;
}

interface BranchSpec {
  id: string;
  flowerType: FlowerType;
  tiltAngle?: number;
  startX: number;
  startY: number;
  ctrl1X: number;
  ctrl1Y: number;
  ctrl2X: number;
  ctrl2Y: number;
  endX: number;
  endY: number;
  thicknessStart: number;
  thicknessEnd: number;
  startTime: number;
  duration: number;
  leaves: {
    t: number;
    side: -1 | 1;
    angleOffset: number;
    scale: number;
    delayOffset: number;
  }[];
  flowerScale: number;
  bloomStartTime: number;
  isMainCenter?: boolean;
}

interface SparkleMote {
  angle: number;
  dist: number;
  speed: number;
  size: number;
  color: string;
  phase: number;
}

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function easeOutCubic(t: number): number {
  const x = clamp01(t);
  return 1 - Math.pow(1 - x, 3);
}

function getCubicBezierPoint(
  t: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  const u = 1 - t;
  const tt = t * t;
  const uu = u * u;
  const uuu = uu * u;
  const ttt = tt * t;

  return {
    x: uuu * x0 + 3 * uu * t * x1 + 3 * u * tt * x2 + ttt * x3,
    y: uuu * y0 + 3 * uu * t * y1 + 3 * u * tt * y2 + ttt * y3,
  };
}

function getCubicBezierAngle(
  t: number,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
) {
  const u = 1 - t;
  const dx =
    3 * u * u * (x1 - x0) + 6 * u * t * (x2 - x1) + 3 * t * t * (x3 - x2);
  const dy =
    3 * u * u * (y1 - y0) + 6 * u * t * (y2 - y1) + 3 * t * t * (y3 - y2);
  return Math.atan2(dy, dx);
}

function traceCenteredHeartPath(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  const r = radius;
  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 0.36);
  ctx.bezierCurveTo(
    cx - r * 0.12,
    cy - r * 0.95,
    cx - r * 1.05,
    cy - r * 0.88,
    cx - r * 1.05,
    cy - r * 0.25
  );
  ctx.bezierCurveTo(
    cx - r * 1.05,
    cy + r * 0.32,
    cx - r * 0.35,
    cy + r * 0.68,
    cx,
    cy + r * 1.02
  );
  ctx.bezierCurveTo(
    cx + r * 0.35,
    cy + r * 0.68,
    cx + r * 1.05,
    cy + r * 0.32,
    cx + r * 1.05,
    cy - r * 0.25
  );
  ctx.bezierCurveTo(
    cx + r * 1.05,
    cy - r * 0.88,
    cx + r * 0.12,
    cy - r * 0.95,
    cx,
    cy - r * 0.36
  );
  ctx.closePath();
}

function traceBotanicalLeaf(
  ctx: CanvasRenderingContext2D,
  len: number,
  wid: number
) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(
    len * 0.28,
    -wid * 1.02,
    len * 0.74,
    -wid * 0.68,
    len,
    0
  );
  ctx.bezierCurveTo(
    len * 0.74,
    wid * 0.68,
    len * 0.28,
    wid * 1.02,
    0,
    0
  );
  ctx.closePath();
}

function readLiveCanvasCssSize(
  canvas: HTMLCanvasElement,
  wrapper: HTMLDivElement | null
): {
  width: number;
  height: number;
} {
  const cW = canvas.clientWidth || wrapper?.clientWidth || 0;
  const cH = canvas.clientHeight || wrapper?.clientHeight || 0;
  const docW =
    document.documentElement?.clientWidth || window.innerWidth || 1024;
  const docH =
    document.documentElement?.clientHeight || window.innerHeight || 768;

  return {
    width: Math.max(300, Math.round(cW > 100 ? cW : docW)),
    height: Math.max(300, Math.round(cH > 100 ? cH : docH)),
  };
}

export function FlowerBloomIntro({ onComplete }: FlowerBloomIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stageWrapperRef = useRef<HTMLDivElement | null>(null);

  const [stage, setStage] = useState<"growing" | "bloomed" | "transitioning">(
    "growing"
  );
  const { isReducedMotion, particleCountMultiplier } = usePerformanceProfile();
  const viewport = useViewportMetrics();

  const isReducedMotionRef = useRef(isReducedMotion);
  const particleMultiplierRef = useRef(particleCountMultiplier);
  isReducedMotionRef.current = isReducedMotion;
  particleMultiplierRef.current = particleCountMultiplier;

  const hasBloomedRef = useRef(false);
  const isTransitioningRef = useRef(false);
  const heartPortalRef = useRef({ progress: 0 });

  const triggerCinematicHeartDive = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    setStage("transitioning");

    try {
      confetti({
        particleCount: Math.max(
          30,
          Math.round(75 * particleMultiplierRef.current)
        ),
        spread: 115,
        origin: { y: 0.45 },
        colors: ["#E83E70", "#FF91B5", "#F5D58A", "#FFF8FC"],
        scalar: 1.1,
      });
    } catch {
      // ignore confetti canvas error on low-memory devices
    }

    if (isReducedMotionRef.current) {
      window.setTimeout(onComplete, 420);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    tl.to(
      heartPortalRef.current,
      {
        progress: 1,
        duration: 1.28,
        ease: "power3.inOut",
      },
      0
    );

    if (stageWrapperRef.current) {
      tl.to(
        stageWrapperRef.current,
        {
          opacity: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        0.98
      );
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = stageWrapperRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    hasBloomedRef.current = false;
    isTransitioningRef.current = false;
    heartPortalRef.current.progress = 0;
    setStage("growing");

    // 38 Katmanlı Kadife Gül (Rose) taç yaprak dizilimi
    const rosePetals: RosePetalSpec[] = [];
    const totalRosePetals = 38;
    for (let i = 0; i < totalRosePetals; i++) {
      const norm = i / (totalRosePetals - 1);
      rosePetals.push({
        layer: Math.floor(norm * 5),
        angle: i * GOLDEN_ANGLE,
        maxLength: 104 - norm * 58,
        maxWidth: 74 - norm * 34,
        openDelay: norm * 0.35,
        curlFactor: 1 - norm * 0.4,
      });
    }

    const sceneW = 780;
    const sceneH = 620;
    const cx = sceneW / 2;
    const baseY = sceneH - 18;

    // 7 DALLI ROMANTİK GÜL, LALE VE PAPATYA BUKETİ (Bekir & Gizem • 17 Kasım)
    const branches: BranchSpec[] = [
      // 1. ANA MERKEZ GÖVDE: Kraliçe Kadife Gül (Rose)
      {
        id: "main-rose-stem",
        flowerType: "rose",
        startX: cx,
        startY: baseY,
        ctrl1X: cx - 26,
        ctrl1Y: 468,
        ctrl2X: cx + 20,
        ctrl2Y: 340,
        endX: cx,
        endY: 230,
        thicknessStart: 10.5,
        thicknessEnd: 4.8,
        startTime: 0.0,
        duration: 0.34,
        leaves: [
          { t: 0.24, side: -1, angleOffset: -0.68, scale: 1.06, delayOffset: 0.06 },
          { t: 0.42, side: 1, angleOffset: 0.64, scale: 1.0, delayOffset: 0.12 },
          { t: 0.62, side: -1, angleOffset: -0.58, scale: 0.9, delayOffset: 0.18 },
        ],
        flowerScale: 1.08,
        bloomStartTime: 0.14,
        isMainCenter: true,
      },
      // 2. SOL ANA YAN DAL: Kırmızı-Pembe Zarif Lale (Tulip)
      {
        id: "left-tulip-branch",
        flowerType: "tulip",
        tiltAngle: -0.32,
        startX: cx - 6,
        startY: 440,
        ctrl1X: cx - 72,
        ctrl1Y: 405,
        ctrl2X: 256,
        ctrl2Y: 350,
        endX: 226,
        endY: 278,
        thicknessStart: 6.5,
        thicknessEnd: 3.2,
        startTime: 0.08,
        duration: 0.34,
        leaves: [
          { t: 0.36, side: -1, angleOffset: -0.72, scale: 0.88, delayOffset: 0.14 },
          { t: 0.66, side: 1, angleOffset: 0.58, scale: 0.78, delayOffset: 0.22 },
        ],
        flowerScale: 1.0,
        bloomStartTime: 0.24,
      },
      // 3. SAĞ ANA YAN DAL: Kırmızı-Pembe Zarif Lale (Tulip)
      {
        id: "right-tulip-branch",
        flowerType: "tulip",
        tiltAngle: 0.32,
        startX: cx + 4,
        startY: 416,
        ctrl1X: cx + 74,
        ctrl1Y: 386,
        ctrl2X: 524,
        ctrl2Y: 342,
        endX: 554,
        endY: 274,
        thicknessStart: 6.5,
        thicknessEnd: 3.2,
        startTime: 0.1,
        duration: 0.34,
        leaves: [
          { t: 0.38, side: 1, angleOffset: 0.72, scale: 0.88, delayOffset: 0.16 },
          { t: 0.68, side: -1, angleOffset: -0.58, scale: 0.78, delayOffset: 0.24 },
        ],
        flowerScale: 1.0,
        bloomStartTime: 0.26,
      },
      // 4. SOL ALT DAL: Beyaz-Altın Işıltılı Papatya (Daisy)
      {
        id: "left-daisy-branch",
        flowerType: "daisy",
        startX: cx - 8,
        startY: 506,
        ctrl1X: 312,
        ctrl1Y: 486,
        ctrl2X: 218,
        ctrl2Y: 444,
        endX: 168,
        endY: 392,
        thicknessStart: 5.0,
        thicknessEnd: 2.5,
        startTime: 0.14,
        duration: 0.34,
        leaves: [
          { t: 0.48, side: -1, angleOffset: -0.66, scale: 0.75, delayOffset: 0.2 },
        ],
        flowerScale: 0.92,
        bloomStartTime: 0.32,
      },
      // 5. SAĞ ALT DAL: Beyaz-Altın Işıltılı Papatya (Daisy)
      {
        id: "right-daisy-branch",
        flowerType: "daisy",
        startX: cx + 2,
        startY: 494,
        ctrl1X: 468,
        ctrl1Y: 476,
        ctrl2X: 562,
        ctrl2Y: 440,
        endX: 612,
        endY: 388,
        thicknessStart: 5.0,
        thicknessEnd: 2.5,
        startTime: 0.16,
        duration: 0.34,
        leaves: [
          { t: 0.5, side: 1, angleOffset: 0.66, scale: 0.75, delayOffset: 0.22 },
        ],
        flowerScale: 0.92,
        bloomStartTime: 0.34,
      },
      // 6. SOL ÜST TAÇ FİLİZİ: Zarif Papatya (Daisy)
      {
        id: "crown-left-daisy",
        flowerType: "daisy",
        startX: cx + 4,
        startY: 318,
        ctrl1X: 342,
        ctrl1Y: 266,
        ctrl2X: 314,
        ctrl2Y: 208,
        endX: 294,
        endY: 162,
        thicknessStart: 4.2,
        thicknessEnd: 2.2,
        startTime: 0.18,
        duration: 0.32,
        leaves: [
          { t: 0.52, side: -1, angleOffset: -0.6, scale: 0.64, delayOffset: 0.24 },
        ],
        flowerScale: 0.72,
        bloomStartTime: 0.38,
      },
      // 7. SAĞ ÜST TAÇ FİLİZİ: Romantik Gonca Lale (Tulip)
      {
        id: "crown-right-tulip",
        flowerType: "tulip",
        tiltAngle: 0.22,
        startX: cx + 6,
        startY: 308,
        ctrl1X: 438,
        ctrl1Y: 262,
        ctrl2X: 466,
        ctrl2Y: 206,
        endX: 486,
        endY: 162,
        thicknessStart: 4.2,
        thicknessEnd: 2.2,
        startTime: 0.2,
        duration: 0.32,
        leaves: [
          { t: 0.52, side: 1, angleOffset: 0.6, scale: 0.64, delayOffset: 0.26 },
        ],
        flowerScale: 0.76,
        bloomStartTime: 0.4,
      },
    ];

    const motes: SparkleMote[] = [];
    const moteColors = ["#F5D58A", "#FF91B5", "#E83E70", "#FFF8FC"];
    for (let i = 0; i < 38; i++) {
      motes.push({
        angle: (Math.PI * 2 * i) / 38,
        dist: 38 + (i % 7) * 32,
        speed: 0.25 + (i % 4) * 0.15,
        size: 1.5 + (i % 3) * 1.1,
        color: moteColors[i % moteColors.length],
        phase: i * 0.7,
      });
    }

    let firstFrameTime: number | null = null;
    let hiddenAtTime: number | null = null;
    let rafId: number | null = null;
    let isCancelled = false;
    const orientationTimeouts: number[] = [];

    const drawGlowingStemBud = (
      x: number,
      y: number,
      scale: number,
      growthP: number
    ) => {
      const r = Math.max(5, 13 * scale * (0.45 + 0.55 * growthP));
      ctx.save();
      ctx.translate(x, y);

      const budHalo = ctx.createRadialGradient(0, 0, 1, 0, 0, r * 2.2);
      budHalo.addColorStop(0, "rgba(255, 248, 252, 0.9)");
      budHalo.addColorStop(0.5, "rgba(245, 213, 138, 0.6)");
      budHalo.addColorStop(1, "rgba(232, 62, 112, 0)");
      ctx.fillStyle = budHalo;
      ctx.beginPath();
      ctx.arc(0, 0, r * 2.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawBranch = (
      b: BranchSpec,
      globalProgress: number,
      swayX: number
    ) => {
      const localP = easeOutCubic(
        (globalProgress - b.startTime) / b.duration
      );
      if (localP <= 0.002) return null;

      const steps = 26;
      const maxStep = Math.max(1, Math.floor(steps * localP));

      ctx.save();
      ctx.lineCap = "round";

      for (let s = 0; s < maxStep; s++) {
        const t1 = s / steps;
        const t2 = (s + 1) / steps;

        const p1 = getCubicBezierPoint(
          t1,
          b.startX,
          b.startY,
          b.ctrl1X + swayX * t1,
          b.ctrl1Y,
          b.ctrl2X + swayX * t1,
          b.ctrl2Y,
          b.endX + swayX,
          b.endY
        );
        const p2 = getCubicBezierPoint(
          t2,
          b.startX,
          b.startY,
          b.ctrl1X + swayX * t2,
          b.ctrl1Y,
          b.ctrl2X + swayX * t2,
          b.ctrl2Y,
          b.endX + swayX,
          b.endY
        );

        const widthSeg =
          b.thicknessStart + (b.thicknessEnd - b.thicknessStart) * t1;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineWidth = widthSeg;
        ctx.strokeStyle =
          t1 < 0.35 ? "#3A5A3E" : t1 < 0.7 ? "#5B8456" : "#8AB07C";
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p1.x + 1, p1.y);
        ctx.lineTo(p2.x + 1, p2.y);
        ctx.lineWidth = Math.max(0.9, widthSeg * 0.2);
        ctx.strokeStyle = "rgba(245, 213, 138, 0.45)";
        ctx.stroke();
      }
      ctx.restore();

      for (const lf of b.leaves) {
        if (localP <= lf.t) continue;
        const leafP = easeOutCubic(
          (globalProgress - (b.startTime + lf.delayOffset)) / 0.26
        );
        if (leafP <= 0.01) continue;

        const pt = getCubicBezierPoint(
          lf.t,
          b.startX,
          b.startY,
          b.ctrl1X + swayX * lf.t,
          b.ctrl1Y,
          b.ctrl2X + swayX * lf.t,
          b.ctrl2Y,
          b.endX + swayX,
          b.endY
        );
        const tangent = getCubicBezierAngle(
          lf.t,
          b.startX,
          b.startY,
          b.ctrl1X,
          b.ctrl1Y,
          b.ctrl2X,
          b.ctrl2Y,
          b.endX,
          b.endY
        );

        const len = 64 * lf.scale * leafP;
        const wid = 24 * lf.scale * leafP;

        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(tangent + lf.angleOffset + swayX * 0.003);

        const leafGrad = ctx.createLinearGradient(0, 0, len, 0);
        leafGrad.addColorStop(0, "#1E3A2A");
        leafGrad.addColorStop(0.55, "#3E6B48");
        leafGrad.addColorStop(1, "#7CA878");

        ctx.fillStyle = leafGrad;
        ctx.strokeStyle = "rgba(245, 213, 138, 0.58)";
        ctx.lineWidth = 1.0;

        traceBotanicalLeaf(ctx, len, wid);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(len * 0.85, 0);
        ctx.strokeStyle = "rgba(245, 213, 138, 0.42)";
        ctx.lineWidth = 0.8;
        ctx.stroke();

        ctx.restore();
      }

      const tipPt = getCubicBezierPoint(
        localP,
        b.startX,
        b.startY,
        b.ctrl1X + swayX * localP,
        b.ctrl1Y,
        b.ctrl2X + swayX * localP,
        b.ctrl2Y,
        b.endX + swayX,
        b.endY
      );

      drawGlowingStemBud(tipPt.x, tipPt.y, b.flowerScale, localP);
      return tipPt;
    };

    // 1. KADİFE GÜL (VELVET ROSE) + MERKEZ KALP ÇEKİRDEĞİ
    const drawVelvetRose = (
      x: number,
      y: number,
      scale: number,
      bloomProgress: number,
      timeSec: number,
      isMainCenter: boolean
    ) => {
      if (bloomProgress <= 0.005) return;

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      const auraR = 45 + bloomProgress * 112;
      const auraGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, auraR);
      auraGrad.addColorStop(0, "rgba(245, 213, 138, 0.55)");
      auraGrad.addColorStop(0.5, "rgba(232, 62, 112, 0.3)");
      auraGrad.addColorStop(1, "rgba(8, 6, 17, 0)");
      ctx.fillStyle = auraGrad;
      ctx.beginPath();
      ctx.arc(0, 0, auraR, 0, Math.PI * 2);
      ctx.fill();

      for (let i = 0; i < rosePetals.length; i++) {
        const p = rosePetals[i];
        const localRaw = (bloomProgress - p.openDelay) / (1 - p.openDelay);
        if (localRaw <= 0.005) continue;

        const openT = easeOutCubic(localRaw);
        const spread = 0.26 + openT * 0.74 * p.curlFactor;
        const len = p.maxLength * (0.28 + openT * 0.72) * spread;
        const wid = p.maxWidth * (0.34 + openT * 0.66);
        const breathe = Math.sin(timeSec * 1.6 + i * 0.4) * 0.02 * openT;

        ctx.save();
        ctx.rotate(p.angle + breathe);

        const petalGrad = ctx.createLinearGradient(0, 0, 0, -len);
        if (p.layer === 0) {
          petalGrad.addColorStop(0, "#2B0615");
          petalGrad.addColorStop(0.5, "#8E143B");
          petalGrad.addColorStop(0.9, "#E1285C");
          petalGrad.addColorStop(1, "#F5D58A");
        } else if (p.layer <= 2) {
          petalGrad.addColorStop(0, "#420920");
          petalGrad.addColorStop(0.48, "#C21C4F");
          petalGrad.addColorStop(0.88, "#FF6699");
          petalGrad.addColorStop(1, "#F5D58A");
        } else {
          petalGrad.addColorStop(0, "#5C0D2C");
          petalGrad.addColorStop(0.45, "#E83E70");
          petalGrad.addColorStop(0.85, "#FFA3C2");
          petalGrad.addColorStop(1, "#FFF8FC");
        }

        ctx.fillStyle = petalGrad;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
          -wid * 0.95,
          -len * 0.28,
          -wid * 1.05,
          -len * 0.86,
          0,
          -len
        );
        ctx.bezierCurveTo(
          wid * 1.05,
          -len * 0.86,
          wid * 0.95,
          -len * 0.28,
          0,
          0
        );
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle =
          p.layer >= 3
            ? "rgba(245, 213, 138, 0.72)"
            : "rgba(255, 165, 198, 0.4)";
        ctx.lineWidth = p.layer >= 3 ? 1.0 : 0.75;
        ctx.stroke();
        ctx.restore();
      }

      if (isMainCenter && bloomProgress > 0.25) {
        const heartAlpha = easeOutCubic((bloomProgress - 0.25) / 0.75);
        const pulse = 1 + Math.sin(timeSec * 3.4) * 0.08;
        const hRadius = 12 * heartAlpha * pulse;

        const centerGlow = ctx.createRadialGradient(0, 0, 2, 0, 0, 24);
        centerGlow.addColorStop(0, "rgba(255, 248, 252, 0.95)");
        centerGlow.addColorStop(0.5, "rgba(245, 213, 138, 0.8)");
        centerGlow.addColorStop(1, "rgba(232, 62, 112, 0)");
        ctx.fillStyle = centerGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 24 * heartAlpha, 0, Math.PI * 2);
        ctx.fill();

        ctx.save();
        ctx.globalAlpha = heartAlpha * 0.95;
        const hGrad = ctx.createRadialGradient(0, -2, 1, 0, 0, hRadius * 1.3);
        hGrad.addColorStop(0, "#FFF8FC");
        hGrad.addColorStop(0.45, "#FFD1E3");
        hGrad.addColorStop(0.8, "#E83E70");
        hGrad.addColorStop(1, "#9E1B4E");

        traceCenteredHeartPath(ctx, 0, 0, hRadius);
        ctx.fillStyle = hGrad;
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();
    };

    // 2. ZARİF LALE (ROYAL TULIP)
    const drawRoyalTulip = (
      x: number,
      y: number,
      scale: number,
      bloomProgress: number,
      timeSec: number,
      tiltAngle = 0
    ) => {
      if (bloomProgress <= 0.005) return;

      const openT = easeOutCubic(bloomProgress);
      const breathe = Math.sin(timeSec * 1.7 + tiltAngle * 3) * 0.03 * openT;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tiltAngle + breathe);
      ctx.scale(scale * (0.35 + 0.65 * openT), scale * (0.35 + 0.65 * openT));

      // Arka lale ışık halesi
      const aura = ctx.createRadialGradient(0, -35, 5, 0, -35, 75);
      aura.addColorStop(0, "rgba(255, 145, 181, 0.42)");
      aura.addColorStop(0.55, "rgba(232, 62, 112, 0.2)");
      aura.addColorStop(1, "rgba(8, 6, 17, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, -35, 75, 0, Math.PI * 2);
      ctx.fill();

      const h = 76;
      const w = 44;

      // Arka sağ ve sol lale taç yaprakları
      const drawCupPetal = (
        rot: number,
        c0: string,
        c1: string,
        c2: string,
        wScale: number,
        hScale: number
      ) => {
        ctx.save();
        ctx.rotate(rot * openT);
        const grad = ctx.createLinearGradient(0, 6, 0, -h * hScale);
        grad.addColorStop(0, c0);
        grad.addColorStop(0.55, c1);
        grad.addColorStop(0.9, c2);
        grad.addColorStop(1, "#FFF0F5");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, 8);
        ctx.bezierCurveTo(
          -w * wScale,
          -h * 0.25 * hScale,
          -w * 0.9 * wScale,
          -h * 0.85 * hScale,
          0,
          -h * hScale
        );
        ctx.bezierCurveTo(
          w * 0.9 * wScale,
          -h * 0.85 * hScale,
          w * wScale,
          -h * 0.25 * hScale,
          0,
          8
        );
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(245, 213, 138, 0.65)";
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();
      };

      // Arka 2 yaprak
      drawCupPetal(-0.34, "#4A0A22", "#B81D4D", "#FF75A0", 0.72, 0.94);
      drawCupPetal(0.34, "#4A0A22", "#B81D4D", "#FF75A0", 0.72, 0.94);
      // Yan 2 kucaklayıcı lale yaprağı
      drawCupPetal(-0.2, "#5E0E2C", "#E12D63", "#FF9EC0", 0.82, 0.98);
      drawCupPetal(0.2, "#5E0E2C", "#E12D63", "#FF9EC0", 0.82, 0.98);
      // Ön merkez lale yaprağı (altın uç parıltılı)
      drawCupPetal(0, "#751438", "#F0467C", "#F5D58A", 0.86, 1.04);

      ctx.restore();
    };

    // 3. IŞILTILI PAPATYA (RADIANT DAISY)
    const drawRadiantDaisy = (
      x: number,
      y: number,
      scale: number,
      bloomProgress: number,
      timeSec: number
    ) => {
      if (bloomProgress <= 0.005) return;

      const openT = easeOutCubic(bloomProgress);

      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);

      // Papatya çevresinde sıcak altın-beyaz ışık halesi
      const aura = ctx.createRadialGradient(0, 0, 4, 0, 0, 62 * openT);
      aura.addColorStop(0, "rgba(245, 213, 138, 0.5)");
      aura.addColorStop(0.55, "rgba(255, 248, 252, 0.22)");
      aura.addColorStop(1, "rgba(8, 6, 17, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, 0, 62 * openT, 0, Math.PI * 2);
      ctx.fill();

      // 18 sedef beyazı papatya yaprağı
      const petalCount = 18;
      for (let i = 0; i < petalCount; i++) {
        const angle =
          (Math.PI * 2 * i) / petalCount +
          Math.sin(timeSec * 1.4 + i * 0.5) * 0.015;
        const pLen = 46 * (0.28 + 0.72 * openT);
        const pWid = 11.5 * (0.4 + 0.6 * openT);

        ctx.save();
        ctx.rotate(angle);

        const pGrad = ctx.createLinearGradient(0, 0, 0, -pLen);
        pGrad.addColorStop(0, "#F5D58A");
        pGrad.addColorStop(0.25, "#FFE8F1");
        pGrad.addColorStop(1, "#FFFFFF");

        ctx.fillStyle = pGrad;
        ctx.beginPath();
        ctx.moveTo(0, -6);
        ctx.bezierCurveTo(
          -pWid * 0.8,
          -pLen * 0.35,
          -pWid * 0.75,
          -pLen * 0.92,
          0,
          -pLen
        );
        ctx.bezierCurveTo(
          pWid * 0.75,
          -pLen * 0.92,
          pWid * 0.8,
          -pLen * 0.35,
          0,
          -6
        );
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "rgba(255, 182, 210, 0.45)";
        ctx.lineWidth = 0.7;
        ctx.stroke();

        ctx.restore();
      }

      // Papatyanın sıcak altın-bal göbeği
      const discR = 14.5 * openT;
      const discGrad = ctx.createRadialGradient(-3, -3, 1, 0, 0, discR);
      discGrad.addColorStop(0, "#FFF6C4");
      discGrad.addColorStop(0.55, "#F5C249");
      discGrad.addColorStop(1, "#C47D12");
      ctx.fillStyle = discGrad;
      ctx.beginPath();
      ctx.arc(0, 0, discR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 248, 252, 0.75)";
      ctx.lineWidth = 1.1;
      ctx.stroke();

      ctx.restore();
    };

    const paintSceneFrame = (elapsedMs: number) => {
      const totalDuration = isReducedMotionRef.current ? 150 : 3400;
      const rawProgress = clamp01(0.04 + (elapsedMs / totalDuration) * 0.96);
      const timeSec = elapsedMs * 0.001;
      const swayX = isReducedMotionRef.current
        ? 0
        : Math.sin(timeSec * 1.35) * 4.2;

      const { width: vpW, height: vpH } = readLiveCanvasCssSize(
        canvas,
        wrapper
      );
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetPxW = Math.round(vpW * dpr);
      const targetPxH = Math.round(vpH * dpr);

      if (canvas.width !== targetPxW || canvas.height !== targetPxH) {
        canvas.width = targetPxW;
        canvas.height = targetPxH;
      }

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const bgGrad = ctx.createRadialGradient(
        vpW * 0.5,
        vpH * 0.4,
        10,
        vpW * 0.5,
        vpH * 0.45,
        Math.max(vpW, vpH) * 0.85
      );
      bgGrad.addColorStop(0, "#4A102D");
      bgGrad.addColorStop(0.55, "#160618");
      bgGrad.addColorStop(1, "#080611");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, vpW, vpH);

      const isPortrait = vpH > vpW;
      const isShortScreen = vpH < 750;
      const topReservedPx = vpW < 1280 ? (isShortScreen ? 86 : 98) : 58;
      const bottomReservedPx = isShortScreen
        ? 154
        : isPortrait
        ? 196
        : 174;

      const availFlowerH = Math.max(
        180,
        vpH - topReservedPx - bottomReservedPx
      );
      const availFlowerW = vpW * (isPortrait ? 0.92 : 0.86);

      const fitScale = Math.min(
        availFlowerW / sceneW,
        (availFlowerH * 0.96) / sceneH,
        1.08
      );

      const offsetX = (vpW - sceneW * fitScale) / 2;
      const offsetY =
        topReservedPx + (availFlowerH - sceneH * fitScale) / 2;

      ctx.save();
      ctx.translate(offsetX, offsetY);
      ctx.scale(fitScale, fitScale);

      const seedGlow = ctx.createRadialGradient(cx, 320, 8, cx, 360, 260);
      seedGlow.addColorStop(0, "rgba(232, 62, 112, 0.25)");
      seedGlow.addColorStop(0.5, "rgba(245, 213, 138, 0.12)");
      seedGlow.addColorStop(1, "rgba(8, 6, 17, 0)");
      ctx.fillStyle = seedGlow;
      ctx.beginPath();
      ctx.arc(cx, 340, 260, 0, Math.PI * 2);
      ctx.fill();

      const tipPositions: {
        branch: BranchSpec;
        pt: { x: number; y: number };
      }[] = [];

      for (const b of branches) {
        const tip = drawBranch(b, rawProgress, swayX);
        if (tip) {
          tipPositions.push({ branch: b, pt: tip });
        }
      }

      const sortedTips = [...tipPositions].sort((a, b) =>
        a.branch.isMainCenter ? 1 : b.branch.isMainCenter ? -1 : 0
      );

      let mainFlowerPos = { x: cx + swayX, y: 230 };

      for (const item of sortedTips) {
        const { branch, pt } = item;
        if (branch.isMainCenter) {
          mainFlowerPos = pt;
        }
        const bloomP = easeOutCubic(
          (rawProgress - branch.bloomStartTime) /
            (1 - branch.bloomStartTime)
        );
        if (bloomP > 0.005) {
          if (branch.flowerType === "rose") {
            drawVelvetRose(
              pt.x,
              pt.y,
              branch.flowerScale,
              bloomP,
              timeSec,
              !!branch.isMainCenter
            );
          } else if (branch.flowerType === "tulip") {
            drawRoyalTulip(
              pt.x,
              pt.y,
              branch.flowerScale,
              bloomP,
              timeSec,
              branch.tiltAngle || 0
            );
          } else {
            drawRadiantDaisy(
              pt.x,
              pt.y,
              branch.flowerScale,
              bloomP,
              timeSec
            );
          }
        }
      }

      const moteOpacity = 0.45 + 0.55 * rawProgress;
      for (const m of motes) {
        const curAngle = m.angle + timeSec * m.speed * 0.35;
        const r = m.dist + Math.sin(timeSec * 1.5 + m.phase) * 14;
        const mx = cx + Math.cos(curAngle) * r * 1.25;
        const my = 285 + Math.sin(curAngle) * r * 0.85;

        ctx.save();
        ctx.globalAlpha =
          (0.38 + 0.55 * Math.sin(timeSec * 2.4 + m.phase)) * moteOpacity;
        ctx.fillStyle = m.color;
        ctx.beginPath();
        ctx.arc(mx, my, m.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      ctx.restore();

      const portalP = heartPortalRef.current.progress;
      if (portalP > 0.001) {
        const screenFlowerX = offsetX + mainFlowerPos.x * fitScale;
        const screenFlowerY = offsetY + mainFlowerPos.y * fitScale;
        const maxScreenDiag = Math.hypot(vpW, vpH) * 1.45;

        const rings = [
          {
            delay: 0,
            colorInner: "#FFF8FC",
            colorMid: "#F5D58A",
            colorOuter: "#E83E70",
            alpha: 0.96,
          },
          {
            delay: 0.12,
            colorInner: "#FFF8FC",
            colorMid: "#FF91B5",
            colorOuter: "#8E1D47",
            alpha: 0.98,
          },
          {
            delay: 0.24,
            colorInner: "#4A102D",
            colorMid: "#1B071A",
            colorOuter: "#080611",
            alpha: 1,
          },
        ];

        for (const ring of rings) {
          const localT = clamp01((portalP - ring.delay) / (1 - ring.delay));
          if (localT <= 0.001) continue;
          const easedT = Math.pow(localT, 2.35);
          const heartRadius = 14 * fitScale + easedT * maxScreenDiag;

          ctx.save();
          ctx.globalAlpha = ring.alpha;
          const grad = ctx.createRadialGradient(
            screenFlowerX,
            screenFlowerY,
            heartRadius * 0.05,
            screenFlowerX,
            screenFlowerY,
            heartRadius * 1.15
          );
          grad.addColorStop(0, ring.colorInner);
          grad.addColorStop(0.48, ring.colorMid);
          grad.addColorStop(1, ring.colorOuter);

          traceCenteredHeartPath(
            ctx,
            screenFlowerX,
            screenFlowerY,
            heartRadius
          );
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.lineWidth = Math.max(2, 5 * (1 - localT));
          ctx.strokeStyle = "rgba(245, 213, 138, 0.85)";
          ctx.stroke();
          ctx.restore();
        }
      }

      ctx.restore();

      if (rawProgress >= 0.92 && !hasBloomedRef.current) {
        hasBloomedRef.current = true;
        setStage("bloomed");

        try {
          confetti({
            particleCount: Math.max(
              24,
              Math.round(55 * particleMultiplierRef.current)
            ),
            spread: 100,
            origin: { y: 0.45 },
            colors: ["#F5D58A", "#FF91B5", "#E83E70", "#FFF8FC"],
            scalar: 1.0,
          });
        } catch {
          // ignore confetti errors
        }
      }
    };

    const scheduleNextFrame = () => {
      if (isCancelled) return;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      rafId = window.requestAnimationFrame(renderLoop);
    };

    const renderLoop = (now: number) => {
      if (isCancelled) return;
      rafId = null;

      if (document.visibilityState === "hidden") {
        if (hiddenAtTime === null) {
          hiddenAtTime = now;
        }
        scheduleNextFrame();
        return;
      } else if (hiddenAtTime !== null) {
        if (firstFrameTime !== null) {
          firstFrameTime += now - hiddenAtTime;
        }
        hiddenAtTime = null;
      }

      if (firstFrameTime === null) {
        firstFrameTime = now;
      }

      const elapsed = Math.max(0, now - firstFrameTime);
      paintSceneFrame(elapsed);
      scheduleNextFrame();
    };

    paintSceneFrame(0);
    scheduleNextFrame();

    const watchdogTimer = window.setTimeout(() => {
      if (!isCancelled && !hasBloomedRef.current) {
        hasBloomedRef.current = true;
        setStage("bloomed");
      }
    }, 3800);

    const clearOrientationTimeouts = () => {
      while (orientationTimeouts.length > 0) {
        const id = orientationTimeouts.pop();
        if (id !== undefined) window.clearTimeout(id);
      }
    };

    const handleViewportOrOrientationChange = () => {
      if (isCancelled) return;
      clearOrientationTimeouts();
      for (const delay of [0, 80, 200, 380, 650]) {
        const tid = window.setTimeout(() => {
          if (isCancelled) return;
          const elapsed =
            firstFrameTime !== null
              ? Math.max(0, performance.now() - firstFrameTime)
              : 0;
          paintSceneFrame(elapsed);
        }, delay);
        orientationTimeouts.push(tid);
      }
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && wrapper) {
      resizeObserver = new ResizeObserver(() => {
        handleViewportOrOrientationChange();
      });
      resizeObserver.observe(wrapper);
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (hiddenAtTime === null) {
          hiddenAtTime = performance.now();
        }
      } else {
        if (hiddenAtTime !== null && firstFrameTime !== null) {
          firstFrameTime += performance.now() - hiddenAtTime;
        }
        hiddenAtTime = null;
        handleViewportOrOrientationChange();
        scheduleNextFrame();
      }
    };

    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        firstFrameTime = null;
        hiddenAtTime = null;
        hasBloomedRef.current = false;
        isTransitioningRef.current = false;
        heartPortalRef.current.progress = 0;
        setStage("growing");
      }
      handleViewportOrOrientationChange();
      scheduleNextFrame();
    };

    window.addEventListener("resize", handleViewportOrOrientationChange, {
      passive: true,
    });
    window.addEventListener(
      "orientationchange",
      handleViewportOrOrientationChange,
      { passive: true }
    );
    window.visualViewport?.addEventListener(
      "resize",
      handleViewportOrOrientationChange,
      { passive: true }
    );
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pageshow", handlePageShow);

    return () => {
      isCancelled = true;
      window.clearTimeout(watchdogTimer);
      clearOrientationTimeouts();
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", handleViewportOrOrientationChange);
      window.removeEventListener(
        "orientationchange",
        handleViewportOrOrientationChange
      );
      window.visualViewport?.removeEventListener(
        "resize",
        handleViewportOrOrientationChange
      );
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  return (
    <div
      ref={stageWrapperRef}
      onClick={() => {
        if (stage === "bloomed") triggerCinematicHeartDive();
      }}
      style={{
        paddingTop: "max(0.75rem, env(safe-area-inset-top, 0px))",
        paddingBottom:
          "max(1.25rem, calc(env(safe-area-inset-bottom, 0px) + 0.85rem))",
      }}
      className={`fixed inset-0 w-full h-full z-50 flex flex-col items-center justify-between px-4 overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#4A102D_0%,#160618_58%,#080611_100%)] select-none ${
        stage === "bloomed" ? "cursor-pointer" : ""
      }`}
    >
      {/* TAM EKRAN Gül, Lale ve Papatya Buketi Kanvası */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-10 block"
      />

      {/* Üst Rozet */}
      <div className="relative z-20 mt-13 sm:mt-14 xl:mt-1.5 text-center pointer-events-none px-2 shrink-0 max-w-full">
        <span className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full bg-[#190824]/85 border border-[#F5D58A]/35 text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#F5D58A] shadow-[0_0_20px_rgba(8,6,17,0.65)] max-w-full">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="truncate">{UNIVERSE_CONFIG.flowerIntro.badgeText}</span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
        </span>
      </div>

      {/* Orta Boşluk */}
      <div className="flex-1 min-h-0" />

      {/* Alt Romantik Mesaj ve Geçiş Butonu */}
      <div className="relative z-30 shrink-0 w-full flex flex-col items-center justify-end text-center max-w-2xl mx-auto px-3 sm:px-4 pb-1 sm:pb-2">
        <AnimatePresence mode="wait">
          {stage !== "growing" ? (
            <motion.div
              key="bloom-complete-message"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: stage === "transitioning" ? 0 : 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
              className="space-y-1.5 sm:space-y-2.5 flex flex-col items-center"
            >
              <h2
                className={`font-serif italic font-semibold bg-gradient-to-r from-[#FFF8FC] via-[#FF91B5] to-[#F5D58A] bg-clip-text text-transparent drop-shadow-[0_2px_25px_rgba(232,62,112,0.65)] leading-snug ${
                  viewport.isCompactHeight
                    ? "text-xl sm:text-2xl md:text-3xl"
                    : "text-xl sm:text-3xl md:text-4xl"
                }`}
              >
                &ldquo;{UNIVERSE_CONFIG.flowerIntro.message}&rdquo;
              </h2>

              <p className="font-serif italic text-xs sm:text-sm md:text-base text-[#F5D58A]/90 tracking-wide max-w-lg leading-relaxed">
                {UNIVERSE_CONFIG.flowerIntro.novemberSubtext}
              </p>

              <div className="pt-0.5 sm:pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerCinematicHeartDive();
                  }}
                  className="group inline-flex items-center justify-center gap-2 sm:gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3.5 min-h-[46px] sm:min-h-[50px] rounded-full bg-gradient-to-r from-[#4A102D] via-[#E83E70] to-[#4A102D] bg-[length:200%_100%] hover:bg-right border border-[#F5D58A]/75 text-xs sm:text-sm uppercase tracking-[0.18em] sm:tracking-[0.2em] font-semibold text-[#FFF8FC] shadow-[0_0_35px_rgba(232,62,112,0.6)] hover:scale-105 active:scale-95 transition-all duration-500 cursor-pointer touch-manipulation"
                >
                  <Heart className="w-4 h-4 text-[#F5D58A] fill-[#F5D58A] animate-pulse shrink-0" />
                  <span>{UNIVERSE_CONFIG.flowerIntro.touchHeartButtonText}</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="growing-status"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.92 }}
              exit={{ opacity: 0 }}
              className="font-serif italic text-sm sm:text-lg md:text-xl text-[#F5D58A]/95 tracking-wide py-2"
            >
              {UNIVERSE_CONFIG.flowerIntro.growingText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
