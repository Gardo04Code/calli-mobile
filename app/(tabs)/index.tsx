import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { ImageSourcePropType } from "react-native";

import styles from "../../styles/homeStyles";

type HomeService = {
  name: string;
  image: ImageSourcePropType;
  large?: boolean;
};

const HOME_SERVICES: HomeService[] = [
  { name: "Construcción", image: require("../../assets/images/Servicio1.jpg") },
  { name: "Remodelación", image: require("../../assets/images/Servicio2.jpg") },
  {
    name: "Planos Arquitectónicos",
    image: require("../../assets/images/Servicio3.jpg"),
  },
  {
    name: "Diseño y Construcción de vivienda",
    image: require("../../assets/images/Servicio4.jpg"),
    large: true,
  },
  {
    name: "Servicios de avalúos de predios e inmuebles",
    image: require("../../assets/images/Servicio5.jpg"),
    large: true,
  },
  {
    name: "Levantamiento topográfico",
    image: require("../../assets/images/Servicio6.jpg"),
  },
  {
    name: "Control y administración de proyectos",
    image: require("../../assets/images/Servicio7.jpg"),
    large: true,
  },
  {
    name: "Elaboración de croquis para escrituración",
    image: require("../../assets/images/Servicio8.jpg"),
    large: true,
  },
  {
    name: "Elaboración de Renders 3D",
    image: require("../../assets/images/Servicio9.jpg"),
  },
  {
    name: "Diseño de interiores",
    image: require("../../assets/images/Servicio10.jpg"),
  },
  {
    name: "Servicio de albañilería",
    image: require("../../assets/images/Servicio11.jpg"),
  },
  {
    name: "Servicios de plomería en general y fontanería",
    image: require("../../assets/images/Servicio12.jpg"),
    large: true,
  },
  {
    name: "Servicio de electricidad de alta, media y baja tensión 110 y 220, zonas industriales.",
    image: require("../../assets/images/Servicio13.jpg"),
    large: true,
  },
  {
    name: "Servicio de pintura",
    image: require("../../assets/images/Servicio14.jpg"),
  },
  {
    name: "Servicio de Tabla Roca",
    image: require("../../assets/images/Servicio15.jpg"),
  },
  {
    name: "Servicio de herrería y balconería",
    image: require("../../assets/images/Servicio16.jpg"),
    large: true,
  },
  {
    name: "Servicios de impermeabilizantes y problemas de humedad",
    image: require("../../assets/images/Servicio17.jpg"),
    large: true,
  },
  {
    name: "Servicios de aluminio: canceles, puertas, ventanas y vidriería",
    image: require("../../assets/images/Servicio18.jpg"),
    large: true,
  },
  {
    name: "Servicios de jardinería y limpieza de terrenos",
    image: require("../../assets/images/Servicio19.jpg"),
    large: true,
  },
  {
    name: "Servicios de Carpintería",
    image: require("../../assets/images/Servicio20.jpg"),
  },
];

