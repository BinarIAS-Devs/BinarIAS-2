import { Binary } from "lucide-react";
import { NAV_LINKS } from "../../data/content";

// lucide-react no incluye iconos de marca; se definen como SVG propios y livianos.
const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3.5a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92ZM20.44 20h-3.37v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H9.68V8.5h3.24v1.57h.05c.45-.85 1.55-1.75 3.2-1.75 3.42 0 4.05 2.25 4.05 5.18V20Z" />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.51-3.5-.7-3.72-1.34-.13-.33-.68-1.34-1.16-1.62-.4-.22-.97-.75-.01-.77.9-.01 1.55.85 1.76 1.2 1.03 1.76 2.68 1.26 3.34.96.1-.76.4-1.26.72-1.55-2.5-.29-5.12-1.28-5.12-5.68 0-1.25.44-2.28 1.16-3.08-.12-.29-.5-1.47.11-3.06 0 0 .95-.31 3.12 1.18a10.6 10.6 0 0 1 5.68 0c2.16-1.49 3.11-1.18 3.11-1.18.62 1.6.23 2.77.11 3.06.72.8 1.16 1.82 1.16 3.08 0 4.41-2.63 5.39-5.14 5.67.41.36.76 1.06.76 2.15 0 1.55-.01 2.8-.01 3.19 0 .27.18.6.69.49A10.21 10.21 0 0 0 22 12.2C22 6.58 17.52 2 12 2Z"
    />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13.6 10.44 20.2 3h-1.57l-5.72 6.46L8.34 3H3l6.93 9.97L3 21h1.57l6.04-6.82L15.66 21H21l-7.4-10.56Zm-2.14 2.42-.7-1-5.57-7.97h2.4l4.5 6.43.7 1 5.85 8.36h-2.4l-4.78-6.82Z" />
  </svg>
);

const SOCIALS = [
  { icon: LinkedInIcon, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
  { icon: XIcon, href: "https://twitter.com", label: "Twitter / X" },
];

const LEGAL_LINKS = [
  { label: "Política de Privacidad", href: "#" },
  { label: "Términos de Servicio", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy-800 bg-navy-950">
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-xs">
            <a href="#inicio" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 border border-accent-500/30 text-accent-400">
                <Binary className="h-5 w-5" strokeWidth={2.25} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-slate-50">
                Binar<span className="text-accent-400">IAS</span>
              </span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-slate-500">
              Desarrollo de software empresarial con arquitectura robusta,
              segura y escalable para negocios que buscan crecer.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            <div>
              <h4 className="text-sm font-semibold text-slate-200">
                Navegación
              </h4>
              <ul className="mt-4 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-accent-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-slate-200">Legal</h4>
              <ul className="mt-4 flex flex-col gap-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-500 transition-colors hover:text-accent-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 border-t border-navy-800 pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} BinarIAS. Todos los derechos
            reservados.
          </p>

          <div className="flex items-center gap-4">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-navy-700 text-slate-400 transition-colors hover:border-accent-500/50 hover:text-accent-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
