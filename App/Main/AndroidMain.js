/**
 * 主页控制器
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Platform,   // 判断当前运行的系统
    Navigator,
    Dimensions,
    TabBarIOS,
    InteractionManager,
    NetInfo,
    TouchableOpacity
} from 'react-native';


/**-----导入外部的组件类------**/
import TabNavigator from 'react-native-tab-navigator';
var Width = Dimensions.get('window').width; //屏宽
var Height = Dimensions.get('window').height; //屏宽
// var Home = require('../Home/Home'); //主页
import Home from '../Home/HomeContainer'; //主页
var Base = require('../Base/Base');  //基酒
var Mine = require('../Mine/Mine');  //我的
var News = require('../News/News');  //发布
var Finance = require('../Finance/Finance');  //金融
import Login from '../Account/Login';  //登录界面
import CertificationHint from '../News/CertificationHint';  //认证提示界面
import UserDefaults from '../common/UserDefaults';//存值
import Common from '../common/constants';//存值
import NoInfo from '../Home/NoNetInfo';//无网络显示的页面
import Loading from '../common/Loading';//无网络显示的页面
var BaseDetail = require('../Base/BaseDetail');

//  var NoInfo = require( '../Home/NoNetInfo');//无网络显示的页面
var certificationTag = true //认证标示
// var Drwea = require ('../Base/Drawers');  //金融
import Drwea from '../Base/Drawers';  //筛选

var AndroidMain = React.createClass({

    // 初始化函数(变量是可以改变的,充当状态机的角色)
    getInitialState() {
        return {
            selectedTab: 'Home' // 默认是第一个
        }
    },
    render() {
        return (
            <View style={styles.and}>

                <TabNavigator>
                    <TabNavigator.Item
                        title="主页"
                        selected={this.state.selectedTab === 'Home'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image source={{ uri: 'home' }} style={styles.iconStyle} />} // 图标
                        renderSelectedIcon={() => <Image source={{ uri: 'home_bule' }} style={styles.iconStyle} />}   // 选中的图标
                        titleStyle={styles.textStyle}
                        onPress={() => this.setState({ selectedTab: 'Home' })}>
                        <Home {...this.props}
                            baseClick={() => this.baseClick()}
                            selectRecommedRow={() => this.selectRecommedRow()}
                            recommendLookAll={()=>this.recommendLookAll()}
                            selectBase={()=>this.selectBase()}
                            selectfinancial={()=>this.selectfinancial()}
                            />
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        title="基酒"
                        selected={this.state.selectedTab === 'Base'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image source={{ uri: 'jiu' }} style={styles.iconStyle} />} // 图标
                        renderSelectedIcon={() => <Image source={{ uri: 'jiu_bule' }} style={styles.iconStyle} />}   // 选中的图标
                        titleStyle={styles.textStyle}
                        onPress={() => this.setState({ selectedTab: 'Base' })}>
                        <Base {...this.props} />
                    </TabNavigator.Item>
                    {/*--发布--*/}
                    {<TabNavigator.Item
                        title='发布'
                        selected={this.state.selectedTab === 'News'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        titleStyle={styles.textStyle}
                        onPress={() => this.goRoute()}
                        >
                        <News {...this.props}/>
                    </TabNavigator.Item>}
                    {/*--金融--*/}
                    <TabNavigator.Item
                        title="金融"
                        selected={this.state.selectedTab === 'Finance'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image source={{ uri: 'money' }} style={styles.iconStyle} />} // 图标
                        renderSelectedIcon={() => <Image source={{ uri: 'money_bule' }} style={styles.iconStyle} />}   // 选中的图标
                        titleStyle={styles.textStyle}
                        onPress={() => this.setState({ selectedTab: 'Finance' })}>
                        <Finance {...this.props} />
                    </TabNavigator.Item>

                    <TabNavigator.Item
                        title="我的"
                        selected={this.state.selectedTab === 'Mine'}
                        selectedTitleStyle={styles.selectedTitleStyle}
                        renderIcon={() => <Image source={{ uri: 'user' }} style={styles.iconStyle} />} // 图标
                        renderSelectedIcon={() => <Image source={{ uri: 'user_bule' }} style={styles.iconStyle} />}   // 选中的图标
                        titleStyle={styles.textStyle}
                        onPress={() => this.setState({ selectedTab: 'Mine' })}>
                        <Mine {...this.props} />
                    </TabNavigator.Item>

                </TabNavigator>

                <TouchableOpacity style={styles.logo} onPress={() => this.goRoute()} >
                    <View >

                        <Image
                            style={styles.logo1}
                            source={{ uri: 'issue' }}
                            />

                    </View>
                </TouchableOpacity>
            </View>
        );
    },
    goRoute(){
        this.setState({
            selectedTab: 'News'
        })
    },
   baseClick(){
        this.setState({
            selectedTab : 'Base'
        })
    },
   /**
    * 点击基酒推荐查看全部按钮
    */
   recommendLookAll(){
       this.setState({
            selectedTab : 'Base'
        })
   },

    /**
     * 点击图片跳转到下一级页面
     */
    _onPress() {

        this.props.navigator.push({
            component: News,
            sceneConfig: Navigator.SceneConfigs.VerticalUpSwipeJump

        });

    },
    /**
     * 点击找基酒图片
     */
    selectBase(){
        this.setState({
            selectedTab : 'Base'
        })
    },
    /**
     * 点击找资金图片
     */
    selectfinancial(){
        this.setState({
            selectedTab : 'Finance'
        })
    }
});


const styles = StyleSheet.create({
    iconStyle: {
        width: 25,
        height: 21,
        marginBottom:-3
    },
    iconStyle1: {
        width: 40,
        height: 40,
        bottom: 8
    },

    selectedTitleStyle: {
        color: '#436EEE'
    },
    container: {
        backgroundColor: '#f85959',
        height: 40
    },
    logo: {

        position: 'absolute',
        marginLeft: Width / 2 - 20,
        bottom:25

    },
    and: {
        height: Platform.OS === 'ios' ? Height : Height-20 ,
    }, logo1: {
        width: 40,
        height: 40,
        borderRadius: 20
    }, textStyle: {
        fontSize: 11,
        marginBottom:6
    }
});

// 输出组件类
module.exports = AndroidMain;
