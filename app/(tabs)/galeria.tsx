import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import type { ImageSourcePropType } from "react-native";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../../styles/homeStyles";

type GalleryCategory = {
  name: string;
  cover: ImageSourcePropType;
  images: ImageSourcePropType[];
};

// Fotos reales de proyectos CALLI, clasificadas por categoría.
const galleryCategories: GalleryCategory[] = [
  {
    name: "Construcción",
    cover: require("../../assets/images/galeria/construccion-02.jpg"),
    images: [
      require("../../assets/images/galeria/construccion-01.jpg"),
      require("../../assets/images/galeria/construccion-02.jpg"),
      require("../../assets/images/galeria/construccion-03.jpg"),
      require("../../assets/images/galeria/construccion-04.jpg"),
      require("../../assets/images/galeria/construccion-05.jpg"),
      require("../../assets/images/galeria/construccion-06.jpg"),
      require("../../assets/images/galeria/construccion-07.jpg"),
      require("../../assets/images/galeria/construccion-08.jpg"),
      require("../../assets/images/galeria/construccion-09.jpg"),
      require("../../assets/images/galeria/construccion-10.jpg"),
      require("../../assets/images/galeria/construccion-11.jpg"),
      require("../../assets/images/galeria/construccion-12.jpg"),
    ],
  },
  {
    name: "Remodelación",
    cover: require("../../assets/images/galeria/remodelacion-03.jpg"),
    images: [
      require("../../assets/images/galeria/remodelacion-01.jpg"),
      require("../../assets/images/galeria/remodelacion-02.jpg"),
      require("../../assets/images/galeria/remodelacion-03.jpg"),
      require("../../assets/images/galeria/remodelacion-04.jpg"),
      require("../../assets/images/galeria/remodelacion-05.jpg"),
      require("../../assets/images/galeria/remodelacion-06.jpg"),
      require("../../assets/images/galeria/remodelacion-07.jpg"),
    ],
  },
  {
    name: "Mantenimiento",
    cover: require("../../assets/images/galeria/mantenimiento-01.jpg"),
    images: [
      require("../../assets/images/galeria/mantenimiento-01.jpg"),
      require("../../assets/images/galeria/mantenimiento-02.jpg"),
      require("../../assets/images/galeria/mantenimiento-03.jpg"),
      require("../../assets/images/galeria/mantenimiento-04.jpg"),
      require("../../assets/images/galeria/mantenimiento-05.jpg"),
      require("../../assets/images/galeria/mantenimiento-06.jpg"),
      require("../../assets/images/galeria/mantenimiento-07.jpg"),
    ],
  },
  {
    name: "Finalizados",
    cover: require("../../assets/images/galeria/finalizados-10.jpg"),
    images: [
      require("../../assets/images/galeria/finalizados-01.jpg"),
      require("../../assets/images/galeria/finalizados-02.jpg"),
      require("../../assets/images/galeria/finalizados-03.jpg"),
      require("../../assets/images/galeria/finalizados-04.jpg"),
      require("../../assets/images/galeria/finalizados-05.jpg"),
      require("../../assets/images/galeria/finalizados-06.jpg"),
      require("../../assets/images/galeria/finalizados-07.jpg"),
      require("../../assets/images/galeria/finalizados-08.jpg"),
      require("../../assets/images/galeria/finalizados-09.jpg"),
      require("../../assets/images/galeria/finalizados-10.jpg"),
      require("../../assets/images/galeria/finalizados-11.jpg"),
      require("../../assets/images/galeria/finalizados-12.jpg"),
      require("../../assets/images/galeria/finalizados-13.jpg"),
      require("../../assets/images/galeria/finalizados-14.jpg"),
      require("../../assets/images/galeria/finalizados-15.jpg"),
    ],
  },
];

// "Recientes" muestra todas las fotos, mezclando las 4 categorías.
const recentImages: ImageSourcePropType[] = galleryCategories.flatMap(
  (category) => category.images,
);

export default function GaleriaScreen() {
  const [selectedImage, setSelectedImage] =
    useState<ImageSourcePropType | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const closePopup = () => {
    setSelectedImage(null);
  };

  const toggleCategory = (name: string) => {
    setActiveCategory((current) => (current === name ? null : name));
  };

  const activeCategoryData = galleryCategories.find(
    (category) => category.name === activeCategory,
  );

  const gridImages = activeCategoryData
    ? activeCategoryData.images
    : recentImages;
  const gridTitle = activeCategory ?? "Recientes";

  return (
    <>
      <ScrollView style={styles.container}>
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
          <Text style={styles.sectionTitleGalery}>Galería</Text>

          {/* CARRUSEL */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.carousel}
          >
            {galleryCategories.map((category) => {
              const isActive = activeCategory === category.name;

              return (
                <TouchableOpacity
                  key={category.name}
                  style={styles.carouselCard}
                  activeOpacity={0.85}
                  onPress={() => toggleCategory(category.name)}
                >
                  <View style={styles.carouselCardClip}>
                    <Image
                      source={category.cover}
                      style={styles.carouselImage}
                      resizeMode="contain"
                    />

                    <Text style={styles.carouselText}>{category.name}</Text>

                    {isActive && <View style={styles.carouselCardActive} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* GRID DE IMÁGENES */}
          <View style={styles.galleryGridHeader}>
            <Text style={styles.sectionSubtitle}>{gridTitle}</Text>

            {activeCategory && (
              <TouchableOpacity
                onPress={() => setActiveCategory(null)}
                hitSlop={8}
              >
                <Text style={styles.galleryResetLink}>Ver recientes</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.grid}>
            {gridImages.map((image, index) => (
              <TouchableOpacity
                key={index}
                style={styles.gridCardGalery}
                activeOpacity={0.85}
                onPress={() => setSelectedImage(image)}
              >
                <Image source={image} style={styles.gridImage} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* POPUP DE IMAGEN */}
      <Modal
        visible={selectedImage !== null}
        transparent
        animationType="fade"
        onRequestClose={closePopup}
      >
        <Pressable style={styles.galleryModalOverlay} onPress={closePopup}>
          <Pressable style={styles.galleryModalCard} onPress={() => {}}>
            <View style={styles.galleryModalHeader}>
              <Text style={styles.galleryModalTitle}>Vista previa</Text>

              <TouchableOpacity
                style={styles.galleryModalCloseButton}
                activeOpacity={0.8}
                onPress={closePopup}
              >
                <Ionicons name="close" size={24} color="#0A1F44" />
              </TouchableOpacity>
            </View>

            <View style={styles.galleryModalImageContainer}>
              {selectedImage && (
                <Image
                  source={selectedImage}
                  style={styles.galleryModalImage}
                />
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}
