/**
 * Created by Administrator on 2017/1/12.
 * 注册成功页面
 */
import React, { Component } from 'react';
import {

    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions
    } from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Width = Dimensions.get('window').width; //屏宽

export default class RegisiterSuccess extends Component{

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='注册成功' widthWH={Platform.OS == 'ios' ? 15:15} />

                <View style={{alignItems:'center'}}>
                    <Text style={styles.TextStyle}>注册成功!</Text>

                    <Text style={{fontSize:14,color:'#666666',marginTop:20}}>如需发布基酒供应信息，请进行企业认证。</Text>

                    <View style={styles.viewStyle}>
                        <TouchableOpacity style={styles.btnLeftStyle}>
                            <Text style={styles.btnTextStyle}>跳过</Text>
                        </TouchableOpacity>

                        <TouchableOpacity  style={styles.btnRightStyle}>
                            <Text style={styles.btnTextStyle}>立即认证</Text>
                        </TouchableOpacity>
                        </View>

                </View>

            </View>
        );
    }


    _onPress(jump){
        this.props.navigator.push({
            component: jump,

        });
    }

}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },TextStyle:{
        marginTop:100,
        color:'#03a06a',
        fontWeight:'bold',
        fontSize:20
    },btnLeftStyle:{
        marginLeft:27,
        height:45,
        backgroundColor:'#b5b5b5',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3,
        width:145
    }, btnRightStyle:{
        marginRight:27,
        height:45,
        backgroundColor:'#0080ff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:3,
        width:145
    },btnTextStyle:{
        fontSize:18,
        color:'#ffffff'
    },viewStyle:{
        width:Width,
        marginTop:50,
        flexDirection:'row',
        justifyContent:'space-between'
    }
});
