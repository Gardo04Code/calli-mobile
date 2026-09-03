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

const recentImages: ImageSourcePropType[] = [
  require("../../assets/images/img1.jpg"),
  require("../../assets/images/img2.jpg"),
  require("../../assets/images/img3.jpg"),
  require("../../assets/images/img4.jpg"),
  require("../../assets/images/img5.jpg"),
  require("../../assets/images/img6.jpg"),
];

type GalleryCategory = {
  name: string;
  cover: ImageSourcePropType;
  images: ImageSourcePropType[];
};

// NOTE: agrupación temporal con las imágenes que ya tenemos.
// Cuando lleguen las fotos reales, solo se actualizan estos arrays.
// (Las portadas usan las imágenes más ligeras para que el carrusel no parpadee.)
const galleryCategories: GalleryCategory[] = [
  {
    name: "Construcción",
    cover: require("../../assets/images/Construccion.jpg"),
    images: [
      require("../../assets/images/Servicio1.jpg"),
      require("../../assets/images/Servicio7.jpg"),
      require("../../assets/images/Servicio3.jpg"),
      require("../../assets/images/Servicio9.jpg"),
      require("../../assets/images/Servicio11.jpg"),
      require("../../assets/images/img2.jpg"),
    ],
  },
  {
    name: "Remodelación",
    cover: require("../../assets/images/Remodelacion.jpg"),
    images: [
      require("../../assets/images/Servicio4.jpg"),
      require("../../assets/images/Servicio10.jpg"),
      require("../../assets/images/Servicio5.jpg"),
      require("../../assets/images/Servicio14.jpg"),
      require("../../assets/images/img1.jpg"),
      require("../../assets/images/img6.jpg"),
    ],
  },
  {
    name: "Mantenimiento",
    cover: require("../../assets/images/Mantenimiento.jpg"),
    images: [
      require("../../assets/images/Servicio14.jpg"),
      require("../../assets/images/Servicio12.jpg"),
      require("../../assets/images/Servicio13.jpg"),
      require("../../assets/images/Servicio11.jpg"),
      require("../../assets/images/Servicio6.jpg"),
      require("../../assets/images/img3.jpg"),
    ],
  },
  {
    name: "Finalizados",
    cover: require("../../assets/images/Finalizados.jpg"),
    images: [
      require("../../assets/images/Servicio5.jpg"),
      require("../../assets/images/Servicio9.jpg"),
      require("../../assets/images/img5.jpg"),
      require("../../assets/images/img6.jpg"),
      require("../../assets/images/img4.jpg"),
      require("../../assets/images/Servicio10.jpg"),
    ],
  },
];

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
