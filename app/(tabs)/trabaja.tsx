import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { WHATSAPP_NUMBER } from "../../constants/contact";
import styles from "../../styles/homeStyles";

export default function TrabajaScreen() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = () => {
    const camposPendientes = [
      { etiqueta: "Nombre", valor: nombre },
      { etiqueta: "Dirección", valor: direccion },
      { etiqueta: "Teléfono", valor: telefono },
      { etiqueta: "Mensaje", valor: mensaje },
    ]
      .filter((campo) => !campo.valor.trim())
      .map((campo) => campo.etiqueta);

    if (camposPendientes.length > 0) {
      const listaCampos =
        camposPendientes.length === 1
          ? camposPendientes[0]
          : `${camposPendientes.slice(0, -1).join(", ")} y ${camposPendientes[camposPendientes.length - 1]}`;

      Alert.alert(
        "Faltan datos",
        camposPendientes.length === 1
          ? `Completa el campo ${listaCampos} para continuar.`
          : `Completa estos campos: ${listaCampos}.`,
      );
      return;
    }

    const texto =
      "*Nueva postulación - CALLI*\n\n" +
      `*Nombre:* ${nombre.trim()}\n` +
      `*Dirección:* ${direccion.trim()}\n` +
      `*Teléfono:* ${telefono.trim()}\n\n` +
      `*Mensaje:*\n${mensaje.trim()}`;

    Linking.openURL(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`,
    ).catch(() => {});
  };

  return (
    <KeyboardAvoidingView
      style={formStyles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={[styles.container, formStyles.screen]}
        contentContainerStyle={formStyles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/Logo.jpg")}
              style={styles.logo}
            />

            <Text style={styles.logoText}>CALLI</Text>
          </View>
        </View>
        <View style={styles.workHeader}>
          <Text style={styles.workTitle}>Postúlate en CALLI</Text>

          <Text style={styles.workSubtitle}>
            Completa tus datos y cuéntanos por qué te gustaría ser parte de
            nuestro equipo.
          </Text>
        </View>

        {/* CARD PRINCIPAL */}
        <View style={styles.workCard}>
          {/* TITULO */}
          <View style={styles.workCardHeader}>
            <View style={styles.workIconCircle}>
              <Ionicons name="person-outline" size={32} color="#0A1F44" />
            </View>

            <View>
              <Text style={styles.workCardTitle}>Tus datos</Text>
              <Text style={styles.workCardSub}>Queremos conocerte mejor</Text>
            </View>
          </View>

          {/* INPUT NOMBRE */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={24}
              color="#444"
              style={styles.inputIcon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Nombre completo</Text>

              <TextInput
                placeholder="Escribe tu nombre completo"
                placeholderTextColor="#888"
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
              />
            </View>
          </View>

          {/* INPUT DIRECCIÓN */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#444"
              style={styles.inputIcon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Dirección</Text>

              <TextInput
                placeholder="Escribe tu dirección"
                placeholderTextColor="#888"
                style={styles.input}
                value={direccion}
                onChangeText={setDireccion}
              />
            </View>
          </View>

          {/* INPUT TELÉFONO */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={24}
              color="#444"
              style={styles.inputIcon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Teléfono</Text>

              <TextInput
                placeholder="Escribe tu número de teléfono"
                placeholderTextColor="#888"
                keyboardType="phone-pad"
                style={styles.input}
                value={telefono}
                onChangeText={setTelefono}
              />
            </View>
          </View>

          {/* MENSAJE */}
          <View style={styles.messageContainer}>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              color="#444"
              style={styles.inputIcon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Mensaje</Text>

              <TextInput
                multiline
                maxLength={300}
                textAlignVertical="top"
                placeholder="Cuéntanos brevemente por qué te gustaría trabajar con nosotros, tu experiencia o habilidades relevantes."
                placeholderTextColor="#888"
                style={styles.messageInput}
                value={mensaje}
                onChangeText={setMensaje}
              />

              <Text style={styles.counter}>{mensaje.length}/300</Text>
            </View>
          </View>

          {/* INFO */}
          <View style={styles.securityBox}>
            <View style={styles.securityIcon}>
              <Ionicons
                name="shield-checkmark-outline"
                size={30}
                color="#0A1F44"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.securityTitle}>Tu información está segura</Text>

              <Text style={styles.securityText}>
                En CALLI protegemos tus datos personales y los utilizamos
                únicamente para fines de selección.
              </Text>
            </View>
          </View>

          {/* BOTÓN */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSubmit}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#fff" />

            <Text style={styles.submitButtonText}>Enviar Postulación</Text>
          </TouchableOpacity>

          <View style={styles.privacyNotice}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#0A1F44" />
            <Text style={styles.privacyNoticeText}>
              Política de privacidad (URL pendiente)
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const formStyles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingBottom: 24,
  },
});
