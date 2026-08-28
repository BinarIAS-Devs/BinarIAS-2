import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { METRICS, VALUES } from "../../data/content";

export default function About() {
  return (
    <section id="nosotros" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quiénes somos"
          title="Ingeniería de software rigurosa, de principio a fin"
          description="Somos un equipo de ingenieros especializados en construir sistemas empresariales confiables, seguros y preparados para crecer junto a tu negocio."
        />

        {/* Métricas de confianza */}
        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-slate-200 bg-slate-200 shadow-sm lg:grid-cols-4">
          {METRICS.map(({ value, label }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col items-center gap-1.5 bg-white px-6 py-10 text-center"
            >
              <span className="font-display text-3xl font-bold text-accent-600 sm:text-4xl">
                {value}
              </span>
              <span className="text-sm text-slate-500">{label}</span>
            </motion.div>
          ))}
        </div>

        {/* Pilares: seguridad, agilidad, equipo, rigor */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, description }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="flex gap-5 rounded-xl border border-transparent p-5 transition-colors hover:border-slate-200 hover:bg-slate-50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent-500/10 text-accent-600">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-navy-900">
                  {title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
