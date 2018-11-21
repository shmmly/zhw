import { NavigationInjectedProps } from "react-navigation";
import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import Images from "../../assets/images";
import Button from "../../components/Button";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";

interface InputMobilePageProps extends NavigationInjectedProps {}

interface InputMobilePageState {
  mobile: string;
}

class InputMobilePage extends Component<
  InputMobilePageProps,
  InputMobilePageState
> {
  static navigationOptions = ({ navigation }: InputMobilePageProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    )
  });

  constructor(props: InputMobilePageProps) {
    super(props);
    this.state = {
      mobile: ""
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <CustomInput
            icon={Images.mobile}
            placeholder={"请输入手机号/邮箱"}
            onChange={mobile => mobile && this.setState({ mobile })}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate("ResetPasswordPage")}
            text={"下一步"}
          />
        </View>
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
  button: {
    marginTop: px2dp(30)
  }
});
export default InputMobilePage;
