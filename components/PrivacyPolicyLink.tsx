import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";

import { PRIVACY_POLICY_URL } from "../constants/contact";
import styles from "../styles/homeStyles";
import { openExternalLink } from "../utils/linking";

// Enlace a la política de privacidad publicada, compartido por varias pantallas.
export default function PrivacyPolicyLink() {
  return (
    <TouchableOpacity
      style={styles.privacyNotice}
      activeOpacity={0.7}
      onPress={() => openExternalLink(PRIVACY_POLICY_URL)}
      accessibilityRole="link"
      accessibilityLabel="Abrir la política de privacidad"
      hitSlop={6}
    >
      <Ionicons name="shield-checkmark-outline" size={18} color="#0A1F44" />
      <Text
        style={[styles.privacyNoticeText, { textDecorationLine: "underline" }]}
      >
        Política de privacidad
      </Text>
    </TouchableOpacity>
  );
}
