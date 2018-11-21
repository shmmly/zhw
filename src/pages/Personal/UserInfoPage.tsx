import { NavigationInjectedProps } from "react-navigation";
import { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Alert,
  TextInput,
  PixelRatio
} from "react-native";
import * as React from "react";
import SettingItem from "../../components/SettingItem";
import Images from "../../assets/images";
import { px2dp } from "../../utils/pxUtils";
import Button from "../../components/Button";
import commonStyle from "../../utils/commonStyle";
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogButton
} from "react-native-popup-dialog";
import DialogItem from "../../components/DialogItem";

interface UserInfoPageProps extends NavigationInjectedProps {}

interface UserInfoPageState {
  nickVisible: boolean;
  ageVisible: boolean;
  sexVisible: boolean;
  addressVisible: boolean;
}

class UserInfoPage extends Component<UserInfoPageProps, UserInfoPageState> {
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
      nickVisible: false,
      ageVisible: false,
      sexVisible: false,
      addressVisible: false
    };
  }
  // 修改昵称
  _renderNickName = () => (
    <DialogItem
      onTouchOutside={() => this.setState({ nickVisible: false })}
      onVisible={nickVisible =>  {this.setState({ nickVisible }),console.log(nickVisible)} }
      onChangeText={() => {}}
      placeholder={"请输入昵称"}
      title={"昵称"}
      visible={this.state.nickVisible}
    />
  );
  //修改性别
  _renderSex = () => (
    <DialogItem
      onTouchOutside={() => this.setState({ sexVisible: false })}
      onVisible={sexVisible => this.setState({ sexVisible })}
      onChangeText={() => {}}
      placeholder={"性别"}
      title={"性别"}
      isSwitch
      visible={this.state.sexVisible}
    />
  );
  // 修改地址
  _renderAddress = () => (
    <DialogItem
      onTouchOutside={() => this.setState({ addressVisible: false })}
      visible={this.state.addressVisible}
      onChangeText={() => {}}
      placeholder={"请输入个人地址"}
      title={"个人地址"}
      onVisible={addressVisible => this.setState({ addressVisible })}
    />
  );
  //修改年龄
  _renderAge = () => (
    <DialogItem
      onTouchOutside={() => this.setState({ ageVisible: false })}
      visible={this.state.ageVisible}
      onChangeText={() => {}}
      placeholder={"请输入年龄"}
      title={"年龄"}
      onVisible={ageVisible => this.setState({ ageVisible })}
    />
  );
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <SettingItem
          title={"头像"}
          content={Images.avatar}
          style={styles.avatar}
          onPress={() => {}}
        />
        <SettingItem
          title={"昵称"}
          content={"biubiu"}
          onPress={() => this.setState({ nickVisible: true })}
        />
        <View style={styles.threeItem}>
          <SettingItem
            title={"性别"}
            content={"男"}
            onPress={() => this.setState({ sexVisible: true })}
          />
          <SettingItem
            title={"年龄"}
            onPress={() => this.setState({ ageVisible: true })}
          />
          <SettingItem
            title={"个人地址"}
            content={"江苏省南京市秦淮区"}
            onPress={() => this.setState({ addressVisible: true })}
          />
        </View>
        <View style={styles.twoItem}>
          <SettingItem
            title={"手机号"}
            content={"15195958515"}
            onPress={() => navigation.navigate("ChangeMobileStepOnePage")}
          />
          <SettingItem
            title={"修改密码"}
            onPress={() => navigation.navigate("ChangePasswordPage")}
          />
        </View>
        <Button onPress={() => {}} special style={styles.button}>
          <Text style={styles.btnText}>退出登录</Text>
        </Button>
        {this._renderNickName()}
        {this._renderSex()}
        {this._renderAge()}
        {this._renderAddress()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: commonStyle.otherBackgroundColor
  },
  back: {
    marginLeft: px2dp(15),
    marginTop: px2dp(11),
    marginBottom: px2dp(13)
  },
  avatar: {
    height: px2dp(75)
  },
  threeItem: {
    marginTop: px2dp(14)
  },
  twoItem: {
    marginTop: px2dp(14)
  },
  button: {
    backgroundColor: commonStyle.backgroundColor,
    marginTop: px2dp(23),
    width: px2dp(375),
    height: px2dp(45),
    alignItems: "center",
    justifyContent: "center"
  },
  btnText: {
    fontSize: px2dp(15),
    color: commonStyle.navigatorTitleColor
  },
  //  **************** dialog
  dialogTitle: {
    // marginLeft: px2dp(18),
    // marginTop: px2dp(18),
    backgroundColor: "#f7f7f7",
    borderBottomWidth: 0
  },
  dialogTitleTextStyle: {
    fontFamily: commonStyle.normalFont,
    fontSize: 17,
    color: "#333333"
  },
  dialogContainer: {
    backgroundColor: "transparent"
  },
  textStyle: {
    color: "#333333"
  },
  dialogContent: {
    backgroundColor: "#f7f7f7",
    paddingTop: px2dp(20),
    paddingBottom: 0
  },
  lineStyle: {
    marginTop: px2dp(6),
    width: px2dp(218),
    height: 1,
    backgroundColor: "#dbdbdb"
  },
  dialogButtonStyle: {
    backgroundColor: "#f7f7f7"
  }
});

export default UserInfoPage;
