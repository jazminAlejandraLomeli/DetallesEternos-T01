import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Check, ChevronDown } from "lucide-react";
import { scrollToSection } from "../lib/scrollToSection";
import { futureContent } from "../content/future";

interface SectionFourComponentProps {
  id: string;
  nextId?: string;
}

const {
  eyebrow,
  title,
  reasonsTabLabel,
  bucketTabLabel,
  bucketListLabel,
  reasons,
  bucketList: initialBucketList,
} = futureContent;

// Mismo criterio que en la sección 3: la entrada se anima una sola vez para que
// el scroll no vuelva a disparar animaciones cada vez que la sección reaparece.
const revealViewport = { once: true, amount: 0.2 } as const;

const SectionFourComponent = ({ id, nextId }: SectionFourComponentProps) => {
  const [activeTab, setActiveTab] = useState<"reasons" | "bucket">("reasons");
  const [openedReason, setOpenedReason] = useState<number | null>(null);
  const [bucketList, setBucketList] = useState(initialBucketList);

  const toggleBucketItem = (id: number) => {
    setBucketList((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const tabClass = (isActive: boolean) =>
    `flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-[11px] font-semibold leading-tight transition-all cursor-pointer sm:px-5 sm:text-xs md:text-sm ${
      isActive
        ? "bg-coral text-ivory shadow-md shadow-coral/20"
        : "text-deep hover:text-ink"
    }`;

  return (
    <section
      id={id}
      className="relative flex min-h-dvh w-full snap-start flex-col items-center justify-between gap-6 overflow-hidden bg-mist px-6 py-12"
    >
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-deep">
          {eyebrow}
        </span>
        <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
      </motion.div>

      {/* Pestañas de Navegación (Tabs). En móvil son un grid de 2 columnas: las
          etiquetas son largas y en flex se desbordaban en pantallas chicas. */}
      <div className="grid w-full max-w-sm shrink-0 grid-cols-2 gap-1 rounded-2xl border border-ink/5 bg-ivory/60 p-1.5 shadow-xs backdrop-blur-md sm:w-auto sm:max-w-none">
        <button
          type="button"
          onClick={() => setActiveTab("reasons")}
          className={tabClass(activeTab === "reasons")}
        >
          <Heart className="h-4 w-4 shrink-0 fill-current" />
          <span>{reasonsTabLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("bucket")}
          className={tabClass(activeTab === "bucket")}
        >
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>{bucketTabLabel}</span>
        </button>
      </div>

      {/* Contenido Principal */}
      {/* min-h evita que el bloque colapse (y la flecha salte) al cambiar de tab */}
      <div className="flex min-h-[320px] w-full max-w-2xl items-center justify-center">
        <AnimatePresence mode="wait">
          {/* TAB 1: RAZONES (Sobres Interactivos) */}
          {activeTab === "reasons" && (
            <motion.div
              key="reasons-tab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="grid w-full grid-cols-1 gap-4 md:grid-cols-2"
            >
              {reasons.map((item) => {
                const isOpen = openedReason === item.id;

                return (
                  <motion.div
                    key={item.id}
                    layout="position"
                    onClick={() => setOpenedReason(isOpen ? null : item.id)}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl border border-ink/5 bg-ivory p-5 shadow-md transition-shadow hover:shadow-lg"
                  >
                    {/* Cinta adhesiva decorativa */}
                    <div className="absolute -top-3 left-1/2 h-5 w-12 -translate-x-1/2 -rotate-2 rounded-xs bg-gold/60" />

                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-mono text-xs text-deep/70">
                        #0{item.id}
                      </span>
                      <Heart
                        className={`h-4 w-4 transition-colors ${isOpen ? "fill-coral text-coral" : "text-ink/20 group-hover:text-coral"}`}
                      />
                    </div>

                    <h3 className="mb-1 text-base font-bold text-ink">
                      {item.title}
                    </h3>

                    {/* Solo el detalle se anima (AnimatePresence para que el cierre
                        también se vea). El hint se muestra sin animación: con
                        mode="wait" el intercambio depende de que termine la salida
                        del otro elemento, y eso se puede quedar a medias. */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden text-xs leading-relaxed text-deep"
                        >
                          <span className="mt-2 block border-t border-ink/5 pt-2">
                            {item.detail}
                          </span>
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {!isOpen && (
                      <p className="mt-1 text-[11px] italic text-deep/60">
                        Toca para descubrir...
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* TAB 2: BUCKET LIST (Lista interactiva de metas) */}
          {activeTab === "bucket" && (
            <motion.div
              key="bucket-tab"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full rounded-3xl border border-ink/5 bg-ivory/90 p-6 shadow-xl backdrop-blur-md md:p-8"
            >
              <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 rotate-1 rounded-xs bg-gold/70" />

              <p className="mb-6 text-center font-mono text-xs uppercase tracking-widest text-deep">
                {bucketListLabel}
              </p>

              <div className="space-y-3">
                {bucketList.map((item) => (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleBucketItem(item.id)}
                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3.5 transition-all ${
                      item.completed
                        ? "border-coral/30 bg-coral/10 text-ink"
                        : "border-transparent bg-ink/5 text-deep hover:bg-ink/10"
                    }`}
                  >
                    <div
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all ${
                        item.completed
                          ? "bg-coral text-ivory"
                          : "border-2 border-deep/40"
                      }`}
                    >
                      {item.completed && (
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      )}
                    </div>

                    <span
                      className={`min-w-0 text-xs font-medium leading-snug md:text-sm ${
                        item.completed
                          ? "text-deep/60 line-through"
                          : "text-ink"
                      }`}
                    >
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Flecha hacia abajo opcional */}
      {nextId && (
        <motion.button
          onClick={() => scrollToSection(nextId)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="shrink-0 cursor-pointer p-2"
          aria-label="Ir a la siguiente sección"
        >
          <ChevronDown className="h-10 w-10 text-gold" />
        </motion.button>
      )}
    </section>
  );
};

export default SectionFourComponent;
