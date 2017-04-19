/**
 * Created by zhou on 2016/12/6.
 */
/**
 *  企业认证
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
    } from 'react-native';

import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar

class Certification extends  React.Component {
    render () {
        return (
            <View style={styles.container}>
                <NavigatorBar title='企业认证'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />

            </View>
        )
    }
    /*
     *
     * 占位方法:无实际作用,为了去除警告
     *   @param
     *   @returns
     * */
    leftAction(){
        this.props.navigator.pop();
    }
    rightAction(){

    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

module.exports = Certification;
