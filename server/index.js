import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import nodemailer from "nodemailer";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// El build de Vite (`npm run build`) genera esta carpeta. En producción,
// este mismo proceso Express sirve el frontend además de /api/contact,
// así quedan en el mismo origen (dominio) y no depende de configurar CORS
// entre dos hostings distintos. En desarrollo `dist/` no existe todavía
// (el frontend lo sirve Vite en :5173 con proxy hacia acá) y esto se
// desactiva solo.
const distPath = path.join(__dirname, "..", "dist");
const distExists = fs.existsSync(distPath);

const {
  GMAIL_USER,
  GMAIL_APP_PASSWORD,
  CONTACT_TO_EMAIL,
  FRONTEND_URL = "http://localhost:5173",
  PORT = 4000,
} = process.env;

// Permite una o varias URLs separadas por coma (ej. dev + producción).
const allowedOrigins = FRONTEND_URL.split(",").map((origin) => origin.trim());

if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
  console.error(
    "[server] Faltan GMAIL_USER / GMAIL_APP_PASSWORD en el archivo .env — el envío de correo va a fallar."
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD,
  },
});

// Mismas reglas que en el frontend (src/components/sections/QuoteForm.jsx):
// nunca confiar solo en la validación del cliente.
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]+$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UNSAFE_CHARS_REGEX = /[<>;`"\\]|--/;

function validateContact(body) {
  const errors = {};

  const name = String(body.name ?? "").trim();
  const company = String(body.company ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const services = Array.isArray(body.services)
    ? body.services.filter((s) => typeof s === "string" && s.trim()).map((s) => s.trim())
    : [];
  const message = String(body.message ?? "").trim();

  if (!name || name.length < 3 || name.length > 80 || !NAME_REGEX.test(name)) {
    errors.name = "Nombre inválido.";
  }
  if (company && (company.length > 100 || UNSAFE_CHARS_REGEX.test(company))) {
    errors.company = "Empresa inválida.";
  }
  if (!email || email.length > 254 || !EMAIL_REGEX.test(email)) {
    errors.email = "Email inválido.";
  }
  if (phone && (phone.length > 20 || !PHONE_REGEX.test(phone))) {
    errors.phone = "Teléfono inválido.";
  }
  if (services.length === 0) {
    errors.services = "Seleccioná al menos un servicio.";
  }
  if (!message || message.length < 10 || message.length > 1000 || UNSAFE_CHARS_REGEX.test(message)) {
    errors.message = "Mensaje inválido.";
  }

  return { errors, data: { name, company, email, phone, services, message } };
}

function escapeHtml(str) {
  return str.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
  );
}

const app = express();
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      // Sin header Origin (curl, health checks, server-to-server) → se permite.
      // Con Origin, solo se acepta si está en la lista configurada.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Origen no permitido por CORS"));
      }
    },
  })
);
app.use(express.json({ limit: "10kb" }));

if (distExists) {
  app.use(express.static(distPath));
}

app.post("/api/contact", async (req, res) => {
  // Honeypot anti-spam: "website" es un input invisible para personas
  // (oculto por CSS en el formulario) que los bots sí suelen completar.
  // Si llega con contenido, fingimos éxito y cortamos sin enviar el mail
  // ni delatar el filtro.
  const honeypot = String(req.body?.website ?? "").trim();
  if (honeypot) {
    console.warn("[server] Honeypot activado, envío descartado silenciosamente.");
    return res.json({ ok: true });
  }

  const { errors, data } = validateContact(req.body ?? {});
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ ok: false, errors });
  }

  const empresa = data.company || "Particular";
  const telefono = data.phone || "No especificado";
  const servicios = data.services.join(", ");

  const text = `Nuevo pedido de presupuesto — BinarIAS

Nombre: ${data.name}
Empresa: ${empresa}
Teléfono: ${telefono}
Email: ${data.email}
Servicio(s) de interés: ${servicios}

Mensaje:
${data.message}
`;

  const html = `
  <div style="font-family: Arial, Helvetica, sans-serif; max-width: 600px; margin: 0 auto; color: #1e2a3a;">
    <div style="background:#0f1b2d; padding: 20px 24px; border-radius: 8px 8px 0 0;">
      <h2 style="color:#ffffff; margin:0; font-size:18px;">Nuevo pedido de presupuesto — BinarIAS</h2>
    </div>
    <div style="border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 8px 8px; padding: 24px;">
      <table style="width:100%; border-collapse: collapse; font-size:14px;">
        <tr>
          <td style="padding:8px 0; color:#64748b; width:160px; vertical-align:top;">Nombre</td>
          <td style="padding:8px 0; font-weight:600;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0; color:#64748b; vertical-align:top;">Empresa</td>
          <td style="padding:8px 0;">${escapeHtml(empresa)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0; color:#64748b; vertical-align:top;">Teléfono</td>
          <td style="padding:8px 0;">${escapeHtml(telefono)}</td>
        </tr>
        <tr>
          <td style="padding:8px 0; color:#64748b; vertical-align:top;">Email</td>
          <td style="padding:8px 0;"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td>
        </tr>
        <tr>
          <td style="padding:8px 0; color:#64748b; vertical-align:top;">Servicios</td>
          <td style="padding:8px 0;">${escapeHtml(servicios)}</td>
        </tr>
      </table>
      <div style="margin-top:16px;">
        <p style="color:#64748b; margin:0 0 6px; font-size:14px;">Mensaje</p>
        <p style="white-space: pre-wrap; background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:14px; margin:0; font-size:14px; line-height:1.5;">${escapeHtml(
          data.message
        )}</p>
      </div>
    </div>
  </div>`;

  try {
    await transporter.sendMail({
      from: `"Cliente BinarIAS" <${GMAIL_USER}>`,
      to: CONTACT_TO_EMAIL || GMAIL_USER,
      replyTo: `"${data.name}" <${data.email}>`,
      subject: "Cliente BinarIAS",
      text,
      html,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error("[server] Error enviando el email:", err);
    res.status(502).json({ ok: false, error: "No se pudo enviar el email. Intentá nuevamente." });
  }
});

// Fallback para servir el index.html del build en cualquier ruta GET que
// no matcheó un archivo estático ni /api/contact (ej. si el día de mañana
// se suma ruteo del lado del cliente). Solo aplica cuando existe el build.
if (distExists) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// Manejador de errores genérico (ej. el origin rechazado por CORS llega
// acá): nunca devolver el stack trace ni detalles internos al cliente.
app.use((err, req, res, next) => {
  console.error("[server] Error no manejado:", err.message);
  if (res.headersSent) return next(err);
  res.status(err.status || 500).json({ ok: false, error: "No se pudo procesar la solicitud." });
});

app.listen(PORT, () => {
  console.log(`[server] Contact API escuchando en http://localhost:${PORT}`);
});
