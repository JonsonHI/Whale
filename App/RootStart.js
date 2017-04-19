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
import React, { Component } from 'react';
import Root from './Root'
import { NetInfo, View, Text, StyleSheet, Platform, Image, TouchableOpacity } from 'react-native';
import Comm from './common/constants'
import JPushModule from 'jpush-react-native';//极光推送
var Swiper = require('react-native-swiper')//轮播组件
/**设置根目录**/
class RootApp extends Component {

    constructor(props) {
        super(props);
        // this.renderScene = this.renderScene.bind(this),

        this.state = {
            isConnected: 1,
        }
    }
    componentDidMount() {
        JPushModule.initPush()
        setTimeout(() => {
            this.setState({
                isConnected: 2
            })
        }, 2000);
    }
    //{/** */}
    render() {
        if (this.state.isConnected == 1) {
            return (

                <Image source={require('./image/pv.png')} style={styles.launchimageStyle} />      
                          
        )
        }else{
            return(
                <Root />
            )
        }

    }

}
var styles = StyleSheet.create({
    wrapper: {
    },
    launchimageStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Comm.window.height,
        width: Comm.window.width,
    },
});
export default RootApp;