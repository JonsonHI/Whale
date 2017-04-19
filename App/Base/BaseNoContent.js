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
var BaseNoContent = React.createClass({
    getInitialState(){
        return {
            isCollect:true,
            //默认选中上架时间
            selectItem:0,
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='供应大厅' widthWH={Platform.OS == 'ios' ? 25:25} leftBtnName = 'back' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()} />
                    {/**包含上架时间,价格,年份,筛选的view*/ }
                    <View  style={styles.choose}>
                        {/**上架时间的view*/ }
                        <View style={styles.chooseChildView}>
                            {/**上架时间的text*/ }
                            <Text onPress={()=>this.putawayAction()} style={[styles.chooseStyle,{color:this.state.selectItem == 0?'#0c7aff':'#b2b3b4'}]}>
                                上架时间
                            </Text>
                            {/** 上架时间部分向上,向下图片的view*/ }
                            <View>
                                <Image source={require('../image/up.png')} style={styles.iconUpStyle} />
                                <Image source={require('../image/down.png')} style={styles.iconDownStyle}/>
                            </View>
                        </View>
                        {/**价格的view*/ }
                        <View style={styles.chooseChildView}>
                            {/**价格的text*/ }
                            <Text onPress={()=>this.priceAction()} style={[styles.chooseStyle,{color:this.state.selectItem == 1?'#0c7aff':'#b2b3b4'}]}>
                                价格
                            </Text>

                            {/** 价格部分向上,向下图片的view*/ }
                            <View>
                                <Image source={require('../image/up.png')} style={styles.iconUpStyle} />
                                <Image source={require('../image/down.png')} style={styles.iconDownStyle}/>
                            </View>
                        </View>
                        {/**年份的view*/ }
                        <View style={styles.chooseChildView}>
                            {/**年份的text*/ }
                            <Text onPress={()=>this.yearAction()} style={[styles.chooseStyle,{color:this.state.selectItem == 2?'#0c7aff':'#b2b3b4'}]}>
                                年份
                            </Text>
                            {/** 年份部分向上,向下图片的view*/ }
                            <View>
                                <Image source={require('../image/up.png')} style={styles.iconUpStyle} />
                                <Image source={require('../image/down.png')} style={styles.iconDownStyle}/>
                            </View>

                        </View>
                        {/**筛选的view*/ }
                        <View>
                            {/**筛选的text*/ }
                            <Text style={[styles.chooseStyle,{color:'#b2b3b4'}]}>
                                丨筛选
                            </Text>
                        </View>
                    </View>
                    <View style={styles.contentStyle}>
                        <Image source={require('../image/nofound.png')}/>
                        <Text style={{fontSize:20}}>
                            未找到满足当前条件的内容
                        </Text>
                    </View>
            </View>
        );
    },
    //显示内容(上架时间排序,价格排序,年份排序)
    typeContent(){
        //按照上架时间
        if(this.state.selectItem ==0){

        }else if(this.state.selectItem ==1){ //按照价格

        }else if(this.state.selectItem ==2){ //按照年份

        }
    },
    //上架时间点击事件
    putawayAction(){
        this.setState({
            selectItem:0,
        })
    },
    //价格点击事件
    priceAction(){
        this.setState({
            selectItem:1,
        })
    },
    //年份点击事件
    yearAction(){
        this.setState({
            selectItem:2,
        })
    },
    //返回按钮点击事件
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
    //顶部包含上架时间,价格,年份,筛选的view
    choose: {
        height:44,
        backgroundColor:'#f4f5f6',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    //上架时间(价格,年份,筛选)的view
    chooseChildView:{
        flexDirection:'row',
    },
    //上架时间(价格,年份,筛选)的text
    chooseStyle:{
        fontSize:18,
        textAlign:'center',
        marginTop:11,
        marginLeft:10,
        marginRight:10,
    },
    //向上的图片
    iconUpStyle:{
        width:10,
        height:10,
        marginTop:11,
    },
    //向下的图片
    iconDownStyle:{
        width:10,
        height:10,
    },
    //提示信息
    contentStyle:{
        marginTop:100,
        alignItems:'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    }
});

module.exports = BaseNoContent;
