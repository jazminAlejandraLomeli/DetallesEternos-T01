// Datos de la línea del tiempo y el contador (SectionThreeComponent). Cambia
// aquí las fechas, textos e íconos para reutilizar la plantilla con otra
// pareja — no toques el componente. "startDate" alimenta el contador en
// tiempo real, formato "YYYY-MM-DDTHH:mm:ss".
export interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimelineContent {
  eyebrow: string;
  title: string;
  startDate: string;
  counterLabel: string;
  counterFooter: string;
  events: TimelineEvent[];
}

export const timelineContent: TimelineContent = {
  eyebrow: "El camino que hemos recorrido juntos",
  title: "Nuestra Línea del Tiempo",
  startDate: "2025-02-14T00:00:00",
  counterLabel: "Compartiendo la vida desde hace",
  counterFooter: "...y lo mejor aún está por venir ✨",
  events: [
    {
      id: 1,
      date: "12 Oct 2024",
      title: "Coincidencia en la cafetería",
      description:
        "Buscando mesa libre en hora pico terminamos compartiendo café, charla y risas inesperadas.",
      icon: "☕",
    },
    {
      id: 2,
      date: "28 Nov 2024",
      title: "Noche de música en vivo",
      description:
        "Nuestro primer concierto juntos; descubrimos que compartíamos exactamente la misma playlist favorita.",
      icon: "🎸",
    },
    {
      id: 3,
      date: "31 Dic 2024",
      title: "El primer brindis de fin de año",
      description:
        "A medianoche, entre las uvas y la cuenta regresiva, supimos que queríamos empezar el año juntos.",
      icon: "🥂",
    },
    {
      id: 4,
      date: "14 Feb 2025",
      title: "Hicimos oficial lo nuestro",
      description:
        "En una caminata bajo el atardecer decidimos comenzar formalmente este gran viaje en pareja.",
      icon: "💍",
    },
    {
      id: 5,
      date: "23 May 2025",
      title: "Nuestra primera escapada a la playa",
      description:
        "Manejamos varias horas sin prisa, vimos el amanecer sobre el mar y olvidamos el protector solar.",
      icon: "🌊",
    },
    {
      id: 6,
      date: "18 Ago 2025",
      title: "Adoptamos a nuestro compañero de cuatro patas",
      description:
        "Llegó a nuestras vidas para llenar la casa de juguetes, travesuras y todavía más amor.",
      icon: "🐾",
    },
    {
      id: 7,
      date: "10 Nov 2025",
      title: "Cena desastrosa pero inolvidable",
      description:
        "Intentamos preparar una receta italiana gourmet desde cero; terminamos pidiendo pizza y riendo sin parar.",
      icon: "🍕",
    },
    {
      id: 8,
      date: "15 Feb 2026",
      title: "Celebrando nuestro primer aniversario",
      description:
        "Un fin de semana lejos de la ciudad para recordar cada momento aprendido durante todo un año juntos.",
      icon: "🏕️",
    },
    {
      id: 9,
      date: "20 May 2026",
      title: "El nuevo proyecto juntos",
      description:
        "Dimos ese paso que tanto planeábamos y decoramos nuestro primer espacio en común.",
      icon: "🔑",
    },
    {
      id: 10,
      date: "Hoy",
      title: "El presente perfecto",
      description: "Seguimos sumando días, anécdotas y sueños por cumplir.",
      icon: "💫",
    },
  ],
};