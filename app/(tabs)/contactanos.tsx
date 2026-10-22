import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { ACTIVE_SOCIAL_LINKS } from "../../constants/contact";
import styles from "../../styles/homeStyles";
import {
  openExternalLink,
  openPhoneCall,
  openWhatsApp,
} from "../../utils/linking";

export default function ContactanosScreen() {
  const handleCall = () => {
    openPhoneCall();
  };

  const handleWhatsApp = () => {
    openWhatsApp(
      "Hola, me gustaría recibir información sobre los servicios de CALLI.",
    );
  };

  const openSocialLink = (url: string) => {
    openExternalLink(url);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/Logo.jpg")}
            style={styles.logo}
          />

          <Text style={styles.logoText}>CALLI</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.workTitle}>Contáctanos</Text>

        <Text style={styles.workSubtitle}>
          Comunícate con nosotros para recibir atención personalizada sobre tu
          proyecto.
        </Text>

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Estamos para ayudarte</Text>

          <Text style={styles.contactDescription}>
            Elige una opción para comunicarte directamente con nuestro equipo.
          </Text>

          <View style={styles.contactButtonsContainer}>
            <TouchableOpacity
              style={[styles.contactButton, styles.callButton]}
              activeOpacity={0.85}
              onPress={handleCall}
            >
              <Ionicons name="call" size={22} color="#fff" />
              <Text style={styles.contactButtonText}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactButton, styles.whatsappButton]}
              activeOpacity={0.85}
              onPress={handleWhatsApp}
            >
              <Ionicons name="logo-whatsapp" size={22} color="#fff" />
              <Text style={styles.contactButtonText}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.privacyNotice}>
          <Ionicons name="shield-checkmark-outline" size={18} color="#0A1F44" />
          <Text style={styles.privacyNoticeText}>
            Política de privacidad (URL pendiente)
          </Text>
        </View>

        {/* REDES: solo las que tienen enlace real (constants/contact.ts) */}
        {ACTIVE_SOCIAL_LINKS.length > 0 && (
          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Nuestras redes</Text>

            <Text style={styles.contactDescription}>
              Síguenos y conoce más sobre nuestros proyectos, servicios y
              trabajos recientes.
            </Text>

            <View style={styles.contactSocialRow}>
              {ACTIVE_SOCIAL_LINKS.map((link) => (
                <TouchableOpacity
                  key={link.icon}
                  style={styles.socialItem}
                  activeOpacity={0.8}
                  onPress={() => openSocialLink(link.url)}
                >
                  <View style={styles.socialIconBox}>
                    <Ionicons name={link.icon} size={36} color={link.color} />
                  </View>

                  <Text style={styles.socialName}>{link.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
