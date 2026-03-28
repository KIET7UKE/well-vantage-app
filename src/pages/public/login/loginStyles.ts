import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || "#0F0C08",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    flexGrow: 1,
  },
  heroSection: {
    height: height * 0.45,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "flex-end",
  },
  brandContainer: {
    padding: 30,
    alignItems: "center",
  },
  logoIcon: {
    width: 120,
    height: 120,
  },
  contentArea: {
    flex: 1,
    backgroundColor: COLORS.background || "#0F0C08",
    marginTop: -30,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  headerTextContainer: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary || "#f4632a",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.white || "#ffffff",
    lineHeight: 40,
    marginBottom: 16,
  },
  titleHighlight: {
    color: COLORS.primary || "#f4632a",
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray400 || "#94A3B8",
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 30,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white || "#ffffff",
    borderRadius: 16,
    paddingVertical: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000000",
    marginLeft: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: COLORS.gray500 || "#64748B",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxActive: {
    backgroundColor: COLORS.primary || "#f4632a",
    borderColor: COLORS.primary || "#f4632a",
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray400 || "#94A3B8",
    lineHeight: 18,
  },
  termsText: {
    color: COLORS.primary || "#f4632a",
    fontWeight: "600",
  },
});
