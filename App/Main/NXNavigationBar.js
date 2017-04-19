import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';

//Dimentsions
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width; //屏宽

var NavigatorBar = React.createClass({

    render() {
        return (
            <View style={styles.navOutViewStyle}>
                <TouchableOpacity onPress={this.props.leftpress} style={styles.leftViewStyle}>
                    <Image source={{uri: this.props.leftBtnName}} style={{width:this.props.widthWH,height:this.props.widthWH}}/>
                </TouchableOpacity>

                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.props.title}</Text>

                <TouchableOpacity onPress={this.props.rightPress} style={styles.rightViewStyle}>
                    <Image source={{uri: this.props.rightBtnName}} style={{width:this.props.widthWH,height:this.props.widthWH}}/>
                </TouchableOpacity>

            </View>
        );
    }
});


var styles = StyleSheet.create({
    navOutViewStyle:{
        height:Platform.OS === 'ios' ? 64 : 44,paddingTop:Platform.OS === 'ios' ? 20 : 0,
        backgroundColor:'#0c7aff',
        // 设置主轴的方向
        flexDirection:'row',
        bottom:0,
        alignItems:'center',
        // 主轴方向居中
        justifyContent:'space-between'
    },
    leftViewStyle:{
       paddingLeft:10,paddingTop:15,paddingBottom:15,paddingRight:20,
    },
    rightViewStyle:{
        paddingLeft:20,paddingTop:15,paddingBottom:15,paddingRight:10,
    },
});

module.exports = NavigatorBar;