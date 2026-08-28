import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Binary } from "lucide-react";
import Button from "../ui/Button";
import { NAV_LINKS } from "../../data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Umbral bajo: el navbar se "solidifica" apenas el usuario empieza a
    // scrollear, dejando de fundirse con la imagen oscura del Hero.
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-surface/80 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <a href="#inicio" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-900 text-accent-400 transition-colors group-hover:bg-navy-800">
            <Binary className="h-5 w-5" strokeWidth={2.25} />
          </span>
          <span
            className={`font-display text-lg font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-navy-900" : "text-white"
            }`}
          >
            Binar
            <span className={scrolled ? "text-accent-600" : "text-accent-400"}>
              IAS
            </span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled
                  ? "text-slate-600 hover:text-accent-600"
                  : "text-white/90 hover:text-accent-300"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button as="a" href="#contacto" variant="primary" size="sm">
            Solicitar Presupuesto
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className={`lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-300 ${
            scrolled ? "border-slate-300 text-navy-800" : "border-white/30 text-white"
          }`}
          aria-label="Abrir menú de navegación"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-surface/95 backdrop-blur-md"
          >
            <div className="flex flex-col gap-1 px-6 py-5">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavClick}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-accent-600"
                >
                  {link.label}
                </a>
              ))}
              <Button
                as="a"
                href="#contacto"
                variant="primary"
                size="sm"
                onClick={handleNavClick}
                className="mt-3 w-full"
              >
                Solicitar Presupuesto
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
