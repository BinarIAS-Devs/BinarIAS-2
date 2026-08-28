import {
  LayoutDashboard,
  ShoppingCart,
  MonitorSmartphone,
  Boxes,
  BrainCircuit,
  LifeBuoy,
  ShieldCheck,
  GitBranch,
  Users,
  Award,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export const SERVICES = [
  {
    icon: LayoutDashboard,
    title: "CRM & ERP",
    description:
      "Plataformas de gestión empresarial a medida que centralizan clientes, operaciones, inventario y finanzas en un solo sistema.",
    tags: ["Gestión", "Automatización", "Escalable"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description:
      "Tiendas online robustas y seguras, con pasarelas de pago, gestión de catálogo y arquitectura preparada para alto tráfico.",
    tags: ["Pagos seguros", "SEO", "Alto rendimiento"],
  },
  {
    icon: MonitorSmartphone,
    title: "Landing Pages",
    description:
      "Páginas de aterrizaje de conversión optimizada, diseñadas para captar leads cualificados y fortalecer tu marca.",
    tags: ["Conversión", "Responsivo", "Analítica"],
  },
  {
    icon: Boxes,
    title: "Software a Medida",
    description:
      "Sistemas web, aplicaciones móviles y plataformas escalables construidas desde cero y adaptadas 100% a los procesos de tu empresa.",
    tags: ["Arquitectura propia", "Web y mobile", "Integraciones"],
  },
  {
    icon: BrainCircuit,
    title: "IA en Software",
    description:
      "Integración de modelos de inteligencia artificial, automatización de procesos y potenciación de tus aplicaciones existentes para ganar eficiencia real.",
    tags: ["Automatización", "Modelos IA", "Optimización"],
  },
  {
    icon: LifeBuoy,
    title: "Atención y Soporte Dedicado",
    description:
      "Canales de comunicación directos con los desarrolladores que escriben el código: sin intermediarios, respuestas ágiles y mantenimiento continuo.",
    tags: ["Soporte directo", "Mantenimiento", "SLA ágil"],
  },
];

export const METRICS = [
  { value: "40+", label: "Proyectos entregados" },
  { value: "99.9%", label: "Disponibilidad garantizada" },
  { value: "8+", label: "Años de experiencia" },
  { value: "100%", label: "Código propio y auditado" },
];

export const VALUES = [
  {
    icon: ShieldCheck,
    title: "Seguridad por diseño",
    description:
      "Cada sistema se construye siguiendo estándares de seguridad de la industria: cifrado, control de accesos y auditorías periódicas.",
  },
  {
    icon: GitBranch,
    title: "Metodologías ágiles",
    description:
      "Sprints iterativos con entregas continuas, control de versiones y comunicación transparente en cada etapa del proyecto.",
  },
  {
    icon: Users,
    title: "Equipo senior dedicado",
    description:
      "Ingenieros con experiencia en proyectos empresariales críticos, comprometidos con la calidad y el rendimiento del código.",
  },
  {
    icon: Award,
    title: "Ingeniería rigurosa",
    description:
      "Arquitecturas escalables, testing automatizado y documentación técnica completa en cada solución entregada.",
  },
];

export const PROJECTS = [
  {
    image: "/proyecto-mia.webp",
    title: "MiA · Compañía Inteligente",
    description:
      "Desarrollo de asistente inteligente enfocado en el acompañamiento y cuidado diario de adultos mayores.",
    stack: ["React", "Node.js", "Python"],
  },
  {
    image: "/proyecto-portal.webp",
    title: "Estado · Portal de Gestión Municipal",
    description:
      "Sistema moderno e intuitivo potenciado con IA para agilizar pagos, trámites ciudadanos y atención presencial/virtual.",
    stack: ["React", "Node.js", "AWS"],
  },
  {
    image: "/proyecto-educb.webp",
    title: "EducG · LMS con Supervisión de IA",
    description:
      "Plataforma escalable de aprendizaje interactivo con mentoría automatizada en tiempo real, prácticas de código y certificación.",
    stack: ["Next.js", "Prisma", "PostgreSQL"],
  },
];

export const SERVICE_OPTIONS = [
  "CRM / ERP",
  "E-commerce",
  "Landing Page",
  "Software a Medida",
  "IA en Software",
  "Soporte y Mantenimiento",
  "Otro / No estoy seguro",
];
