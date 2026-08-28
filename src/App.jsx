import { lazy, Suspense } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import Services from "./components/sections/Services";
import useLenis from "./hooks/useLenis";

// Secciones bajo el pliegue: se cargan en un chunk aparte para no sumar
// peso al bundle inicial (que solo necesita Navbar/Hero/Services para el
// primer render). A medida que la landing crezca, esto evita que cada
// sección nueva retrase el arranque de las de arriba.
const About = lazy(() => import("./components/sections/About"));
const Portfolio = lazy(() => import("./components/sections/Portfolio"));
const QuoteForm = lazy(() => import("./components/sections/QuoteForm"));

function App() {
  useLenis();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Suspense fallback={null}>
          <About />
          <Portfolio />
          <QuoteForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
