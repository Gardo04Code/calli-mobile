import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import PrivacyPolicyLink from "../../components/PrivacyPolicyLink";
import { PRIVACY_EMAIL } from "../../constants/contact";
import styles from "../../styles/homeStyles";
import { openJobApplicationWhatsApp } from "../../utils/linking";

export default function TrabajaScreen() {
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [telefono, setTelefono] = useState("");
  const [oficio, setOficio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [consentimiento, setConsentimiento] = useState(false);
  const [oportunidadesFuturas, setOportunidadesFuturas] = useState(false);

  const handleSubmit = () => {
    const camposPendientes = [
      { etiqueta: "Nombre", valor: nombre },
      { etiqueta: "Ciudad o municipio", valor: ciudad },
      { etiqueta: "Teléfono", valor: telefono },
      { etiqueta: "Oficio o trabajo", valor: oficio },
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

    if (!consentimiento) {
      Alert.alert(
        "Falta tu autorización",
        "Para enviar tu postulación, marca la casilla de autorización de uso de datos.",
      );
      return;
    }

    const texto =
      "*Nueva postulación - CALLI*\n\n" +
      `*Nombre:* ${nombre.trim()}\n` +
      `*Ciudad o municipio:* ${ciudad.trim()}\n` +
      `*Teléfono:* ${telefono.trim()}\n` +
      `*Oficio o trabajo:* ${oficio.trim()}\n\n` +
      `*Mensaje:*\n${mensaje.trim()}\n\n` +
      `*Acepta contacto por oportunidades futuras:* ${oportunidadesFuturas ? "Sí" : "No"}`;

    openJobApplicationWhatsApp(texto);
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

          {/* INPUT CIUDAD O MUNICIPIO */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="location-outline"
              size={24}
              color="#444"
              style={styles.inputIcon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>Ciudad o municipio</Text>

              <TextInput
                placeholder="Escribe tu ciudad o municipio"
                placeholderTextColor="#888"
                style={styles.input}
                value={ciudad}
                onChangeText={setCiudad}
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

          {/* INPUT OFICIO */}
          <View style={styles.inputContainer}>
            <Ionicons
              name="hammer-outline"
              size={24}
              color="#444"
              style={styles.inputIcon}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.inputLabel}>
                ¿Qué oficio o trabajo realizas?
              </Text>

              <TextInput
                placeholder="Por ejemplo: albañil, plomero, electricista"
                placeholderTextColor="#888"
                style={styles.input}
                value={oficio}
                onChangeText={setOficio}
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
              <Text style={styles.securityTitle}>Cómo usamos tus datos</Text>

              <Text style={styles.securityText}>
                Tu postulación se envía a CALLI por WhatsApp. Usamos tus datos
                para procesos de selección actuales y, si lo autorizas, para
                oportunidades futuras. Los conservamos hasta seis meses desde
                el último contacto, salvo obligación legal. Puedes pedir su
                eliminación o ejercer tus derechos ARCO por WhatsApp o en{" "}
                {PRIVACY_EMAIL}.
              </Text>
            </View>
          </View>

          {/* CONSENTIMIENTO */}
          <Pressable
            style={formStyles.consentRow}
            onPress={() => setConsentimiento((actual) => !actual)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: consentimiento }}
            hitSlop={6}
          >
            <Ionicons
              name={consentimiento ? "checkbox" : "square-outline"}
              size={26}
              color="#0A1F44"
            />

            <Text style={formStyles.consentText}>
              Autorizo a CALLI a usar mis datos para evaluar esta postulación.
              (Obligatorio)
            </Text>
          </Pressable>

          <Pressable
            style={formStyles.consentRow}
            onPress={() => setOportunidadesFuturas((actual) => !actual)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: oportunidadesFuturas }}
            hitSlop={6}
          >
            <Ionicons
              name={oportunidadesFuturas ? "checkbox" : "square-outline"}
              size={26}
              color="#0A1F44"
            />

            <Text style={formStyles.consentText}>
              También acepto que CALLI conserve mis datos para contactarme por
              oportunidades laborales futuras. (Opcional)
            </Text>
          </Pressable>

          {/* BOTÓN */}
          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={handleSubmit}
          >
            <Ionicons name="logo-whatsapp" size={24} color="#fff" />

            <Text style={styles.submitButtonText}>Enviar Postulación</Text>
          </TouchableOpacity>

          <PrivacyPolicyLink />
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
  consentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 16,
  },
  consentText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
  },
});
