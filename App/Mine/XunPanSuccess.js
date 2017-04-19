/**
 * Created by Administrator on 2017/1/12.
 * 询盘成功页面
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    Dimensions,
    TextInput
    } from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Width = Dimensions.get('window').width; //屏宽

export default class XunPanSuccess extends Component{

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='询盘成功' widthWH={Platform.OS == 'ios' ? 15:15} />

                <View style={{alignItems:'center'}}>
                <Image source={{uri:'submitted'}} style={styles.imageStyle}/>
                <Text style={{marginTop:45,color:'#666666',fontSize:15}}>您的信息已提交成功，客服会联系您</Text>
                <Text style={{marginTop:12,color:'#666666',fontSize:15}}>请耐心等待！</Text>

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
        backgroundColor: '#ffffff',
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
    },imageStyle:{
        width:100,
        height:100,
        marginTop:120
    },viewStyle:{
        width:Width,
        marginTop:50,
        flexDirection:'row',
        justifyContent:'space-between'
    }
});
