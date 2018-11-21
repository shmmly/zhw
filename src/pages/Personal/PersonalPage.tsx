import { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import * as React from "react";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { NavigationInjectedProps } from "react-navigation";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import SettingItem from "../../components/SettingItem";
// 这里需要传入登录状态
// 或者自己调用api查看当前的登录状态
// 或者看本地的localstage中是否有数据，如果有那么就是登录状态，如果没有就是未登录
interface PersonalPageProps extends NavigationInjectedProps {}

interface PersonalPageState {}

class PersonalPage extends Component<PersonalPageProps, PersonalPageState> {
  static navigationOptions = ({ navigation }: PersonalPageProps) => ({
    headerRight: (
      <Button
        onPress={() => navigation.navigate("MessagePage")}
        style={styles.setting}
        special
      >
        <Image source={Images.setting} />
      </Button>
    )
  });
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Image
              source={Images.avatar}
              style={{
                width: px2dp(73),
                height: px2dp(72)
              }}
            />
          </View>
          <Button
            onPress={() => navigation.navigate("UserInfoPage")}
            special
            style={styles.text}
          >
            <Text style={styles.mainText}>BIUBIU</Text>
            <Text style={styles.subText}>查看并编辑个人资料</Text>
          </Button>
        </View>
        <View style={styles.middleStyle}>
          <Button
            onPress={() => navigation.navigate("DiscountPage")}
            special
            style={styles.middleLeft}
          >
            <Image source={Images.discount} style={{
              width:px2dp(52),
              height:px2dp(52)
            }} />
            <View style={styles.middleText}>
              <Text style={styles.middleMainText}>优惠券</Text>
              <Text style={styles.middleSubText}>0张</Text>
            </View>
          </Button>
          <View style={styles.verticalLine} />
          <Button
            onPress={() => navigation.navigate("CarManageOnePage")}
            special
            style={styles.middleRight}
          >
            <Image source={Images.carType} 
            style={{
              width:px2dp(52),
              height:px2dp(52)
            }}/>
            <View style={styles.middleText}>
              <Text style={styles.middleMainText}>车型</Text>
              <Text style={styles.middleSubText}>苏A 88888</Text>
            </View>
          </Button>
        </View>
        <View style={styles.threeItem}>
          <SettingItem
            title={"停车记录"}
            onPress={() => navigation.navigate("ParkRecordPage")}
          />
          <SettingItem
            title={"支付设置"}
            onPress={() => navigation.navigate("PaySettingPage")}
          />
          <SettingItem
            title={"系统设置"}
            onPress={() => navigation.navigate("SystemSettingPage")}
          />
        </View>
        <View style={styles.twoItem}>
          <SettingItem
            title={"意见反馈"}
            onPress={() => navigation.navigate("SuggestPage")}
          />
          <SettingItem
            title={"关于我们"}
            onPress={() => navigation.navigate("AboutPage")}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  setting: {
    marginRight: px2dp(21),
    marginTop: px2dp(14),
    marginBottom: px2dp(10)
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: commonStyle.otherBackgroundColor
  },
  header: {
    width: px2dp(375),
    height: px2dp(101),
    backgroundColor: commonStyle.themeColor,
    flexDirection: "row"
  },
  avatar: {
    marginLeft: px2dp(14),
    marginBottom: px2dp(32)
  },
  text: {
    marginLeft: px2dp(12),
    marginTop: px2dp(21),
  },
  mainText: {
    fontSize: px2dp(18),
    color: commonStyle.navigatorTitleColor
  },
  subText: {
    fontSize: px2dp(10),
    color: commonStyle.navigatorTitleColor
  },
  middleStyle: {
    marginTop: px2dp(14),
    width: px2dp(375),
    height: px2dp(71),
    backgroundColor: commonStyle.backgroundColor,
    flexDirection: "row"
    // alignItems: "center"
  },
  middleLeft: {
    flex: 1,
    flexDirection: "row",
    marginLeft: px2dp(41),
    marginBottom: px2dp(9),
    marginTop: px2dp(11),
    marginRight: px2dp(46)
  },
  verticalLine: {
    marginTop: px2dp(17),
    width: StyleSheet.hairlineWidth,
    height: px2dp(57),
    backgroundColor: "#f4f4f4"
  },
  middleRight: {
    marginLeft: px2dp(39),
    flex: 1,
    marginBottom: px2dp(9),
    marginTop: px2dp(11),
    flexDirection: "row",
    marginRight: px2dp(38)
  },
  middleText: {
    marginTop: px2dp(12),
    marginLeft: px2dp(5),
    paddingVertical:0
  },
  middleMainText: {
    fontSize: px2dp(15),
    color: "#333333",
    paddingVertical:0
  },
  middleSubText: {
    fontSize: px2dp(12),
    color: "#666666",
    paddingVertical:0
  },
  threeItem: {
    marginTop: px2dp(14)
  },
  twoItem: {
    marginTop: px2dp(14)
  }
});

export default PersonalPage;
