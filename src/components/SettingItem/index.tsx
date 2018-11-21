import * as React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  RotateTransform,
  ImageSourcePropType
} from "react-native";
import Images from "../../assets/images";
import Button from "../Button";
import commonStyle from "../../utils/commonStyle";
import deviceInfo from "../../utils/deviceInfo";
import { px2dp } from "../../utils/pxUtils";

interface SettingItemProps {
  title: string;
  onPress: () => void;
  style?: any;
  content?: string | ImageSourcePropType;
}

const SettingItem: React.SFC<SettingItemProps> = ({
  onPress,
  title,
  style,
  content
}) => (
  <Button onPress={onPress} special style={[styles.container, style]}>
    <View style={styles.wrapText}>
      <Text style={styles.text}>{title}</Text>
    </View>
    <View style={styles.images}>
      <View style={styles.content}>
        {typeof content === "string" ? (
          <Text style={styles.contentText}>{content}</Text>
        ) : (
          <Image source={content} />
        )}
      </View>

      <Image
        source={Images.down}
        style={{ transform: [{ rotate: "-90deg" }] }}
      />
    </View>
  </Button>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: deviceInfo.deviceWidth,
    height: px2dp(46),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f4f4f4",
    backgroundColor: commonStyle.backgroundColor
  },
  wrapText: {
    flex: 1,
    marginLeft: px2dp(14)
  },
  text: {
    fontSize: px2dp(15),
    color: commonStyle.navigatorTitleColor
  },
  images: {
    marginRight: px2dp(14),
    flexDirection: "row",
    alignItems: "center"
  },
  content: {
    marginRight: px2dp(17)
  },
  contentText: {
    // textAlignVertical:'center',
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(12),
    color: "#999999"
  }
});

export default SettingItem;
