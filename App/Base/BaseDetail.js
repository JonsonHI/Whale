/**
 * Created by shichunguang on 2016/12/7.
 */
/**
 *详情
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
    Alert,
    Modal,
    Linking
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var BaseDeatilCell = require('./BaseDetailCell');
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var screenHeight = Dimensions.get('window').height; //屏宽
var BaseInquiry = require('./BaseInquiry');//询盘界面
var BaseNoContent =require('./BaseNoContent');//无查询结果
var imageJson = require('./Image.json');
var WeChat = require('react-native-wechat');//微信第三方
var QQAPI = require('react-native-qq');//QQ第三方
var Lightbox = require('react-native-lightbox');//点击查看大图
var BaseDetail = React.createClass({
    getInitialState(){
        var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 !==r2})
        return {
            dataSource:ds.cloneWithRows(imageJson),
            modalVisible:false,
            isCollection:false
        }
    },
    componentDidMount (){
        //注册应用
        WeChat.registerApp('wxffb8ef8ceb92a481')
    },
    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='详情' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' rightBtnName = 'share' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()} />
                <ScrollView>
                    {/*顶部酒的基本信息*/}
                    <View style={styles.topView}>
                        <View style={{flex:1}}>
                            <Text style={{marginTop:15,marginLeft:10,fontSize:16,fontWeight: 'bold',color:'#333333'}}>
                                酱香型
                            </Text>
                        </View>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>

                                <Text style={{fontSize:15,color:'#666666'}}>
                                    100吨
                                </Text>

                                <Text style={{fontSize:12,marginTop:5,color:'#999999'}}>
                                    数量
                                </Text>

                        </View>
                        <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',marginRight:10}}>

                                <Text style={{fontSize:17,color:'#ff3600'}}>
                                    40000元/吨
                                </Text>

                                <Text style={{fontSize:12,marginTop:5,color:'#999999'}}>
                                    2小时前
                                </Text>

                        </View>
                    </View>
                    {/*基础信息*/}
                    <View style={{backgroundColor:'#f5f5f5',height:35,borderTopWidth:1,borderBottomWidth:1,borderColor:'#e5e5e5',justifyContent:'center'}}>
                        <Text style={{fontSize:14,marginLeft:10,color:'#666666'}}>
                            基础信息
                        </Text>
                    </View>
                    {/*年份*/}
                    <BaseDeatilCell
                        leftName='年份'
                        rightContent='6年'
                    />
                    {/*产区*/}
                    <BaseDeatilCell
                        leftName='产区'
                        rightContent='贵州'
                    />
                    {/*分级*/}
                    <BaseDeatilCell
                        leftName='分级'
                        rightContent='一级'
                    />
                    {/*交割地*/}
                    <BaseDeatilCell
                        leftName='交割地'
                        rightContent='贵州遵义'
                    />
                    {/*原料*/}
                    <View style={{ height:45,flexDirection:'row',alignItems:'center', backgroundColor:'white',}}>
                        <Text style={{fontSize:15,color:'#999999',marginLeft:10}}>
                            原料
                        </Text>
                        <Text style={{fontSize:15,marginLeft:20,color:'#666666'}}>
                            高粱,小麦,荞麦,大米,红薯
                        </Text>
                    </View>

                    {/*基酒检测报告*/}
                    <View style={{backgroundColor:'#f5f5f5',height:35,borderTopWidth:1,borderBottomWidth:1,borderColor:'#e5e5e5',justifyContent:'center'}}>
                        <Text style={{fontSize:14,marginLeft:10,color:'#666666'}}>
                            基酒检测报告
                        </Text>
                    </View>
                    {/*检验报告图片*/}
                    <View>
                        <ListView
                            contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}
                            dataSource = {this.state.dataSource}
                            renderRow = {this.renderRow}
                        />
                    </View>

                </ScrollView>
                {/*底部三个按钮*/}
                <View style={styles.bottomStyle}>
                    {/*收藏*/}
                    <TouchableOpacity style={{flex:1}} onPress={()=>this.collectionAction()}>
                        {this._collectionAction(this.state.isCollection)}
                    </TouchableOpacity>
                    {/*联系客户*/}
                    <TouchableOpacity style={{flex:1,height:50,borderLeftWidth:1,borderLeftColor:'#e5e5e5',alignItems:'center',justifyContent:'center'}} onPress={()=>this.phoneAction()}>
                            <Text style={{fontSize:17,color:'#666666'}}>
                                联系客户
                            </Text>
                    </TouchableOpacity>
                    {/*询盘*/}
                    <TouchableOpacity style={{flex:2,backgroundColor:'#0c7aff',height:50,alignItems:'center',justifyContent:'center'}} onPress={()=>this.inquiryAction()}>

                            <Text style={{fontSize:17,color:'white'}}>
                                询盘
                            </Text>

                    </TouchableOpacity>
                </View>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setState({modalVisible:false})}}
                >
                    <TouchableOpacity onPress ={()=>this.closeModel()}>
                        <View style={{height:screenHeight*4/5,width:screenWidth,opacity:0.5,backgroundColor:'black'}}>

                        </View>
                    </TouchableOpacity>
                    <View style={{height:screenHeight/5,width:screenWidth,flexDirection:'row',backgroundColor:'white'}}>
                        <TouchableOpacity onPress ={()=>this.shareToWeChat()}>
                            <View style={{width:54,height:74,marginLeft:30,marginTop:10,alignItems: 'center'}}>
                                <Image
                                    source={{uri:'wechat'}}
                                    style={{width:54,height:54}}
                                />
                                <Text style={{fontSize:15,marginTop:5}}>微信</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress ={()=>this.shareTofriendCricle()}>
                            <View style={{width:54,height:74,marginLeft:30,marginTop:10,alignItems: 'center'}}>
                                <Image
                                    source={{uri:'friends'}}
                                    style={{width:54,height:54}}
                                />
                                <Text style={{fontSize:15,marginTop:5}}>朋友圈</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress ={()=>this.shareToQQfriend()}>
                            <View style={{width:54,height:74,marginLeft:30,marginTop:10,alignItems: 'center'}}>
                                <Image
                                    source={{uri:'qq'}}
                                    style={{width:54,height:54}}
                                />
                                <Text style={{fontSize:15,marginTop:5}}>QQ好友</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </Modal>
            </View>
        );
    },
    renderRow(rowData,sectionID,rowID,highlightRow){
        return(
            <View style={{width:screenWidth/2,height:screenWidth/4}}>
                <Lightbox
                    springConfig={{tension: 15, friction: 7}}
                    swipeToDismiss={false}
                    renderContent={()=>this.bigImage(rowData.name)}
                >
                <Image source={{uri:rowData.name}} style={styles.imageStyle}></Image>
                </Lightbox>
            </View>
        )
    },
    //查看大图
    bigImage(image){
        return(
        <View style ={{width:screenWidth,height:screenHeight,flex:1}}>
            <Image
                style={{width:screenWidth,height:screenHeight/3,marginTop:screenHeight/3}}
                source={{uri:image}}
            />
        </View>

        )
    },
    //navigator上左边的按钮事件
    leftAction(){
        this.props.navigator.pop({

        })
    },
    shareToQQfriend(){
        QQAPI.isQQInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    QQAPI.login("snsapi_userinfo")
                        .catch((error) => {
                            alert(error.message);
                        });
                }
            }, function (error) {
                alert('没有安装QQ软件，请您安装qq之后再试');
            });
    },
    shareToWeChat(){
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToSession({type: 'text', description: '测试微信好友分享文本'})
                        .catch((error) => {
                            alert(error.message);
                        });
                } else {
                    alert('没有安装微信软件，请您安装微信之后再试');
                }
            });
    },
    shareTofriendCricle(){
        WeChat.isWXAppInstalled()
            .then((isInstalled) => {
                if (isInstalled) {
                    WeChat.shareToTimeline({type: 'text', description: '测试微信好友分享文本'})
                        .catch((error) => {
                            alert(error.message);
                        });
                } else {
                    alert('没有安装微信软件，请您安装微信之后再试');
                }
            });
    },
    //navigator上右边的按钮事件(暂时是调到BaseNoContent界面)
    rightAction(){
        this.setState({
            modalVisible:true
        })
    },
    closeModel(){
        this.setState({
            modalVisible:false
        })
    },
    //收藏点击事件
    collectionAction(){
        //if(this.state.collectionImg ==={uri:'heart'}){
        //    this.setState({
        //        collectionImg:{uri:'heart_orange'},
        //        collectionText:'已收藏'
        //    })
        //}else {
        //    this.setState({
        //        collectionImg:{uri:'heart'},
        //        collectionText:'收藏'
        //    })
        //}
        this.setState({
            isCollection:!this.state.isCollection
        })
    },
    //收藏事件
    _collectionAction(flag){
        if(flag === true){
            return (
                <View style={{height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={{uri:'heart_orange'}} style={{width:15,height:15}}/>
                    <Text style={{fontSize:17,marginLeft:5,color:'#666666'}}>
                        已收藏
                    </Text>
                </View>
            );
        }else {
            return (
                <View style={{height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={{uri:'heart'}} style={{width:15,height:15}}/>
                    <Text style={{fontSize:17,marginLeft:5,color:'#666666'}}>
                        收藏
                    </Text>
                </View>
            );
        }
    },
    //联系客户点击事件
    phoneAction(){
        Linking.openURL('tel:10086')
    },
    //询盘点击事件
    inquiryAction(){

        this.props.navigator.push({
            component:BaseInquiry,
        })
    },
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    //顶部酒的信息
    topView:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:65,
        borderBottomWidth:1,
        borderBottomColor:'#f4f5f6',
        backgroundColor:'white',
    },
    imageStyle:{
        width:(screenWidth-15)/2,
        marginLeft:5,
        height:(screenWidth-15)/2/2,
        marginTop:10,
    },
    bottomStyle:{
        height:50,
        backgroundColor:'white',
        flexDirection:'row',
        borderTopWidth:1,
        borderColor:'#e5e5e5'
    },
});

module.exports = BaseDetail;
