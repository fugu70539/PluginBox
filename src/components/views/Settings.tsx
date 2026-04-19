"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SearchInput } from "@/components/ui/SearchInput";

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

const SettingRow = ({ icon, title, value, onClick, hasArrow = true, children }: any) => (
  <div 
    onClick={onClick} 
    className="w-full h-[56px] flex items-center justify-between px-5 active:bg-white/5 transition-colors group cursor-pointer"
  >
    <div className="flex items-center gap-3">
      <div className="size-7 flex items-center justify-center">
        <img src={`/Icons/${icon}`} alt="" className="size-full object-contain opacity-80" />
      </div>
      <span className="text-[17px] font-semibold tracking-tight text-white/90">{title}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-[17px] font-medium text-white/30">{value}</span>}
      {children}
      {hasArrow && <img src="/Icons/ArrowRight.PNG" className="size-4 opacity-20 invert grayscale" alt="" />}
    </div>
  </div>
);

export default function Settings({ onBack }: { onBack: () => void }) {
  const [view, setView] = useState<"list" | "badge">("list");
  const [badge, setBadge] = useState("Юзер");
  const [isAnimOn, setIsAnimOn] = useState(true);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      const handleBack = () => (view === "badge" ? setView("list") : onBack());
      tg.BackButton.onClick(handleBack);
      return () => tg.BackButton.offClick(handleBack);
    }
  }, [view, onBack]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] font-display">
      <AnimatePresence mode="wait">
        {view === "list" ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="px-7 pt-12 pb-10 flex flex-col items-center"
          >
            <header className="w-full flex flex-col items-center text-center mb-8 gap-y-1">
              <h1 className="text-[30px] font-bold tracking-tight">Настройки</h1>
              <h2 className="text-[30px] font-bold tracking-tight text-white/25">PluginBox</h2>
            </header>

            <SearchInput />

            <div className="w-full mt-10 space-y-8">
              <section>
                <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.15em] ml-4 mb-3">Аккаунт</h3>
                <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5">
                  <SettingRow icon="Badge.PNG" title="Бейдж" value={badge} onClick={() => setView("badge")} />
                  <SettingRow icon="Language.PNG" title="Язык" value="Русский" />
                </div>
              </section>

              <section>
                <h3 className="text-[11px] font-black text-white/20 uppercase tracking-[0.15em] ml-4 mb-3">Система</h3>
                <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5">
                  <SettingRow icon="Animations.PNG" title="Анимации" hasArrow={false}>
                    <AppleSwitch isOn={isAnimOn} onToggle={() => setIsAnimOn(!isAnimOn)} />
                  </SettingRow>
                  <SettingRow icon="Tech.PNG" title="Поддержка" value="Перейти" />
                </div>
              </section>
            </div>

            <footer className="mt-12 flex flex-col items-center opacity-20">
              <span className="text-[13px] font-bold tracking-widest uppercase">PluginBox v1.0.4</span>
              <span className="text-[11px] font-medium">by @temkazavr</span>
            </footer>
          </motion.div>
        ) : (
          <motion.div 
            key="badge"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            <BadgeEditor current={badge} onSave={(val) => { setBadge(val); setView("list"); }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BadgeEditor({ current, onSave }: { current: string; onSave: (v: string) => void }) {
  const [val, setVal] = useState(current);
  const roles = ["Девелопер", "Дизайнер", "Кодер", "Тестер", "Админ"];

  return (
    <div className="w-full pt-20 px-7 flex flex-col items-center gap-8">
      <div className="text-center">
        <h2 className="text-[26px] font-bold">Изменить бейдж</h2>
        <p className="text-white/30 text-[15px] mt-1">Выберите роль или введите свою</p>
      </div>

      <div className="w-full mt-glass rounded-[28px] p-2 flex flex-col gap-1">
        {roles.map(role => (
          <button 
            key={role}
            onClick={() => setVal(role)}
            className={`w-full h-[52px] rounded-[22px] flex items-center px-5 transition-all ${val === role ? "bg-white text-black" : "text-white/50 active:bg-white/5"}`}
          >
            <span className="text-[17px] font-bold">{role}</span>
          </button>
        ))}
      </div>

      <div className="w-full flex flex-col gap-3">
        <input 
          value={val} 
          onChange={(e) => setVal(e.target.value.slice(0, 12))}
          className="w-full h-14 mt-glass rounded-2xl px-6 outline-none text-[17px] font-semibold text-white border border-white/5 focus:border-white/20 transition-all"
          placeholder="Свой вариант..."
        />
        <button 
          onClick={() => onSave(val)}
          className="w-full h-14 bg-white rounded-full text-black font-bold text-[17px] active:scale-[0.97] transition-all"
        >
          Готово
        </button>
      </div>
    </div>
  );
}
