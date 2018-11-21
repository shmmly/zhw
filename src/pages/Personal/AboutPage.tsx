import { Component } from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import * as React from "react";
import { NavigationInjectedProps } from "react-navigation";
import commonStyle from "../../utils/commonStyle";
import Images from "../../assets/images";
import { px2dp } from "../../utils/pxUtils";
import Button from "../../components/Button";

interface AboutPageProps extends NavigationInjectedProps {}

interface AboutPageState {
  describe: string;
}

class AboutPage extends Component {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Image source={Images.bigLogo} />
        </View>
        <View style={styles.text}>
          <Text>公司介绍</Text>
        </View>
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
    backgroundColor: commonStyle.otherBackgroundColor,
    alignItems: "center"
  },
  logo: {
    marginTop: px2dp(97)
  },
  text: {
    alignSelf: "flex-start",
    marginLeft: px2dp(38),
    marginTop: px2dp(23)
  }
});
export default AboutPage;
