// Las fotos se IMPORTAN (no se escriben como ruta de texto). Al importarlas,
// Vite las procesa, les pone un hash y arma la URL con el "base" correcto, así
// funcionan igual en local y en el servidor (esté en la raíz o en /a-a/).
// Una ruta de texto tipo "/images/foo.webp" solo funciona si el archivo está en
// public/, y se rompe al publicar en un subdirectorio.
// Para agregar una foto: pon el archivo en src/assets/images, impórtalo aquí
// arriba y úsalo en la lista de abajo.

// import img01 from "../assets/images/img01.webp";
const img01 =
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80";
const img1 =
  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&auto=format&fit=crop&q=80";
const img2 =
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80";
const img3 =
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80";
const img4 =
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80";
const img5 =
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80";
const img7 =
  "https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?w=800&auto=format&fit=crop&q=80";
const img8 =
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800&auto=format&fit=crop&q=80";

// Datos del carrusel de fotos (SectionTwoComponent). Cambia aquí las fotos,
// títulos y fechas para reutilizar la plantilla con otra pareja — no toques
// el componente. "rotate" es el ángulo (en grados) con el que se inclina la
// polaroid.
export interface MemoryPhoto {
  id: number;
  title: string;
  date: string;
  image: string;
  rotate: number;
}

export interface MemoriesContent {
  eyebrow: string;
  title: string;
  photos: MemoryPhoto[];
}

export const memoriesContent: MemoriesContent = {
  eyebrow: "Cada instante a tu lado es una historia inolvidable",
  title: "Nuestra Galería de Recuerdos",
  photos: [
    {
      id: 1,
      title: "Nuestra primera salida a cenar ✨",
      date: "20.10.2024",
      image: img01,
      rotate: -3,
    },
    {
      id: 2,
      title: "Caminata bajo la lluvia",
      date: "14.11.2024",
      image: img8,
      rotate: 4,
    },
    {
      id: 3,
      title: "Fin de semana en la cabaña ☕",
      date: "05.01.2025",
      image: img2,
      rotate: -2,
    },
    {
      id: 4,
      title: "Picnic en el mirador",
      date: "22.03.2025",
      image: img1,
      rotate: 2,
    },
    {
      id: 5,
      title: "Atardecer en la playa 🌅",
      date: "18.06.2025",
      image: img5,
      rotate: -4,
    },
    {
      id: 6,
      title: "Concierto bajo las estrellas 🎶",
      date: "12.09.2025",
      image: img3,
      rotate: 3,
    },
    {
      id: 7,
      title: "Tarde de café y libros en el centro",
      date: "02.12.2025",
      image: img4,
      rotate: -1,
    },
    {
      id: 8,
      title: "Recibiendo el año nuevo juntos 🥂",
      date: "01.01.2026",
      image: img7,
      rotate: 4,
    },
  ],
};