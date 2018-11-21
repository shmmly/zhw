import {NavigationInjectedProps} from 'react-navigation';
import {Component} from 'react';
import * as React from 'react';
import {View, StyleSheet, Text, Image, Alert} from 'react-native';
import CustomKeyBoard from '../../components/CustomKeyBoard/index';
import Button from '../../components/Button';
import Images from '../../assets/images';
import {px2dp} from '../../utils/pxUtils';
import commonStyle from '../../utils/commonStyle';
import ModalDropdown from 'react-native-modal-dropdown';
interface InputCarNumPageProps extends NavigationInjectedProps {}
interface InputCarNumPageState {
  carNum: string;
  carType: string;
  inputValue: string[];
}
class InputCarNumPage extends Component<
  InputCarNumPageProps,
  InputCarNumPageState
> {
  static navigationOptions = ({navigation}: InputCarNumPageProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />,
  });
  constructor(props: InputCarNumPageProps) {
    super(props);
    this.state = {
      carNum: '',
      carType: '',
      inputValue: [],
    };
  }

  /**
   * 这里的 3 可以通过arrry的length来获取
   * @param top
   */
  adjustFrame = ({top}) => {
    return {
      right: px2dp(10),
      top: px2dp(133),
      height: (StyleSheet.hairlineWidth + 34) * 3,
    };
  };

  render() {
    const {inputValue} = this.state;
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.input}>
          <View style={styles.inputLeft}>
            <Text style={styles.leftText}>
              {inputValue.length === 0 ? '请输入车牌号' : inputValue}
            </Text>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.inputRight}>
            <ModalDropdown
              options={['蓝牌', '黄牌', '绿牌']}
              defaultValue={'蓝牌'}
              textStyle={styles.textStyle}
              dropdownStyle={styles.dropdownStyle}
              adjustFrame={this.adjustFrame}
              dropdownTextStyle={styles.dropdownTextStyle}
              highlightedRowText={styles.highlightedRowText}
            />
            <View style={styles.down}>
              <Image source={Images.down} />
            </View>
          </View>
        </View>

        <Button
          text={'添加车辆'}
          onPress={() => navigation.navigate('CarManageOnePage')}
          btnStyle={styles.btnStyle}
        />

        <View style={styles.keyboard}>
          <CustomKeyBoard
            inputCallBack={inputValue => {
              this.setState({inputValue});
            }}
          />
        </View>
      </View>
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
  keyboard: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
  },
  input: {
    marginTop: px2dp(34),
    width: px2dp(359),
    height: px2dp(36),
    borderRadius: px2dp(10),
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#99caff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLeft: {
    width: px2dp(260),
    justifyContent: 'center',
    flex: 1,
    marginLeft: px2dp(14),
  },
  leftText: {
    // fontFamily: commonStyle.lightFont,
    fontSize: 14,
    // lineHeight: 22,
    color: '#999999',
  },
  verticalLine: {
    width: StyleSheet.hairlineWidth,
    height: px2dp(37),
    backgroundColor: '#99caff',
  },
  inputRight: {
    width: px2dp(99),
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    marginLeft: px2dp(15),
    marginRight: px2dp(14),
    fontSize: 14,
    color: commonStyle.navigatorTitleColor,
  },
  down: {
    marginRight: px2dp(15),
  },
  dropdownStyle: {
    width: px2dp(99),
    backgroundColor: '#ffffff',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#99caff',
  },
  dropdownTextStyle: {
    marginLeft: px2dp(14),
    fontSize: 12,
    color: commonStyle.describeTextColor,
    paddingHorizontal: 0,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  btnStyle: {
    marginTop: px2dp(218),
    width: px2dp(359),
    height: px2dp(38),
    borderRadius: px2dp(19),
  },
  highlightedRowText: {
    color: commonStyle.themeColor,
  },
});

export default InputCarNumPage;
