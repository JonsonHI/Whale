/**
 * Created by zhou on 2016/12/6.
 */
/**
 *  关于我们
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
    Dimensions
    } from 'react-native';

import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
var Width = Dimensions.get('window').width; //屏宽
class About extends  React.Component {
    render () {
        return (
            <View style={styles.container}>
                <NavigatorBar title='关于我们'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}  />

                <View style={styles.iconStyle}>
                    <Image style={styles.icon} source={require('../image/monkey.jpg')} />
                    <Text style={styles.textStyle}>当前版本:V1.0</Text>
                </View>

                <View style={styles.divide}/>

                {this.Items('公司网址','www.joinku.com')}

                <View style={styles.line}/>

                {this.Items('客服电话','4006761919')}

                <View style={styles.line}/>
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

    /*
     *
     *   下方详情item的方法
     *   title：标题
     *   value：值
     * */
    Items(title,value){
        return(
            <View style={styles.itemStyle}>
                <Text style={styles.titleStyle}>{title}</Text>
                <Text>:</Text>
                <Text style={styles.valueStyle}>{value}</Text>
            </View>
        );
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },iconStyle:{
        flexDirection:'column',
        height:152,
        alignItems:'center',
        backgroundColor:'#fff'
    },icon:{
        width:75,
        height:75,
        marginTop:25,
        borderRadius:3
    },textStyle:{
        marginTop:15,
        textAlign :'center',
        fontSize:12,
        color:'#999999'
    },divide:{//分隔的段落
        width:Width,
        height:8,
        borderTopWidth:0.5,
        borderTopColor:'#e5e5e5',
        borderBottomWidth :0.5,
        borderBottomColor:'#e5e5e5',
        backgroundColor:'#f5f5f5'
    },itemStyle:{
        flexDirection:'row',
        height:45,
        alignItems:'center',
        backgroundColor:'#fff'
    },titleStyle:{
        marginLeft:20,
        marginRight:5,
        fontSize:15,
        color:'#333333'
    },valueStyle:{
        marginLeft:5,
        fontSize:15,
        fontSize:15,
        color:'#333333'
    },line: {
        width: Width,
        height: 0.5,
        backgroundColor: '#e5e5e5'
    }
})

module.exports = About;
