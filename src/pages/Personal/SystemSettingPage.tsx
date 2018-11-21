import { Component } from "react";
import { View, StyleSheet, Text, Switch, Image, Alert } from "react-native";
import commonStyle from "../../utils/commonStyle";
import * as React from "react";
import { px2dp } from "../../utils/pxUtils";
import Button from "../../components/Button";
import { NavigationInjectedProps } from "react-navigation";
import Images from "../../assets/images";

/**
 * 封装的小组件
 *  避免重复代码
 */
interface ItemProps {
  /**
   * 点击switch之后的回调
   * @param value
   */
  onValueChange?: (value?: boolean) => void;
  /**
   * 显示的标题
   */
  title: string;
  /**
   * switch按钮
   */
  hasSwitch?: boolean;
  /**
   * 按钮的返回时间
   */
  onPress?: () => void;
  /**
   * switch value
   */
  value?: boolean;
}

const Item: React.SFC<ItemProps> = ({
  onValueChange,
  title,
  hasSwitch = false,
  onPress,
  value = true
}) =>
  hasSwitch ? (
    <View style={itemStyles.container}>
      <View style={itemStyles.wrapTitle}>
        <Text style={itemStyles.title}>{title}</Text>
      </View>
      <View style={itemStyles.switch}>
        <Switch onValueChange={onValueChange} value={value} />
      </View>
    </View>
  ) : (
    <Button special style={itemStyles.container} onPress={onPress}>
      <View style={itemStyles.wrapTitle}>
        <Text style={itemStyles.title}>{title}</Text>
      </View>
    </Button>
  );

const itemStyles = StyleSheet.create({
  container: {
    width: px2dp(375),
    height: px2dp(50),
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: commonStyle.borderColor
  },
  wrapTitle: {
    flex: 1,
    marginLeft: px2dp(16)
  },
  title: {
    fontSize: 16,
    color: "#333333"
  },
  switch: {
    marginRight: px2dp(16)
  }
});

interface SystemSettingPageState {
  switchValue: boolean;
}
interface SystemSettingPageProps extends NavigationInjectedProps {}

class SystemSettingPage extends Component<
  SystemSettingPageProps,
  SystemSettingPageState
> {
  static navigationOptions = ({ navigation }: NavigationInjectedProps) => ({
    headerLeft: (
      <Button onPress={() => navigation.pop()} style={styles.back} special>
        <Image source={Images.back} />
      </Button>
    ),
    headerRight: <View />
  });

  constructor(props) {
    super(props);
    this.state = {
      switchValue: true
    };
  }

  render() {
    const { switchValue } = this.state;
    return (
      <View style={styles.container}>
        <Item
          title={"新消息提醒"}
          hasSwitch
          onValueChange={switchValue => {
            this.setState({ switchValue });
          }}
          value={switchValue}
        />
        <Item title={"检查更新"} onPress={() => {}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    marginLeft: px2dp(15),
    marginTop: px2dp(11),
    marginBottom: px2dp(13)
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: commonStyle.backgroundColor
  }
});

export default SystemSettingPage;
