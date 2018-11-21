import { Component } from "react";
import Button from "../Button";
import * as React from "react";
import { Text, StyleSheet, Alert } from "react-native";
import commonStyle from "../../utils/commonStyle";
import { px2dp } from "../../utils/pxUtils";

interface CapCodeState {
  // 显示的倒计时
  code: number;
  // 控制能否按下去
  disable: boolean;
}

class CapCode extends Component<{}, CapCodeState> {
  private timer: any;
  constructor(props: {}) {
    super(props);
    this.state = {
      code: 60,
      disable: false
    };
  }

  handlePress = () => {
    const { code } = this.state;
    this.setState({
      disable: true
    });
    this.timer = setInterval(() => {
      let data = code;
      this.setState({
        code: --data
      });
      if (data === 0) {
        clearInterval(this.timer);
        this.setState({
          disable: false,
          code: 60
        });
      }
    }, 1000);
  };

  componentWillUnmount(): void {
    this.timer && clearInterval(this.timer);
  }

  render() {
    const { code, disable } = this.state;
    return (
      <Button onPress={this.handlePress} style={styles.container} special>
        {disable ? (
          <Text style={styles.text}>{code} s</Text>
        ) : (
          <Text style={styles.text}>发送验证码</Text>
        )}
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexWrap:'nowrap'
  },
  text: {
    width: px2dp(70),
    fontSize: px2dp(12),
    color: commonStyle.capCodeColor
  }
});
export default CapCode;
