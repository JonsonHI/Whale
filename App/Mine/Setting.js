/**
 * Created by zhou on 2016/12/6.
 */
/**
 *  设置
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
    Button,
} from 'react-native';
var {NativeModules}=require('react-native');

var CalendarManager = NativeModules.CalendarManager;
var cache = NativeModules.CacheMoudle;
import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
var Width = Dimensions.get('window').width; //屏宽
var About = require('./About')//关于我们
import UserDefaults from '../common/UserDefaults';//存值
import Common from '../common/constants';//存值
import App from '../App' //APP

class Setting extends  React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            cache:0

        })
    }
    clearRom  =()=>{
        Platform.OS === 'ios' ?
            CalendarManager.cleanCache((error, events) => {
                if (error) {
                    console.error(error);
                } else {
                    this.setState({
                        cache:0
                    })
                }
            })
            :
            cache.clearImageCache();
        this.setState({
            cache:0
        })
    }
    render () {
        return (
            <View style={styles.container}>
                <NavigatorBar title='设置'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />
                {/*------清除缓存------*/}
                <TouchableOpacity onPress={()=>this.clearRom()}>
                    <View style={styles.clear}>
                        <Text style={styles.settingtext}>清理缓存</Text>
                        <Text style={styles.clearnum}>{this.state.cache}KB</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.line}/>

                {/*------关于我们------*/}
                <TouchableOpacity  onPress={()=>{this._onPress()}}>
                    <View style={styles.clear}>
                        <Text style={styles.settingtext}>关于我们</Text>
                        <Image style={styles.iconStyle} source={{uri:'forward'}}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.line}/>

                <View style={{flex:1,justifyContent:'flex-end',backgroundColor:'#fff'}}>
                    <TouchableOpacity style={styles.logoutStyle} onPress={()=>this._onPressGO()}>
                        <Text style={styles.logoutTextStyle}>
                            退出登录
                        </Text>
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
        this.props.navigator.pop();
    }
    rightAction(){

    }

    /**
     * 跳转到About页面
     */
    _onPress(){
        this.props.navigator.push({
            component: About,
        });
    }

    componentWillMount() {

        Platform.OS === 'ios' ?
            CalendarManager.cacheSize((error, events) => {
                if (error) {
                    console.error(error);
                } else {
                    this.setState({
                        cache:Math.round((events/1024/1024)*100)
                    })
                }
            })
            :
            cache.getImageCacheSize().then((value)=> {
                /**
                 对应原生模块中的代码：promise.resolve(((double)(size1+size2)));
                 */
                let size=Math.round((value / 1024 / 1024) * 100) ;
                this.setState({
                    cache:size
                })
            }, (erro)=> {
                /**
                 对应原生中的代码：
                 try（）｛｝catch (Exception e){
                promise.reject(e);
                return;
            }
                 */
            })
    }
    /**
     * 退出登录按钮
     */
    _onPressGO(){
        UserDefaults.clearCachedObject(Common.storeKeys.LOGIN_SUCCESS_USERNAME_PSW_STATE);
        this.props.navigator.immediatelyResetRouteStack([
            {
                component:App
            }
        ])
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },clear:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width:Width,
        height:45,
        backgroundColor:'#fff',
        alignItems:'center',
        marginBottom:0.5
    },settingtext:{
        fontSize:15,
        marginLeft:20,
        color:  '#333333'
    },clearnum:{
        fontSize:15,
        marginRight:20,
        color:  '#999999'
    },line:{
        height:0.5,
        backgroundColor:'#e5e5e5'
    },iconStyle:{
        width:10,
        height:15,
        marginRight:20
    },logoutStyle:{
        marginLeft:20,
        marginRight:20,
        backgroundColor:'#0080ff',
        height:45,
        borderRadius:3,
        justifyContent:'center',
        marginBottom:12
    },logoutTextStyle:{
        fontSize:16,
        color:'#ffffff',
        textAlign:'center'
    }
});

module.exports = Setting;
