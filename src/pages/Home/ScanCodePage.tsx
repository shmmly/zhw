import { Component } from "react";
import { View, StyleSheet, Image, Text, Linking, Alert } from "react-native";
import * as React from "react";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { NavigationInjectedProps } from "react-navigation";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera, FlashMode } from "react-native-camera";
const { on, off, auto } = RNCamera.Constants.FlashMode;
/**
 * 页面逻辑
 * 进入页面，判断是否有权限，如果没有权限则提示无权限
 * 导航不在这个页面的时候，就不渲染这个页面，返回一个空的视图
 */
interface ScanCodePageProps extends NavigationInjectedProps {}
interface ScanCodePageState {
  // 导航是否在当前页面
  focusedScreen: boolean;
  // 是否有操作摄像头的权限
  hasCameraPermission: boolean;
  //闪光灯状态
  flashMode: FlashMode;
}

class ScanCodePage extends Component<ScanCodePageProps, ScanCodePageState> {
  static navigationOptions = ({ navigation }: ScanCodePageProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: (
      <Button
        onPress={() => navigation.navigate("InputCarNumPage")}
        style={styles.navigatorRight}
        special
      >
        <Text>车牌号缴费</Text>
      </Button>
    )
  });
  constructor(props: ScanCodePageProps) {
    super(props);
    this.state = {
      //默认不在当前页面
      focusedScreen: false,
      // 默认有权限
      hasCameraPermission: true,
      //默认闪光灯关闭
      flashMode: auto
    };
  }
  // 设定监听器 若果在当前页面就渲染摄像机 如果不是就返回空view
  componentDidMount(): void {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.setState({ focusedScreen: true });
    });
    navigation.addListener("willBlur", () => {
      this.setState({ focusedScreen: false });
    });
  }
  handleFlashLight = () => {
    const { flashMode } = this.state;
    switch (flashMode) {
      case on:
        this.setState({ flashMode: off });
        break;
      case off:
        this.setState({ flashMode: auto });
        break;
      case auto:
        this.setState({ flashMode: on });
        break;
    }
  };

  // 这里如果扫描成功就掉用这个地址
  onSuccess = (e: any) => {
    Linking.canOpenURL(e.data)
      .then(supported => {
        if (!supported) {
          Alert.alert("error", "不能打开这个地址");
        } else {
          return Linking.openURL(e.data);
        }
      })
      .catch(err => console.error("an error", err));
  };

  render() {
    const { flashMode, focusedScreen } = this.state;
    const cameraProps = {
      flashMode
    };
    return (
      <View style={styles.container}>
        {focusedScreen ? (
          <QRCodeScanner
            onRead={this.onSuccess}
            containerStyle={styles.containerStyle}
            showMarker
            bottomContent={
              <Button onPress={this.handleFlashLight} special>
                <Image source={Images.flashLight} />
              </Button>
            }
            topViewStyle={styles.topViewStyle}
            markerStyle={styles.markerStyle}
            bottomViewStyle={styles.flashLight}
            cameraProps={cameraProps}
          />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigatorRight: {
    width: px2dp(84),
    height: px2dp(16),
    fontFamily: commonStyle.lightFont,
    fontSize: px2dp(17),
    color: commonStyle.navigatorTitleColor
  },
  back: {
    marginLeft: px2dp(15),
    marginTop: px2dp(11),
    marginBottom: px2dp(13)
  },
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center"
  },
  containerStyle: {
    marginTop: px2dp(74),
    alignItems: "center"
  },
  topViewStyle: {
    height: 0,
    flex: 0
  },
  markerStyle: {
    width: px2dp(302),
    height: px2dp(365),
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#ffffff"
  },
  flashLight: {
    flex: 0,
    marginTop: px2dp(63)
  }
});
export default ScanCodePage;
