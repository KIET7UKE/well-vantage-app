import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../../constants/colors";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundDark,
  },
  backgroundImage: {
    width: width,
    height: height,
  },
  gradientOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  logoWrapper: {
    marginBottom: 24,
  },
  logoContainer: {
    // backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 20,
  },
  logo: {
    width: 200,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: COLORS.white,
    letterSpacing: -1.5,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    color: COLORS.white90,
    fontStyle: "italic",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  bottomBarContainer: {
    position: "absolute",
    bottom: 48,
    width: "100%",
    alignItems: "center",
  },
  bottomBar: {
    width: 48,
    height: 4,
    backgroundColor: COLORS.white20,
    borderRadius: 2,
  },
});
