/**
 * Created by Administrator on 2016/12/23.
 * 我的贷款页面
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
    TextInput,
    ScrollView,
    Dimensions
    } from 'react-native';
var Width = Dimensions.get('window').width; //屏宽
import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
import LoanDetail from '../Mine/LoanDetail.js'

export default class Loan extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCollect:true,
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='我的贷款' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>

                <ScrollView>
                    <View style={styles.top}>
                        {this._renderTop('5000万','累计融资')}
                        <View style={styles.dividecolumn}/>
                        {this._renderTop('1750万','近期融资')}
                        <View style={styles.dividecolumn}/>
                        {this._renderTop('950万','剩余还款')}
                    </View>

                    {/**中间广告位 */}
                    <Image source={require("../image/adv.jpg")} style={styles.advIcon} />

                    {this._renderBottom('申请金额','1750万','申请日期','2016/10/10','申请状态','申请通过',require('../image/shoucang.png'),'我的融资',LoanDetail,1)}

                    <View style={styles.divide}/>

                    {this._renderBottom('质押数量','1000吨','质押总额','2000万','质押状态','质押中',require('../image/shoucang.png'),'我的质押',LoanDetail,2)}

                    <View style={styles.divide}/>

                    {this._renderBottom('还款期次','第二期','本期还款','164.06万','还款状态','欠息',require('../image/shoucang.png'),'我的还款',LoanDetail,3)}

                    <View style={styles.divide}/>

                    {this._renderBottom('解压数量','1000吨','解压日期','2016/10/10','解压状态','解压',require('../image/shoucang.png'),'到期解压',LoanDetail,4)}

                    <View style={styles.divide}/>
                </ScrollView>
            </View>
        );
    }

    /**
     * 返回到上一级
     */
    leftAction(){
        this.props.navigator.pop();
    }

    /**
     * 头部view，展示数据用
     * @param title
     * @param value
     * @returns {XML}
     * @private
     */
    _renderTop(value,title){
        return(
                <View  style={styles.topStyles}>
                    <Text>{value}</Text>
                    <Text>{title}</Text>
                </View>
        );
    }


    /**
     * 下方条目显示数据
     * @param title
     * @param value
     * @returns {XML}
     * @private
     */
    _renderData(title,value){
        return(
            <View  style={styles.topStyles}>
                <Text>{title}</Text>
                <Text>{value}</Text>
            </View>
        );
    }

    _renderImage(iconName,title,jump,type){
        return(
            <TouchableOpacity onPress={()=>{this._onPress(jump,type)}}>
                <View  style={styles.topStyles}>
                    <Image source={(iconName)} style={styles.imageStyle}/>
                    <Text>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPress(jump,type){
        this.props.navigator.push({
            component: jump,
            passProps:{
                type:type
            }
        });
    }

    /**
     * 下方的条目
     * @param lefttitle 左边标题
     * @param leftvalue 左边的值//可用rowData代替
     * @param middletitle 中间标题
     * @param middlevalue 中间的值
     * @param righttitle 右边标题
     * @param rightvalue 右边的值
     * @param imagesource 图片资源
     * @param imagetitle  图片标题
     * @private
     */
    _renderBottom(lefttitle,leftvalue,middletitle,middlevalue,righttitle,rightvalue,imagesource,imagetitle,jump,type){
        return(
            <View style={styles.top}>
                {this._renderData(lefttitle,leftvalue)}
                {this._renderData(middletitle,middlevalue)}
                {this._renderData(righttitle,rightvalue)}
                {this._renderImage(imagesource,imagetitle,jump,type)}
            </View>
        );
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },top:{
    width:Width,
        height:70,
        flexDirection:'row',
    }, topStyles:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },dividecolumn:{
        width:1,
        height:70,
        backgroundColor:'#f5f5f5',
    },advIcon: {
        height: 120,
        width: Width,
    }, imageview:{
        alignItems:'center'
    },imageStyle:{
        width:20,
        height:20,
    },divide:{//分隔的段落
        width:Width,
        height:10,
        borderTopWidth:1,
        borderTopColor:'#999',
        borderBottomWidth :1,
        borderBottomColor:'#999',
        backgroundColor:'#f5f5f5'
    }
});

