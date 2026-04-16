import { motion } from "framer-motion";

export const GlassCard = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div 
    whileTap={{ scale: 0.97 }}
    className={`glass-effect bg-ios-card border border-ios-border rounded-ios p-6 ${className}`}
  >
    {children}
  </motion.div>
);
