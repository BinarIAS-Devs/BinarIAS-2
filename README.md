# BinarIAS — Landing Page

Landing page corporativa para **BinarIAS**, empresa de desarrollo de software
(CRM, ERP, E-commerce, Landing Pages y Software a Medida). Construida con
foco en profesionalismo, seguridad y captación de leads B2B.

## Stack

- **React 19** + **Vite 6**
- **Tailwind CSS v4** (tokens de tema en [src/index.css](src/index.css))
- **Lucide Icons** para iconografía de UI
- **Framer Motion** para micro-interacciones y animaciones on-scroll

> Nota de stack: se optó por Lucide Icons + Framer Motion en lugar de
> Mantine UI para evitar que el sistema de estilos propio de Mantine
> compita con Tailwind, manteniendo control total del diseño sobrio
> solicitado.

## Estructura

```
src/
├── components/
│   ├── layout/        Navbar, Footer
│   ├── sections/       Hero, Services, About, Portfolio, QuoteForm
│   └── ui/              Button, SectionHeading (componentes reutilizables)
├── data/
│   └── content.js      Contenido de servicios, métricas, proyectos, etc.
├── App.jsx
├── main.jsx
└── index.css            Tokens de tema (paleta, tipografía) + Tailwind
```

## Paleta de colores

| Uso        | Token            | Valor     |
|------------|------------------|-----------|
| Base       | `navy-950/900`   | `#0F172A` |
| Secundario | `navy-800/700`   | `#1E293B` |
| Texto sec. | `slate-600`      | `#475569` |
| Acento     | `accent-500`     | `#10B981` |

## Comandos

```bash
npm install       # instalar dependencias
npm run dev        # entorno de desarrollo (http://localhost:5173)
npm run build       # build de producción → dist/
npm run preview      # previsualizar el build
```

## Formulario de presupuesto

El formulario en [src/components/sections/QuoteForm.jsx](src/components/sections/QuoteForm.jsx)
valida y simula el envío en el cliente. Para producción, conectar el
`handleSubmit` a tu backend, servicio de email (Resend, SendGrid) o un
endpoint propio — el punto de integración está marcado con un comentario
en el código.
# BinasrIAS-2
# BinarIAS-2
