"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeWindow } from "./Settings/Windows";

const AppleSwitch = ({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) => (
  <button 
    onClick={onToggle} 
    className={`relative w-[66px] h-[32px] rounded-[16px] transition-colors duration-300 flex items-center px-[3.5px] ${isOn ? "bg-[#34C759]" : "bg-[#39393d]"}`}
  >
    <motion.div 
      animate={{ x: isOn ? 18.5 : 0 }} 
      transition={{ type: "spring", stiffness: 500, damping: 35 }} 
      className="h-[25px] w-[40.5px] bg-white rounded-[12px] shadow-sm"
    />
  </button>
);

const SettingRow = ({ icon, title, value, onClick, hasArrow = true, children, isOpen, options, onSelect }: any) => (
  <div className="flex flex-col w-full overflow-hidden transition-all">
    <div 
      onClick={onClick} 
      className="w-full h-[54px] flex items-center justify-between px-4 active:bg-white/5 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div className="size-10 flex items-center justify-center">
          <img src={`/Icons/${icon}`} alt="" className="size-full object-cover rounded-[18px]" style={{ borderRadius: '18px' }} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-white/90">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-[15px] font-medium text-white/30">{value}</span>}
        {children}
        {hasArrow && (
          <motion.img 
            animate={{ rotate: isOpen ? 90 : 0 }}
            src="/Icons/ArrowRight.PNG" 
            className="size-4 opacity-20 invert" 
            alt="" 
          />
        )}
      </div>
    </div>

    {/* Выпадающий список */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
          className="bg-white/[0.03] px-2 pb-2"
        >
          <div className="flex flex-col gap-1 pt-1">
            {options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                className="relative w-full h-11 px-4 flex items-center rounded-[18px] transition-all active:scale-[0.98]"
              >
                {value === opt && (
                  <motion.div 
                    layoutId={`bg-${title}`}
                    className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[18px]"
                  />
                )}
                <span className={`relative z-10 text-[14px] font-bold ${value === opt ? "text-white" : "text-white/20"}`}>
                  {opt}
                </span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

export default function Settings({ onBack }: { onBack: () => void }) {
  const [currentWindow, setCurrentWindow] = useState<'main' | 'badge'>('main');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const [badge, setBadge] = useState("Юзер");
  const [accent, setAccent] = useState("Ч/Б");
  const [lang, setLang] = useState("Русский");
  const [isAnimOn, setIsAnimOn] = useState(true);

  const toggleDropdown = (name: string) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      const handleClick = () => currentWindow === 'main' ? onBack() : setCurrentWindow('main');
      tg.BackButton.onClick(handleClick);
      return () => tg.BackButton.offClick(handleClick);
    }
  }, [onBack, currentWindow]);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] font-display select-none overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentWindow === 'main' ? (
          <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-16 px-6 pb-10">
            <div className="space-y-8">
              
              <section>
                <h3 className="text-[13px] font-semibold text-white/30 ml-1 mb-2.5">Аккаунт</h3>
                <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5 border border-white/5">
                  <SettingRow icon="Badge.WEBP" title="Бейдж" value={badge} onClick={() => setCurrentWindow('badge')} />
                  <SettingRow 
                    icon="Language .WEBP" title="Язык" value={lang} 
                    isOpen={openDropdown === 'lang'}
                    onClick={() => toggleDropdown('lang')}
                    options={["Русский", "Английский"]}
                    onSelect={(val: string) => { setLang(val); setOpenDropdown(null); }}
                  />
                </div>
              </section>

              <section>
                <h3 className="text-[13px] font-semibold text-white/30 ml-1 mb-2.5">Оформление</h3>
                <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5 border border-white/5">
                  <SettingRow 
                    icon="AccentColor.WEBP" title="Акцент" value={accent} 
                    isOpen={openDropdown === 'accent'}
                    onClick={() => toggleDropdown('accent')}
                    options={["Ч/Б", "Система"]}
                    onSelect={(val: string) => { setAccent(val); setOpenDropdown(null); }}
                  />
                  <SettingRow icon="Animations.WEBP" title="Анимации" hasArrow={false}>
                    <AppleSwitch isOn={isAnimOn} onToggle={() => setIsAnimOn(!isAnimOn)} />
                  </SettingRow>
                </div>
              </section>

              <section>
                <h3 className="text-[13px] font-semibold text-white/30 ml-1 mb-2.5">Система</h3>
                <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5 border border-white/5">
                  <SettingRow icon="Tech.WEBP" title="Поддержка" value="Перейти" />
                </div>
              </section>

            </div>
          </motion.div>
        ) : (
          <BadgeWindow key="badge" currentBadge={badge} onSave={(val) => { setBadge(val); setCurrentWindow('main'); }} />
        )}
      </AnimatePresence>
    </div>
  );
}
