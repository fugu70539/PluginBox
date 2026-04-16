"use client";
import { motion } from "framer-motion";
import fireData from "@/assets/Fire.json"; // Убедись, что файл лежит тут

export const SearchInput = () => {
  // Генерируем звезды на основе данных из Fire.json
  const stars = [
    { side: 'left', top: -15, left: -40, size: 28, blur: 0, op: 0.3 },
    { side: 'left', top: 10, left: -25, size: 18, blur: 1, op: 0.15 },
    { side: 'left', top: 40, left: -50, size: 14, blur: 2, op: 0.08 },
    { side: 'right', top: -10, right: -35, size: 24, blur: 0.5, op: 0.2 },
    { side: 'right', top: 20, right: -20, size: 16, blur: 1.5, op: 0.1 },
    { side: 'right', top: 45, right: -45, size: 12, blur: 2.5, op: 0.05 },
  ];

  return (
    <div className="w-full flex justify-center relative">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute pointer-events-none z-0"
          style={{
            top: `${s.top}px`,
            [s.side]: `${s.side === 'left' ? s.left : s.right}px`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            opacity: s.op,
            filter: `blur(${s.blur}px)`,
            transform: `rotate(${i * 15}deg)`,
          }}
        >
          {/* Рендерим SVG путь из JSON (предполагаем стандартную структуру d-path) */}
          <svg viewBox="0 0 24 24" fill="white">
            <path d={fireData.path || fireData.layers?.[0]?.path || ""} />
          </svg>
        </div>
      ))}

      <motion.div 
        whileTap={{ scale: 0.99 }}
        className="w-full max-w-[340px] mt-glass rounded-[1.6rem] h-[52px] flex items-center justify-between pl-5 pr-1.5 transition-all relative z-10"
      >
        <input 
          type="text"
          placeholder="Спросить что-нибудь..."
          className="bg-transparent border-none outline-none text-white text-base w-full placeholder:text-white/20 font-medium"
        />
        <button className="h-[38px] px-5 btn-send-white flex items-center justify-center active:scale-90 transition-all shrink-0">
           <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19V5M5 12l7-7 7 7"/>
           </svg>
        </button>
      </motion.div>
    </div>
  );
};
