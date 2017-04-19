/**
 * Created by zhou on 2016/12/6.
 */
/**
 *  意见反馈
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
    AsyncStorage,
    TextInput
    } from 'react-native';

import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar

class Feedback extends  React.Component {
    render () {
        return (
            <View style={styles.container}>
                <NavigatorBar title='意见反馈'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />

                <TextInput
                    style={styles.textInputStyle}
                    multiline={true}
                    underlineColorAndroid = {'transparent'}
                    placeholder="用着不爽？来这里吐槽"
                    />

                <TouchableOpacity onPress={()=>{alert('提交')}}>
                    <Text style={styles.buttonStyle}>提交</Text>
                </TouchableOpacity>
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
        backgroundColor: '#F5F5F5',

    },textInputStyle:{
        height:200,
        padding:15,
        backgroundColor:'#fff',
        borderRadius:3,
        borderWidth:0.5,
        borderColor:'#999',
        textAlignVertical:'top',
        margin:10,
        fontSize:15,
        color:'#999999'
    },buttonStyle:{
        marginTop:30,
        marginLeft:10,
        marginRight:10,
        textAlign:'center',
        backgroundColor:'#0000FF',
        padding:10,
        borderRadius:3,
        color:'#fff'
    }
});

module.exports = Feedback;
