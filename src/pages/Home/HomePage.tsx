import { NavigationInjectedProps } from "react-navigation";
import { Component } from "react";
import * as React from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  StatusBar,
  Linking
} from "react-native";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import deviceInfo from "../../utils/deviceInfo";

interface HomePageProps extends NavigationInjectedProps {}
interface HomePageState {}

class HomePage extends Component<HomePageProps, HomePageState> {
  static navigationOptions = ({ navigation }: HomePageProps) => ({
    headerRight: (
      <Button
        onPress={() => navigation.navigate("MessagePage")}
        style={styles.message}
        special
      >
        <Image source={Images.message} />
      </Button>
    ),
    headerLeft: <View />
  });

  componentDidMount(): void {
    !deviceInfo.isIos
      ? StatusBar.setBackgroundColor(commonStyle.themeColor)
      : null;
  }

  render() {
    const { navigation } = this.props;
    const cameraImage = this.props.navigation.getParam("image");
    return (
      <View style={styles.container}>
        <View style={styles.scrollView}>
          <Image source={Images.carousel} style={{
            width: px2dp(375),
            height: px2dp(164)
          }}/>
        </View>
        <View style={styles.rowContent}>
          <Button
            style={styles.rowContentLeft}
            special
            onPress={() => navigation.navigate("ScanCodePage")}
          >
            <Image
              source={Images.homePay}
              style={{
                width: px2dp(166),
                height: px2dp(120)
              }}
            />
          </Button>
          <Button
            style={styles.rowContentRight}
            special
            onPress={() =>
              cameraImage
                ? navigation.navigate("FindCarPage", { image: cameraImage })
                : navigation.navigate("CameraPage")
            }
          >
            {cameraImage ? (
              <Image
                source={{ uri: cameraImage }}
                style={{
                  width: px2dp(166),
                  height: px2dp(120)
                }}
              />
            ) : (
              <Image
                source={Images.homePhone}
                style={{
                  width: px2dp(166),
                  height: px2dp(120)
                }}
              />
            )}
          </Button>
        </View>
        <Button
          style={styles.park}
          special
          onPress={() => navigation.navigate("NearBy")}
        >
          <Image
            source={Images.park}
            style={{
              width: px2dp(347),
              height: px2dp(120)
            }}
          />
        </Button>

        <View style={styles.footer}>
          <View style={styles.footerTitle}>
            <View style={styles.footerTitleLeft}>
              <Image source={Images.homeFooterLeft} />
            </View>
            <Text style={styles.footerTitleText}>生活服务</Text>
            <View style={styles.footerTitleRight}>
              <Image source={Images.homeFooterRight} />
            </View>
          </View>
          <View style={styles.footerBottom}>
            <Button onPress={this.linkSjnh} special style={styles.footerItem}>
              <Image source={Images.homeFooterOne} />
              <Text style={styles.footerItemText}>世纪华联</Text>
            </Button>
            <Button onPress={() => {}} special style={styles.footerItem}>
              <View style={styles.footerTemp}>
                <Image source={Images.homeFooterTwo} />
                <View style={styles.footerItemTemp}>
                  <Text style={styles.footerItemTempTextLeft}>24°</Text>
                  <Text style={styles.footerItemTempTextRight}>晴</Text>
                </View>
              </View>
              <Text style={styles.footerItemText}>南京</Text>
            </Button>
            <Button onPress={this.linkDidi} special style={styles.footerItem}>
              <Image source={Images.homeFooterThree} />
              <Text style={styles.footerItemText}>滴滴出行</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }

  private linkDidi = () => {
    Linking.canOpenURL("https://common.diditaxi.com.cn/general/webEntry").then(
      isSupport => {
        if (!isSupport) {
          console.log("not support");
        } else {
          Linking.openURL("https://common.diditaxi.com.cn/general/webEntry");
        }
      }
    );
  };

  private linkSjnh = () => {
    Linking.canOpenURL("http://www.zjelianhua.com/\n").then(isSupport => {
      if (!isSupport) {
        console.log("not support");
      } else {
        Linking.openURL("http://www.zjelianhua.com");
      }
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: commonStyle.backgroundColor
  },
  scrollView: {
    position:'absolute',
    top:0,

  },
  rowContent: {
    position: "absolute",
    top:px2dp(176),
    bottom: px2dp(263),
    width: px2dp(347),
    height: px2dp(120),
    flexDirection: "row",
    marginTop: px2dp(12),
    justifyContent: "space-between",
    alignItems: "center"
  },
  rowContentLeft: {
    // marginLeft:px2dp(15),
    width: px2dp(166),
    height: px2dp(120)
  },
  rowContentRight: {
    // marginRight:px2dp(15),
    width: px2dp(166),
    height: px2dp(120)
  },
  park: {
    position: "absolute",
    bottom: px2dp(131),
    marginTop: px2dp(12),
    width: px2dp(347),
    height: px2dp(120),
    opacity: 0.9,
    borderRadius: px2dp(5),
    justifyContent: "center",
    alignItems: "center"
  },
  message: {
    marginTop: px2dp(13),
    marginBottom: px2dp(15),
    marginRight: px2dp(16)
  },
  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    width: px2dp(375),
    height: px2dp(117),
    borderRadius: px2dp(5),
    marginTop: px2dp(14),
    marginBottom: 0,
    backgroundColor: commonStyle.backgroundColor
  },
  footerTitle: {
    flexDirection: "row",
    marginTop: px2dp(11),
    justifyContent: "center",
    alignItems: "center"
  },
  footerTitleLeft: {
    marginRight: px2dp(16)
  },
  footerTitleRight: {
    marginLeft: px2dp(16)
  },
  footerTitleText: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(14),
    color: commonStyle.navigatorTitleColor
  },
  footerBottom: {
    flexDirection: "row",
    marginTop: px2dp(12),
    justifyContent: "space-around",
    alignContent: "center"
  },
  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: px2dp(14)
  },
  footerItemText: {
    marginTop: px2dp(6),
    // fontFamily: commonStyle.normalFont,
    fontSize: px2dp(12),
    color: commonStyle.describeTextColor
  },
  footerTemp: {
    width: px2dp(39),
    height: px2dp(35),
    alignItems: "center"
  },
  footerItemTemp: {
    marginTop: px2dp(6),
    flexDirection: "row",
    alignItems: "center"
  },
  footerItemTempTextLeft: {
    // fontFamily: commonStyle.mediumFont,
    fontSize: px2dp(14),
    color: commonStyle.navigatorTitleColor
  },
  footerItemTempTextRight: {
    // fontFamily: commonStyle.mediumFont,
    fontSize: px2dp(10),
    color: commonStyle.navigatorTitleColor
  },
  footerItemFlex: {
    alignItems: "center"
  }
});
export default HomePage;
