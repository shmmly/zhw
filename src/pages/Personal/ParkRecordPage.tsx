import {Component} from 'react';
import * as React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import {NavigationInjectedProps} from 'react-navigation';
import Button from '../../components/Button';
import Images from '../../assets/images';
import {px2dp} from '../../utils/pxUtils';
import ScrollableTabView, {
  DefaultTabBar,
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import commonStyle from '../../utils/commonStyle';
import ScrollableItem from '../../components/ScrollableItem';
import deviceInfo from '../../utils/deviceInfo';
const records = [
  {
    startTime: '2018-10-20 12:30:20',
    endTime: '10-21 12:30:32',
    name: '保利堂停车场',
    carNum: '苏A 12345',
    money: '10.5',
    hasPay: false,
  },
  {
    startTime: '2018-10-20 12:30:20',
    endTime: '10-21 12:30:32',
    name: '保利堂停车场',
    carNum: '苏A 12345',
    money: '10.5',
    hasPay: true,
  },
  {
    startTime: '2018-10-20 12:30:20',
    endTime: '10-21 12:30:32',
    name: '保利堂停车场',
    carNum: '苏A 12345',
    money: '10.5',
    hasPay: true,
  },
  {
    startTime: '2018-10-20 12:30:20',
    endTime: '10-21 12:30:32',
    name: '保利堂停车场',
    carNum: '苏A 12345',
    money: '10.5',
    hasPay: true,
  },
  {
    startTime: '2018-10-20 12:30:20',
    endTime: '10-21 12:30:32',
    name: '保利堂停车场',
    carNum: '苏A 12345',
    money: '10.5',
    hasPay: true,
  },
  {
    startTime: '2018-10-20 12:30:20',
    endTime: '10-21 12:30:32',
    name: '保利堂停车场',
    carNum: '苏A 12345',
    money: '10.5',
    hasPay: true,
  },
];

interface ParkRecordPageProps extends NavigationInjectedProps {}

class ParkRecordPage extends Component<ParkRecordPageProps, {}> {
  static navigationOptions = ({navigation}: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />,
  });

  render() {
    const {navigation} = this.props;
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
          <ScrollableItem
            tabLabel={'全部'}
            records={[]}
            navigation={navigation}
          />
          <ScrollableItem
            tabLabel={'已缴费'}
            records={records}
            navigation={navigation}
          />
          <ScrollableItem
            tabLabel={'未缴费'}
            records={records}
            navigation={navigation}
          />
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
  },
  lineStyle: {
    width: deviceInfo.deviceWidth / 3,
    height: 1,
    backgroundColor: commonStyle.themeColor,
  },
  tabBarTextStyle: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(16),
    color: '#333333',
  },
  DefaultStyle: {
    // height: px2dp(25),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabStyle: {
    paddingBottom: 0,
  },
});

export default ParkRecordPage;
