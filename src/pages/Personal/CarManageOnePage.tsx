import { Component } from "react";
import * as React from "react";
import { View, StyleSheet, Image, Text, Switch, FlatList } from "react-native";
import { px2dp } from "../../utils/pxUtils";
import Images from "../../assets/images";
import Button from "../../components/Button";
import commonStyle from "../../utils/commonStyle";
import { NavigationInjectedProps } from "react-navigation";

export type CarInfo = {
  /**
   * 车辆类型
   */
  carType: string;
  /**
   * 车牌号
   */
  carNum: string;
  /**
   * 当前车状态
   */
  status: boolean;
  /**
   * 车牌类型
   * 0 黄牌
   * 1 蓝牌
   * 2 绿牌
   */
  carNumType: string;
};

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

type ItemProps = {
  /**
   * 对应的车牌 图标
   */
  icon: any;
  /**
   *  车牌号 这里其实可以传入 数据实体类按需展示
   */
  carNum: string;
  /**
   *  车牌类型 暂时车牌类型 自己随便定义的
   *  后面要看接口怎么定义的
   */
  carType: string;
  /**
   *  switch 默认的数值
   */
  status: boolean;
  /**
   * switch 之后的回调
   * @param value boolean
   */
  onValueChange: (value: boolean) => void;
  /**
   * 是否显示 前面的删除按钮
   */
  hasDel?: boolean;
  /**
   * 删除方法的回调，
   * 如果 hasDeL 存在那么这个方法一定要有
   * @param value 看后台接口需要的是什么 很大可能是id
   *
   */
  handleDel?: (value: string) => void;
};

export const Item: React.SFC<ItemProps> = ({
  icon,
  carNum,
  carType,
  status,
  onValueChange,
  hasDel = false,
  handleDel
}) => (
  <View>
    <View style={itemStyles.container}>
      <View style={itemStyles.wrapLeft}>
        {hasDel ? (
          <Button style={itemStyles.del} special onPress={() => handleDel("")}>
            <Image source={Images.del} />
          </Button>
        ) : null}
        <View style={itemStyles.image}>
          <Image
            source={icon}
            style={{
              width: px2dp(52),
              height: px2dp(30)
            }}
          />
        </View>
        <View style={itemStyles.wrapText}>
          <Text style={itemStyles.mainText}>{carNum}</Text>
          <Text style={itemStyles.subText}>{carType}</Text>
        </View>
      </View>

      <View style={itemStyles.switch}>
        <Switch onValueChange={onValueChange} value={status} />
      </View>
    </View>
    <View style={itemStyles.border} />
  </View>
);
const itemStyles = StyleSheet.create({
  container: {
    marginTop: px2dp(26),
    width: px2dp(347),
    height: px2dp(34),
    flexDirection: "row",
    alignItems: "center"
  },
  del: {
    marginLeft: px2dp(14),
    marginRight: px2dp(14)
  },
  image: {},
  wrapLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  wrapText: {
    marginLeft: px2dp(13)
  },
  mainText: {
    fontFamily: "SourceHanSansCN-Normal",
    fontSize: 15,
    color: "#333333"
  },
  subText: {
    fontFamily: "SourceHanSansCN-Normal",
    fontSize: 11,
    color: "#666666"
  },
  switch: {
    width: px2dp(51),
    height: px2dp(34)
  },
  border: {
    marginTop: px2dp(18),
    width: px2dp(347),
    height: px2dp(2),
    backgroundColor: "#f1f1f1"
  }
});

interface CarManagePageProps extends NavigationInjectedProps {}

interface CarManagePageState {
  /**
   * 后台获取的车辆信息
   */
  carInfos: CarInfo[];
}

class CarManageOnePage extends Component<
  CarManagePageProps,
  CarManagePageState
> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: (
      <Button
        special
        onPress={() => navigation.navigate("CarManageEditPage")}
        btnStyle={styles.headerRightBtn}
      >
        <Text style={styles.rightText}>编辑</Text>
      </Button>
    )
  });

  constructor(props: CarManagePageProps) {
    super(props);
    this.state = {
      carInfos: carInfos
    };
  }

  //api获取信息
  componentDidMount(): void {}

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
                  <Item icon={icon} onValueChange={value => {}} {...item} />
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
    alignItems: "center"
  },
  emptyText: {
    fontSize: px2dp(14),
    color: "#999999",
    textAlign: "center",
    fontFamily: "SourceHanSansCN-Light"
    // lineHeight:px2dp(20)
  },
  wrapText: {
    flexWrap: "wrap",
    marginTop: px2dp(37),
    width: px2dp(295),
    height: px2dp(70)
  },
  emptyContainer: {
    alignItems: "center"
  }
});

export default CarManageOnePage;
