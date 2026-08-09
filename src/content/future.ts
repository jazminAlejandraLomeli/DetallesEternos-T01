// Datos de "razones para amarte" y la lista de deseos (SectionFourComponent).
// Cambia aquí los textos para reutilizar la plantilla con otra pareja — no
// toques el componente. "completed" en bucketList es solo el valor inicial;
// el usuario puede marcar/desmarcar en la página.
export interface Reason {
  id: number;
  title: string;
  detail: string;
}

export interface BucketItem {
  id: number;
  text: string;
  completed: boolean;
}

export interface FutureContent {
  eyebrow: string;
  title: string;
  reasonsTabLabel: string;
  bucketTabLabel: string;
  bucketListLabel: string;
  reasons: Reason[];
  bucketList: BucketItem[];
}

export const futureContent: FutureContent = {
  eyebrow: "Nuestro Presente & Lo Que Viene",
  title: "Razones & Próximas Metas",
  reasonsTabLabel: "Por qué te elijo cada día",
  bucketTabLabel: "Nuestra Lista de Deseos",
  bucketListLabel: "Sueños y planes por cumplir",
  reasons: [
    {
      id: 1,
      title: "Tu sentido del humor",
      detail:
        "Incluso en los días más pesados o estresantes, siempre encuentras la manera de sacarme una sonrisa genuina.",
    },
    {
      id: 2,
      title: "Tu empatía y escucha",
      detail:
        "La forma en que prestas atención a cada pequeño detalle y me haces sentir que mis emociones siempre importan.",
    },
    {
      id: 3,
      title: "Tu pasión por crecer",
      detail:
        "Admiro cómo trabajas por tus metas y la disciplina con la que persigues lo que sueñas; me motivas a dar lo mejor de mí.",
    },
    {
      id: 4,
      title: "La paz que transmites",
      detail:
        "No importa el caos afuera, estar contigo se siente como llegar al hogar más tranquilo y seguro del mundo.",
    },
    {
      id: 5,
      title: "Ser mi mejor equipo",
      detail:
        "Me encanta cómo celebramos juntos los triunfos de ambos y nos apoyamos sin dudar cuando algo no sale como esperábamos.",
    },
  ],
  bucketList: [
    {
      id: 1,
      text: "Hacer nuestro primer viaje en carretera sin rumbo fijo",
      completed: true,
    },
    {
      id: 2,
      text: "Ir a ver a nuestra banda favorita en vivo",
      completed: true,
    },
    {
      id: 3,
      text: "Acampar bajo las estrellas y prender una fogata",
      completed: true,
    },
    {
      id: 4,
      text: "Aprender a preparar pasta casera desde cero",
      completed: false,
    },
    {
      id: 5,
      text: "Volar juntos en un globo aerostático al amanecer",
      completed: false,
    },
    {
      id: 6,
      text: "Tomar un curso de cerámica o pintura en pareja",
      completed: false,
    },
    {
      id: 7,
      text: "Conocer el mar en una playa tranquila fuera de temporada",
      completed: false,
    },
    {
      id: 8,
      text: "Armar un álbum físico con todas nuestras fotos instantáneas",
      completed: false,
    },
  ],
};