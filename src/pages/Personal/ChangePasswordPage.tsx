import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import Button from "../../components/Button";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
import { NavigationInjectedProps } from "react-navigation";
import Images from "../../assets/images";

class ChangePasswordPage extends Component {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <CustomInput
            placeholder={"请输入旧密码"}
            onChange={() => {}}
            title={"旧密码"}
          />
          <CustomInput
            placeholder={"请输入新密码(6-16位)"}
            onChange={() => {}}
            title={"新密码"}
          />
          <CustomInput
            placeholder={"请再次输入新密码"}
            onChange={() => {}}
            title={"新密码"}
          />
        </View>
        <Button text={"保存"} onPress={() => {}} btnStyle={styles.btnStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    marginLeft: px2dp(15),
    marginTop: px2dp(11),
    marginBottom: px2dp(13)
  },
  container: {
    flex: 1,
    backgroundColor: commonStyle.backgroundColor,
    alignItems: "center"
  },
  input: {
    marginTop: px2dp(53)
  },
  btnStyle: {
    marginTop: px2dp(42)
  }
});

export default ChangePasswordPage;
