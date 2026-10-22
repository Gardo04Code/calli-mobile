// Número temporal de pruebas. Restaurar +522311242221 antes de publicar.
export const PHONE_NUMBER = "+522312262218";

// Los enlaces wa.me requieren el número internacional sin el signo +.
export const WHATSAPP_NUMBER = PHONE_NUMBER.slice(1);

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
