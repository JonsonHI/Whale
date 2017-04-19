 /**
  * 注册页面
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
    TouchableWithoutFeedback
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
import Login from '../Account/Login.js'//注册页面
import Forget from '../Account/Forget.js'//忘记密码
var CountDown = require('../Utils/CountDown');
import Toast, {DURATION} from 'react-native-easy-toast';   //提示框


export default class ChangePhone extends Component{
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
            agreeImg:false
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='手机号变更' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>

                <View style={styles.contentStyle}>

                    <View style={styles.textStye}>
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

                </View>

                <TouchableOpacity onPress={()=>{this._CommitMessage()}} style={styles.agreeBtnStyle} activeOpacity={0.5}>
                    <Text style={styles.buttonStyle}>验证</Text>
                </TouchableOpacity>

                {/*  这个是已有账号和忘记密码的入口，UI没有这两个按钮  预存
                 <View style={styles.otherStyle}>
                 <TouchableOpacity onPress={()=>{this._onPress(Login)}}>
                 <Text style={styles.forgetStyle}>已有账号</Text>
                 </TouchableOpacity>

                 <TouchableOpacity onPress={()=>{this._onPress(Forget)}}>
                 <Text style={styles.registerStyle}>忘记密码</Text>
                 </TouchableOpacity>
                 </View>
                 **/}
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


    /*
     *  点击同意按钮事件
     *   @param 无
     *   @returns 无
     * */
    agreeAction = () =>{
        //if (this.state.agreeImg === false){
        //    this.setState({
        //        agreeImg:true
        //    })
        //}else{
        //    this.setState({
        //        agreeImg:false
        //    })
        //}
        this.setState ({
            agreeImg : !this.state.agreeImg
        })
    }


    leftAction(){
        this.props.navigator.pop();
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


    _onPress(jump){
        this.props.navigator.push({
            component: jump,
        });
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
     * 提交注册信息
     * @private
     */
    _CommitMessage() {
        var code = this.refs.code._lastNativeText;
        var url = 'http://rap.taobao.org/mockjs/12612/get/regisiter/code';//mock测试接口
        let formData = new FormData();
        formData.append("userName", "");
        formData.append("code", code);
        var fetchOptions = {
            method: 'POST',
            headers: {},
            body: formData
        };

        fetch(url, fetchOptions)
            .then((response) => response.json())
            .then((json) => {
                // console.log(json)
                if (json.statusCode == '200') {
                    alert(JSON.stringify(json))
                    console.debug(JSON.stringify(json))
                } else {
                    this.refs.toast.show('验证码有误，清重新申请', DURATION.LENGTH_SHORT);
                    // alert('错误=>用户名:admin   密码:123123')
                }
            })
            .catch(error => {
                alert(error)
            })
            .done();
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',

    },contentStyle:{
        height:90,

    },yonghuming:{
        flex:1,
        marginLeft:10,
        fontSize:15,
        color:'#999999',
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

    },inputCodeStyle:{
        fontSize:15,
        color:'#999999',
        height:45,
        width:150
    },mima:{
        marginLeft:20,
        marginRight:20,
        marginTop:8,
        borderWidth:0.5,
        borderColor:'#e5e5e5',
        paddingLeft:15,
        borderRadius:2.5,
        height:45,
        backgroundColor:'#fff',
        fontSize:15
    },buttonStyle:{
        width:300,
        textAlign:'center',
        backgroundColor:'#0080ff',
        marginTop:70,
        borderRadius:5,
        color:'#fff',
        height:45,
        fontSize:18,
        paddingTop:10
    },otherStyle:{
        flexDirection:'row',
        justifyContent:'space-between',
    },forgetStyle:{
        padding:15,
        color:'#333333',
        marginLeft:5
    },registerStyle:{
        padding:15,
        color:'#0080ff',
        marginRight:5
    },tip: {
        borderRadius:3,
        backgroundColor: '#0080ff',
        alignItems:'center',
        justifyContent:'center',
        width:130,
        height:30,
        marginRight:10
    }, //同意按钮
    checkStyles:{
        width:12,
        height:12,
        marginRight:5
    },agreeStyle:{
        flexDirection:'row',
        marginLeft:20,
        marginTop:30,
        alignItems:'center'
    },line:{
        height:0.5,
        backgroundColor:'#e5e5e5'
    },phoneStyles:{
        marginLeft:20,
        fontSize:15,
        color:'#999999'
    },textStye:{
        flex:1,
        justifyContent:'center'
    },agreeBtnStyle:{
        alignItems:'center'
    }
});

