// Atención a clientes: llamadas y WhatsApp para servicios e información.
export const CUSTOMER_PHONE_NUMBER = "+522311242221";

// Postulaciones de «Trabaja con nosotros». Solo recibe WhatsApp; no se
// muestra como teléfono de atención a clientes.
export const JOBS_PHONE_NUMBER = "+522312932571";

// Los enlaces wa.me requieren el número internacional sin el signo +.
export const CUSTOMER_WHATSAPP_NUMBER = CUSTOMER_PHONE_NUMBER.slice(1);
export const JOBS_WHATSAPP_NUMBER = JOBS_PHONE_NUMBER.slice(1);

// Política de privacidad publicada en Google Sites.
export const PRIVACY_POLICY_URL =
  "https://sites.google.com/view/calli-politica-de-privacidad";

// Correo para solicitudes de privacidad y derechos ARCO.
export const PRIVACY_EMAIL = "pascualortizra3@gmail.com";

export type SocialLink = {
  icon: "logo-facebook" | "logo-instagram" | "logo-tiktok";
  color: string;
  name: string;
  url: string;
};

// Las redes con url vacía no se muestran. Para activar una, escribe la URL
// real del perfil y confirma el nombre visible.
const SOCIAL_LINKS: SocialLink[] = [
  { icon: "logo-facebook", color: "#1877F2", name: "Calli Oficial", url: "" },
  { icon: "logo-instagram", color: "#C13584", name: "@Calli", url: "" },
  { icon: "logo-tiktok", color: "#111111", name: "CalliProyc", url: "" },
];

export const ACTIVE_SOCIAL_LINKS = SOCIAL_LINKS.filter((link) => link.url);
