import { Component } from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import * as React from "react";
import Images from "../../assets/images";
import Button from "../../components/Button";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
import { NavigationInjectedProps } from "react-navigation";
interface ChangeMobileStepOnePageProps extends NavigationInjectedProps {}

class ChangeMobileStepOnePage extends Component<
  ChangeMobileStepOnePageProps,
  {}
> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.image}>
          <Image source={Images.bigMobile} />
        </View>
        <View style={styles.mobileInput}>
          <Text style={styles.mobileInputLeft}>您的手机号码:</Text>
          <Text style={styles.mobileInputRight}>15195958515</Text>
        </View>
        <View style={styles.wrapInput}>
          <Text style={styles.pInput}>您可以使用手机号登录</Text>
        </View>
        <Button
          text={"更改手机号"}
          onPress={() => navigation.navigate("ChangeMobileStepTwoPage")}
          btnStyle={styles.btnStyle}
        />
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
  image: {
    marginTop: px2dp(33)
  },
  mobileInput: {
    marginTop: px2dp(15),
    flexDirection: "row"
  },
  mobileInputLeft: {
    fontFamily: commonStyle.normalFont,
    fontSize: 17,
    color: commonStyle.navigatorTitleColor
  },
  mobileInputRight: {
    fontFamily: commonStyle.lightFont,
    fontSize: 15,
    color: "#999999"
  },
  wrapInput: {
    marginTop: px2dp(9)
  },
  pInput: {
    fontFamily: "SourceHanSansCN-Light",
    fontSize: 14,
    color: "#999999"
  },
  btnStyle: {
    marginTop: px2dp(21)
  }
});

export default ChangeMobileStepOnePage;
