import { memo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, ChevronDown } from "lucide-react";
import { scrollToSection } from "../lib/scrollToSection";
import { timelineContent } from "../content/timeline";

interface SectionThreeComponentProps {
  id: string;
  nextId?: string;
}

const { eyebrow, title, startDate, counterLabel, counterFooter, events } =
  timelineContent;

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Config de entrada compartida. `once: true` es clave: sin él cada animación se
 * reinicia cada vez que el elemento entra y sale del viewport, y en una sección
 * tan larga eso es justo lo que hacía sentir el scroll con tirones.
 */
const revealViewport = { once: true, amount: 0.2 } as const;

/**
 * El contador vive en su propio componente memoizado. Antes su estado estaba en
 * SectionThreeComponent, así que el tick de cada segundo re-renderizaba también
 * los 10 eventos animados de la línea del tiempo — otra causa del scroll trabado.
 */
const CounterCard = memo(function CounterCard() {
  const [timePassed, setTimePassed] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Lógica del contador en tiempo real
  useEffect(() => {
    const start = new Date(startDate).getTime();

    const updateCounter = () => {
      const difference = Date.now() - start;
      if (difference <= 0) return;

      setTimePassed({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "Días", value: timePassed.days },
    { label: "Horas", value: timePassed.hours },
    { label: "Minutos", value: timePassed.minutes },
    { label: "Segundos", value: timePassed.seconds },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={revealViewport}
      transition={{ duration: 0.6 }}
      className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-ink/5 bg-ivory/80 p-5 text-center shadow-xl backdrop-blur-lg sm:p-6 md:p-8"
    >
      {/* Cinta decorativa tipo polaroid */}
      <div className="absolute -top-3 left-1/2 h-6 w-16 -translate-x-1/2 -rotate-1 rounded-md bg-gold/80" />

      <p className="mb-5 font-mono text-xs uppercase tracking-widest text-deep md:mb-6">
        {counterLabel}
      </p>

      <div className="grid w-full grid-cols-4 gap-1.5 sm:gap-2 md:gap-4">
        {units.map((unit) => (
          <div key={unit.label} className="flex min-w-0 flex-col items-center">
            <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl border border-ink/5 bg-ink/5 px-1 py-3 sm:py-4">
              <motion.span
                key={unit.value}
                initial={{ y: -15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="font-mono text-xl font-extrabold tabular-nums text-ink sm:text-2xl md:text-4xl"
              >
                {String(unit.value).padStart(2, "0")}
              </motion.span>
            </div>
            <span className="mt-2 text-[11px] font-medium text-deep">
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs font-medium text-coral md:mt-8">
        <Heart className="h-4 w-4 animate-pulse fill-coral" />
        <span>{counterFooter}</span>
      </div>
    </motion.div>
  );
});

const SectionThreeComponent = ({ id, nextId }: SectionThreeComponentProps) => {
  const [activeEvent, setActiveEvent] = useState(0);

  return (
    <section
      id={id}
      className="gradient relative flex min-h-dvh w-full snap-start flex-col items-center justify-between gap-8 overflow-hidden px-6 py-12"
    >
      {/* Encabezado */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={revealViewport}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
          {eyebrow}
        </span>
        <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-ivory md:text-5xl">
          {title}
        </h2>
      </motion.div>

      {/* items-start: la columna de la línea del tiempo es mucho más alta que el
          contador, y con items-center el contador quedaba flotando a media altura */}
      <div className="grid w-full max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2">
        {/* COLUMNA IZQUIERDA: CONTADOR EN TIEMPO REAL */}
        <CounterCard />

        {/* COLUMNA DERECHA: LÍNEA DEL TIEMPO INTERACTIVA */}
        <div className="relative">
          {/* Riel base. El nodo mide 28px (h-7 w-7) y el riel 2px, así que
              left-[13px] cae exactamente en el centro de los corazones. */}
          <div
            aria-hidden
            className="absolute inset-y-1 left-[13px] w-0.5 rounded-full bg-coral/30"
          />

          {/* Riel que se dibuja al entrar en pantalla. Usa scaleY en vez de
              animar height: es una transformación, no recalcula layout. */}
          <motion.div
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={revealViewport}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-y-1 left-[13px] w-0.5 origin-top rounded-full bg-coral"
          />

          <ul className="space-y-6 md:space-y-8">
            {events.map((event, index) => {
              const isActive = activeEvent === index;

              return (
                <motion.li
                  key={event.id}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={revealViewport}
                  // El delay se corta en los primeros elementos: con 10 eventos,
                  // index * 0.15 dejaba al último esperando más de un segundo.
                  transition={{
                    duration: 0.4,
                    delay: Math.min(index, 4) * 0.08,
                  }}
                  onClick={() => setActiveEvent(index)}
                  className="group grid cursor-pointer grid-cols-[1.75rem_minmax(0,1fr)] items-start gap-3 md:gap-4"
                >
                  {/* Nodo de Corazón sobre la línea */}
                  <button
                    type="button"
                    aria-label={`Seleccionar evento ${event.title}`}
                    aria-pressed={isActive}
                    className={`mt-2.5 grid h-7 w-7 cursor-pointer place-items-center rounded-full transition-all duration-300 ${
                      isActive
                        ? "scale-110 bg-coral text-ivory shadow-lg shadow-coral/30"
                        : "border border-coral/40 bg-ivory text-coral group-hover:scale-110"
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${isActive ? "fill-ivory" : "fill-coral"}`}
                    />
                  </button>

                  {/* Tarjeta de Contenido */}
                  <div
                    className={`min-w-0 rounded-2xl p-4 transition-colors duration-300 ${
                      isActive
                        ? "border border-ink/5 bg-ivory shadow-md"
                        : "bg-transparent hover:bg-ivory/40"
                    }`}
                  >
                    {/* Inactiva la tarjeta es transparente sobre el degradado
                        oscuro, así que el texto va en claro para que se lea */}
                    <div className="flex items-center gap-2">
                      <span className="text-base">{event.icon}</span>
                      <span
                        className={`font-mono text-xs font-semibold ${isActive ? "text-deep" : "text-ivory/70"}`}
                      >
                        {event.date}
                      </span>
                    </div>

                    <h3
                      className={`mt-0.5 text-base font-bold md:text-lg ${isActive ? "text-ink" : "text-ivory"}`}
                    >
                      {event.title}
                    </h3>

                    {/* AnimatePresence para que el cierre también se anime: antes
                        el `exit` nunca corría y la descripción se cortaba de golpe. */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden text-xs leading-relaxed text-deep/90 md:text-sm"
                        >
                          <span className="mt-2 block">{event.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Botón Scroll hacia abajo */}
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

export default SectionThreeComponent;
