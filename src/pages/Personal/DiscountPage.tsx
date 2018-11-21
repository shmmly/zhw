import {Component} from 'react';
import {View, StyleSheet, Image, ImageBackground, Text} from 'react-native';
import * as React from 'react';
import Images from '../../assets/images';
import {px2dp} from '../../utils/pxUtils';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import deviceInfo from '../../utils/deviceInfo';
import commonStyle from '../../utils/commonStyle';
import DisCountItem from '../../components/ScrollableItem/DisCountItem';
import {NavigationInjectedProps} from 'react-navigation';
import Button from '../../components/Button';
import ScrollableItem from '../../components/ScrollableItem';

const records = [
  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },
  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },
  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },
  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },
  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: true,
  },




  {
    name: '单次停车优惠券',
    describe: '还剩60天到期',
    money: 10,
    expiredTime: '有效期至12月30日',
    expired: false,
  },

];

class DiscountPage extends Component {
  static navigationOptions = ({navigation}: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />,
  });

  render() {
    return (
      <ScrollableTabView
        style={{
          backgroundColor: commonStyle.backgroundColor,
        }}
        renderTabBar={() => (
          <DefaultTabBar
            style={styles.DefaultStyle}
            tabStyle={{paddingBottom: 0}}
          />
        )}
        tabBarTextStyle={{
          fontSize: px2dp(16),
          color: '#333333',
        }}
        tabBarUnderlineStyle={{
          width: deviceInfo.deviceWidth / 3,
          height: 1,
          backgroundColor: commonStyle.themeColor,
        }}>
        <DisCountItem tabLabel={'生效'} records={records} />
        <DisCountItem tabLabel={'失效'} records={[]} />
        <DisCountItem tabLabel={'全部'} records={[]} />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    marginLeft: px2dp(15),
    marginTop: px2dp(11),
    marginBottom: px2dp(13),
  },
  container: {
    flex: 1,
    backgroundColor: commonStyle.backgroundColor,
    alignItems: 'center',
  },
  DefaultStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabStyle: {
    paddingBottom: 0,
  },
  tabBarTextStyle: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(16),
    color: '#333333',
  },
  lineStyle: {
    width: deviceInfo.deviceWidth / 3,
    height: 1,
    backgroundColor: commonStyle.themeColor,
  },
});

export default DiscountPage;
