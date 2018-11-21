import { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import Button from "../../components/Button";
import Images from "../../assets/images";
import { px2dp } from "../../utils/pxUtils";
import { RNCamera } from "react-native-camera";
interface CameraPageProps extends NavigationInjectedProps {}

class CameraPage extends Component<CameraPageProps, {}> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });
  private camera: any;

  takePicture = () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true, doNotSave: true };
      this.camera.takePictureAsync(options).then(data => {
        this.props.navigation.navigate("HomePage", {
          image: "data:image/png;base64," + data.base64
        });
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => (this.camera = ref)}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          permissionDialogTitle={"授权"}
          permissionDialogMessage={"需要授权打开摄像头"}
        />
        <View
          style={{
            flex: 0,
            flexDirection: "row",
            justifyContent: "center"
          }}
        >
          <Button onPress={this.takePicture} style={styles.capture} special>
            <View style={styles.wrapCircle}>
              <View style={styles.circle} />
            </View>
            <Text style={styles.text}>拍照</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    marginLeft: px2dp(15),
    marginTop: px2dp(11),
    marginBottom: px2dp(13),
    width:px2dp(20)
  },
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  capture: {
    flex: 0,
    alignSelf: "center",
    marginBottom: px2dp(26),
    justifyContent: "center"
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
  },
  text: {
    fontSize: 12,
    color: "#ffffff",
    marginTop: px2dp(18),
    textAlign: "center"
  }
});
export default CameraPage;
