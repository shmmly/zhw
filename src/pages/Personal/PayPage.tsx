import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Text, Image, Alert } from "react-native";
import deviceInfo from "../../utils/deviceInfo";
import { px2dp } from "../../utils/pxUtils";
import Button from "../../components/Button";
import Images from "../../assets/images";
import commonStyle from "../../utils/commonStyle";
import { NavigationInjectedProps } from "react-navigation";
import * as WeChat from "react-native-wechat";
import Alipay from "react-native-yunpeng-alipay";
import UPPayControl from "react-native-giti-unionpay";

interface ItemProps {
  title: string;
  icon: any;
  subTitle: string;
  checked?: boolean;
  onPress: () => void;
}

const Item: React.SFC<ItemProps> = ({
  title,
  subTitle,
  icon,
  checked = false,
  onPress
}) => (
  <Button special onPress={onPress} style={itemStyles.container}>
    <View style={itemStyles.wrapLeft}>
      <View style={itemStyles.image}>
        <Image source={icon} />
      </View>
      <View style={itemStyles.wrapText}>
        <Text style={itemStyles.mainText}>{title}</Text>
        <Text style={itemStyles.subText}>{subTitle}</Text>
      </View>
    </View>
    <View style={itemStyles.check}>
      {checked ? (
        <Image source={Images.checked} />
      ) : (
        <Image source={Images.unCheck} />
      )}
    </View>
  </Button>
);

const itemStyles = StyleSheet.create({
  container: {
    marginTop: px2dp(24),
    width: px2dp(347),
    height: px2dp(40),
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: commonStyle.borderColor
  },
  image: {},
  wrapText: {
    marginLeft: px2dp(10)
  },
  mainText: {
    fontFamily: "SourceHanSansCN-Light",
    fontSize: 14,
    color: "#333333"
  },
  subText: {
    width: 114,
    height: 12,
    fontFamily: "SourceHanSansCN-Light",
    fontSize: 12,
    color: "#c4c4c4"
  },
  check: {
    marginRight: px2dp(4)
  },
  wrapLeft: {
    flex: 1,
    flexDirection: "row",
    alignContent: "center"
  }
});

type PayPageState = {
  wechatCheck: boolean;
  aliCheck: boolean;
  yinlianCheck: boolean;
};

interface PayPageProps extends NavigationInjectedProps {}

class PayPage extends Component<PayPageProps, PayPageState> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });

  constructor(props: PayPageProps) {
    super(props);
    this.state = {
      wechatCheck: true,
      aliCheck: false,
      yinlianCheck: false
    };
  }

  render() {
    const { navigation } = this.props;
    const { wechatCheck, aliCheck, yinlianCheck } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.wrapText}>
            <Text style={styles.mainText}>10.50</Text>
            <Text style={styles.subText}>元</Text>
          </View>
          <Button
            style={styles.setting}
            special
            onPress={() => navigation.navigate("PaySettingPage")}
          >
            <Text style={styles.settingText}>自动支付设置</Text>
          </Button>
        </View>
        <View style={styles.wrapSelected}>
          <Text style={styles.text}>请选择支付方式</Text>
        </View>

        <View style={styles.item}>
          <Item
            icon={Images.wechatPay}
            onPress={() => {
              this.setState({
                wechatCheck: true,
                aliCheck: false,
                yinlianCheck: false
              });
            }}
            checked={wechatCheck}
            title={"微信支付"}
            subTitle={"安全可靠,后顾无忧。"}
          />
          <Item
            icon={Images.aliPay}
            title={"支付宝支付"}
            subTitle={"支付宝，知托付。"}
            checked={aliCheck}
            onPress={() => {
              this.setState({
                wechatCheck: false,
                aliCheck: true,
                yinlianCheck: false
              });
            }}
          />
          <Item
            icon={Images.yinlianPay}
            title={"智联支付"}
            subTitle={"智联随行,世界随心！"}
            onPress={() => {
              this.setState({
                wechatCheck: false,
                aliCheck: false,
                yinlianCheck: true
              });
            }}
            checked={yinlianCheck}
          />
        </View>
        <Button
          onPress={this.handlePay}
          btnStyle={styles.btnStyle}
          text={"立即支付"}
        />
      </View>
    );
  }
  //  执行支付的操作
  private handlePay = () => {
    const { aliCheck, wechatCheck, yinlianCheck } = this.state;
    // 支付宝支付
    if (aliCheck) {
      //pay的参数是后台返回的带有签证加密的字符串
      Alipay.pay("").then(
        res => {},
        err => {
          console.log(err);
        }
      );
    } else if (wechatCheck) {
      // 微信支付
      WeChat.isWXAppInstalled().then(isInstall => {
        if (isInstall) {
          // 这些参数应该是从后台获取的
          // 第一步将消费信息发送给服务端
          // 服务端返回消费信息，然后我调用微信sdk 发送给微信，并打开微信进行支付
          WeChat.pay({
            partnerId: "",
            preparId: "",
            nonceStr: "",
            timeStamp: "",
            package: "",
            sign: ""
          })
            .then(res => {
              if (res.errCode === "0") {
                // 这里是支付成功
              }
            })
            .catch(err => {
              Alert.alert("支付失败");
            });
        } else {
          Alert.alert("请安装微信");
        }
      });
    } else if (yinlianCheck) {
      // 银联支付
      // pay 参数为后台生成的相关订单信息 第二个参数判断是否是生成环境
      UPPayControl.pay("", false).then(
        resp => {
          console.log("支付成功：" + resp);
        },
        err => {
          console.log("支付失败:" + err);
        }
      );
    }
  };
}

const styles = StyleSheet.create({
  back: {
    marginLeft: px2dp(15),
    marginTop: px2dp(11),
    marginBottom: px2dp(13)
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: commonStyle.backgroundColor
  },
  headerContainer: {
    width: deviceInfo.deviceWidth,
    height: px2dp(71),
    backgroundColor: "#ffda44",
    flexDirection: "row",
    alignItems: "center"
  },
  wrapText: {
    flex: 1,
    flexDirection: "row",
    alignItems: "baseline",
    marginLeft: px2dp(29)
  },
  mainText: {
    fontSize: px2dp(31),
    color: "#333333"
  },
  subText: {
    fontSize: px2dp(12),
    color: "#333333"
    // alignSelf: "flex-end"
  },
  setting: {
    width: px2dp(91),
    height: px2dp(20),
    borderRadius: 10,
    backgroundColor: "#ff6744",
    alignItems: "center",
    justifyContent: "center",
    marginRight: px2dp(29)
  },
  settingText: {
    fontSize: 11,
    color: "#ffffff"
  },
  wrapSelected: {
    marginTop: px2dp(34),
    marginLeft: px2dp(28),
    alignSelf: "flex-start"
  },
  item: {
    marginTop: px2dp(9)
  },
  text: {
    fontSize: px2dp(15),
    color: "#333333"
  },
  btnStyle: {
    marginTop: px2dp(75),
    width: px2dp(359),
    height: px2dp(38),
    borderRadius: 19,
    backgroundColor: "#ffd426"
  }
});

export default PayPage;
