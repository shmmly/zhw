import { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Animated,
  FlatList,
  Platform,
  Text
} from "react-native";
import * as React from "react";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { NavigationInjectedProps } from "react-navigation";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import deviceInfo from "../../utils/deviceInfo";
import { MapView } from "react-native-amap3d";
import axios from "axios";
import { NearByItem } from "./RecommendParkPage";
//百度地图对应的服务接口
const searchUrl = "http://api.map.baidu.com/place/v2/search";
const searchKey = "UpP3ux6rnH8ckuV3m2uPBcvU91HPD1zK";
const { MultiPoint, Circle } = MapView;

export type LatLng = {
  latitude: number;
  longitude: number;
};
interface NearByPageProps extends NavigationInjectedProps {}

interface NearByPageState {
  /**
   * 位置信息
   */
  location: LatLng;
  /**
   *  markers
   *  这是停车场的点集合
   */
  markers: any[];
  /**
   * marker点 点击之后的index
   */
  marker: {
    name: string;
    latitude: number;
    longitude: number;
  };
  /**
   *  下面的弹窗的高度
   */
  bottomHeight: any;


}

class NearByPage extends Component<NearByPageProps, NearByPageState> {
  static navigationOptions = ({ navigation }: NearByPageProps) => ({
    headerTitle: (
      <View style={styles.headerTitle}>
        <View style={styles.wrapImage}>
          <Image source={Images.search} />
        </View>
        <TextInput
          placeholder={"你要去哪儿"}
          onChangeText={() => {}}
          style={styles.textInput}
        />
      </View>
    ),
    headerRight: (
      <Button
        style={styles.rightImage}
        special
        onPress={() => navigation.navigate("RecommendParkPage")}
      >
        <Image source={Images.more} />
      </Button>
    )
  });
  private mapView: any;
  private timer: number;

  constructor(props) {
    super(props);
    this.state = {
      location: {
        latitude: undefined,
        longitude: undefined
      },
      markers: [],
      marker: { longitude: undefined, latitude: undefined, name: undefined },
      bottomHeight: new Animated.Value(0)
    };
  }

  componentDidMount() {
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
          this.setState({ markers: markers });
        });
    });
    Animated.timing(this.state.bottomHeight, {
      toValue: deviceInfo.deviceHeight / 2,
      duration: 1000
    }).start();
  }

  componentWillUnmount(): void {
    clearTimeout(this.timer);
  }

  render() {
    const { location, markers, bottomHeight } = this.state;
    // console.log(location)
    return (
      <View style={{ flex: 1 }}>
        {location.latitude>0 ? (
          <MapView
            ref={ref => {
              this.mapView = ref;
            }}
            style={{
              width: deviceInfo.deviceWidth,
              height: deviceInfo.deviceHeight / 2
            }}
            zoomLevel={12}
            locationEnabled
            showsZoomControls
            showsLocationButton
            zoomEnabled
            scrollEnabled
            locationInterval={10000}
            distanceFilter={10}
            coordinate={location}
            onLocation={({nativeEvent}) =>{
              if(nativeEvent.latitude>0 &&  nativeEvent.longitude>0){
                this.setState({
                  location: {
                    latitude: nativeEvent.latitude,
                    longitude: nativeEvent.longitude
                  }
                })
              }
            }
            }
          >
            {markers.length !== 0 && (
              <MultiPoint
                image={"point"}
                points={markers}
                onItemPress={point => {
                  console.log(point);
                  this.setState({ marker: point });
                }}
              />
            )}
            <Circle
              strokeWidth={5}
              strokeColor="rgba(142, 185, 244,.5)"
              fillColor="rgba(218, 227, 238,.5)"
              radius={3000}
              coordinate={location}
            />
          </MapView>
        ) : null}
        <Animated.View
          style={[styles.animateContainer, { height: bottomHeight }]}
        >
          {markers.length == 0 ? (
            <View style={styles.emptyContainer}>
              <Image source={Images.noPark} />
            </View>
          ) : (
            <FlatList
              data={markers}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => <NearByItem {...item} />}
            />
          )}
        </Animated.View>
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
  headerTitle: {
    position: "absolute",
    ...Platform.select({
      android: {
        left: px2dp(41)
      }
    }),
    flexDirection: "row",
    alignItems: "center",
    width: px2dp(290),
    height: px2dp(32),
    borderRadius: 8,
    backgroundColor: "#ffffff"
  },
  textInput: {
    marginLeft: px2dp(32),
    paddingVertical: 0
  },
  wrapImage: {
    position: "absolute",
    left: px2dp(12)
  },
  footer: {
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  rightImage: {
    marginRight: px2dp(14)
  },
  btnStyle: {
    width: deviceInfo.deviceWidth,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d7d7d7",
    height: px2dp(28),
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: commonStyle.backgroundColor
  },
  footerText: {
    fontSize: 12,
    color: "#333333"
  },
  button: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: "#fff",
    borderRadius: 40,
    elevation: 2
  },
  icon: {
    width: 24,
    height: 24,
    margin: 12,
    tintColor: "#616161"
  },
  body: {
    padding: 16
  },
  item: {
    flexDirection: "row",
    marginBottom: 4
  },
  label: {
    color: "#f5533d",
    width: 120
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: commonStyle.backgroundColor
  },
  animateContainer: {
    flex: 1,
    backgroundColor: commonStyle.backgroundColor
  }
});

export default NearByPage;
