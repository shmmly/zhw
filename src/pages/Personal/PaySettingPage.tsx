import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { px2dp } from "../../utils/pxUtils";
import Images from "../../assets/images";
import commonStyle from "../../utils/commonStyle";
import { NavigationInjectedProps } from "react-navigation";
import Button from "../../components/Button";

interface ItemProps {
  /**
   * 标题文字
   */
  title: string;
  /**
   * 对应支付宝等图标
   */
  icon: any;
  /**
   * 是否开通的标识
   */
  status?: boolean;
  /**
   * 点击之后的回调
   */
  onPress: () => void;
}

const Item: React.SFC<ItemProps> = ({
  title,
  icon,
  status = false,
  onPress
}) => (
  <Button special style={itemStyles.container} onPress={onPress}>
    <View style={itemStyles.wrapTitle}>
      <Text style={itemStyles.title}>{title}</Text>
    </View>
    <View style={itemStyles.content}>
      <View style={itemStyles.image}>
        <Image source={icon} />
      </View>
      <View style={itemStyles.wrapStatus}>
        <View style={itemStyles.wrapText}>
          <Text style={itemStyles.statusText}>
            {status ? "已开通" : "未开通"}
          </Text>
        </View>
        <Image
          source={Images.down}
          style={{ transform: [{ rotate: "-90deg" }] }}
        />
      </View>
    </View>
  </Button>
);

const itemStyles = StyleSheet.create({
  container: {
    marginTop: px2dp(14),
    width: px2dp(364),
    height: px2dp(114),
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 10,
    shadowOpacity: 1
  },

  wrapTitle: {
    marginTop: px2dp(16),
    marginLeft: px2dp(20)
  },
  title: {
    // fontFamily: "SourceHanSansCN-Normal",
    fontSize: 15,
    color: "#333333"
  },
  content: {
    marginTop: px2dp(16),
    marginLeft: px2dp(20),
    marginBottom: px2dp(16),
    flexDirection: "row"
  },
  image: {
    flex: 1
  },
  statusText: {
    // width: 44,
    // height: 14,
    fontSize: px2dp(15),
    color: "#333333"
  },
  wrapStatus: {
    marginRight: px2dp(20),
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end"
  },
  wrapText: {
    marginRight: px2dp(11)
  }
});

class PaySettingPage extends Component {
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
        <Item title={"支付宝免密支付"} icon={Images.ali} onPress={() => {}} />
        <Item
          title={"微信免密支付"}
          icon={Images.wechat}
          status
          onPress={() => {}}
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
    alignItems: "center",
    backgroundColor: commonStyle.backgroundColor
  }
});

export default PaySettingPage;
