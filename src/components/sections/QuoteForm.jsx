import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  Building2,
  User,
  MessageSquare,
  CheckCircle2,
  Send,
  Clock,
  ShieldCheck,
} from "lucide-react";
import Button from "../ui/Button";
import SectionHeading from "../ui/SectionHeading";
import { SERVICE_OPTIONS } from "../../data/content";

const INITIAL_FORM = {
  name: "",
  company: "",
  email: "",
  phone: "",
  services: [],
  message: "",
  // Honeypot anti-spam: invisible para personas, los bots suelen completarlo.
  // Si llega con contenido, el backend descarta el envío en silencio.
  website: "",
};

// Nombre: solo letras (con acentos/ñ), espacios, apóstrofes y guiones
// (para nombres compuestos tipo "Ana María" o "Jean-Paul").
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
// Teléfono: dígitos y los símbolos habituales de formato.
const PHONE_REGEX = /^[0-9+\-\s()]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Caracteres sin motivo para aparecer en texto libre (empresa, mensaje).
// Esto es una barrera de UX/ruido en el cliente, NO la protección real
// contra SQL injection: esa se hace en el backend con queries
// parametrizadas / ORM cuando se conecte la API real (ver handleSubmit).
const UNSAFE_CHARS_REGEX = /[<>;`"\\]|--/;

export default function QuoteForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [serverError, setServerError] = useState("");

  const toggleService = (service) => {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((item) => item !== service)
        : [...prev.services, service],
    }));
  };

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  // Filtra caracteres al vuelo: el usuario directamente no puede tipear
  // (ni pegar) algo que no matchee `allowedRegex`, en vez de enterarse
  // recién al validar el envío.
  const handleFilteredChange = (field, allowedRegex) => (event) => {
    const filtered = event.target.value
      .split("")
      .filter((char) => allowedRegex.test(char))
      .join("");
    setForm((prev) => ({ ...prev, [field]: filtered }));
  };

  const handleNameChange = handleFilteredChange("name", /[A-Za-zÀ-ÖØ-öø-ÿ\s'-]/);
  const handlePhoneChange = handleFilteredChange("phone", /[0-9+\-\s()]/);

  const validate = () => {
    const nextErrors = {};

    const name = form.name.trim();
    if (!name) {
      nextErrors.name = "Ingresá tu nombre completo.";
    } else if (name.length < 3) {
      nextErrors.name = "El nombre es demasiado corto.";
    } else if (!NAME_REGEX.test(name)) {
      nextErrors.name = "El nombre solo puede contener letras y espacios.";
    }

    const company = form.company.trim();
    if (company && (company.length > 100 || UNSAFE_CHARS_REGEX.test(company))) {
      nextErrors.company = "Revisá el nombre de la empresa: contiene caracteres no permitidos.";
    }

    const email = form.email.trim();
    if (!email) {
      nextErrors.email = "Ingresá un correo de contacto.";
    } else if (email.length > 254 || !EMAIL_REGEX.test(email)) {
      nextErrors.email = "Ingresá un correo válido.";
    }

    const phone = form.phone.trim();
    if (phone && !PHONE_REGEX.test(phone)) {
      nextErrors.phone =
        "Ingresá un teléfono válido (solo números, espacios, +, - y paréntesis).";
    }

    if (form.services.length === 0)
      nextErrors.services = "Seleccioná al menos un servicio de interés.";

    const message = form.message.trim();
    if (!message) {
      nextErrors.message = "Contanos brevemente qué necesitás.";
    } else if (message.length < 10) {
      nextErrors.message = "Contanos un poco más sobre tu proyecto.";
    } else if (message.length > 1000) {
      nextErrors.message = "El mensaje es demasiado largo (máx. 1000 caracteres).";
    } else if (UNSAFE_CHARS_REGEX.test(message)) {
      nextErrors.message = "El mensaje contiene caracteres no permitidos.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setServerError("");
    // La validación de arriba es de formato/UX. El backend (server/index.js)
    // vuelve a validar todo antes de enviar el correo por SMTP de Gmail —
    // nunca confiar en el frontend como única barrera.
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "No se pudo enviar la solicitud.");
      }

      setStatus("success");
      setForm(INITIAL_FORM);
    } catch (error) {
      setStatus("error");
      setServerError(
        error instanceof Error
          ? error.message
          : "No se pudo enviar la solicitud. Intentá nuevamente."
      );
    }
  };

  return (
    <section id="contacto" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          eyebrow="Contacto"
          title="Solicitá tu presupuesto sin compromiso"
          description="Contanos sobre tu proyecto y nuestro equipo te responderá con una propuesta técnica y comercial detallada."
        />

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-5">
          {/* Panel de confianza */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="rounded-2xl border border-slate-200 bg-surface-alt p-7">
              <h3 className="font-display text-lg font-semibold text-navy-900">
                Qué esperar al contactarnos
              </h3>
              <ul className="mt-5 flex flex-col gap-4">
                {[
                  {
                    icon: Clock,
                    text: "Respuesta en menos de 24 horas hábiles.",
                  },
                  {
                    icon: ShieldCheck,
                    text: "Confidencialidad total sobre tu información y proyecto.",
                  },
                  {
                    icon: CheckCircle2,
                    text: "Propuesta técnica clara, con alcance y tiempos estimados.",
                  },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" />
                    <span className="text-sm leading-relaxed text-slate-600">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          {
            /* 
            <div className="rounded-2xl border border-slate-200 bg-surface-alt p-7">
                <h3 className="font-display text-lg font-semibold text-navy-900">
                  Contacto directo
                </h3>
                <div className="mt-5 flex flex-col gap-4 text-sm text-slate-600">
                  <a
                    href="mailto:contacto@binarias.com"
                    className="flex items-center gap-3 transition-colors hover:text-accent-600"
                  >
                    <Mail className="h-4 w-4 text-accent-600" />
                    contacto@binarias.com
                  </a>
                  <a
                    href="tel:+5400000000"
                    className="flex items-center gap-3 transition-colors hover:text-accent-600"
                  >
                    <Phone className="h-4 w-4 text-accent-600" />
                    +54 (000) 000-0000
                  </a>
                </div>
              </div>
            
            */
          }
            
      </div>
          {/* Formulario */}
          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onSubmit={handleSubmit}
            noValidate
            className="lg:col-span-3 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-10 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-500/10 text-accent-600">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy-900">
                  ¡Solicitud enviada con éxito!
                </h3>
                <p className="max-w-sm text-sm text-slate-600">
                  Gracias por contactar a BinarIAS. Un especialista revisará tu
                  solicitud y se pondrá en contacto a la brevedad.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus("idle")}
                >
                  Enviar otra solicitud
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                {/* Honeypot anti-spam: oculto para personas (fuera de pantalla,
                    sin tabindex), pero visible para bots que autocompletan
                    cualquier input que encuentran. Ver handleSubmit/backend. */}
                <div
                  aria-hidden="true"
                  className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden"
                >
                  <label htmlFor="website">No completar este campo</label>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={handleChange("website")}
                  />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <Field
                    label="Nombre completo"
                    icon={User}
                    error={errors.name}
                  >
                    <input
                      type="text"
                      value={form.name}
                      onChange={handleNameChange}
                      placeholder="Juan Pérez"
                      maxLength={80}
                      className={inputClasses(errors.name)}
                    />
                  </Field>

                  <Field
                    label="Empresa (opcional)"
                    icon={Building2}
                    error={errors.company}
                  >
                    <input
                      type="text"
                      value={form.company}
                      onChange={handleChange("company")}
                      placeholder="Nombre de tu empresa"
                      maxLength={100}
                      className={inputClasses(errors.company)}
                    />
                  </Field>

                  <Field
                    label="Correo electrónico"
                    icon={Mail}
                    error={errors.email}
                  >
                    <input
                      type="email"
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="tu@empresa.com"
                      maxLength={254}
                      className={inputClasses(errors.email)}
                    />
                  </Field>

                  <Field
                    label="Teléfono (opcional)"
                    icon={Phone}
                    error={errors.phone}
                  >
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      placeholder="+54 000 000 0000"
                      maxLength={20}
                      className={inputClasses(errors.phone)}
                    />
                  </Field>
                </div>

                <div>
                  <span className="mb-2.5 block text-sm font-medium text-navy-800">
                    Servicios de interés
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {SERVICE_OPTIONS.map((service) => {
                      const active = form.services.includes(service);
                      return (
                        <button
                          type="button"
                          key={service}
                          onClick={() => toggleService(service)}
                          aria-pressed={active}
                          className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                            active
                              ? "border-accent-500 bg-accent-500/10 text-accent-700"
                              : "border-slate-300 bg-white text-slate-500 hover:border-slate-400 hover:text-slate-700"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <p className="mt-2 text-xs text-red-600">{errors.services}</p>
                  )}
                </div>

                <Field
                  label="Contanos sobre tu proyecto"
                  icon={MessageSquare}
                  error={errors.message}
                >
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="Describí brevemente tu proyecto, objetivos y plazos estimados..."
                    maxLength={1000}
                    className={`${inputClasses(errors.message)} resize-none`}
                  />
                </Field>

                {status === "error" && (
                  <p className="rounded-lg bg-red-50 px-3.5 py-2.5 text-sm text-red-600">
                    {serverError || "No se pudo enviar la solicitud. Intentá nuevamente."}
                  </p>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={status === "submitting"}
                  className="w-full disabled:opacity-70"
                >
                  {status === "submitting" ? "Enviando..." : "Enviar solicitud"}
                  {status !== "submitting" && <Send className="h-4 w-4" />}
                </Button>

                <p className="text-center text-xs text-slate-500">
                  Al enviar este formulario aceptás que BinarIAS se comunique
                  con vos respecto a tu solicitud.
                </p>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function inputClasses(error) {
  return `w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-navy-900 placeholder:text-slate-400 outline-none transition-colors duration-200 focus:border-navy-800 focus:ring-2 focus:ring-navy-900/10 ${
    error ? "border-red-400" : "border-slate-300"
  }`;
}

function Field({ label, icon: Icon, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-center gap-2 text-sm font-medium text-navy-800">
        <Icon className="h-4 w-4 text-accent-600" />
        {label}
      </span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}
