import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Lock, BadgeCheck, Terminal } from "lucide-react";
import Button from "../ui/Button";

const BADGES = [
  { icon: ShieldCheck, label: "Seguridad certificada" },
  { icon: Lock, label: "Datos cifrados" },
  { icon: BadgeCheck, label: "Metodologías ágiles" },
];

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-surface-alt pt-36 pb-36 sm:pt-44 sm:pb-48"
    >
      {/* Imagen de fondo + overlay. Corte limpio y plano contra el
          bg-surface-alt de la sección siguiente: nada de fade/mask en el
          borde, para evitar el banding gris que genera cualquier
          degradado de alpha sobre un fondo tan claro. */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-bg.webp')" }}
        />
        {/* Overlay navy para asegurar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/70 to-navy-950/90" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-300 backdrop-blur-sm"
        >
          <Terminal className="h-3.5 w-3.5" />
          Desarrollo Independiente de Alto Rendimiento
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          Transformamos ideas complejas en{" "}
          <span className="text-gradient-accent">software robusto</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-xl"
        >
          Somos un equipo de desarrolladores independientes. Creamos software
          a medida, dominamos múltiples lenguajes y potenciamos el talento a
          través de la educación tecnológica.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Button as="a" href="#contacto" variant="primary" size="lg">
            Hablemos de tu proyecto
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button as="a" href="#servicios" variant="outlineLight" size="lg">
            Ver servicios
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-white/15 pt-10"
        >
          {BADGES.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm text-slate-300">
              <Icon className="h-4 w-4 text-accent-400" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
