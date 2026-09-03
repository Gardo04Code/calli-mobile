import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    Linking,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import styles from "../../styles/homeStyles";

export default function ContactanosScreen() {
  const PHONE_NUMBER = "+529991234567";
  const WHATSAPP_NUMBER = "529991234567";

  const handleCall = () => {
    Linking.openURL(`tel:${PHONE_NUMBER}`);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, me gustaría recibir información sobre los servicios de CALLI.",
    );

    Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`);
  };

  const openSocialLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
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

        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Nuestras redes</Text>

          <Text style={styles.contactDescription}>
            Síguenos y conoce más sobre nuestros proyectos, servicios y trabajos
            recientes.
          </Text>

          <View style={styles.contactSocialRow}>
            <TouchableOpacity
              style={styles.socialItem}
              activeOpacity={0.8}
              onPress={() => openSocialLink("https://www.facebook.com/")}
            >
              <View style={styles.socialIconBox}>
                <Ionicons name="logo-facebook" size={36} color="#1877F2" />
              </View>

              <Text style={styles.socialName}>Calli Oficial</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              activeOpacity={0.8}
              onPress={() => openSocialLink("https://www.instagram.com/")}
            >
              <View style={styles.socialIconBox}>
                <Ionicons name="logo-instagram" size={36} color="#C13584" />
              </View>

              <Text style={styles.socialName}>@Calli</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialItem}
              activeOpacity={0.8}
              onPress={() => openSocialLink("https://www.tiktok.com/")}
            >
              <View style={styles.socialIconBox}>
                <Ionicons name="logo-tiktok" size={36} color="#111111" />
              </View>

              <Text style={styles.socialName}>CalliProyc</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
