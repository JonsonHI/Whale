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
import App from './App'
import AppContainer from './AppContainer'
import { Provider } from 'react-redux';
import store from './store/store';
import { NetInfo, View, Text,StyleSheet,Platform,Image,TouchableOpacity } from 'react-native';
import NoInfo from './Home/NoNetInfo';//无网络显示的页面
import Loading from './common/Loading';//无网络显示的页面
import GuidePage from './Guidepage/GuidePage'
import Comm from './common/constants'
var Swiper = require('react-native-swiper')//轮播组件
/**设置根目录**/
class RootApp extends Component {
    constructor(props) {
        super(props);
        // this.renderScene = this.renderScene.bind(this),
        // this._handleConnectivityChange = this._handleConnectivityChange.bind(this),
            this.state = {
                Connected: null,
                isConnected: 1
            }


    }

    componentDidMount() {
        // setTimeout(()=>{
            
        // })
        // NetInfo.isConnected.addEventListener(
        //     'change',
        //     this._handleConnectivityChange
        // );
    }

    // _handleConnectivityChange(isConnected) {
    //     console.debug(isConnected)
    //     this.setState({
    //         isConnected: isConnected,
    //     })
    //     NetInfo.isConnected.removeEventListener(
    //         'change',
    //         this._handleConnectivityChange
    //     );
    // }
    //{/** */}
    render() {
        return (
            <Provider store={store} >
                {
                    this.state.isConnected == 6 ?

                        <Swiper style={styles.wrapper}
                            paginationStyle={{
                                bottom: Platform.OS === 'ios' ? -50 : -50
                            }}
                            loop={false}
                            >
                            <View style={styles.slide1}>
                            {
                                Platform.OS === 'ios' ?
                                    <Image source={{ uri: '1.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                                    :
                                    <Image source={{ uri: 'gui1' }} style={{ height: Comm.window.height, width: Comm.window.width,justifyContent: 'center' }} />
                            }
                                
                            </View>
                            <View style={styles.slide1}>
                                {
                                Platform.OS === 'ios' ?
                                    <Image source={{ uri: '2.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                                    :
                                    <Image source={{ uri: 'gui2' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                            }
                            </View>
                            <View style={styles.slide1}>
                                {
                                Platform.OS === 'ios' ?
                                    <Image source={{ uri: '3.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                                    :
                                    <Image source={{ uri: 'gui3' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                            }
                            </View>

                            <View >

                               {
                                Platform.OS === 'ios' ?
                                    <Image source={{ uri: '4.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                                    :
                                    <Image source={{ uri: 'gui4' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                            }
                                <TouchableOpacity style={{ bottom: 150, width: Comm.window.width, height: 100, }}
                                    onPress={() => this.start()}
                                    >
                                </TouchableOpacity>
                            </View>

                        </Swiper>
                        :

                        <AppContainer />

                }
            </Provider>
        )
    }
    start(){
        this.setState({
            isConnected : 2
        })
    }
}
var styles = StyleSheet.create({
    wrapper: {

    },
    slide1: {
        justifyContent: 'center',
        alignItems: 'center',
        // height: Comm.window.height, width: Comm.window.width
    },
});
export default RootApp;