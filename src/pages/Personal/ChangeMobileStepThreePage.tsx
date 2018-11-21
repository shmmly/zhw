import { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as React from "react";
import CustomInput from "../../components/CustomInput";
import Images from "../../assets/images";
import Button from "../../components/Button";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import { NavigationInjectedProps } from "react-navigation";

interface ChangeMobilePageProps extends NavigationInjectedProps {}

class ChangeMobileStepThreePage extends Component<ChangeMobilePageProps, {}> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <CustomInput
            onChange={() => {}}
            icon={Images.password}
            placeholder={"输入验证码"}
            hasCode
          />
          <CustomInput
            onChange={() => {}}
            icon={Images.password}
            placeholder={"登录密码(6-16位数字字母组合)"}
          />
        </View>
        <Button
          text={"完成换绑"}
          onPress={() => {}}
          btnStyle={styles.btnStyle}
        />
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
    marginTop: px2dp(42)
  },
  btnStyle: {
    marginTop: px2dp(42)
  }
});

export default ChangeMobileStepThreePage;
