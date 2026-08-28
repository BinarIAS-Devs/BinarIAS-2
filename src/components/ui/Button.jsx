import { motion } from "framer-motion";

const VARIANTS = {
  primary:
    "bg-accent-500 text-navy-950 hover:bg-accent-600 shadow-sm hover:shadow-md border border-transparent",
  outline:
    "bg-transparent text-navy-800 border border-slate-300 hover:border-navy-800 hover:bg-slate-50",
  outlineLight:
    "bg-white/10 text-white border border-white/30 backdrop-blur-sm hover:border-white hover:bg-white/20",
  ghost:
    "bg-transparent text-slate-600 hover:text-accent-600 border border-transparent",
};

/**
 * Botón reutilizable con micro-interacción hover/tap sutil.
 * as="a" para enlaces ancla, as="button" (default) para acciones/formularios.
 */
export default function Button({
  as = "button",
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const Component = motion[as] ?? motion.button;

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <Component
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-semibold tracking-tight transition-all duration-200 cursor-pointer ${VARIANTS[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
