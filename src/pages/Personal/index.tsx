import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import PersonalPage from "./PersonalPage";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";
import UserInfoPage from "./UserInfoPage";
import ParkRecordPage from "./ParkRecordPage";
import AboutPage from "./AboutPage";
import SuggestPage from "./SuggestPage";
import ChangeMobileStepTwoPage from "./ChangeMobileStepTwoPage";
import ChangeMobileStepThreePage from "./ChangeMobileStepThreePage";
import ChangePasswordPage from "./ChangePasswordPage";
import ChangeMobileStepOnePage from "./ChangeMobileStepOnePage";
import SystemSettingPage from "./SystemSettingPage";
import PaySettingPage from "./PaySettingPage";
import PayPage from "./PayPage";
import CarManageOnePage from "./CarManageOnePage";
import DiscountPage from "./DiscountPage";
import CarManageEditPage from "./CarManageEditPage";
import NearByStack from "../NearBy";
const StatusBarStyle = {
  headerStyle: {
    backgroundColor: commonStyle.themeColor,
    borderBottomWidth: 0,
    // 去掉android 下面的横线
    elevation: 0
  },
  headerTitleStyle: {
    fontFamily: commonStyle.normalFont,
    fontSize: 18,
    color: commonStyle.navigatorTitleColor,
    textAlign: "center",
    marginBottom: px2dp(14),
    marginTop: px2dp(13),
    flex: 1
  }
};

const PersonalStack = createStackNavigator({
  PersonalPage: {
    screen: PersonalPage,
    navigationOptions: () => ({
      title: "",
      ...StatusBarStyle
    })
  },
  UserInfoPage: {
    screen: UserInfoPage,
    navigationOptions: () => ({
      title: "用户资料",
      ...StatusBarStyle
    })
  },
  ParkRecordPage: {
    screen: ParkRecordPage,
    navigationOptions: () => ({
      title: "停车记录",
      ...StatusBarStyle
    })
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: () => ({
      title: "关于我们",
      ...StatusBarStyle
    })
  },
  SuggestPage: {
    screen: SuggestPage,
    navigationOptions: () => ({
      title: "意见反馈",
      ...StatusBarStyle
    })
  },
  ChangeMobileStepTwoPage: {
    screen: ChangeMobileStepTwoPage,
    navigationOptions: () => ({
      title: "输入新手机号",
      ...StatusBarStyle
    })
  },
  ChangeMobileStepThreePage: {
    screen: ChangeMobileStepThreePage,
    navigationOptions: () => ({
      title: "",
      ...StatusBarStyle
    })
  },
  ChangePasswordPage: {
    screen: ChangePasswordPage,
    navigationOptions: () => ({
      title: "修改密码",
      ...StatusBarStyle
    })
  },
  ChangeMobileStepOnePage: {
    screen: ChangeMobileStepOnePage,
    navigationOptions: () => ({
      title: "修改手机号",
      ...StatusBarStyle
    })
  },
  SystemSettingPage: {
    screen: SystemSettingPage,
    navigationOptions: () => ({
      title: "系统设置",
      ...StatusBarStyle
    })
  },
  PaySettingPage: {
    screen: PaySettingPage,
    navigationOptions: () => ({
      title: "支付设置",
      ...StatusBarStyle
    })
  },
  PayPage: {
    screen: PayPage,
    navigationOptions: () => ({
      title: "停车记录",
      ...StatusBarStyle
    })
  },
  CarManageOnePage: {
    screen: CarManageOnePage,
    navigationOptions: () => ({
      title: "车辆管理",
      ...StatusBarStyle
    })
  },
  DiscountPage: {
    screen: DiscountPage,
    navigationOptions: () => ({
      title: "优惠券",
      ...StatusBarStyle
    })
  },
  CarManageEditPage: {
    screen: CarManageEditPage,
    navigationOptions: () => ({
      title: "车辆管理",
      ...StatusBarStyle
    })
  }
});
PersonalStack.navigationOptions = ({ navigation }: any) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }
  return {
    tabBarVisible
  };
};


export default PersonalStack;
