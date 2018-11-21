import * as React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import Images from "../../assets/images";
import deviceInfo from "../../utils/deviceInfo";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";

/**
 * {
 *   type:'',
 *   content:'',
 *   time:''
 * }
 *
 */
interface MessageItemProps {
  notice: {
    type: string;
    content: string;
    time: string;
  };
}

const MessageItem: React.SFC<MessageItemProps> = ({ notice }) => (
  <View style={styles.container}>
    <View style={styles.image}>
      <Image source={Images.notice} />
    </View>
    <View style={styles.wrapContent}>
      <Text style={styles.title}>{notice.type}</Text>
      <Text style={styles.content}>{notice.content}</Text>
      <Text style={styles.time}>{notice.time}</Text>
    </View>
  </View>
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: deviceInfo.deviceWidth,
    height: px2dp(70),
    paddingLeft: px2dp(16),
    marginTop: px2dp(16),
    alignItems: "flex-start",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#f7f7f7"
  },
  wrapContent: {
    marginLeft: px2dp(11)
  },
  image: {
    marginBottom: px2dp(19)
  },
  title: {
    fontSize: px2dp(16),
    color: commonStyle.navigatorTitleColor
  },
  content: {
    marginTop: px2dp(8),
    fontSize: px2dp(15),
    color: commonStyle.describeTextColor
  },
  time: {
    marginTop: px2dp(9),
    fontSize: px2dp(10),
    color: commonStyle.describeTextColor
  }
});
export default MessageItem;
