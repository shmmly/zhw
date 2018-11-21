import {Component} from 'react';
import {View, StyleSheet, Image, Text, TextInput} from 'react-native';
import Images from '../../assets/images';
import CustomInput from '../../components/CustomInput';
import * as React from 'react';
import Button from '../../components/Button';
import {NavigationInjectedProps} from 'react-navigation';
import {px2dp} from '../../utils/pxUtils';
import commonStyle from '../../utils/commonStyle';
import SplashScreen from 'react-native-splash-screen';
interface LoginPageState {
  mobile: string;
  password: string;
}

interface LoginPageProps extends NavigationInjectedProps {}

class LoginPage extends Component<LoginPageProps, LoginPageState> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
    };
  }
  // 登录页面加载完成之后就关闭首页的启动屏幕
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={Images.logo} />
        </View>
        <CustomInput
          icon={Images.user}
          placeholder="请输入手机号/邮箱"
          onChange={mobile => {
            mobile && this.setState({mobile});
          }}
        />
        <CustomInput
          icon={Images.password}
          placeholder="密码"
          onChange={password => {
            password && this.setState({password});
          }}
        />
        <View style={styles.button}>
          <Button onPress={() => navigation.navigate('Home')} text={'登录'} />
        </View>

        <View style={styles.footer}>
          <Button
            onPress={() => navigation.navigate('InputMobilePage')}
            special>
            <Text style={styles.footerLeftText}>忘记密码?</Text>
          </Button>
          <View style={styles.verticalLine} />
          <Button onPress={() => navigation.navigate('RegisterPage')} special>
            <Text style={styles.footerRightText}>立即注册 ></Text>
          </Button>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: commonStyle.backgroundColor,
  },
  logo: {
    marginTop: px2dp(41),
    marginBottom: px2dp(57),
  },
  button: {
    width: px2dp(346),
    height: px2dp(46),
    borderRadius: px2dp(23),
    backgroundColor: commonStyle.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px2dp(39),
  },
  btnText: {
    width: px2dp(36),
    height: px2dp(17),
    fontFamily: commonStyle.normalFont,
    fontSize: px2dp(18),
    color: commonStyle.navigatorTitleColor,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerLeftText: {
    marginTop: px2dp(15),
    marginRight: px2dp(16),
    fontFamily: commonStyle.lightFont,
    fontSize: px2dp(12),
    color: commonStyle.describeTextColor,
  },
  verticalLine: {
    marginTop: px2dp(17),
    width: StyleSheet.hairlineWidth,
    height: px2dp(8),
    borderStyle: 'solid',
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderColor: commonStyle.describeTextColor,
  },
  footerRightText: {
    marginTop: px2dp(15),
    marginLeft: px2dp(14),
    fontFamily: commonStyle.lightFont,
    fontSize: px2dp(12),
    color: commonStyle.describeTextColor,
  },
});

export default LoginPage;
