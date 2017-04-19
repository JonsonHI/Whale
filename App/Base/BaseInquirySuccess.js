/**
 *基酒
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
    ScrollView,
    Navigator,
    InteractionManager,
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var CommentCell = require('./BaseCommentCell');//封装的Cell
var BaseDetail = require('./BaseDetail');//详情界面
import XPRecord from '../Mine/XPRecord';//我的询盘
import APP from '../App';//首页”
import Home from '../Home/Home';//首页”
var Width = Dimensions.get('window').width; //屏宽
var BaseInquirySuccess = React.createClass({
    render() {
        return (
            <View style={styles.container}>
                    <NavigatorBar title='询盘成功' widthWH={Platform.OS == 'ios' ? 15:15} />

                    <View style={{alignItems:'center'}}>
                        <Image source={{uri:'submitted'}} style={styles.imageStyle}/>
                        <Text style={{marginTop:45,color:'#666666',fontSize:15}}>您的信息已提交成功，客服会联系您</Text>
                        <Text style={{marginTop:12,color:'#666666',fontSize:15}}>请耐心等待！</Text>

                        <View style={styles.viewStyle}>
                            <TouchableOpacity style={styles.btnLeftStyle} onPress={()=>this.myInpuiryAction()}>
                                <Text style={styles.btnTextStyle}>查看我的询盘</Text>
                            </TouchableOpacity>

                            <TouchableOpacity  style={styles.btnRightStyle} onPress={()=>this.homeAction()}>
                                <Text style={styles.btnTextStyle}>返回首页</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

            </View>
        );
    },
    //返回
    leftAction(){
        this.props.navigator.pop({

        });
    },
    //我的询盘
    myInpuiryAction(){
        this.props.navigator.push({
            component:XPRecord
        });
    },
    //首页
    homeAction(){
        InteractionManager.runAfterInteractions()
        {
            // this.props.navigator.push({
            //     component : APP,
                
            
            // }) 
            this.props.navigator.immediatelyResetRouteStack(
                [{
                component: APP,
                }]
            );
            // this.props.selectHome();
        }
    },
});


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

module.exports = BaseInquirySuccess;
