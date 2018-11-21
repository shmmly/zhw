import deviceInfo from "../../utils/deviceInfo";
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import * as React from "react";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
/**
 * special 用于，将button作为一个容器，里面填充进children的时候使用，
 * 这个时候，不单单是名字上的button，而是手机上的所有的触发组件
 */
type buttonProps = {
  onPress: () => void;
  style?: any;
  // 是否是特殊的button组件，如果是特殊的那么就渲染children
  special?: boolean;
  // 非特殊 正常情况下button中显示的中文字
  text?: string;
  btnStyle?: any;
};

const Button: React.SFC<buttonProps> = ({
  onPress,
  style,
  children,
  special = false,
  text,
  btnStyle
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[special ? style : styles.button, btnStyle]}
  >
    {special ? children : <Text style={styles.buttonText}>{text}</Text>}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    width: px2dp(346),
    height: px2dp(46),
    borderRadius: px2dp(23),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: commonStyle.themeColor
  },
  buttonText: {
    fontSize: px2dp(18),
    textAlign: "center",
    color: commonStyle.navigatorTitleColor
  }
});

export default Button;
