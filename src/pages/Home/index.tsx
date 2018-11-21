import { createStackNavigator } from "react-navigation";
import HomePage from "./HomePage";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";

import * as React from "react";
import ScanCodePage from "./ScanCodePage";
import InputCarNumPage from "./InputCarNumPage";
import MessagePage from "./MessagePage";
import CameraPage from "./CameraPage";
import FindCarPage from "./FindCarPage";

const StatusBarStyle = {
  headerStyle: {
    backgroundColor: commonStyle.themeColor
  },
  headerTitleStyle: {
    fontFamily: commonStyle.normalFont,
    fontSize: 18,
    color: commonStyle.navigatorTitleColor,
    marginBottom: px2dp(14),
    marginTop: px2dp(13),
    textAlign: "center",
    flex: 1
  }
};

const HomeStack = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: () => ({
      title: "赞好位",
      ...StatusBarStyle
    })
  },
  ScanCodePage: {
    screen: ScanCodePage,
    navigationOptions: () => ({
      title: "扫码缴费",
      ...StatusBarStyle
    })
  },
  InputCarNumPage: {
    screen: InputCarNumPage,
    navigationOptions: () => ({
      title: "车牌号缴费",
      ...StatusBarStyle
    })
  },
  MessagePage: {
    screen: MessagePage,
    navigationOptions: () => ({
      title: "消息",
      ...StatusBarStyle
    })
  },
  CameraPage: {
    screen: CameraPage,
    navigationOptions: () => ({
      title: "拍照找车",
      ...StatusBarStyle
    })
  },
  FindCarPage:{
    screen:FindCarPage,
    navigationOptions: () => ({
      title: "场内找车",
      ...StatusBarStyle
    })
  }
});
// 这是为了让切换homeStack里面的视图的时候，可以隐藏掉下面的tab栏目
HomeStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default HomeStack;
