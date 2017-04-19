/**
 * 自定义主页底部列表tb
 * 
*/
import React, { Component } from 'react';

import {
    Image,
    Text,
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
var RecommendCell = require('../Home/RecommendCell') ;//导入基酒推荐列表
var MessageCell = require('../Home/MessageCell') ;//资讯列表

import ScrollableTabView from 'react-native-scrollable-tab-view';//导入选项卡插件
import DefaultTabBar from 'react-native-scrollable-tab-view';//导入选项卡插件
var ListTBR = React.createClass({

    render() {
        return (
            <ScrollableTabView style = {styles.scrs}
                renderTabBar={() => <DefaultTabBar />}
                tabBarBackgroundColor='#F2F2F2'
                tabBarUnderlineColor="rgb(23,102,171)"
                tabBarActiveTextColor='#63B8FF'
                tabBarUnderlineColor='#FF0000'
                scrollWithoutAnimation={true}
                scrollEnabled={false}
                >

               

                <RecommendCell tabLabel="基酒资讯"/>

                 

                <ScrollView tabLabel="基酒推荐" style={styles.tabView} scrollEnabled={false}>

                        <MessageCell />

                </ScrollView>

            </ScrollableTabView>
        )
    },
});

var styles = StyleSheet.create({
    scrs:{
        flex:1,
        marginTop:0,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    boxtr: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    boxtd: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 3,
        backgroundColor: 'red',
    },
    cardImg: {
        width: 38,
        height: 38,
    },
    cardText: {
        color: '#000',
        fontSize: 14,
        marginTop: 10,
    },
});

module.exports = ListTBR;