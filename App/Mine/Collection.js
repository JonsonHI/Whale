/**
 * Created by zhou on 2016/12/6.
 */
/**
 *  收藏
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
    ScrollView
    } from 'react-native';

import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';//导入选项卡插件
import RecordList from '../Mine/RecordList.js'//收藏基酒列表
import InformationList from '../Mine/InformationList.js'//资讯收藏列表

class Collection extends  React.Component {
    render () {
        return (
            <View style={styles.container}>
                <NavigatorBar title='收藏'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />

                <ScrollableTabView style = {styles.scrs}
                                   renderTabBar={() => <DefaultTabBar />}
                                   tabBarBackgroundColor='#F2F2F2'
                                   tabBarUnderlineColor="rgb(23,102,171)"
                                   tabBarActiveTextColor='#63B8FF'
                                   tabBarUnderlineColor='#FF0000'
                                   scrollWithoutAnimation={true}
                                   scrollEnabled={false}
                    >


                    <RecordList tabLabel="基酒"/>

                    <InformationList tabLabel="资讯" style={styles.tabView} scrollEnabled={false}>

                    </InformationList>

                </ScrollableTabView>
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

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

module.exports = Collection;
