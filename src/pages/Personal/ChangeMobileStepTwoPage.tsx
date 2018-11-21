import { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import * as React from "react";
import CustomInput from "../../components/CustomInput";
import Images from "../../assets/images";
import Button from "../../components/Button";
import { px2dp } from "../../utils/pxUtils";
import { NavigationInjectedProps } from "react-navigation";
import commonStyle from "../../utils/commonStyle";
interface InputNewMobileProps extends NavigationInjectedProps {}

class ChangeMobileStepTwoPage extends Component<InputNewMobileProps, {}> {
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
            icon={Images.mobile}
            placeholder={"请输入新手机号"}
            onChange={() => {}}
          />
        </View>
        <Button
          text={"下一步"}
          onPress={() => navigation.navigate("ChangeMobileStepThreePage")}
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
    marginTop: px2dp(40),
    marginLeft: px2dp(17)
  },
  btnStyle: {
    marginTop: px2dp(40)
  }
});

export default ChangeMobileStepTwoPage;
