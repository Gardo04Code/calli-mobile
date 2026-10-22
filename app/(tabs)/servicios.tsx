import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "../../styles/homeStyles";
import { openPhoneCall, openWhatsApp } from "../../utils/linking";

type Category =
  | "Todos"
  | "Construcción"
  | "Remodelación"
  | "Mantenimiento"
  | "Diseño"
  | "Legales";

type Service = {
  id: number;
  title: string;
  description: string;
  category: Category;
  image: ImageSourcePropType;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const matchesQuery = (service: Service, query: string) => {
  const haystack = normalize(
    `${service.title} ${service.description} ${service.category}`,
  );

  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
};

const categories: {
  name: Category;
  icon: string;
  description: string;
}[] = [
  {
    name: "Construcción",
    icon: "🏗",
    description: "Obras completas",
  },
  {
    name: "Remodelación",
    icon: "🛠",
    description: "Renovación",
  },
  {
    name: "Mantenimiento",
    icon: "🔧",
    description: "Reparaciones",
  },
  {
    name: "Diseño",
    icon: "📐",
    description: "Planos y renders",
  },
  {
    name: "Legales",
    icon: "⚖️",
    description: "Trámites y permisos",
  },
  {
    name: "Todos",
    icon: "📦",
    description: "Servicios completos",
  },
];

const services: Service[] = [
  {
    id: 1,
    title: "Construcción en general",
    description: "Obras completas y proyectos de construcción.",
    category: "Construcción",
    image: require("../../assets/images/Servicio1.jpg"),
  },
  {
    id: 2,
    title: "Diseño y construcción de vivienda",
    description: "Desarrollo integral de vivienda desde diseño hasta obra.",
    category: "Construcción",
    image: require("../../assets/images/Servicio4.jpg"),
  },
  {
    id: 3,
    title: "Control y administración de proyectos",
    description: "Supervisión, control y seguimiento profesional de obras.",
    category: "Construcción",
    image: require("../../assets/images/Servicio7.jpg"),
  },
  {
    id: 4,
    title: "Remodelaciones",
    description: "Renovamos y modernizamos espacios interiores y exteriores.",
    category: "Remodelación",
    image: require("../../assets/images/Servicio2.jpg"),
  },
  {
    id: 5,
    title: "Diseño de interiores",
    description: "Diseño funcional y estético para mejorar tus espacios.",
    category: "Diseño",
    image: require("../../assets/images/Servicio10.jpg"),
  },
  {
    id: 6,
    title: "Planos arquitectónicos",
    description:
      "Elaboración de planos para proyectos habitacionales y comerciales.",
    category: "Diseño",
    image: require("../../assets/images/Servicio3.jpg"),
  },
  {
    id: 7,
    title: "Renders 3D",
    description: "Visualización realista de proyectos arquitectónicos.",
    category: "Diseño",
    image: require("../../assets/images/Servicio9.jpg"),
  },
  {
    id: 8,
    title: "Croquis para escrituración",
    description: "Elaboración de croquis requeridos para trámites legales.",
    category: "Diseño",
    image: require("../../assets/images/Servicio8.jpg"),
  },
  {
    id: 9,
    title: "Avalúos de predios e inmuebles",
    description: "Servicios de avalúo para terrenos, casas e inmuebles.",
    category: "Legales",
    image: require("../../assets/images/Servicio5.jpg"),
  },
  {
    id: 10,
    title: "Levantamiento topográfico",
    description: "Medición y levantamiento de terrenos para proyectos.",
    category: "Diseño",
    image: require("../../assets/images/Servicio6.jpg"),
  },
  {
    id: 11,
    title: "Servicio de albañilería",
    description: "Trabajos generales de construcción, reparación y acabados.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio11.jpg"),
  },
  {
    id: 12,
    title: "Plomería y fontanería",
    description: "Instalaciones, reparaciones y mantenimiento hidráulico.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio12.jpg"),
  },
  {
    id: 13,
    title: "Electricidad",
    description: "Instalaciones eléctricas de baja, media y alta tensión.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio13.jpg"),
  },
  {
    id: 14,
    title: "Servicio de pintura",
    description: "Pintura interior, exterior y mantenimiento de acabados.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio14.jpg"),
  },
  {
    id: 15,
    title: "Tabla roca",
    description: "Instalación y reparación de muros, plafones y divisiones.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio15.jpg"),
  },
  {
    id: 16,
    title: "Herrería y balconería",
    description: "Trabajos de herrería, estructuras, puertas y balcones.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio16.jpg"),
  },
  {
    id: 17,
    title: "Impermeabilización",
    description: "Soluciones contra humedad, filtraciones y goteras.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio17.jpg"),
  },
  {
    id: 18,
    title: "Aluminio y vidriería",
    description: "Canceles, puertas, ventanas y trabajos en vidrio.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio18.jpg"),
  },
  {
    id: 19,
    title: "Jardinería y limpieza de terrenos",
    description:
      "Limpieza, mantenimiento y preparación de espacios exteriores.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio19.jpg"),
  },
  {
    id: 20,
    title: "Carpintería",
    description: "Trabajos de madera, muebles, puertas y acabados.",
    category: "Mantenimiento",
    image: require("../../assets/images/Servicio20.jpg"),
  },
  {
    id: 21,
    title: "Regularización de predios",
    description:
      "Trámites para regularizar la situación legal de un predio ante las autoridades correspondientes.",
    category: "Legales",
    image: require("../../assets/images/Legal1.jpg"),
  },
  {
    id: 22,
    title: "Trámites de escrituración",
    description: "Gestionamos la escrituración de tu propiedad de principio a fin.",
    category: "Legales",
    image: require("../../assets/images/Legal2.jpg"),
  },
  {
    id: 23,
    title: "Contratos de obras y permisos de construcción",
    description:
      "Elaboración de contratos de obra y gestión de permisos de construcción.",
    category: "Legales",
    image: require("../../assets/images/Legal3.jpg"),
  },
  {
    id: 24,
    title: "Licitaciones y obra pública",
    description:
      "Asesoría legal en procesos de licitación y contratos de obra pública.",
    category: "Legales",
    image: require("../../assets/images/Legal4.jpg"),
  },
  {
    id: 25,
    title: "Litigio y resolución de conflictos",
    description:
      "Representación legal y solución de conflictos relacionados con bienes inmuebles.",
    category: "Legales",
    image: require("../../assets/images/Legal5.jpg"),
  },
  {
    id: 26,
    title: "Regularización de propiedad y posesión",
    description:
      "Trámites para acreditar la propiedad y posesión legal de un inmueble.",
    category: "Legales",
    image: require("../../assets/images/Legal6.jpg"),
  },
  {
    id: 27,
    title: "Constitución de hipotecas, gravámenes y limitaciones de dominio",
    description:
      "Constitución y registro de hipotecas, gravámenes y limitaciones sobre inmuebles.",
    category: "Legales",
    image: require("../../assets/images/Legal7.jpg"),
  },
  {
    id: 28,
    title:
      "Compraventa, promesa de venta, reserva de derechos y contratos preliminares",
    description:
      "Elaboración de contratos de compraventa, promesa de venta y reserva de derechos.",
    category: "Legales",
    image: require("../../assets/images/Legal8.jpg"),
  },
];

