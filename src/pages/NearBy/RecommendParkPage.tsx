import * as React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Images from "../../assets/images";
import { px2dp } from "../../utils/pxUtils";
import deviceInfo from "../../utils/deviceInfo";
import commonStyle from "../../utils/commonStyle";
import { Component } from "react";
import { NavigationInjectedProps } from "react-navigation";
import Button from "../../components/Button";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  SlideAnimation
} from "react-native-popup-dialog";
import linkUtils from "../../utils/linkUtils";
import axios from "axios";
import { LatLng } from "./NearByPage";

type ItemProps = {
  /**
   * 停车场名称
   */
  name: string;
  /**
   * 停车场总车位
   */
  totalCarport: number;
  /**
   * 停车场剩余车位
   */
  surplusCarport: number;
  /**
   * 精度
   */
  latitude: number;
  /**
   * 纬度
   */
  longitude: number;
};
type ItemState = {
  visible: boolean;
};

export class NearByItem extends Component<ItemProps, ItemState> {
  constructor(props: ItemProps) {
    super(props);
    this.state = {
      visible: false
    };
  }

  itemOnPress = () => this.setState({ visible: true });

  render() {
    const {
      name,
      totalCarport,
      surplusCarport,
      latitude,
      longitude
    } = this.props;
    const { visible } = this.state;
    return (
      <View style={itemStyle.container}>
        <View style={itemStyle.wrapLeft}>
          <View style={itemStyle.wrapTitle}>
            <Text style={itemStyle.title}>{name}</Text>
          </View>
          <View style={itemStyle.wrapText}>
            <Text style={itemStyle.total}>
              总车位：
              {totalCarport} 剩余车位：
              {surplusCarport}
            </Text>
          </View>
        </View>
        <Button style={itemStyle.wrapGoto} onPress={this.itemOnPress} special>
          <Image source={Images.goto} />
          <Text style={itemStyle.goto}>到这去</Text>
        </Button>
        <Dialog
          width={deviceInfo.deviceWidth - px2dp(20)}
          // height={px2dp(200)}
          // containerStyle={itemStyle.dialog}
          visible={visible}
          onTouchOutside={() => this.setState({ visible: false })}
          dialogTitle={<DialogTitle title={`导航到${name}`} />}
          dialogAnimation={
            new SlideAnimation({
              slideFrom: "bottom"
            })
          }
        >
          <DialogContent style={itemStyle.dialogContent}>
            <Button
              style={itemStyle.dialogButton}
              special
              onPress={() => linkUtils.navigatorToMapApp(longitude, latitude)}
            >
              <Text>百度地图</Text>
            </Button>
            <Button
              style={itemStyle.dialogButton}
              special
              onPress={() =>
                linkUtils.navigatorToMapApp(longitude, latitude, "gaode")
              }
            >
              <Text>高德地图</Text>
            </Button>
            <Button
              style={itemStyle.dialogButton}
              special
              onPress={() => this.setState({ visible: false })}
            >
              <Text>取消</Text>
            </Button>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
}

const itemStyle = StyleSheet.create({
  container: {
    height: px2dp(76),
    width: deviceInfo.deviceWidth,
    alignItems: "center",
    borderTopColor: commonStyle.borderColor,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomColor: commonStyle.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: "row"
  },
  wrapLeft: {
    flex: 1,
    marginLeft: px2dp(14)
  },
  wrapTitle: {
    marginTop: px2dp(5)
  },
  title: {
    // fontFamily: "SourceHanSansCN-Light",
    fontSize: px2dp(16),
    color: "#333333"
  },
  wrapText: {
    marginTop: px2dp(15),
    flexDirection: "row"
  },
  total: {
    // fontFamily: "SourceHanSansCN-Light",
    fontSize: px2dp(10),
    color: "#666666"
  },
  surplus: {
    // fontFamily: "SourceHanSansCN-Light",
    fontSize: px2dp(10),
    color: "#666666"
  },
  wrapGoto: {
    marginRight: px2dp(14),
    alignItems: "center"
  },
  goto: {
    fontFamily: "SourceHanSansCN-Light",
    fontSize: 10,
    color: "#333333"
  },
  dialog: {
    width: deviceInfo.deviceWidth - px2dp(20),
    height: px2dp(200),
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 10,
    left: 0
  },
  dialogButton: {
    borderBottomColor: commonStyle.borderColor,
    borderBottomWidth: StyleSheet.hairlineWidth,
    alignItems: "center",
    justifyContent: "center",
    height: px2dp(46)
  },
  dialogContent: {
    paddingBottom: 0
  }
});

interface RecommendParkPageProps extends NavigationInjectedProps {}

type RecommendParkPageState = {
  parkInfos: ParkInfo[];
  location: LatLng;
};
type ParkInfo = {
  /**
   * 停车场名称
   */
  name: string;
  /**
   *  停车场总的车位
   */
  totalCarport: number;
  /**
   * 停车场剩余车位
   */
  surplusCarport: number;
};

//百度地图对应的服务接口
const searchUrl = "http://api.map.baidu.com/place/v2/search";
const searchKey = "UpP3ux6rnH8ckuV3m2uPBcvU91HPD1zK";

class RecommendParkPage extends Component<
  RecommendParkPageProps,
  RecommendParkPageState
> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });
  constructor(props: RecommendParkPageProps) {
    super(props);
    this.state = {
      parkInfos: [],
      location: {
        longitude: null,
        latitude: null
      }
    };
  }
  componentDidMount(): void {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      });
      axios
        .get(searchUrl, {
          params: {
            query: "停车场",
            tag: "交通设施",
            location:
              position.coords.latitude + "," + position.coords.longitude,
            radius: "2000",
            output: "json",
            scope: "2",
            ak: searchKey
          }
        })
        .then(res => {
          let markers = [];
          res.data.results.length > 0 &&
            res.data.results.map(item => {
              markers = [
                ...markers,
                {
                  latitude: item.location.lat,
                  longitude: item.location.lng,
                  ...item
                }
              ];
            });
          this.setState({ parkInfos: markers });
        });
    });
  }

  render() {
    const { parkInfos } = this.state;
    return (
      <View style={styles.container}>
        {parkInfos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={Images.noPark} />
          </View>
        ) : (
          <FlatList
            data={parkInfos}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <NearByItem {...item} />}
          />
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
  emptyContainer: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
    backgroundColor: commonStyle.backgroundColor
  }
});

export default RecommendParkPage;
