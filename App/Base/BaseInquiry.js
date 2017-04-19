/**
 * Created by shichunguang on 2016/12/9.
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
    Navigator,
    TextInput,
    Keyboard,
    ScrollView,
    Alert,
} from 'react-native';

//Dimentsions
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width; //屏宽
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var BaseInquirySuccess = require('./BaseInquirySuccess')
var BaseInquiry = React.createClass({
    getInitialState() {
        return {
            linkman:'' ,
            telephoneNum:'',
            mailbox:'',
            inquiryContent:''
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='询盘' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()} />
                <ScrollView scrollEnabled ={false}>
                    {/*联系人*/}
                <View style={{backgroundColor:'white',height:45,borderBottomWidth:1,borderBottomColor:'#e5e5e5',justifyContent:'center'}}>
                    <TextInput
                        autoCapitalize = {'none'}
                        style={styles.textStyle}
                        placeholder='请输入联系人名字'
                        placeholderTextColor='#999999'
                        underlineColorAndroid = {'transparent'}
                        defaultValue=''
                        onChangeText={(text)=>{
                            this.setState({
                                linkman:text
                            })
                        }}
                    />
                </View>
                    {/*手机号*/}
                <View style={{backgroundColor:'white',height:45,borderBottomWidth:1,borderBottomColor:'#e5e5e5',justifyContent:'center'}}>
                    <TextInput
                        style={styles.textStyle}
                        placeholder='请输入手机号'
                        placeholderTextColor='#999999'
                        keyboardType={'numeric'}
                        underlineColorAndroid = {'transparent'}
                        onChangeText={(text)=>{
                            this.setState({
                                telephoneNum:text
                            })
                        }}
                    />
                </View>
                    {/*邮箱*/}
                <View style={{backgroundColor:'white',height:45,borderBottomWidth:1,borderBottomColor:'#e5e5e5',justifyContent:'center'}}>
                    <TextInput
                        autoCapitalize = {'none'}
                        style={styles.textStyle}
                        placeholder='请输入您的邮箱'
                        keyboardType={'email-address'}
                        placeholderTextColor='#999999'
                        underlineColorAndroid = {'transparent'}
                        onChangeText={(text)=>{
                            this.setState({
                                mailbox:text
                            })
                        }}
                    />
                </View>
                    {/*咨询的内容*/}
                <View style={{height:160,backgroundColor:'white',margin:10,padding:5,borderWidth:1,borderColor:'#e5e5e5',borderRadius:3}}>
                    <TextInput
                        autoCapitalize = {'none'}
                        multiline={true}
                        blurOnSubmit={true}
                        returnKeyType ='done'
                        placeholder='请输入资讯内容,限制10到400个字'
                        placeholderTextColor='#999999'
                        underlineColorAndroid = {'transparent'}
                        style={{height:160,textAlignVertical:'top'}}
                        maxLength={400}
                        onChangeText={(text)=>{
                            this.setState({
                                inquiryContent:text
                            })
                        }}
                    />
                </View>
                </ScrollView>
                {/*提交*/}
                <TouchableOpacity style={styles.submitStyle} onPress={()=>this.submitAction()}>

                        <Text style={{fontSize:17,color:'white'}}>
                            提交
                        </Text>

                </TouchableOpacity>
            </View>
        );
    },

    //返回
    leftAction(){
        this.props.navigator.pop({

        })
    },
    //提交按钮点击事件
    submitAction(){
        var link = /^[\u0391-\uFFE5A-Za-z]+$/;//中英文正则表达式
        var tel = /^1[34578]\d{9}$/;//手机号正则表达式
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;//邮箱正则表达式
        if(link.test(this.state.linkman) == false){
                alert('用户名只能输入中文和英文')
        }else if(tel.test(this.state.telephoneNum) ==false){
            alert('请输入正确的手机号')
        }else if(reg.test(this.state.mailbox) ==false){
            alert('邮箱输入有误')
        }else if(this.state.inquiryContent.length <10){
            alert('询问内容不能小于10个字')
        }
        else {
            Alert.alert(
                '您确认要提交信息么?',
                null,
                [
                    {text: '取消', onPress: ()=> console.log('点击取消')},
                    {text: '确认', onPress: ()=> this.affirmAction()}
                ]
            );
        }
    },
    affirmAction(){
        this.props.navigator.push({
            component:BaseInquirySuccess,
        });
    },
});


var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
    },
    //联系人,电话,邮箱
    textStyle:{
       fontSize:15,
        color:'#333333',
        marginLeft:10,
        height:45
    },
    //提交
    submitStyle:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        backgroundColor:'#0080ff',
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3
    }
});

module.exports = BaseInquiry;