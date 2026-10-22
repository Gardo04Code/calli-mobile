import { Alert, Linking } from "react-native";

import {
  CUSTOMER_PHONE_NUMBER,
  CUSTOMER_WHATSAPP_NUMBER,
  JOBS_PHONE_NUMBER,
  JOBS_WHATSAPP_NUMBER,
} from "../constants/contact";

// Abre el marcador con el número de atención a clientes. Si el dispositivo
// no puede hacer llamadas (por ejemplo, una tablet sin línea), avisa al usuario.
export function openPhoneCall() {
  Linking.openURL(`tel:${CUSTOMER_PHONE_NUMBER}`).catch(() => {
    Alert.alert(
      "No se pudo abrir el marcador",
      `Tu dispositivo no permite hacer llamadas desde la aplicación. Puedes llamarnos al ${CUSTOMER_PHONE_NUMBER}.`,
    );
  });
}

// Abre WhatsApp de atención a clientes con un mensaje precargado.
export function openWhatsApp(message: string) {
  Linking.openURL(
    `https://wa.me/${CUSTOMER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  ).catch(() => {
    Alert.alert(
      "No se pudo abrir WhatsApp",
      `Verifica que WhatsApp esté instalado o escríbenos al ${CUSTOMER_PHONE_NUMBER}.`,
    );
  });
}

// Envía una postulación por WhatsApp al número de postulaciones.
export function openJobApplicationWhatsApp(message: string) {
  Linking.openURL(
    `https://wa.me/${JOBS_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  ).catch(() => {
    Alert.alert(
      "No se pudo abrir WhatsApp",
      `Verifica que WhatsApp esté instalado o envía tu postulación por WhatsApp al ${JOBS_PHONE_NUMBER}.`,
    );
  });
}

// Abre un enlace externo, como el perfil de una red social.
export function openExternalLink(url: string) {
  Linking.openURL(url).catch(() => {
    Alert.alert(
      "No se pudo abrir el enlace",
      "Inténtalo de nuevo más tarde.",
    );
  });
}
