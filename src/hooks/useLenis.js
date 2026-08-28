import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave con inercia: tanto el scroll manual (rueda del mouse /
 * trackpad) como los saltos a los links de ancla (nav, botones) pasan
 * por esta misma animación de Lenis, así queda un solo movimiento
 * consistente en vez de dos animaciones (nativa + Lenis) compitiendo.
 */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => 1 - Math.pow(1 - t, 3), // ease-out cúbico
      smoothWheel: true,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // La opción `anchors` de Lenis no cancela el salto nativo del
    // navegador: queda un salto instantáneo al destino seguido de la
    // animación de Lenis "corrigiendo" desde 0, que se ve como un tirón
    // en vez de un solo recorrido fluido. Por eso interceptamos el click
    // nosotros mismos y evitamos el comportamiento por defecto.
    const handleAnchorClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target);
    };
    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
