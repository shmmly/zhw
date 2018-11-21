import * as React from 'react';
import {View, StyleSheet, Image, Text, FlatList} from 'react-native';
import Images from '../../assets/images';
import commonStyle from '../../utils/commonStyle';
import {px2dp} from '../../utils/pxUtils';
import Button from '../Button';
import {NavigationInjectedProps} from 'react-navigation';
import deviceInfo from '../../utils/deviceInfo';

interface ScrollableItemProps {
  /**
   *  scroll标题的名称
   */
  tabLabel: string;
  /**
   *  需要渲染的停车记录数据
   *  这里需要后台给出数据类型
   *  这里先用any代替
   */
  records: {
    startTime: string;
    endTime: string;
    name: string;
    carNum: string;
    money: string;
    hasPay: boolean;
  }[];
  navigation?: any;
}

const ScrollableItem: React.SFC<ScrollableItemProps> = ({
  tabLabel,
  records,
  navigation,
}) => {
  return (
    <View style={styles.wrapContainer}>
      {records.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Image source={Images.parkRecord} />
        </View>
      ) : (
        <FlatList
          data={records}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.container}>
              <View style={styles.firstLine}>
                <Text>{item.startTime}</Text>
                <Text>{item.endTime}</Text>
              </View>
              <View style={styles.middleLine}>
                <Text>{item.name}</Text>
              </View>
              <View style={styles.endLine}>
                <Text style={styles.endLineTextOne}>{item.carNum}</Text>
                <View style={styles.endLineViewTwo}>
                  <Text style={styles.endLineTextTwo}>支付金额:</Text>
                  <Text style={styles.endLineMoney}>{item.money}</Text>
                  <Text style={styles.endLineMoneyUnit}>元</Text>
                </View>

                <View style={styles.endLineThree}>
                  {item.hasPay ? (
                    <View style={styles.unActivity}>
                      <Text style={styles.inActivity}>已支付</Text>
                    </View>

                  ) : (
                    <Button
                      special
                      onPress={() => navigation.navigate('PayPage')}
                      style={styles.activity}>
                      <Text style={styles.activityText}>未支付</Text>
                    </Button>
                  )}
                </View>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapContainer:{
    alignItems:'center',
    width:deviceInfo.deviceWidth,
  },
  emptyContainer: {
    marginTop: px2dp(132),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'black',
  },
  container: {
    width: deviceInfo.deviceWidth-px2dp(40),
    height: px2dp(99),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: commonStyle.borderColor,
    justifyContent: 'center',
  },
  firstLine: {
    flexDirection: 'row',
    // marginLeft: px2dp(20),
    alignItems: 'center',
    position: 'absolute',
    // left: px2dp(20),
    // right: px2dp(159),
    top: px2dp(23),
  },
  firstLineText: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(10),
    color: commonStyle.describeTextColor,
  },
  middleLine: {
    // marginTop: px2dp(10),
    // marginLeft: px2dp(20),
    height: px2dp(16),
    position: 'absolute',
    // left: px2dp(20),
    top: px2dp(50),
  },
  middleLineText: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(17),
    color: commonStyle.navigatorTitleColor,
  },
  endLine: {
    // marginTop: px2dp(10),
    flexDirection: 'row',
    // marginLeft: px2dp(20),
    // marginBottom: px2dp(13),
    // width:px2dp(282),
    alignItems: 'center',
    position: 'absolute',
    // left: px2dp(20),
    // right: px2dp(20),
    top: px2dp(76),
    bottom:px2dp(13),
    justifyContent:'space-around'
  },
  endLineTextOne: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(11),
    color: commonStyle.describeTextColor,
  },
  endLineViewTwo:{
    position:'absolute',
    left:px2dp(111),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-start'
  },
  endLineTextTwo: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(12),
    color: '#666666',
    // marginLeft: px2dp(62),
  },
  endLineMoney: {
    fontSize: px2dp(14),
    // fontFamily: commonStyle.lightFont,
    color: commonStyle.describeTextColor,
  },
  endLineMoneyUnit: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(12),
    color: '#666666',
  },
  endLineThree: {
    // fontFamily: commonStyle.lightFont,
    fontSize: px2dp(16),
    marginRight:0,
    position:'absolute',
    left:px2dp(282)
    // marginLeft: px2dp(66)
  },
  activity: {
    width: px2dp(59),
    height: px2dp(24),
    borderRadius: px2dp(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4444',
  },
  unActivity:{
    width: px2dp(59),
    height: px2dp(24),
    borderRadius: px2dp(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  activityText: {
    color: commonStyle.borderColor,
  },
  inActivity: {
    backgroundColor: 'transparent',
    color: '#666666',
  },
});
export default ScrollableItem;
