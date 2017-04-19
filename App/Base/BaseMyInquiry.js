/**
 * Created by shichunguang on 2016/12/12.
 */
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
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var CommentCell = require('./BaseCommentCell');//封装的Cell
var BaseDetail = require('./BaseDetail');//详情界面
var BaseMyInquiry = React.createClass({

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='我的询盘' widthWH={Platform.OS == 'ios' ? 25:25} leftBtnName = 'back' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()} />

            </View>
        );
    },
    leftAction(){
        this.props.navigator.pop({

        })
    },

});


var styles = StyleSheet.create({
    //最底层的View
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },


});

module.exports = BaseMyInquiry;
