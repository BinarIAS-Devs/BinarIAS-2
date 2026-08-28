import { motion } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { SERVICES } from "../../data/content";

export default function Services() {
  return (
    <section id="servicios" className="relative overflow-hidden bg-surface-alt py-24 sm:py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Servicios"
          title="Soluciones de software diseñadas para escalar"
          description="Cubrimos todo el ciclo de vida del producto: desde la primera línea de código hasta la infraestructura que sostiene tu operación diaria."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, title, description, tags }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:border-accent-300 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-500/10 text-accent-600 transition-colors duration-300 group-hover:bg-accent-500/20">
                <Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>

              <h3 className="font-display text-lg font-semibold text-navy-900">
                {title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium text-slate-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
