import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import NearByPage from "./NearByPage";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
import RecommendParkPage from "./RecommendParkPage";

const StatusBarStyle = {
  headerStyle: {
    backgroundColor: commonStyle.themeColor
  },
  // headerTitleStyle: {
  //   fontFamily: commonStyle.normalFont,
  //   fontSize: 18,
  //   color: commonStyle.navigatorTitleColor,
  //   alignItems: "center",
  //   marginBottom: px2dp(14),
  //   marginTop: px2dp(13),
  //   flex:1
  // }
};


const NearByStack = createStackNavigator({
  NearByPage: {
    screen: NearByPage,
    navigationOptions: () => ({
      title: "附近",
      ...StatusBarStyle
    })
  },
  RecommendParkPage:{
    screen:RecommendParkPage,
    navigationOptions: () => ({
      title: "推荐停车场",
      ...StatusBarStyle
    })
  }
});
// 这是为了让切换homeStack里面的视图的时候，可以隐藏掉下面的tab栏目
NearByStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};

export default NearByStack;
