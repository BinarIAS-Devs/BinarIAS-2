import { motion } from "framer-motion";

/**
 * Encabezado de sección estandarizado: eyebrow + título + descripción opcional.
 * Centraliza la jerarquía tipográfica para mantener consistencia entre secciones.
 */
export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}) {
  const alignment =
    align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`flex flex-col gap-4 max-w-2xl ${alignment}`}
    >
      {eyebrow && (
        <span className="inline-flex items-center gap-2 self-center rounded-full border border-accent-500/25 bg-accent-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-700">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  );
}
