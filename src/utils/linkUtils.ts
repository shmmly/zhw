import { Linking, Platform } from "react-native";

export default {
  /**
   *
   * @param lon 经度
   * @param lat 纬度
   * @param targetApp 目标app
   * @param name 查询名称
   */
  navigatorToMapApp(
    lon: number,
    lat: number,
    targetApp: string = "baidu",
    name: string = "停车场"
  ) {
    let url = "";
    let webUrl = `http://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
    let webUrlGaode = `http://uri.amap.com/navigation?to=${lon},${lat},${name}&mode=bus&coordinate=gaode`;
    let webUrlBaidu = `http://api.map.baidu.com/direction?destination=latlng:${lat},${lon}|name=${name}&mode=transit&coord_type=gcj02&output=html&src=mybaoxiu|wxy`;

    if (Platform.OS == "android") {
      //android
      if (targetApp == "gaode") {
        url = `androidamap://route?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
        webUrl = webUrlGaode;
      } else if (targetApp == "baidu") {
        url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
        webUrl = webUrlBaidu;
      }
    } else if (Platform.OS == "ios") {
      //ios
      if (targetApp == "gaode") {
        url = `iosamap://path?sourceApplication=appname&dev=0&m=0&t=1&dlon=${lon}&dlat=${lat}&dname=${name}`;
        webUrl = webUrlGaode;
      } else if (targetApp == "baidu") {
        url = `baidumap://map/direction?destination=name:${name}|latlng:${lat},${lon}&mode=transit&coord_type=gcj02&src=thirdapp.navi.mybaoxiu.wxy#Intent;scheme=bdapp;package=com.baidu.BaiduMap;end`;
        webUrl = webUrlBaidu;
      }
    }

    /**
     * 判断支持不支持 不支持就在浏览器中打开
     * 支持就在app中打开
     */
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log("Can't handle url: " + url);
          return Linking.openURL(webUrl).catch(e => console.warn(e));
        } else {
          return Linking.openURL(url).catch(e => console.warn(e));
        }
      })
      .catch(err => console.error("An error occurred", err));
  }
};
