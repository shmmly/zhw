import { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
} from "react-native";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { px2dp } from "../../utils/pxUtils";
import deviceInfo from "../../utils/deviceInfo";
interface FindCarPageProps extends NavigationInjectedProps {
  imageUri: string;
}

class FindCarPage extends Component<FindCarPageProps, {}> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: (
      <Button
        style={styles.btn}
        special
        onPress={() =>
          Alert.alert("确定删除已拍摄的照片吗？", "", [
            { text: "取消", onPress: () => {} },
            {
              text: "确定",
              onPress: () => {
                navigation.navigate("HomePage", {
                  image: null
                });
              }
            }
          ])
        }
      >
        <Text style={styles.rightText}>清除照片</Text>
      </Button>
    )
  });

  render() {
    console.log('render')
    const imageUri = this.props.navigation.getParam("image");
    console.log(imageUri)
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Image source={{uri:imageUri}} style={{height:deviceInfo.deviceHeight,width:deviceInfo.deviceWidth}}/>
        <Button
          onPress={() => navigation.navigate("CameraPage")}
          style={styles.capture}
          special
        >
          <View style={styles.wrapCircle}>
            <View style={styles.circle} />
          </View>
        </Button>
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
  btn: {
    marginRight: px2dp(14)
  },
  rightText:{
    fontSize: 17,
    color: "#333333"
  },
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  capture: {
    flex: 0,
    alignSelf: "center",
    marginBottom: px2dp(26),
    justifyContent: "center",
    position: "absolute",
    bottom: px2dp(20),
    right: px2dp(20)
  },
  wrapCircle: {
    width: px2dp(64),
    height: px2dp(64),
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#f6f6f6",
    backgroundColor: "black",
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  circle: {
    width: px2dp(49),
    height: px2dp(49),
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: "#ffda44",
    backgroundColor: "#ffda44",
    borderRadius: 100
  }
});
export default FindCarPage;
