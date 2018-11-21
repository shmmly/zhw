import { NavigationInjectedProps } from "react-navigation";
import { Component } from "react";
import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import * as React from "react";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
import Button from "../../components/Button";
import Images from "../../assets/images";

interface SuggestPageProps extends NavigationInjectedProps {}
interface SuggestPageState {
  suggestion: string;
  email: string;
}

class SuggestPage extends Component<SuggestPageProps, SuggestPageState> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });
  constructor(props) {
    super(props);
    this.state = {
      suggestion: "",
      email: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <TextInput
            multiline
            placeholder={"在这里留下您的意见"}
            onChangeText={suggestion =>
              suggestion && this.setState({ suggestion })
            }
          />
        </View>
        <View style={styles.wrapText}>
          <Text style={styles.text}>在这里留下您的邮箱</Text>
        </View>

        <View style={styles.email}>
          <TextInput
            style={styles.inputText}
            onChangeText={email => email && this.setState({ email })}
            placeholder={"请输入邮箱"}
          />
        </View>
        <Button text={"提交"} onPress={() => {}} btnStyle={styles.btnStyle} />
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
  input: {
    marginTop: px2dp(28),
    width: px2dp(319),
    height: px2dp(134),
    borderRadius: px2dp(3),
    borderStyle: "solid",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d7d7d7"
  },
  email: {
    marginTop: px2dp(9),
    width: px2dp(319),
    height: px2dp(34),
    borderRadius: px2dp(3),
    borderStyle: "solid",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d7d7d7",
    justifyContent: "center"
  },
  inputText:{
    paddingVertical:0
  },
  wrapText: {
    marginTop: px2dp(19),
    marginLeft: px2dp(35),
    alignSelf: "flex-start"
  },
  text: {
    fontFamily: commonStyle.normalFont,
    fontSize: 12,
    color: "#333333"
  },

  btnStyle: {
    marginTop: px2dp(64),
    width: px2dp(359),
    height: px2dp(38),
    borderRadius: px2dp(19),
    backgroundColor: "#ffd426"
  }
});

export default SuggestPage;
