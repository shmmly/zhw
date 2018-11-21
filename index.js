/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
// import Demo from './Demo'
import * as WeChat from 'react-native-wechat';

WeChat.registerApp('wxd930ea5d5a258f4f');
AppRegistry.registerComponent(appName, () => App);
