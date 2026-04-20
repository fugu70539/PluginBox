"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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

const SettingRow = ({ icon, title, value, onClick, hasArrow = true, children }: any) => (
  <div 
    onClick={onClick} 
    className="w-full h-[56px] flex items-center justify-between px-5 active:bg-white/5 transition-colors cursor-pointer"
  >
    <div className="flex items-center gap-3">
      {/* Используем Icons и расширение WEBP строго в верхнем регистре */}
      <img 
        src={`/Icons/${icon}`} 
        alt="" 
        className="size-6 object-contain opacity-70"
      />
      <span className="text-[17px] font-semibold tracking-tight text-white/90">{title}</span>
    </div>
    <div className="flex items-center gap-2">
      {value && <span className="text-[17px] font-medium text-white/30">{value}</span>}
      {children}
      {hasArrow && <img src="/Icons/ArrowRight.PNG" className="size-4 opacity-20 invert" alt="" />}
    </div>
  </div>
);

export default function Settings({ onBack }: { onBack: () => void }) {
  const [badge, setBadge] = useState("Юзер");
  const [isAnimOn, setIsAnimOn] = useState(true);

  useEffect(() => {
    const tg = (window as any).Telegram?.WebApp;
    if (tg?.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(onBack);
      return () => {
        tg.BackButton.offClick(onBack);
        tg.BackButton.hide();
      };
    }
  }, [onBack]);

  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] pt-16 px-7 font-display pb-10 select-none">
      <div className="space-y-8">
        
        {/* Секция Аккаунт */}
        <section>
          <h3 className="text-[13px] font-semibold text-white/30 ml-0 mb-2.5">Аккаунт</h3>
          <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5">
            <SettingRow icon="Badge.WEBP" title="Бейдж" value={badge} />
            <SettingRow icon="Language.WEBP" title="Язык" value="Русский" />
          </div>
        </section>

        {/* Секция Оформление */}
        <section>
          <h3 className="text-[13px] font-semibold text-white/30 ml-0 mb-2.5">Оформление</h3>
          <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5">
            <SettingRow icon="AccentColor.WEBP" title="Акцент" value="Ч/Б" />
            <SettingRow icon="Animations.WEBP" title="Анимации" hasArrow={false}>
              <AppleSwitch isOn={isAnimOn} onToggle={() => setIsAnimOn(!isAnimOn)} />
            </SettingRow>
          </div>
        </section>

        {/* Секция Система */}
        <section>
          <h3 className="text-[13px] font-semibold text-white/30 ml-0 mb-2.5">Система</h3>
          <div className="mt-glass rounded-[28px] overflow-hidden divide-y divide-white/5">
            <SettingRow icon="Tech.WEBP" title="Поддержка" value="Перейти" />
          </div>
        </section>

        {/* Футер */}
        <footer className="w-full pt-6 flex flex-col items-center gap-0.5 opacity-20">
          <span className="text-[13px] font-bold tracking-tight">PluginBox v1.0.4</span>
          <span className="text-[11px] font-medium tracking-tight">by @temkazavr</span>
        </footer>

      </div>
    </div>
  );
}
