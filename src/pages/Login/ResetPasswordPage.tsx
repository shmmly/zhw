import { NavigationInjectedProps } from "react-navigation";
import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import CustomInput from "../../components/CustomInput";
import Images from "../../assets/images";
import Button from "../../components/Button";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
import CapCode from "../../components/CapCode";

interface ResetPasswordPageProps extends NavigationInjectedProps {}

interface ResetPasswordPageState {
  password: string;
  capCode: string;
}

class ResetPasswordPage extends Component<
  ResetPasswordPageProps,
  ResetPasswordPageState
> {
  static navigationOptions = ({ navigation }: ResetPasswordPageProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    )
  });

  constructor(props: ResetPasswordPageProps) {
    super(props);
    this.state = {
      password: "",
      capCode: ""
    };
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <View style={styles.capCode}>
            <CustomInput
              icon={Images.password}
              placeholder={"输入验证码"}
              onChange={capCode => capCode && this.setState({ capCode })}
              hasCode
            />
          </View>
          <CustomInput
            icon={Images.password}
            placeholder={"重置密码(6-16位数字字母组合)"}
            onChange={password => password && this.setState({ password })}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={() => {}} text={"完成"} />
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
  capCode: {
    flexDirection: "row"
  },
  input: {
    marginTop: px2dp(47),
    alignItems: "center"
  },
  button: {
    marginTop: px2dp(37)
  }
});
export default ResetPasswordPage;
