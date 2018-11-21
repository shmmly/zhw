import { createStackNavigator } from "react-navigation";
import LoginPage from "./LoginPage";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import InputMobilePage from "./InputMobilePage";
import ResetPasswordPage from "./ResetPasswordPage";
import RegisterPage from "./RegisterPage";

const StatusBarStyle = {
  headerStyle: {
    backgroundColor: commonStyle.themeColor
  },
  headerTitleStyle: {
    fontFamily: commonStyle.normalFont,
    fontSize: 18,
    color: commonStyle.navigatorTitleColor,
    textAlign: "center",
    marginBottom: px2dp(14),
    marginTop: px2dp(13),
    flex:1
  }
};

const LoginStack = createStackNavigator(
  {
    LoginPage: {
      screen: LoginPage,
      navigationOptions: () => ({
        title: "登录",
        ...StatusBarStyle
      })
    },
    InputMobilePage: {
      screen: InputMobilePage,
      navigationOptions: () => ({
        title: "输入手机号",
        ...StatusBarStyle
      })
    },
    ResetPasswordPage: {
      screen: ResetPasswordPage,
      navigationOptions: () => ({
        title: "重置密码",
        ...StatusBarStyle
      })
    },
    RegisterPage: {
      screen: RegisterPage,
      navigationOptions: () => ({
        title: "注册账号",
        ...StatusBarStyle
      })
    }
  },
  {
    initialRouteName: "LoginPage"
  }
);

export default LoginStack;
