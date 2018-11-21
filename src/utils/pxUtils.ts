import deviceInfo from "./deviceInfo";
import { PixelRatio } from "react-native";

//像素密度
export const DEFAULT_DENSITY = 2;
const defaultWidth = 375;
const defaultHeight = 667;
const w2 = defaultWidth / DEFAULT_DENSITY;
//px转换成dp
const h2 = defaultHeight / DEFAULT_DENSITY;

export function px2dp(px: number):number {
  let scaleWidth = deviceInfo.deviceWidth / w2;
    let scaleHeight = deviceInfo.deviceHeight / h2;
    let scale = Math.min(scaleWidth, scaleHeight);
    px = Math.round((px * scale + 0.5));
    return px / DEFAULT_DENSITY;
}
