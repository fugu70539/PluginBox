"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

// Данные разработчиков (пока пустой массив)
const developers: any[] = [];

// Универсальный компонент для загрузки Lottie по пути
const SafeLottie = ({ path, className, style }: { path: string, className?: string, style?: any }) => {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(path)
      .then(res => res.json())
      .then(data => setAnimationData(data))
      .catch(err => console.error("Lottie load error:", err));
  }, [path]);

  if (!animationData) return <div className={className} />;

  return (
    <Lottie 
      animationData={animationData} 
      loop={true} 
      className={className}
      style={style} 
    />
  );
};

const LeaderBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full min-h-[110px] py-5 mt-glass overflow-hidden rounded-[30px] flex items-center border-white/[0.08] shrink-0"
      style={{ backgroundImage: "linear-gradient(135deg, #7549F2 0%, #3D1E99 100%)" }}
    >
      <div className="pl-6 flex shrink-0 items-center justify-center">
        <div className="size-16 opacity-90 pointer-events-none mix-blend-screen">
          <SafeLottie 
            path="/Pics/LeaderBoard.json" 
            style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)' }}
          />
        </div>
      </div>

      <div className="flex flex-col pl-5 pr-8 justify-center gap-y-1">
        <h3 className="text-[17px] font-bold text-white tracking-tight leading-tight">
          Соревнуйтесь
        </h3>
        <p className="text-[12px] font-medium text-white/80 leading-[1.4] tracking-tight">
          С другими девелоперами в создании плагинов! Чем выше ваш рейтинг, тем выше вы в этом списке
        </p>
      </div>
    </motion.div>
  );
};

const EmptyLeaderboard = () => {
    return (
        <div className="flex-1 w-full flex flex-col items-center justify-center text-center pb-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative mb-4"
            >
                <div className="size-28 opacity-20 pointer-events-none mix-blend-screen">
                    <SafeLottie 
                        path="/Icons/None.json" 
                        style={{ width: '100%', height: '100%', filter: 'brightness(0) invert(1)' }}
                    />
                </div>
            </motion.div>
            
            <div className="flex flex-col px-10 gap-y-1">
                <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-[17px] font-bold text-white/30 tracking-tight"
                >
                    Список пока пуст
                </motion.h3>
                
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[14px] font-medium text-white/10 max-w-[240px]"
                >
                    Будьте первым, кто создаст плагин и займет вершину рейтинга!
                </motion.p>
            </div>
        </div>
    );
}

export default function Developers() {
  return (
    <div className="w-full min-h-screen bg-[#0a0a0a] overflow-x-hidden text-white flex flex-col px-6 pt-4 pb-10 font-display">
      <LeaderBanner />
      <main className="flex-1 w-full flex flex-col pt-6 relative">
        {developers.length > 0 ? (
          <div className="flex flex-col gap-4">
            {developers.map((dev, index) => (
                <div key={index} className="w-full h-16 bg-white/5 rounded-2xl flex items-center px-4">
                    <span className="text-white/40 font-bold mr-4">#{index + 1}</span>
                    <span className="text-white">{dev.name}</span>
                </div>
            ))}
          </div>
        ) : (
          <EmptyLeaderboard />
        )}
      </main>
    </div>
  );
}
