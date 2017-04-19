/**
                   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           /  _||||| -:- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . __
      ."" '<  `.___\_<|>_/___.'  >'"".
     | | :  `- \`.;`\ _ /`;.`/ - ` : | |
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
         佛祖保佑       永无BUG

  Created by Jonson on 2016/12/5.
  读取本地信息,判断跳转页面
*/
//根据页面
'use strict';
import React, { Component } from 'react';


import Main from './Main/Main'
import Drawer from './Base/Drawers';
import AndroidMain from './Main/AndroidMain.js'
import {
    StyleSheet,
    Navigator,
    StatusBar,
    BackAndroid,
    View,
    Platform,
    NetInfo,
    Text,
    InteractionManager,
    ToastAndroid,
} from 'react-native';


export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19
var _navigator;
class App extends Component {
    lastBackPressed = 0;
    lastAppState = 'active';
    constructor(props) {
        super(props);
        // this.renderScene = this.renderScene.bind(this),

        this.state = {
            Connected: null,
        }
    }
    // goBack() {
    //     return NaviGoBack(_navigator);
    // }

    // renderScene(route, navigator) {
    //     let Component = route.component;
    //     _navigator = navigator;
    //     return (
    //         <Component navigator={navigator} route={route} />
    //     );
    // }
    componentWillMount() {
        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    componentWillUnmount() {
        if (Platform.OS === 'android') {
            BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
        }
    }
    onBackAndroid = () => {
        const now = Date.now();
        if (now - this.lastBackPressed < 1500) {
            BackAndroid.exitApp();
        } else {
            this.lastBackPressed = now;
            ToastAndroid.show('再按一次返回键退出本应用', 1000);
        }

        return true;
    };

    configureScene(route, routeStack) {

        // return Navigator.SceneConfigs.PushFromRight;
        var conf = Navigator.SceneConfigs.HorizontalSwipeJump;
        conf.gestures = null;
        return conf;
    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <Navigator
                    ref='navigator'
                    style={styles.navigator}
                    configureScene={this.configureScene}
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator={navigator} route={route} {...route.passProps} />
                        )
                    } }
                    // initialRoute={{
                    //     component: Platform.OS === 'ios' ? Main : AndroidMain,
                    //     name: '主页'
                    // }}
                    initialRouteStack={
                        [{
                            component: AndroidMain,
                            name: '主页'
                        }]
                    }
                    />
            </View>

        );


    }

}
let styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

export default App;
module.exports = App;