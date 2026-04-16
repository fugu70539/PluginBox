import { motion } from "framer-motion";
import { Send } from "lucide-react"; // Будем использовать минималистичные иконки

export const SearchInput = () => (
  <motion.div 
    whileTap={{ scale: 0.98 }}
    className="w-full black-mirror-search rounded-full h-16 flex items-center justify-between px-6 mb-12"
  >
    <span className="text-white/40 text-lg font-medium tracking-tight">Спросить что-нибудь...</span>
    
    <button className="h-11 w-11 bg-white rounded-full flex items-center justify-center active:scale-95 transition-all">
       <img src="/Icons/arrow-up.svg" alt="Send" className="w-6 h-6" />
    </button>
  </motion.div>
);
