import { Dimensions, StyleSheet } from "react-native";

const screenWidth = Dimensions.get("window").width;
const isSmallScreen = screenWidth < 400;

const styles = StyleSheet.create({
  /* =========================
      CONTAINER
  ========================= */

  container: {
    backgroundColor: "#f5f5f5",
  },

  scrollContent: {
    paddingBottom: 40,
  },

  /* =========================
      HEADER
  ========================= */

  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#0A1F44",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    elevation: 6,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },

  logoText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  /* =========================
      CONTENIDO GENERAL
  ========================= */

  content: {
    padding: 20,
  },

  welcome: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 25,
  },

  /* =========================
      SECTION INFO
  ========================= */

  section: {
    width: "100%",
    flexDirection: isSmallScreen ? "column" : "row",
    marginTop: 10,
    alignSelf: "center",

    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 16,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  textContainer: {
    width: "100%",
    marginBottom: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A1F44",
    marginBottom: 10,
  },

  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 25,
    textAlign: "justify",
  },

  videoContainer: {
    width: "100%",
  },

  videoPlaceholder: {
    height: 180,
    backgroundColor: "#0A1F44",
    borderRadius: 18,

    justifyContent: "center",
    alignItems: "center",
  },

  videoText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* =========================
      CONTACTO
  ========================= */

  contactSection: {
    backgroundColor: "#fff",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 18,
    marginTop: 18,
    marginBottom: 10,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  contactTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0A1F44",
    textAlign: "center",
    marginBottom: 8,
  },

  contactDescription: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 20,
  },

  contactButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  serviceContactButtons: {
    flexDirection: "row",
    gap: 12,
    paddingHorizontal: 18,
    paddingTop: 4,
    paddingBottom: 24,
  },

  contactSocialRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
    marginTop: 4,
  },

  contactButton: {
    flex: 1,
    height: 54,
    borderRadius: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  callButton: {
    backgroundColor: "#0A1F44",
  },

  whatsappButton: {
    backgroundColor: "#25D366",
  },

  contactButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },

  /* =========================
      SERVICIOS GRID
  ========================= */

  servicesGridSection: {
    paddingHorizontal: 20,
    marginTop: 10,
  },

  servicesGridTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0A1F44",
    marginBottom: 20,
  },

  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  serviceGridCard: {
    width: "48%",
    height: 115,
    marginBottom: 14,
    borderRadius: 20,
    overflow: "hidden",

    justifyContent: "flex-end",

    elevation: 7,
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    backgroundColor: "#000",
  },

  serviceGridImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "cover",
  },

  serviceGridCardInner: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(0,0,0,0.28)",
  },

  serviceGridText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",

    paddingHorizontal: 14,
    paddingBottom: 12,

    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },

  serviceGridTextLarge: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",

    paddingHorizontal: 14,
    paddingBottom: 12,

    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
  },

  /* =========================
      ACCIONES RÁPIDAS
  ========================= */

  actionsSection: {
    marginTop: 10,
    paddingHorizontal: 20,
  },

  actionsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: 10,
  },

  actionsDescription: {
    fontSize: 15,
    textAlign: "center",
    color: "#666",
    marginBottom: 22,
    lineHeight: 22,
  },

  cardsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  card: {
    width: "31%",
    backgroundColor: "#fff",

    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 10,

    alignItems: "center",

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },

  cardIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
    resizeMode: "contain",
  },

  cardText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
    color: "#111",
  },

  /* =========================
      POPUP REDES SOCIALES
  ========================= */

  socialModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10, 15, 25, 0.92)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },

  socialModalCard: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#F4F6FA",
    borderRadius: 28,
    overflow: "hidden",

    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  socialModalHeader: {
    width: "100%",
    height: 64,
    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E8F0",
  },

  socialModalTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0A1F44",
  },

  socialModalCloseButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#EEF1F6",

    justifyContent: "center",
    alignItems: "center",
  },

  socialModalDescription: {
    fontSize: 15,
    color: "#5E6675",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 18,
  },

  socialIconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 18,
    paddingBottom: 28,
    gap: 10,
  },

  socialItem: {
    flex: 1,
    alignItems: "center",
  },

  socialIconBox: {
    width: 78,
    height: 78,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",

    justifyContent: "center",
    alignItems: "center",

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  socialName: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
    color: "#0A1F44",
    textAlign: "center",
  },

  /* =========================
      FILTROS
  ========================= */

  filtersContainer: {
    marginBottom: 15,
  },

  filterItem: {
    backgroundColor: "#eee",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  activeFilter: {
    backgroundColor: "#FFD580",
  },

  filterText: {
    fontSize: 13,
    fontWeight: "500",
  },

  /* =========================
      SEARCH
  ========================= */

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#fff",

    borderRadius: 25,

    paddingHorizontal: 15,
    paddingVertical: 12,

    marginBottom: 20,

    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },

  searchClear: {
    fontSize: 15,
    color: "#999",
    paddingHorizontal: 4,
  },

  suggestionsBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginTop: -8,
    marginBottom: 18,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  suggestionItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF1F6",
  },

  suggestionItemLast: {
    borderBottomWidth: 0,
  },

  suggestionText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0A1F44",
  },

  suggestionCategory: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  /* =========================
      SERVICIOS
  ========================= */

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  serviceCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    alignItems: "center",
    elevation: 4,
  },

  serviceImage: {
    width: 75,
    height: 75,
    borderRadius: 40,
    marginRight: 12,
  },

  serviceText: {
    flex: 1,
  },

  badge: {
    backgroundColor: "#2f5aa8",
    color: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    fontSize: 10,
    alignSelf: "flex-start",
    marginBottom: 5,
  },

  serviceTitle: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#111",
  },

  serviceDescription: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  /* =========================
      GALERIA
  ========================= */

  sectionTitleGalery: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0A1F44",
  },

  sectionSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 12,
    color: "#0A1F44",
  },

  carousel: {
    marginBottom: 20,
  },

  carouselCard: {
    width: 170,
    height: 130,
    marginRight: 15,
    borderRadius: 18,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  carouselCardClip: {
    flex: 1,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#0A1F44",
  },

  carouselCardActive: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 3,
    borderColor: "#0A1F44",
    borderRadius: 18,
  },

  galleryGridHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  galleryResetLink: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2f5aa8",
  },

  carouselImage: {
    width: "100%",
    height: "100%",
  },

  carouselText: {
    position: "absolute",
    bottom: 10,
    left: 10,

    color: "#fff",
    fontWeight: "bold",

    backgroundColor: "rgba(0,0,0,0.4)",

    paddingHorizontal: 8,
    paddingVertical: 4,

    borderRadius: 6,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  gridCardGalery: {
    width: "48%",
    height: 140,
    marginBottom: 15,
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 5,
  },

  gridImage: {
    width: "100%",
    height: "100%",
  },

  /* =========================
      POPUP GALERÍA
  ========================= */

  galleryModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(10, 15, 25, 0.94)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
  },

  galleryModalCard: {
    width: "100%",
    maxWidth: 420,
    minHeight: 500,
    maxHeight: "78%",

    backgroundColor: "#F4F6FA",
    borderRadius: 28,
    overflow: "hidden",

    elevation: 12,
    shadowColor: "#000",
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },

  galleryModalHeader: {
    width: "100%",
    height: 64,
    paddingHorizontal: 18,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E4E8F0",
  },

  galleryModalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0A1F44",
  },

  galleryModalCloseButton: {
    width: 42,
    height: 42,
    borderRadius: 21,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#EEF1F6",
  },

  galleryModalImageContainer: {
    flex: 1,
    padding: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  galleryModalImage: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
    resizeMode: "contain",
    backgroundColor: "#FFFFFF",
  },

  /* =========================
      SERVICIOS NUEVOS
  ========================= */

  servicesMainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#0A1F44",
    marginBottom: 20,
  },

  filterCard: {
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,

    elevation: 3,
  },

  servicesSectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A1F44",
    marginBottom: 15,
  },

  servicesGridBottom: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },

  servicesMiniCard: {
    width: "31%",
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 12,

    alignItems: "center",
    justifyContent: "center",

    minHeight: 105,

    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },

  servicesMiniIcon: {
    fontSize: 25,
    marginBottom: 6,
  },

  servicesMiniTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0A1F44",
    textAlign: "center",
    marginBottom: 4,
  },

  servicesMiniText: {
    fontSize: 10.5,
    color: "#666",
    textAlign: "center",
    lineHeight: 14,
  },

  /* =========================
      TRABAJA CON NOSOTROS
  ========================= */

  workHeader: {
    paddingHorizontal: 20,
    paddingTop: 25,
  },

  workTitle: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#0A1F44",
  },

  workSubtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    lineHeight: 28,
  },

  workCard: {
    backgroundColor: "#fff",
    margin: 20,
    borderRadius: 24,
    padding: 20,

    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  workCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },

  workIconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#EAF0FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  workCardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A1F44",
  },

  workCardSub: {
    color: "#666",
    marginTop: 5,
    fontSize: 15,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#E5E5E5",

    borderRadius: 18,

    paddingHorizontal: 15,
    paddingVertical: 15,

    marginBottom: 18,
  },

  inputIcon: {
    marginRight: 14,
  },

  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0A1F44",
    marginBottom: 5,
  },

  input: {
    fontSize: 16,
    color: "#333",
  },

  messageContainer: {
    flexDirection: "row",

    borderWidth: 1,
    borderColor: "#E5E5E5",

    borderRadius: 18,

    paddingHorizontal: 15,
    paddingVertical: 15,

    marginBottom: 25,
  },

  messageInput: {
    minHeight: 120,
    fontSize: 16,
    color: "#333",
  },

  counter: {
    alignSelf: "flex-end",
    color: "#999",
    marginTop: 10,
  },

  securityBox: {
    flexDirection: "row",
    backgroundColor: "#F3F6FF",

    borderRadius: 20,
    padding: 18,

    marginBottom: 25,
  },

  securityIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,

    backgroundColor: "#E1E9FF",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  securityTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0A1F44",
    marginBottom: 6,
  },

  securityText: {
    fontSize: 15,
    color: "#444",
    lineHeight: 24,
  },

  privacyNotice: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginTop: 12,
    marginBottom: 18,
  },

  privacyNoticeText: {
    color: "#0A1F44",
    fontSize: 14,
    textAlign: "center",
    marginLeft: 8,
  },

  submitButton: {
    backgroundColor: "#0A1F44",

    borderRadius: 18,

    paddingVertical: 18,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 4,
  },

  submitButtonText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 12,
  },

  servicesMiniCardActive: {
    backgroundColor: "#0A1F44",
  },

  servicesMiniTitleActive: {
    color: "#fff",
  },

  servicesMiniTextActive: {
    color: "#DDE6F7",
  },

  noServicesBox: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 20,
    marginTop: 10,
    alignItems: "center",
    elevation: 3,
  },

  noServicesText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
});

export default styles;
