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
import Common from '../common/constants'
import {
    StyleSheet,
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import App from '../App'

class NoNetInfo extends Component {
   constructor(props) {
        super(props);
            this.state = {
                isConnected: null
            }


    }

    render() {
        if(this.state.isConnected == false || this.state.isConnected == null){
            return (
            
            <View style={styles.info}>

                <Image source={require("../image/noinfo.png")} style = {{height:100,width:100,alignItems:'center'}}/>
                 <TouchableOpacity onPress={()=>this.didclickButton()}>
                <View style = {{height:30,width:100,justifyContent:'center',alignItems:'center',backgroundColor:'gray'}}>
                    <Text>点击加载</Text>
                </View>
                </TouchableOpacity>
            </View>

        );
        }else if(this.state.isConnected == true){
            return(
                <App />
            );
        }
        


    }

    didclickButton(){
        console.debug("11111")
           let url = 'http://rap.taobao.org/mockjsdata/11194/time'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .catch((error) => {
                    if(error){
                    this.setState({
                        isConnected : false,
                    })
                    }
                })
                .then((responseData) => {
                    if(responseData){
                    this.setState({
                        isConnected : true,
                    })
                    }
                }).catch((error) => {
                console.debug('基酒页面获取数据失败+Base.js')
            })
    }

}
let styles = StyleSheet.create({
    info: {
        flex: 1,
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center'
    }
});

export default NoNetInfo;
// module.exports = NoNetInfo;