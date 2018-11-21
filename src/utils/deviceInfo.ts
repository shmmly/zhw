import { Dimensions, PixelRatio, Platform } from "react-native";

export default {
  deviceWidth: Dimensions.get("window").width,
  deviceHeight: Dimensions.get("window").height,
  onePixel: 1 / PixelRatio.get(),
  isIos: Platform.OS === "ios"
};
