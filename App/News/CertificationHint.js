/**
 * Created by shaotingzhou on 2016/12/6.
 */
/**
 * 认证提示页面
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
    Dimensions,
    InteractionManager
} from 'react-native';

import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
import  CompanyCertification from './CompanyCertification' //企业认证界面
import App from '../App' //APP
var Width = Dimensions.get('window').width; //屏宽
var Height = Dimensions.get('window').height; //屏高

class CertificationHint extends  React.Component {
    render () {
        return (
            <View style={styles.container}>
                {/*NavigationBar*/}
                <NavigatorBar title='认证提示'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'xxxxx' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />
                {/*认证图片*/}
                <View style={styles.hintImageView}>
                    <Image source={require('../image/supply.png')} style={styles.hintImage}/>
                </View>
                {/*认证信息*/}
                <View style={styles.hintTextView}>
                    <Text style={{color:'#B5B5B5'}}>您在基酒平台还未"企业认证",</Text>
                    <Text style={{marginTop:5,color:'#B5B5B5'}}>请完善企业认证信息!</Text>
                </View>
                {/*返回首页按钮*/}
                <View style={styles.hintBtnView}>
                    <TouchableOpacity onPress={this.backHome}>
                        <View style={styles.backBtnView}>
                            <Text style={styles.btnTextStyle}>返回首页</Text>
                        </View>
                    </TouchableOpacity>
                    {/*企业认证按钮*/}
                    <TouchableOpacity onPress={this.certificationOnclick}>
                        <View style={styles.certificationBtnView}>
                            <Text style={styles.btnTextStyle}>企业认证</Text>
                        </View>
                    </TouchableOpacity>
                </View>
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

    }
    rightAction(){

    }
    /*
     *  企业认证点击事件
     *  跳转至供应企业认证界面
     *   @param 无
     *   @returns 无
     * */
    certificationOnclick = () =>{
        InteractionManager.runAfterInteractions(()=>{
        this.props.navigator.push(
            {
                name:'CertificationHintCompanyCertification',
                component: CompanyCertification,
            }
        );
        })
    }
    /*
     *  返回首页点击事件
     *  返回到首页
     *   @param 无
     *   @returns 无
     * */
    backHome = () => {
        this.props.navigator.immediatelyResetRouteStack([
            {
                component:App
            }
        ])
    }


}

var styles = StyleSheet.create({
    //最外面的view
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    //中间大图外部view
    hintImageView : {
        marginTop:Height*0.2,
        alignItems:'center'
    },
    //中间大图尺寸
    hintImage: {
        width: 100,
        height: 100
    },
    //中部提示文字view
    hintTextView: {
        alignItems:'center',
        marginTop:20,
    },
    //下部按钮最外面的view
    hintBtnView: {
        marginTop:50,
        flexDirection:'row',
        justifyContent:'center',
    },
    //返回首页按钮view
    backBtnView: {
        height:40,
        width:110,
        backgroundColor:'#C1CDCD',
        marginRight:5,
        borderRadius:4,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'
    },
    //企业认证按钮view
    certificationBtnView: {
        height:40,
        width:110,
        backgroundColor:'#1C86EE',
        borderRadius:4,
        overflow:'hidden',
        justifyContent:'center',
        alignItems:'center'

    },
    //按钮字体样式
    btnTextStyle:{
          color:'white',
    }

});

module.exports = CertificationHint;
