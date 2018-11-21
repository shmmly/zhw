import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  firstLine,
  lastLine,
  otherLine,
  province,
  provinceFive,
  provinceFour,
  provinceOne,
  provinceThree,
  provinceTwo,
  spicelLine
} from "./data";
import Button from "../Button";
import { px2dp } from "../../utils/pxUtils";
import commonStyle from "../../utils/commonStyle";
import deviceInfo from "../../utils/deviceInfo";

interface CustomKeyBoardProps {
  inputCallBack: (value: string[]) => void;
}
interface CustomKeyBoardState {
  input: string[];
  // 显示 省
  provinceVisible: boolean;
  // 显示字母和数字
  letterVisible: boolean;
}
class CustomKeyBoard extends Component<
  CustomKeyBoardProps,
  CustomKeyBoardState
> {
  constructor(props: CustomKeyBoardProps) {
    super(props);
    this.state = {
      input: [],
      provinceVisible: true,
      letterVisible: false
    };
  }
  // 如果下次的state和本次的state 中input长度不同的话，那么就调用回调函数将数据给父组件
  componentDidUpdate(
    prevProps: Readonly<CustomKeyBoardProps>,
    prevState: Readonly<CustomKeyBoardState>,
    snapshot?: any
  ): void {
    if (prevState.input.length !== this.state.input.length) {
      this.props.inputCallBack(this.state.input);
    }
  }

  _renderCell = (item, index, input) => (
    <Button
      special
      onPress={() => {
        switch (item) {
          //关闭键盘
          case "确认":
            this.setState({ provinceVisible: false });
            break;
          //  切换键盘
          case "ABC":
            this.setState({
              letterVisible: true,
              provinceVisible: false
            });
            break;
          //  删除数组中最后一个
          case "删除":
            input.pop();
            this.props.inputCallBack(input);
            break;
          //  加入数组中
          default:
            this.setState({
              input: [...input, item]
            });
        }
      }}
      key={index}
    >
      <View style={styles.input}>
        <Text style={styles.text}>{item}</Text>
      </View>
    </Button>
  );

  render() {
    const { provinceVisible, letterVisible, input } = this.state;
    return (
      <View style={styles.wrapContainer}>
        {provinceVisible ? (
          <View style={styles.container}>
            <View style={styles.cell}>
              {provinceOne.map((item, index) =>
                this._renderCell(item, index, input)
              )}
            </View>
            <View style={styles.cell}>
              {provinceTwo.map((item, index) =>
                this._renderCell(item, index, input)
              )}
            </View>
            <View style={styles.cell}>
              {provinceThree.map((item, index) =>
                this._renderCell(item, index, input)
              )}
            </View>
            <View style={styles.cell}>
              {provinceFour.map((item, index) =>
                this._renderCell(item, index, input)
              )}
            </View>
            <View style={styles.cell}>
              {provinceFive.map((item, index) =>
                this._renderCell(item, index, input)
              )}
            </View>
          </View>
        ) : null}
        {letterVisible ? (
          <View style={styles.otherContainer}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
              }}
            >
              {firstLine.map((item, index) => (
                <Button
                  special
                  key={index}
                  onPress={() => {
                    this.setState({ input: [...input, item] });
                  }}
                >
                  <View style={styles.largeInput}>
                    <Text style={styles.largeText}>{item}</Text>
                  </View>
                </Button>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              {otherLine.map((item, index) => (
                <Button
                  special
                  key={index}
                  onPress={() => this.setState({ input: [...input, item] })}
                >
                  <View style={styles.input}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                </Button>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around",
                marginLeft: px2dp(23),
                marginRight: px2dp(23)
              }}
            >
              {spicelLine.map((item, index) => (
                <Button
                  special
                  key={index}
                  onPress={() => this.setState({ input: [...input, item] })}
                >
                  <View style={styles.input}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                </Button>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              {lastLine.map((item, index) => (
                <Button
                  special
                  key={index}
                  onPress={() => {
                    switch (item) {
                      //关闭键盘
                      case "确认":
                        this.setState({ provinceVisible: false });
                        break;
                      //  切换键盘
                      case "省":
                        this.setState({
                          letterVisible: false,
                          provinceVisible: true
                        });
                        break;
                      //  删除数组中最后一个
                      case "删除":
                        input.pop();
                        this.props.inputCallBack(input);
                        break;
                      //  加入数组中
                      default:
                        this.setState({
                          input: [...input, item]
                        });
                    }
                  }}
                >
                  <View style={styles.input}>
                    <Text style={styles.text}>{item}</Text>
                  </View>
                </Button>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapContainer: {
    // flex: 1,
    alignItems: "center",
    // marginBottom: px2dp(0)
  },
  container: {
    flex: 1,
    width: deviceInfo.deviceWidth,
    height: px2dp(209),
    backgroundColor: "#ececec",
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-around"
  },
  otherContainer: {
    width: deviceInfo.deviceWidth,
    height: px2dp(209),
    backgroundColor: "#ececec",
    // backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: px2dp(34),
    height: px2dp(40),
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: px2dp(5),
    shadowOpacity: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: px2dp(3),
    marginTop: px2dp(2)
  },
  text: {
    fontSize: px2dp(14),
    color: commonStyle.navigatorTitleColor,
    padding: 0
  },
  largeInput: {
    alignItems: "center",
    justifyContent: "center",
    width: px2dp(42),
    height: px2dp(39),
    marginLeft: px2dp(4),
    marginTop: px2dp(4),
    borderRadius: px2dp(5),
    backgroundColor: commonStyle.backgroundColor,
    shadowColor: "rgba(0, 0, 0, 0.15)",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: px2dp(5),
    shadowOpacity: 1
  },
  largeText: {
    fontSize: px2dp(17),
    color: commonStyle.navigatorTitleColor
  },
  cell:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"center"
  }
});

export default CustomKeyBoard;
