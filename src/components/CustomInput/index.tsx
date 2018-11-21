import { View, TextInput, Image, StyleSheet, Text } from "react-native";
import commonStyle from "../../utils/commonStyle";
import * as React from "react";
import { px2dp } from "../../utils/pxUtils";
import CapCode from "../CapCode";

type CustomInputProps = {
  title?: any;
  icon?: any;
  onChange: (value: string) => void;
  placeholder: string;
  hasCode?: boolean;
};

const CustomInput: React.SFC<CustomInputProps> = ({
  icon,
  title,
  onChange,
  placeholder,
  hasCode = false
}) => (
  <View style={styles.container}>
    <View style={styles.input}>
      {icon ? (
        <View style={styles.image}>
          <Image source={icon} />
        </View>
      ) : null}
      {title ? (
        <View style={styles.title}>
          <Text>{title}</Text>
        </View>
      ) : null}

      <View style={styles.inputText}>
        <TextInput placeholder={placeholder} onChangeText={onChange} />
      </View>
      {hasCode && (
        <View style={styles.capCode}>
          <CapCode />
        </View>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: px2dp(347),
    height: px2dp(40),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f1f1f1",
    marginBottom: px2dp(15)
  },
  title: {
    fontFamily: "SourceHanSansCN-Normal",
    fontSize: 14,
    color: "#333333",
    marginRight: px2dp(14)
  },
  image: {
    marginRight: px2dp(14)
  },
  input: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputText: {
    flex: 1
  },
  capCode: {
    width: px2dp(61)
  }
});

export default CustomInput;
