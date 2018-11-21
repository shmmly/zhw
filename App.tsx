import {
  createBottomTabNavigator,
  createSwitchNavigator
} from "react-navigation";
import HomeStack from "./src/pages/Home";
import LoginStack from "./src/pages/Login";
import { Image, View, Text } from "react-native";
import Images from "./src/assets/images";
import * as React from "react";
import commonStyle from "./src/utils/commonStyle";
import NearByStack from "./src/pages/NearBy";
import PersonalStack from "./src/pages/Personal";


const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: () => ({
        /**
         * tabbar 名称
         */
        tabBarLabel: "首页"
      })
    },
    NearBy: {
      screen: NearByStack,
      navigationOptions: () => ({
        tabBarLabel: "附近"
      })
    },
    Personal: {
      screen: PersonalStack,
      navigationOptions: () => ({
        tabBarLabel: "个人"
      })
    }
  },
  {
    initialRouteName: "Home",
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Home") {
          iconName = focused ? (
            <Image source={Images.homeChecked} />
          ) : (
            <Image source={Images.home} />
          );
        } else if (routeName === "NearBy") {
          iconName = focused ? (
            <Image source={Images.nearByChecked} />
          ) : (
            <Image source={Images.nearBy} />
          );
        } else if (routeName === "Personal") {
          iconName = focused ? (
            <Image source={Images.personalChecked} />
          ) : (
            <Image source={Images.personal} />
          );
        }
        return <View>{iconName}</View>;
      }
    }),
    tabBarOptions: {
      activeTintColor: commonStyle.themeColor
    }
  }
);

const App = createSwitchNavigator(
  {
    Tabs: Tabs,
    Login: LoginStack
  },
  {
    initialRouteName: "Login"
  }
);

export default App;
