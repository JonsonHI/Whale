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
} from 'react-native';

import {
    NetInfoContent,
} from './actions/appActions';
import Search from './Home/Search'
import isLoding from './common/Loading'
export const STATUS_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 25)
export const ABOVE_LOLIPOP = Platform.Version && Platform.Version > 19
var _navigator;
export default class App extends Component {
    constructor(props) {
        super(props);
        // this.renderScene = this.renderScene.bind(this),
        this.state = {
            Connected : null
        }
        
    }
    componentDidMount() {
        // const {App, dispatch} = this.props;
        // dispatch(NetInfoContent());
        NetInfo.isConnected.addEventListener('change', (isConnected) => {
            console.log(isConnected + '           1111');
            
            this.setState({
                Connected : isConnected,
        });
        });


    }
    _handleConnectivityChange(isConnected) {
        const {App, dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {

        })
    }
    componentWillUnMount() {
        console.log("componentWillUnMount");
        NetInfo.removeEventListener('change', this._handleConnectivityChange);
    }

    goBack() {
        return NaviGoBack(_navigator);
    }

    // renderScene(route, navigator) {
    //     let Component = route.component;
    //     _navigator = navigator;
    //     return (
    //         <Component navigator={navigator} route={route} />
    //     );
    // }

    configureScene(route, routeStack) {
        return Navigator.SceneConfigs.PushFromRight;
    }

    render() {

        // const {App, dispatch} = this.props;

        return (
            <View style={{ flex: 1 }}>
                {
                    this.state.Connected  ?
                    
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
                            // renderScene={this.renderScene}
                            initialRoute={{
                                component: Platform.OS === 'ios' ? Main : AndroidMain,
                                name: '主页'
                            }}
                            />
                        
                        :                   
                        <View style={{ top: 300 }}>
                            <Text>11111</Text>
                        </View>
                }

            </View>
        );

    }
}
let styles = StyleSheet.create({
    navigator: {
        flex: 1
    }
});

// export default App;
// module.exports = App;