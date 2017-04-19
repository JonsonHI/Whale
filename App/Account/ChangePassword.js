/**
 * Created by Administrator on 2017/2/9.
 * 修改密码
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    TextInput,
    TouchableWithoutFeedback
    } from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
import Toast, {DURATION} from 'react-native-easy-toast';   //提示框
var CountDown = require('../Utils/CountDown');

export default class ChangePassword extends Component{

    static defaultProps = {
        isChecked: false
    };
    static propTypes = {
        isChecked: React.PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.isChecked,
            agreeImg:false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='修改密码' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>

                <View style={styles.contentStyle}>

                    <View style={styles.textStyle}>
                        <Text style={styles.phoneStyles}>您的绑定手机号：</Text>
                    </View>

                    <View style={styles.sendStyles}>
                        <TextInput
                            style={styles.inputCodeStyle}
                            ref = 'code'
                            password={true}
                            placeholder="请输入6位验证码"
                            clearTextOnFocus={true}
                            underlineColorAndroid = {'transparent'}
                            maxLength={6}
                            />
                        {this.renderCountDown()}
                    </View>

                    <View style={styles.sendStyles}>
                        <TextInput
                            style={styles.inputStyle}
                            ref = 'password'
                            placeholder="请输入密码"
                            keyboardType={'number-pad'}
                            underlineColorAndroid = {'transparent'}
                            />
                    </View>

                    <View style={styles.sendStyles}>
                        <TextInput
                            style={styles.inputStyle}
                            ref = 'repassword'
                            placeholder="请重复输入密码"
                            keyboardType={'number-pad'}
                            underlineColorAndroid = {'transparent'}
                            />
                    </View>

                    <TouchableOpacity style={styles.BtnStyle}>
                        <Text style={{fontSize:18,color:'#fff'}} onPress={this._CommitPassword}>提交</Text>
                    </TouchableOpacity>


                </View>

                <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'red'}}
                    />
            </View>
        );
    }

    leftAction(){
        this.props.navigator.pop();
    }


    /**
     * 发送验证码
     * @returns {boolean}
     * @private
     */
    _sendCode(){

        var url = 'http://rap.taobao.org/mockjs/12612/get/regisiter/code';//mock测试接口
        let formData = new FormData();
        formData.append("userName", this.state.userName);
        var fetchOptions = {
            method: 'POST',
            headers: {

            },
            body: formData
        };

        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json)
                if(json.statusCode == '200'){
                    alert(JSON.stringify(json))
                }else {
                    this.refs.toast.show('错误',DURATION.LENGTH_SHORT);
                    // alert('错误=>用户名:admin   密码:123123')
                }
            })
            .catch(error =>{
                alert(error)
            })
            .done();
    }

    /**
     * 验证码
     * @returns {XML}
     */
    renderCountDown(){
        if (this.state.isChecked) {
            return(
                <CountDown
                    onPress={this.sendAgain.bind(this)} //default null
                    time={120}//default 60
                    text={'重新获取'} //default ''
                    />)
        }
        else{
            return(
                <View style ={styles.tip}>
                    <Text  onPress={this.sendCode.bind(this)} style={{color:'#fff',fontSize:15}}>获取验证码</Text>
                </View>
            )
        }
    }

    sendCode(){
        this.setState({ isChecked: !this.state.isChecked });
        this._sendCode()
    }

    sendAgain(){
        this._sendCode()
    }


    /**
     * 提交密码
     * @private
     */
    _CommitPassword =() =>{
        let password = this.refs.password._lastNativeText;
        let repassword = this.refs.repassword._lastNativeText;
        if(!password  || !repassword || password.length < 6 || password.length > 16){
            this.refs.toast.show('请输入正确的密码',1500);
        }else if(password !== repassword){
            this.refs.toast.show('两次密码需一致',1500);
        }else {
            this.refs.toast.show('可以提交访问网络',1500);
        }
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',

    },contentStyle:{
        height:90,

    },sendStyles:{
        flexDirection:'row',
        justifyContent:'space-between',
        height:45,
        alignItems:'center',
        borderTopWidth:0.5,
        borderTopColor:'#e5e5e5',
        borderBottomWidth:0.5,
        borderBottomColor:'#e5e5e5',
        backgroundColor:'#fff',
        paddingLeft:15,
        paddingRight:10
    },sendTextStyles:{
        marginRight:20,
        padding:10,
        backgroundColor:'#666',
        borderRadius:2.5
    },inputStyle:{
        fontSize:15,
        color:'#999999',
        height:45,
        flex:1
    },inputCodeStyle:{
        fontSize:15,
        color:'#999999',
        height:45,
        width:150
    },line:{
        height:0.5,
        backgroundColor:'#e5e5e5'
    },phoneStyles:{
        marginLeft:25,
        fontSize:15,
        color:'#999999'
    },textStyle:{
        height:45,
        justifyContent:'center'
    },BtnStyle:{
        marginTop:70,
        marginLeft:45,
        marginRight:45,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#0080ff',
        borderRadius:5
    },tip: {
    borderRadius:3,
        backgroundColor: '#0080ff',
        alignItems:'center',
        justifyContent:'center',
        width:130,
        height:30,
        marginRight:10
}
});

