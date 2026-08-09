import SectionFourComponent from "./components/SectionFourComponent";
import SectionOneComponent from "./components/SectionOneComponent";
import SectionThreeComponent from "./components/SectionThreeComponent";
import SectionTwoComponent from "./components/SectionTwoComponent";

export default function App() {
  return (
    /* snap-proximity (y no snap-mandatory): las secciones 3 y 4 son más altas que
       el viewport, y con "mandatory" el navegador obliga a descansar siempre en el
       inicio de una sección, así que al bajar dentro de ellas el scroll se jalaba
       de vuelta. Con "proximity" solo engancha cuando ya estás cerca del borde. */
    <div className="h-dvh w-full overflow-y-scroll overscroll-y-none snap-y snap-proximity scroll-smooth">
      <SectionOneComponent id="hero" nextId="memorias" />
      <SectionTwoComponent id="memorias" nextId="despedida" />
      <SectionThreeComponent id="despedida" nextId="final" />
      <SectionFourComponent id="final" />
    </div>
  );
}
