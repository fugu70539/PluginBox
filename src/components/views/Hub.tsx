import { motion } from "framer-motion";
import { SearchInput } from "../ui/SearchInput";

// Заглушка, пока не подключили SDK
const userName = "Антон"; 

export default function Hub() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }}
      className="min-h-screen space-bg px-8 pt-20"
    >
      <header className="flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-black uppercase tracking-tighter mb-2">
          Привет, {userName}!
        </h1>
        <p className="text-white/30 text-[11px] font-bold uppercase tracking-[0.2em] mb-12">
          Что бы ты хотел найти?
        </p>
      </header>

      <SearchInput />

      {/* Suggested & Grid (пока заглушки, чтобы было как на скетче) */}
      <div className="mt-8">
        <h2 className="text-white/20 text-[10px] font-bold uppercase tracking-widest mb-4 ml-4">Suggested</h2>
        <div className="grid grid-cols-2 gap-4">
           {/* Пример карточки */}
           <div className="glass-ios rounded-[2.2rem] p-6 flex flex-col items-center py-5">
              <div className="w-10 h-10 bg-white/5 rounded-2xl mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Plug anc</span>
           </div >
           <div className="glass-ios rounded-[2.2rem] p-6 flex flex-col items-center py-5">
              <div className="w-10 h-10 bg-white/5 rounded-2xl mb-2" />
              <span className="text-[10px] font-bold uppercase tracking-tighter">Teather</span>
           </div >
        </div>
      </div>

    </motion.div>
  );
}
