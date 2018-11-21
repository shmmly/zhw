import { Component } from "react";
import { View, StyleSheet, Image, Text, FlatList } from "react-native";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import { CarInfo, Item } from "./CarManageOnePage";

interface CarManageEditPageProps extends NavigationInjectedProps {}
interface CarManageEditPageState {
  /**
   * 后台获取的车辆信息
   */
  carInfos: CarInfo[];
}
const carInfos: CarInfo[] = [
  {
    carNum: "苏A 12345",
    carType: "自驾车",
    status: true,
    carNumType: "0"
  },
  {
    carNum: "苏A 12345",
    carType: "通勤车",
    status: false,
    carNumType: "1"
  },
  {
    carNum: "苏A 12345",
    carType: "自驾车",
    status: false,
    carNumType: "2"
  },
  {
    carNum: "苏A 12345",
    carType: "自驾车",
    status: false,
    carNumType: "3"
  }
];
/**
 * 这个页面自己重新获取数据
 * 而不是从上个页面传递过来
 */
class CarManageEditPage extends Component<CarManageEditPageProps,CarManageEditPageState> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    // 这里点击完成应该是调用api
    headerRight: (
      <Button special onPress={() => navigation.goBack()} btnStyle={styles.headerRightBtn}>
        <Text style={styles.rightText}>完成</Text>
      </Button>
    )
  });

  constructor(props: CarManageEditPageProps) {
    super(props);
    this.state = {
      carInfos: carInfos
    };
  }

  _renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.wrapEmpty}>
        <Image
          source={Images.bigLogoWithOutText}
          style={{
            marginTop: px2dp(77)
          }}
        />
        <View style={styles.wrapText}>
          <Text style={styles.emptyText}>
            添加您的车辆，在支持自动付费的停车场停车，出场时，无需手动付费，可直接离场，系统帮你自动扣费。
          </Text>
        </View>
      </View>
      <Button
        text={"添加车辆"}
        btnStyle={[styles.btnStyle, { marginTop: px2dp(56) }]}
        onPress={() => {}}
      />
    </View>
  );

  render() {
    const { carInfos } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        {carInfos.length !== 0 ? (
          <View>
            <FlatList
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => {
                let icon = "";
                switch (item.carNumType) {
                  case "0":
                    icon = Images.yellowCar;
                    break;
                  case "1":
                    icon = Images.blueCar;
                    break;
                  case "2":
                    icon = Images.whiteCar;
                    break;
                  case "3":
                    icon = Images.greenCar;
                    break;
                }
                //这里应该调用api 修改状态
                return (
                  <Item icon={icon} onValueChange={value => {}} {...item} hasDel handleDel={()=>{}} />
                );
              }}
              data={carInfos}
            />
            <Button
              text={"添加车辆"}
              onPress={() => navigation.navigate("InputCarNumPage")}
              btnStyle={styles.btnStyle}
            />
          </View>
        ) : (
          this._renderEmpty()
        )}
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
  },
  btnStyle: {
    marginBottom: px2dp(46),
    width: px2dp(359),
    height: px2dp(38),
    borderRadius: 19,
    backgroundColor: "#ffd426"
  },
  headerRightBtn: {
    marginRight: px2dp(14)
  },
  rightText: {
    fontSize: 17,
    color: "#333333"
  },
  wrapEmpty: {
    alignItems: "center",
  },
  emptyText: {
    fontSize: px2dp(14),
    color: "#999999",
    textAlign: "center",
    fontFamily: "SourceHanSansCN-Light",
    // lineHeight:px2dp(20)
  },
  wrapText: {
    flexWrap: "wrap",
    marginTop: px2dp(37),
    width: px2dp(295),
    height: px2dp(70),
  },
  emptyContainer: {
    alignItems:'center'
  }
});

export default CarManageEditPage;
