import { NavigationInjectedProps } from "react-navigation";
import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import commonStyle from "../../utils/commonStyle";
import CustomInput from "../../components/CustomInput";
import Images from "../../assets/images";
import Button from "../../components/Button";
import { px2dp } from "../../utils/pxUtils";

interface RegisterPageProps extends NavigationInjectedProps {}
interface RegisterPageState {
  // 邮箱手机号
  mobile: string;
  // 验证码
  capCode: string;
  //密码
  password: string;
}

class RegisterPage extends Component<RegisterPageProps, RegisterPageState> {
  static navigationOptions = ({ navigation }: RegisterPageProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    )
  });

  constructor(props: RegisterPageProps) {
    super(props);
    this.state = {
      mobile: "",
      capCode: "",
      password: ""
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <CustomInput
            icon={Images.mobile}
            placeholder={"请输入手机/邮箱"}
            onChange={mobile => mobile && this.setState({ mobile })}
          />
          <CustomInput
            icon={Images.password}
            placeholder={"输入验证码"}
            onChange={mobile => mobile && this.setState({ mobile })}
            hasCode
          />
          <CustomInput
            icon={Images.password}
            placeholder={"登录密码(6-16位数字字母组合)"}
            onChange={mobile => mobile && this.setState({ mobile })}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={() => {}} text={"注册"} />
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerLeftText}>*注册代表同意</Text>
          <Button onPress={() => {}} special>
            <Text style={styles.footerRightText}>《用户使用协议》</Text>
          </Button>
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
    marginTop: px2dp(47)
  },
  button: {
    marginTop: px2dp(37)
  },
  buttonText: {
    width: px2dp(36),
    height: px2dp(17),
    fontFamily: commonStyle.normalFont,
    fontSize: px2dp(18),
    color: commonStyle.navigatorTitleColor
  },
  footer: {
    marginTop: px2dp(15),
    flexDirection: "row"
  },
  footerLeftText: {
    fontSize: px2dp(12),
    fontFamily: commonStyle.lightFont,
    color: commonStyle.describeTextColor
  },
  footerRightText: {
    fontSize: px2dp(12),
    fontFamily: commonStyle.lightFont,
    color: commonStyle.themeColor
  }
});

export default RegisterPage;