export default function HomeScreen() {
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const PHONE_NUMBER = "+529991234567";
  const WHATSAPP_NUMBER = "529991234567";

  const closeSocialModal = () => {
    setSocialModalVisible(false);
  };

  const openSocialLink = (url: string) => {
    Linking.openURL(url);
  };

  const handleCall = () => {
    Linking.openURL(`tel:${PHONE_NUMBER}`);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      "Hola, me gustaría recibir información sobre los servicios de CALLI.",
    );

    Linking.openURL(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`);
  };

  const closeServiceContact = () => {
    setSelectedService(null);
  };

  const handleServiceCall = () => {
    setSelectedService(null);
    Linking.openURL(`tel:${PHONE_NUMBER}`).catch(() => {});
  };

  const handleServiceWhatsApp = () => {
    const service = selectedService;
    setSelectedService(null);

    const message = encodeURIComponent(
      service
        ? `Hola, me gustaría solicitar el servicio de "${service}" en CALLI. ¿Me pueden brindar atención?`
        : "Hola, me gustaría recibir información sobre los servicios de CALLI.",
    );

    Linking.openURL(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`,
    ).catch(() => {});
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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

        {/* CONTENIDO */}
        <View style={styles.content}>
          <Text style={styles.welcome}>Bienvenido a CALLI</Text>

          {/* SECTION */}
          <View style={styles.section}>
            {/* TEXTO */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>¿Quiénes somos?</Text>

              <Text style={styles.description}>
                Plataforma digital para solicitar servicios de construcción y
                mantenimiento de forma rápida y sencilla, con solo un clic.
              </Text>
            </View>

            {/* VIDEO */}
            <View style={styles.videoContainer}>
              <View style={styles.videoPlaceholder}>
                <Text style={styles.videoText}>Video presentación</Text>
              </View>
            </View>
          </View>
        </View>

        {/* CONTACTO */}
        <View style={styles.contactSection}>
          <Text style={styles.contactTitle}>Contáctanos</Text>

          <Text style={styles.contactDescription}>
            ¿Tienes un proyecto en mente? Comunícate con nosotros y recibe
            atención personalizada.
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

        {/* SERVICIOS DESTACADOS */}
        <View style={styles.servicesGridSection}>
          <Text style={styles.servicesGridTitle}>Nuestros Servicios</Text>

          <View style={styles.servicesGrid}>
            {HOME_SERVICES.map((service) => (
              <TouchableOpacity
                key={service.name}
                style={styles.serviceGridCard}
                activeOpacity={0.85}
                onPress={() => setSelectedService(service.name)}
              >
                <ImageBackground
                  source={service.image}
                  style={styles.serviceGridCardInner}
                  imageStyle={styles.serviceGridImage}
                >
                  <View style={styles.overlay} />
                  <Text
                    style={
                      service.large
                        ? styles.serviceGridTextLarge
                        : styles.serviceGridText
                    }
                  >
                    {service.name}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* ACCIONES RÁPIDAS */}
        <View style={styles.actionsSection}>
          <Text style={styles.actionsTitle}>Acciones Rápidas</Text>

          <Text style={styles.actionsDescription}>
            Descubre los motivos por los que somos tu mejor opción en
            construcción y mantenimiento.
          </Text>

          {/* CARDS */}
          <View style={styles.cardsContainer}>
            {/* CARD 1 */}
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => router.push("/contactanos")}
            >
              <Image
                source={require("../../assets/images/icon1.png")}
                style={styles.cardIcon}
              />

              <Text style={styles.cardText}>Contáctanos</Text>
            </TouchableOpacity>

            {/* CARD 2 */}
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => router.push("/galeria")}
            >
              <Image
                source={require("../../assets/images/icon2.png")}
                style={styles.cardIcon}
              />

              <Text style={styles.cardText}>Mira Nuestros Proyectos</Text>
            </TouchableOpacity>

            {/* CARD 3 */}
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => setSocialModalVisible(true)}
            >
              <Image
                source={require("../../assets/images/icon3.png")}
                style={styles.cardIcon}
              />

              <Text style={styles.cardText}>Visita nuestras redes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* POPUP REDES SOCIALES */}
      <Modal
        visible={socialModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeSocialModal}
      >
        <Pressable style={styles.socialModalOverlay} onPress={closeSocialModal}>
          <Pressable style={styles.socialModalCard} onPress={() => {}}>
            <View style={styles.socialModalHeader}>
              <Text style={styles.socialModalTitle}>Nuestras redes</Text>

              <TouchableOpacity
                style={styles.socialModalCloseButton}
                activeOpacity={0.8}
                onPress={closeSocialModal}
              >
                <Ionicons name="close" size={24} color="#0A1F44" />
              </TouchableOpacity>
            </View>

            <Text style={styles.socialModalDescription}>
              Síguenos y conoce más sobre nuestros proyectos, servicios y
              trabajos recientes.
            </Text>

            <View style={styles.socialIconsContainer}>
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
          </Pressable>
        </Pressable>
      </Modal>

      {/* POPUP CONTACTO DE SERVICIO */}
      <Modal
        visible={selectedService !== null}
        transparent
        animationType="fade"
        onRequestClose={closeServiceContact}
      >
        <Pressable
          style={styles.socialModalOverlay}
          onPress={closeServiceContact}
        >
          <Pressable style={styles.socialModalCard} onPress={() => {}}>
            <View style={styles.socialModalHeader}>
              <Text
                style={[styles.socialModalTitle, { flex: 1, paddingRight: 12 }]}
                numberOfLines={2}
              >
                {selectedService}
              </Text>

              <TouchableOpacity
                style={styles.socialModalCloseButton}
                activeOpacity={0.8}
                onPress={closeServiceContact}
              >
                <Ionicons name="close" size={24} color="#0A1F44" />
              </TouchableOpacity>
            </View>

            <Text style={styles.socialModalDescription}>
              Para ser atendido en este servicio, realiza una de las dos acciones
              de contacto: llámanos o escríbenos por WhatsApp y con gusto te
              atenderemos.
            </Text>

            <View style={styles.serviceContactButtons}>
              <TouchableOpacity
                style={[styles.contactButton, styles.callButton]}
                activeOpacity={0.85}
                onPress={handleServiceCall}
              >
                <Ionicons name="call" size={22} color="#fff" />
                <Text style={styles.contactButtonText}>Llamar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.contactButton, styles.whatsappButton]}
                activeOpacity={0.85}
                onPress={handleServiceWhatsApp}
              >
                <Ionicons name="logo-whatsapp" size={22} color="#fff" />
                <Text style={styles.contactButtonText}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