export default function ServiciosScreen() {
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [searchText, setSearchText] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [contactService, setContactService] = useState<string | null>(null);

  const filteredServices = services.filter((service) => {
    const matchesCategory =
      activeCategory === "Todos" || service.category === activeCategory;

    return matchesCategory && matchesQuery(service, searchText);
  });

  const suggestions =
    searchText.trim().length > 0
      ? services
          .filter((service) => matchesQuery(service, searchText))
          .slice(0, 6)
      : [];

  const selectSuggestion = (service: Service) => {
    setSearchText(service.title);
    setActiveCategory("Todos");
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setSearchText("");
    setShowSuggestions(false);
  };

  const closeContact = () => {
    setContactService(null);
  };

  const handleContactCall = () => {
    setContactService(null);
    openPhoneCall();
  };

  const handleContactWhatsApp = () => {
    const service = contactService;
    setContactService(null);

    openWhatsApp(
      service
        ? `Hola, me gustaría solicitar el servicio de "${service}" en CALLI. ¿Me pueden brindar atención?`
        : "Hola, me gustaría recibir información sobre los servicios de CALLI.",
    );
  };

  return (
    <>
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
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

      <View style={styles.content}>
        {/* TITULO */}
        <Text style={styles.servicesMainTitle}>Servicios</Text>

        {/* CATEGORÍAS */}
        <View style={styles.servicesGridBottom}>
          {categories.map((category) => {
            const isActive = activeCategory === category.name;

            return (
              <TouchableOpacity
                key={category.name}
                style={[
                  styles.servicesMiniCard,
                  isActive && styles.servicesMiniCardActive,
                ]}
                activeOpacity={0.85}
                onPress={() => setActiveCategory(category.name)}
              >
                <Text style={styles.servicesMiniIcon}>{category.icon}</Text>

                <Text
                  style={[
                    styles.servicesMiniTitle,
                    isActive && styles.servicesMiniTitleActive,
                  ]}
                >
                  {category.name}
                </Text>

                <Text
                  style={[
                    styles.servicesMiniText,
                    isActive && styles.servicesMiniTextActive,
                  ]}
                >
                  {category.description}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* BUSCADOR */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>

          <TextInput
            placeholder="Buscar un servicio..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={searchText}
            onChangeText={(text) => {
              setSearchText(text);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
          />

          {searchText.length > 0 && (
            <TouchableOpacity onPress={clearSearch} hitSlop={10}>
              <Text style={styles.searchClear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* SUGERENCIAS */}
        {showSuggestions && suggestions.length > 0 && (
          <View style={styles.suggestionsBox}>
            {suggestions.map((service, index) => (
              <TouchableOpacity
                key={service.id}
                style={[
                  styles.suggestionItem,
                  index === suggestions.length - 1 && styles.suggestionItemLast,
                ]}
                activeOpacity={0.7}
                onPress={() => selectSuggestion(service)}
              >
                <Text style={styles.suggestionText}>{service.title}</Text>
                <Text style={styles.suggestionCategory}>{service.category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* DESTACADOS */}
        <Text style={styles.servicesSectionTitle}>
          {activeCategory === "Todos"
            ? "Servicios destacados"
            : `Servicios de ${activeCategory}`}
        </Text>

        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              activeOpacity={0.85}
              onPress={() => setContactService(service.title)}
            >
              <Image source={service.image} style={styles.serviceImage} />

              <View style={styles.serviceText}>
                <Text style={styles.badge}>★ {service.category}</Text>

                <Text style={styles.serviceTitle}>{service.title}</Text>

                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noServicesBox}>
            <Text style={styles.noServicesText}>
              No se encontraron servicios con esa búsqueda.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>

    {/* POPUP CONTACTO DE SERVICIO */}
    <Modal
      visible={contactService !== null}
      transparent
      animationType="fade"
      onRequestClose={closeContact}
    >
      <Pressable style={styles.socialModalOverlay} onPress={closeContact}>
        <Pressable style={styles.socialModalCard} onPress={() => {}}>
          <View style={styles.socialModalHeader}>
            <Text
              style={[styles.socialModalTitle, { flex: 1, paddingRight: 12 }]}
              numberOfLines={2}
            >
              {contactService}
            </Text>

            <TouchableOpacity
              style={styles.socialModalCloseButton}
              activeOpacity={0.8}
              onPress={closeContact}
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
              onPress={handleContactCall}
            >
              <Ionicons name="call" size={22} color="#fff" />
              <Text style={styles.contactButtonText}>Llamar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactButton, styles.whatsappButton]}
              activeOpacity={0.85}
              onPress={handleContactWhatsApp}
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
