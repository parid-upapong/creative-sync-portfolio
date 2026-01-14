import { motion } from 'framer-motion';

/**
 * Example of an AI-responsive component.
 * It uses Tailwind variables which are dynamically updated by the Styling Engine.
 */
export const DynamicHero = ({ title, subtitle }: { title: string, subtitle?: string }) => {
  return (
    <section className="py-24 flex flex-col items-center text-center">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl md:text-8xl font-heading font-bold tracking-tight mb-6"
        style={{ lineHeight: '1.1' }}
      >
        {title}
      </motion.h1>
      
      {subtitle && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-secondary max-w-2xl font-body"
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div 
        className="mt-12 h-px w-24 bg-accent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      />
    </section>
  );
};