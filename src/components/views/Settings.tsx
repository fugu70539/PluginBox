"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BadgeWindow } from "./Settings/Windows";
import { SettingsBanner } from "@/components/ui/banners/SettingsBanner";

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
  <div className="flex flex-col w-full overflow-hidden">
    <div 
      onClick={onClick} 
      className="w-full h-[54px] flex items-center justify-between px-4 active:bg-white/5 transition-colors cursor-pointer z-10"
    >
      <div className="flex items-center gap-3">
        <div className="size-10 flex items-center justify-center">
          <img src={`/Icons/${icon}`} alt="" className="size-full object-cover" style={{ borderRadius: '18px' }} />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-white/90">{title}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-[15px] font-medium text-white/30">{value}</span>}
        {children}
        {hasArrow && (
          <motion.img 
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            src="/Icons/ArrowRight.PNG" 
            className="size-4 opacity-20 invert" 
            alt="" 
          />
        )}
      </div>
    </div>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: "auto", 
            opacity: 1,
            transition: {
              height: { type: "spring", stiffness: 450, damping: 40 },
              opacity: { duration: 0.1 }
            }
          }}
          exit={{ 
            height: 0, 
            opacity: 0,
            transition: {
              height: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
              opacity: { duration: 0.1 }
            }
          }}
          className="overflow-hidden"
        >
          <div className="px-2 pb-3 flex flex-col gap-1 border-t border-white/[0.03] pt-2 mx-2">
            {options.map((opt: string) => (
              <button
                key={opt}
                onClick={() => onSelect(opt)}
                className="relative w-full h-10 px-4 flex items-center rounded-[16px] transition-all active:scale-[0.98]"
              >
                {value === opt && (
                  <motion.div 
                    layoutId={`bg-${title}`}
                    className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-[16px]"
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
  const [isVibrationOn, setIsVibrationOn] = useState(true);

  const toggleDropdown = (name: string) => setOpenDropdown(openDropdown === name ? null : name);
  
  const openSupport = () => window.open("https://t.me/PluginBoxRequest_bot", "_blank");

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      const handleClick = () => currentWindow === 'main' ? onBack() : setCurrentWindow('main');
      tg.BackButton.onClick(handleClick);
      return () => tg.BackButton.offClick(handleClick);
    }
  }, [onBack, currentWindow]);

  const handleVibrationToggle = () => {
    const nextState = !isVibrationOn;
    setIsVibrationOn(nextState);
    
    const tg = (window as any).Telegram?.WebApp;
    if (nextState && tg?.HapticFeedback) {
      tg.HapticFeedback.impactOccurred("light");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] font-display select-none overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentWindow === 'main' ? (
          <motion.div 
            key="main" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="pt-4 px-6 pb-10"
          >
            <div className="space-y-6">
              <section>
                <h3 className="text-[13px] font-semibold text-white/30 ml-1 mb-2">Аккаунт</h3>
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

              <SettingsBanner />

              <section>
                <h3 className="text-[13px] font-semibold text-white/30 ml-1 mb-2">Оформление</h3>
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
                  <SettingRow icon="Vibration.WEBP" title="Вибрация" hasArrow={false}>
                    <AppleSwitch isOn={isVibrationOn} onToggle={handleVibrationToggle} />
                  </SettingRow>
                </div>
              </section>

              <section>
                <h3 className="text-[13px] font-semibold text-white/30 ml-1 mb-2">Система</h3>
                <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5 border border-white/5">
                  <SettingRow icon="Tech.WEBP" title="Поддержка" value="Перейти" onClick={openSupport} />
                </div>
              </section>

              <footer className="w-full pt-4 flex flex-col items-center gap-0.5 opacity-20">
                <span className="text-[13px] font-bold tracking-tight">PluginBox v1.0.4</span>
                <span className="text-[11px] font-medium tracking-tight">by @temkazavr</span>
              </footer>
            </div>
          </motion.div>
        ) : (
          <BadgeWindow key="badge" currentBadge={badge} onSave={(val) => { setBadge(val); setCurrentWindow('main'); }} />
        )}
      </AnimatePresence>
    </div>
  );
}
