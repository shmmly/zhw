import {Component} from 'react';
import {px2dp} from '../../utils/pxUtils';
import {StyleSheet, TextInput, View, Text, Image, Alert} from 'react-native';
import * as React from 'react';
import PopupDialog, {
  DialogTitle,
  DialogContent,
  DialogButton,
  DialogActionList,
  SlideAnimation
} from 'react-native-popup-dialog';
import commonStyle from '../../utils/commonStyle';
import Button from '../Button';

interface DialogItemProps {
  /**
   * 控制 dialog的 显示和隐藏
   */
  visible: boolean;
  /**
   * 修改的标题
   */
  title: string;
  /**
   * 输入框的提示内容
   */
  placeholder: string;
  /**
   * 输入框触发的回调函数
   * @param value 输入回调的数值
   */
  onChangeText: (value) => void;
  /**
   * 是不是 switch输入类型
   */
  isSwitch: boolean;
  /**
   *
   */
  onVisible: (value: boolean) => void;
  /**
   *  外部控制关闭
   */
  onTouchOutside: () => void;
}

class DialogItem extends Component<DialogItemProps, {}> {
  static defaultProps = {
    hasButton: false,
    isSwitch: false,
  };

  render() {
    const {
      visible,
      title,
      placeholder,
      onChangeText,
      isSwitch,
      onVisible,
      onTouchOutside,
    } = this.props;
    const actions = isSwitch
      ? null
      : [
          <DialogButton  key="1" text="确认"  textStyle={styles.textStyle}
          style={styles.dialogButton}
          onPress={() => onVisible(false)}/>

        ];
    const titles = isSwitch ? null : <DialogTitle style={styles.dialogTitle}
                                                  hasTitleBar={false}
                                                  textStyle = {styles.dialogTitleTextStyle}
                                                  align="left" title={title} />;
    return (
      <PopupDialog
        onTouchOutside={onTouchOutside}
        visible={visible}
        width={px2dp(270)}
        height={px2dp(141)}
        containerStyle={styles.dialogContainer}
        actionsBordered
        actions={actions}
        dialogTitle={titles}
        dialogAnimation={new SlideAnimation({
          slideFrom:'bottom'
        })}
        dialogStyle={styles.dialog}
        actionContainerStyle={styles.actionContainerStyle}
      >
        {isSwitch ? (
          <DialogContent style={styles.switchContent}>
            <View style={styles.switchDialogTitle}>
              <Text style={styles.dialogTitleTextStyle}>{title}</Text>
            </View>
            <Button
              special
              onPress={() => onVisible(false)}
              style={styles.topContent}>
              <View style={styles.wrapText}>
                <Text style={styles.text}>男</Text>
              </View>
              <View style={styles.circle} />
            </Button>
            <View style={styles.switchLineStyle} />
            <Button
              special
              onPress={() => onVisible(false)}
              style={styles.downContent}>
              <View style={styles.wrapText}>
                <Text style={styles.text}>女</Text>
              </View>
              <View
                style={[
                  styles.circle,
                  {
                    borderWidth: StyleSheet.hairlineWidth,
                    backgroundColor: 'transparent',
                  },
                ]}
              />
            </Button>
          </DialogContent>
        ) : (
          <DialogContent style={styles.dialogContent}>
            <TextInput
              placeholder={placeholder}
              onChangeText={onChangeText}
              style={styles.dialogInput}
            />
            <View style={styles.lineStyle} />
          </DialogContent>
        )}
      </PopupDialog>
    );
  }
}
const styles = StyleSheet.create({
  dialogTitle: {
    width:px2dp(270),
    // backgroundColor:'yellow',
    paddingBottom: 0,
    height:px2dp(35)
    // position: 'absolute',
    // left: px2dp(18),
    // top: px2dp(19),
    // alignSelf: 'flex-start',
    // height: px2dp(16),
  },
  switchDialogTitle: {
    marginTop: px2dp(10),
    marginLeft: px2dp(0),
    height: px2dp(16),
  },
  dialogTitleTextStyle: {
    fontSize: px2dp(17),
    color: '#333333',
    // fontFamily: null
  },
  dialogContainer: {
    backgroundColor: 'transparent',
    // backgroundColor: "red",
    // flex: 1,
    padding: 0,
  },
  textStyle: {
    color: '#333333',
    fontSize: px2dp(16),
    paddingVertical: 0,
    textAlign: 'center',
    fontFamily: null,
  },
  dialogButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height:px2dp(40),
    // marginBottom:px2dp(14),
    // backgroundColor:'black',
    padding: 0,
  },
  dialog: {
    // backgroundColor: "red",
    backgroundColor: '#f7f7f7',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContent: {
    // backgroundColor: "red",
    height:px2dp(66),
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
  lineStyle: {
    // position:'absolute',
    // top: px2dp(96),
    // width: px2dp(218),
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  switchLineStyle: {
    marginTop: px2dp(16),
    width: px2dp(230),
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  dialogInput: {
    position:'absolute',
    bottom:px2dp(0),
    width:px2dp(218),
    height:px2dp(36),
    // padding: 0,
    backgroundColor: '#f7f7f7',
    // backgroundColor: 'red',
  },
  actionContainerStyle: {
    // height: 0,
  },
  circle: {
    // marginRight: px2dp(36),
    alignItems: 'center',
    justifyContent: 'center',
    width: px2dp(6),
    height: px2dp(6),
    backgroundColor: '#f76260',
    borderColor: 'black',
    borderStyle: 'solid',
    borderRadius: 15,
    // marginLeft:px2dp(181)
  },
  topContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(13),
    marginTop: px2dp(27),
    // width: px2dp(270),
    // backgroundColor:'red',
    justifyContent: 'space-between',
  },
  downContent: {
    marginTop: px2dp(16),
    flexDirection: 'row',
    alignItems: 'center',
    height: px2dp(13),
    justifyContent: 'space-between',
  },
  wrapText: {
    // marginLeft: px2dp(34),
    flex: 1,
  },
  text: {
    fontSize: px2dp(14),
    color: '#333333',
  },
  switchContent: {
    backgroundColor: '#f7f7f7',
    // backgroundColor: "black",
    flex: 1,
    height: px2dp(115),
    width: px2dp(270),
    padding: 0,
    margin: 0,
  },
});

export default DialogItem;
