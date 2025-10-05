// StereoBeforeAfter.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const PRESETS = {
  Grayscale: "grayscale(100%)",
  Contrast: "contrast(1.5)",
  Brightness: "brightness(1.2)",
  Clarity: "contrast(1.35) brightness(1.05) saturate(1.1)",
  Desaturate: "saturate(0.6) contrast(1.2)",
};

export default function StereoImageFilter({
  src = "/images/anaglyph.jpg",
  aspect = 797 / 737, // height / width
  startSplit = 50,     // initial split in %
}) {
  const [filter, setFilter] = useState("Clarity");
  const [split, setSplit] = useState(startSplit); // 0..100
  const [autoPlay, setAutoPlay] = useState(false);
  const boxRef = useRef(null);
  const ctrls = useAnimation();

  // autoplay ping-pong
  useEffect(() => {
    let isActive = true;
    const loop = async () => {
      while (isActive) {
        await ctrls.start({ x: "100%", transition: { duration: 2.2, ease: [0.22,1,0.36,1] } });
        await ctrls.start({ x: "0%",   transition: { duration: 2.2, ease: [0.22,1,0.36,1] } });
      }
    };
    if (autoPlay) loop();
    else ctrls.stop();
    return () => { isActive = false; };
  }, [autoPlay, ctrls]);

  // keep framer handle in sync with split when user drags range
  useEffect(() => {
    if (!autoPlay) ctrls.set({ x: `${split}%` });
  }, [split, autoPlay, ctrls]);

  // drag within the image box
  const onDrag = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(0, (("touches" in e ? e.touches[0].clientX : e.clientX) - rect.left)), rect.width);
    const pct = (x / rect.width) * 100;
    setSplit(pct);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center gap-4 p-6">
      <h2 className="text-xl md:text-2xl font-semibold">Before ↔ After (Dynamic Slider)</h2>

      {/* Image box */}
      <div
        ref={boxRef}
        className="relative w-[92vw] max-w-5xl overflow-hidden rounded-xl shadow-2xl select-none"
        style={{ paddingTop: `${aspect * 100}%` }} // maintain aspect ratio
        onMouseDown={(e) => onDrag(e)}
        onMouseMove={(e) => e.buttons === 1 && onDrag(e)}
        onTouchStart={(e) => onDrag(e)}
        onTouchMove={(e) => onDrag(e)}
      >
        {/* Base (original) */}
        <img
          src={src}
          alt="Original"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        {/* Revealed (filtered) layer */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ width: `${split}%` }}
        >
          <img
            src={src}
            alt="Filtered"
            className="w-full h-full object-cover"
            style={{ filter: PRESETS[filter] }}
            draggable={false}
          />
        </div>

        {/* Drag handle (animated if autoplay) */}
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-white/80 mix-blend-difference"
          animate={autoPlay ? ctrls : { x: `${split}%` }}
          initial={{ x: `${split}%` }}
          transition={{ duration: 0 }}
        />
        {/* Big hit area to grab handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-8 -ml-4 cursor-col-resize"
          animate={autoPlay ? ctrls : { x: `${split}%` }}
          initial={{ x: `${split}%` }}
          transition={{ duration: 0 }}
          onMouseDown={(e) => e.preventDefault()} // prevent image drag
        >
          <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2
                          rounded-full bg-white/80 text-black text-xs px-2 py-1">
            drag
          </div>
        </motion.div>
      </div>

      {/* Range slider (mirrors the drag) */}
      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(split)}
        onChange={(e) => setSplit(parseInt(e.target.value, 10))}
        className="w-[92vw] max-w-5xl accent-cyan-400"
      />

      {/* Filter buttons */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Object.keys(PRESETS).map((name) => (
          <button
            key={name}
            onClick={() => setFilter(name)}
            className={`px-4 py-2 rounded-lg transition text-sm md:text-base
              ${filter === name ? "bg-cyan-500 text-black" : "bg-zinc-800 hover:bg-zinc-700"}`}
          >
            {name}
          </button>
        ))}
        <button
          onClick={() => setAutoPlay((v) => !v)}
          className={`px-4 py-2 rounded-lg transition text-sm md:text-base
            ${autoPlay ? "bg-amber-400 text-black" : "bg-zinc-800 hover:bg-zinc-700"}`}
        >
          {autoPlay ? "Stop Auto" : "Auto"}
        </button>
        <button
          onClick={() => { setSplit(startSplit); setAutoPlay(false); }}
          className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm md:text-base"
        >
          Reset
        </button>
      </div>

      <p className="text-zinc-400 text-xs">
        Tip: change the filter then drag the handle or use Auto to demo the effect.
      </p>
    </div>
  );
}
