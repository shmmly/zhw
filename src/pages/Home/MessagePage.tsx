import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Image } from "react-native";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { NavigationInjectedProps } from "react-navigation";
import { px2dp } from "../../utils/pxUtils";
import MessageItem from "../../components/MessageItem";
import commonStyle from "../../utils/commonStyle";

const data = [
  {
    type: "通知",
    content: "优惠券快要到期了",
    time: "1小时前"
  },
  {
    type: "我的关注",
    content: "你关注的商品卖掉啦",
    time: "1小时前"
  },
  {
    type: "其他",
    content: "广告",
    time: "1小时前"
  }
];

interface MessagePageProps extends NavigationInjectedProps {}

class MessagePage extends Component {
  static navigationOptions = ({ navigation }: MessagePageProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    )
  });

  render() {
    return (
      <View style={styles.container}>
        {data.map((item, index) => (
          <MessageItem notice={item} key={index} />
        ))}
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
    backgroundColor: commonStyle.backgroundColor
  }
});

export default MessagePage;
