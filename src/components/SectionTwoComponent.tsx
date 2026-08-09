import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { scrollToSection } from "../lib/scrollToSection";
import { memoriesContent } from "../content/memories";

interface SectionTwoComponentProps {
  id: string;
  nextId?: string;
}

const { eyebrow, title, photos } = memoriesContent;

const SectionTwoComponent = ({ id, nextId }: SectionTwoComponentProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));

  const peek = (offset: number) =>
    photos[(currentIndex + offset + photos.length) % photos.length];

  return (
    <section
      id={id}
      className="h-dvh w-full snap-start flex flex-col items-center justify-center p-4 md:p-6 relative bg-mist pt-8"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-6"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-deep font-semibold">
          {eyebrow}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight mt-0">
          {title}
        </h2>
      </motion.div>

      <div className="flex items-center gap-4 md:gap-8">
        <button
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center transition-colors cursor-pointer shrink-0"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="relative w-64 h-85 md:w-72 md:h-96">
          {/* Fotos asomando detrás, dan la sensación de una pila de polaroids */}
          <div
            className="absolute inset-0 bg-white shadow-md p-3 pb-10"
            style={{ transform: `rotate(${peek(1).rotate - 6}deg) translateY(6px)` }}
          >
            <div className="w-full h-full bg-ink/10" />
          </div>
          <div
            className="absolute inset-0 bg-white shadow-md p-3 pb-10"
            style={{ transform: `rotate(${peek(-1).rotate + 4}deg) translateY(3px)` }}
          >
            <div className="w-full h-full bg-ink/10" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={photos[currentIndex].id}
              initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: photos[currentIndex].rotate }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 bg-white shadow-xl p-3 pb-12"
            >
              <div className="relative w-full h-full overflow-hidden bg-ink/5">
                <img
                  src={photos[currentIndex].image}
                  alt={photos[currentIndex].title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* cinta adhesiva */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-gold/70 rotate-2 rounded-xs" />

              <div className="absolute bottom-2 left-3 right-2 text-center ">
                <p className="text-[13px] italic text-ink font-medium truncate">
                  {photos[currentIndex].title}
                </p>
                <p className="text-[10px] text-deep font-mono mt-0.5">
                  {photos[currentIndex].date}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-ink/5 hover:bg-ink/10 text-ink flex items-center justify-center transition-colors cursor-pointer shrink-0"
          aria-label="Foto siguiente"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex gap-2 mt-6">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir a la foto ${index + 1}`}
            className={`transition-all cursor-pointer rounded-full ${
              currentIndex === index ? "w-6 h-2 bg-coral" : "w-2 h-2 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>

      {nextId && (
        <motion.button
          onClick={() => scrollToSection(nextId)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="cursor-pointer p-2 mt-1"
          aria-label="Ir a la siguiente sección"
        >
          <ChevronDown className="w-10 h-10 text-gold" />
        </motion.button>
      )}
    </section>
  );
};

export default SectionTwoComponent;
