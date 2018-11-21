import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  FlatList,
  ImageBackground
} from "react-native";
import Images from "../../assets/images";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
import Button from "../Button";

interface DisCountItemProps {
  /**
   *  scroll标题的名称
   */
  tabLabel: string;
  /**
   *  需要渲染的停车记录数据
   *  这里需要后台给出数据类型
   *  这里先用any代替
   */
  records: {
    /**
     * 优惠券名称
     */
    name: string;
    /**
     * 优惠券描述
     */
    describe: string;
    /**
     * 优惠券金额
     */
    money: number;
    /**
     *
     */
    expiredTime: string;
    /**
     *
     */
    expired: boolean;
  }[];
}

const DisCountItem: React.SFC<DisCountItemProps> = ({ tabLabel, records }) => {
  return (
    <View>
      {records.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={Images.noDiscount} />
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.wrapContainer}>
              <View style={styles.container}>
                {item.expired ? (
                  <Image
                    source={Images.discountExpired}
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        width: px2dp(354),
                        height: px2dp(110)
                      }
                    ]}
                  />
                ) : (
                  <Image
                    source={Images.discountInTime}
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        width: px2dp(354),
                        height: px2dp(110)
                      }
                    ]}
                  />
                )}
                <View style={styles.wrapContent}>
                  <View>
                    <Text style={styles.name}>{item.name}</Text>
                    <View style={styles.wrapDescribe}>
                      <Text style={styles.describe}>{item.describe}</Text>
                    </View>
                  </View>
                  <View style={styles.wrapMoney}>
                    <Text style={styles.symbol}>￥</Text>
                    <Text style={styles.money}>{item.money}</Text>
                  </View>
                </View>
                <View style={styles.footer}>
                  <Text style={styles.time}>{item.expiredTime}</Text>
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: px2dp(132),
    justifyContent: "center",
    alignItems: "center",
  },
  wrapContainer: {
    alignItems: "center",
  },
  container: {
    marginTop: px2dp(20),
    width: px2dp(354),
    height: px2dp(110)
  },
  wrapContent: {
    position: "absolute",
    left: px2dp(31),
    right: px2dp(24),
    top: px2dp(28),
    bottom: px2dp(50),
    flexDirection: "row",
    justifyContent: "space-between"
  },
  wrapDescribe: {
    marginTop: px2dp(6)
  },
  name: {
    fontSize: px2dp(15),
    color: "#ff2222"
  },
  describe: {
    fontSize: px2dp(13),
    color: "#ff2222"
  },
  wrapMoney: {
    flexDirection: "row",
    alignItems: "baseline"
  },
  symbol: {
    fontSize: px2dp(19),
    color: "#ff2222",
    alignSelf: "flex-end"
  },
  money: {
    fontSize: px2dp(34),
    color: "#ff2222"
  },
  time: {
    fontSize: px2dp(12),
    color: "#999999"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    top: px2dp(82),
    left: 0,
    right: 0,
    height: px2dp(32),
    alignItems: "center",
    justifyContent: "center"
    // backgroundColor:'black'
  }
});
export default DisCountItem;
