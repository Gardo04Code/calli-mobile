import { Alert, Linking } from "react-native";

import { PHONE_NUMBER, WHATSAPP_NUMBER } from "../constants/contact";

// Abre el marcador con el número de CALLI. Si el dispositivo no puede
// hacer llamadas (por ejemplo, una tablet sin línea), avisa al usuario.
export function openPhoneCall() {
  Linking.openURL(`tel:${PHONE_NUMBER}`).catch(() => {
    Alert.alert(
      "No se pudo abrir el marcador",
      `Tu dispositivo no permite hacer llamadas desde la aplicación. Puedes llamarnos al ${PHONE_NUMBER}.`,
    );
  });
}

// Abre WhatsApp con un mensaje precargado para CALLI.
export function openWhatsApp(message: string) {
  Linking.openURL(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
  ).catch(() => {
    Alert.alert(
      "No se pudo abrir WhatsApp",
      `Verifica que WhatsApp esté instalado o escríbenos al ${PHONE_NUMBER}.`,
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
