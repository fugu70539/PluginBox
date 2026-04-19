"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Вспомогательный компонент: Apple Switch ---
const AppleSwitch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle} 
    className={`relative w-[51px] h-[31px] rounded-full transition-colors duration-300 flex items-center px-[2px] ${isOn ? "bg-[#34C759]" : "bg-[#39393d]"}`}
  >
    <motion.div 
      animate={{ x: isOn ? 20 : 0 }} 
      transition={{ type: "spring", stiffness: 500, damping: 30 }} 
      className="w-[27px] h-[27px] bg-white rounded-full shadow-lg flex items-center justify-center"
    >
      {!isOn && <div className="size-2 rounded-full border-[1.5px] border-black/10" />}
      {isOn && <div className="w-[1.5px] h-3 bg-black/10 rounded-full" />}
    </motion.div>
  </button>
);

// --- Вспомогательный компонент: Плашка (Строка) ---
const SettingRow = ({ icon, title, value, onClick, hasArrow = true, children }: any) => (
  <div 
    onClick={onClick} 
    className="w-full h-[52px] flex items-center justify-between px-4 active:bg-white/5 transition-colors group cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <div className="size-7 flex items-center justify-center">
        <img src={`/Icons/${icon}`} alt="" className="size-full object-contain opacity-80" />
      </div>
      <span className="text-[16px] font-semibold tracking-tight text-white/90">{title}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-[16px] font-medium text-white/30">{value}</span>}
      {children}
      {hasArrow && <img src="/Icons/ArrowRight.PNG" className="size-4 opacity-20 invert grayscale" alt="" />}
    </div>
  </div>
);

export default function Settings({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<"list" | "badge">("list");
  const [badge, setBadge] = useState("Юзер");
  const [lang, setLang] = useState("Русский");
  const [accent, setAccent] = useState("Ч/Б");
  const [isAnimOn, setIsAnimOn] = useState(true);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      // Если мы в списке - кнопка Back закрывает настройки, если в редакторе бейджа - возвращает к списку
      const handleBack = () => {
        if (view === "badge") {
          setView("list");
        } else {
          onBack();
        }
      };
      tg.BackButton.onClick(handleBack);
      tg.setHeaderColor(view === "badge" ? "#000000" : "#0a0a0a");
      
      return () => {
        tg.BackButton.offClick(handleBack);
        tg.BackButton.hide();
      };
    }
  }, [view, onBack]);

  if (view === "badge") {
    return <BadgeEditor current={badge} onSave={(val) => { setBadge(val); setView("list"); }} />;
  }

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] pt-6 px-6 font-display">
      <div className="space-y-8">
        <section>
          <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.15em] ml-4 mb-2">Аккаунт</h3>
          <div className="mt-glass rounded-[24px] overflow-hidden divide-y divide-white/5">
            <SettingRow icon="Badge.PNG" title="Бейдж" value={badge} onClick={() => setView("badge")} />
            <SettingRow icon="Language.PNG" title="Язык" value={lang} />
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.15em] ml-4 mb-2">Оформление</h3>
          <div className="mt-glass rounded-[24px] overflow-hidden divide-y divide-white/5">
            <SettingRow icon="AccentColor.PNG" title="Акцент" value={accent} />
            <SettingRow icon="Animations.PNG" title="Анимации" hasArrow={false}>
              <AppleSwitch isOn={isAnimOn} onToggle={() => setIsAnimOn(!isAnimOn)} />
            </SettingRow>
          </div>
        </section>

        <section>
          <div className="mt-glass rounded-[24px] overflow-hidden">
            <SettingRow icon="Tech.PNG" title="Поддержка" value="Перейти" />
          </div>
        </section>

        <footer className="w-full py-10 flex flex-col items-center gap-1">
          <span className="text-[14px] font-bold text-white/10">PluginBox v 1.0.4</span>
          <span className="text-[12px] font-medium text-white/5">Made by @temkazavr</span>
        </footer>
      </div>
    </div>
  );
}

function BadgeEditor({ current, onSave }: { current: string; onSave: (v: string) => void }) {
  const [val, setVal] = useState(current);
  const roles = ["Девелопер", "Дизайнер", "Кодер", "Тестер", "Админ"];

  return (
    <div className="fixed inset-0 bg-black z-[200] pt-12 px-7 flex flex-col items-center">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <div className="relative w-full h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center px-5 gap-3">
          <input 
            value={val} 
            onChange={(e) => setVal(e.target.value.slice(0, 10))}
            placeholder="Придумайте бейдж..."
            className="flex-1 bg-transparent outline-none text-[17px] font-semibold text-white placeholder:text-white/20"
          />
          <div className="h-6 w-[1px] bg-white/10" />
          <select 
            onChange={(e) => setVal(e.target.value)} 
            className="bg-transparent text-white/40 text-[14px] font-bold outline-none cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Выбрать</option>
            {roles.map(r => <option key={r} value={r} className="text-black">{r}</option>)}
          </select>
        </div>

        <button 
          onClick={() => onSave(val || "Юзер")}
          className="w-full h-14 bg-white rounded-full text-black font-bold text-[17px] active:scale-95 transition-all"
        >
          Сохранить
        </button>
      </div>
    </div>
  );
}
