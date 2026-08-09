import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { scrollToSection } from "../lib/scrollToSection";
import { heroContent } from "../content/hero";

interface SectionOneComponentProps {
  id: string;
  nextId?: string;
}

const SectionOneComponent = ({ id, nextId }: SectionOneComponentProps) => {
  const { nameOne, nameTwo, symbol, subtitle } = heroContent;

  return (
    <section
      id={id}
      className="h-dvh w-full snap-start flex flex-col items-center justify-center text-center relative gradient p-4
    rounded-bl-2xl rounded-tr-2xl"
    >
      <AnimatePresence>
        <div className="flex flex-col items-center gap-8 w-full pt-14">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex items-start w-full "
          >
            <p className="text-7xl md:text-7xl font-bold tracking-tight text-ivory">
              {nameOne}
            </p>
          </motion.div>

          <p className="text-7xl md:text-7xl font-bold tracking-tight text-gold ">
            {symbol}
          </p>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className=" flex items-center justify-end w-full "
          >
            <p className="text-6xl md:text-7xl font-extrabold tracking-tight text-ivory">
              {nameTwo}
            </p>
          </motion.div>
        </div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="max-w-3xl mt-10 flex flex-col items-center"
      >
        <span className="text-xs uppercase tracking-[0.2em] text- font-semibold">
          {subtitle}
        </span>

        {nextId && (
          <motion.button
            onClick={() => scrollToSection(nextId)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="cursor-pointer p-2"
            aria-label="Ir a la siguiente sección"
          >
            <ChevronDown className="w-10 h-10 text-gold" />
          </motion.button>
        )}
      </motion.div>
    </section>
  );
};

export default SectionOneComponent;
