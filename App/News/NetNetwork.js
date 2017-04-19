/**
 * Created by shaotingzhou on 2017/2/9.
 */
/**
 *发布:
 * 1.判断是否登录:
 *    未登录:跳转至登录界面
 *    登录:继续下一步判断
 * 2.判断企业是否认证:
 * 企业未认证 : 跳转认证提示页面
 * 企业认证 : 直接显示供应发布页面
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
    NetInfo,
    InteractionManager,
    Dimensions
} from 'react-native';
import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
var Width = Dimensions.get('window').width; //屏宽

class NetNetwork extends  React.Component {
    render () {
            return (
                <View>
                    <NavigatorBar title='无网络'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'xxxxx' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />
                    <View style={styles.topStyle}>
                        <Image source={{uri:'warning'}} style={styles.errorImageStyle}/>
                        <Text style={styles.errorTextStyle}>网络请求失败，请检查您的网络设置</Text>
                    </View>
                    <View style={{alignItems:'center'}}>
                        <Image source={{uri:'nonetwork'}} style={[styles.imageStyle,{marginTop:80}]}/>
                        <Text style={{marginTop:45,fontSize:17,color:'#333333'}}>网络请求失败</Text>
                        <Text style={{marginTop:12,fontSize:14,color:'#999999'}}>检查下网络再来吧</Text>
                        <View style={{marginTop:80,backgroundColor: '#b5b5b5',height:40,width:100,justifyContent:'center',alignItems:'center',borderRadius:3}}>
                            <TouchableOpacity onPress = {() => {this.props.reloadData()}}
                            >
                                <Text style={{fontSize:17, color:'#ffffff'}}>重新加载</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
    }
    /*
     *
     *   占位方法,无实际作用,只是为了去除警告
     *   @param
     *   @returns
     * */
    leftAction(){

    }
    rightAction(){

    }


}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems:'center'
    },
    errorImageStyle:{
        width:22,
        height:22,
        marginLeft:10,
        marginRight:10
    },
    imageStyle:{
        width:100,
        height:100,
        marginTop:120
    },
    topStyle:{
        height:40,
        backgroundColor:'#ffd85d',
        width:Width,
        alignItems:'center',
        flexDirection:'row'
    }

});

module.exports = NetNetwork;
