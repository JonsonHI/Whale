 /**
  * 忘记密码页面
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
    TextInput
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
 import Next from '../Account/Next.js'//注册页面
 var CountDown = require('../Utils/CountDown')
 import Toast, {DURATION} from 'react-native-easy-toast';   //提示框


export default class Forget extends Component{
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
            userName:''
        }
    }

    leftAction(){
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='找回密码' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>
                <View style={styles.contentStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        ref = 'userName'
                        placeholder="请输入手机号"
                        keyboardType={'number-pad'}
                        underlineColorAndroid = {'transparent'}
                        />

                    <View style={styles.line}/>

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


                <TouchableOpacity onPress={()=>{this._CommitMessage()}}>
                    <Text style={styles.buttonStyle}>下一步</Text>
                </TouchableOpacity>
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


    _onPress(jump){
        this.props.navigator.push({
            component: jump,
            passProps:{
                userName:this.state.userName
            }

        });
    }

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
     * 发送验证码
     * @returns {boolean}
     * @private
     */
    _sendCode(){
        var tel = this.refs.userName._lastNativeText;
        var url = 'http://rap.taobao.org/mockjs/12612/get/regisiter/code';//mock测试接口
        let formData = new FormData();
        formData.append("userName", tel);
        var fetchOptions = {
            method: 'POST',
            headers: {

            },
            body: formData
        };

        if(!(/^1[34578]\d{9}$/.test(tel))){
            alert("手机号码有误，请重填");
            return false;
        }else{
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

    }

    /**
     * 提交信息
     * @private
     */
    _CommitMessage(){
        var tel = this.refs.userName._lastNativeText;
        var code = this.refs.code._lastNativeText;
        var url = 'http://rap.taobao.org/mockjs/12612/get/regisiter/code';//mock测试接口
        let formData = new FormData();
        formData.append("userName", tel);
        formData.append("code", code);
        var fetchOptions = {
            method: 'POST',
            headers: {

            },
            body: formData
        };

        if(!(/^1[34578]\d{9}$/.test(tel)) ){
            alert("手机号码有误，请重填");
            return false;
        }else {
            fetch(url, fetchOptions)
                .then((response) => response.json())
                .then((json) => {
                    // console.log(json)
                    if(json.statusCode == '200'){
                        this.setState({userName:tel});
                        this._onPress(Next)

                    }else {
                        this.refs.toast.show('验证码有误，清重新申请',DURATION.LENGTH_SHORT);
                        // alert('错误=>用户名:admin   密码:123123')
                    }
                })
                .catch(error =>{
                    alert(error)
                })
                .done();
        }
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },contentStyle:{
         height:90.5,
         marginLeft:20,
         marginRight:20,
         borderRadius:2.5,
         borderWidth:0.5,
         borderColor:'#e5e5e5',
         backgroundColor:'#fff',
         marginTop:35,
 },yonghuming:{
     flex:1,
         marginLeft:10,
         fontSize:15,
         color:'#999999',

 },sendStyles:{
     flexDirection:'row',
         justifyContent:'space-between',
         flex:1,
         marginLeft:10,
         alignItems:'center'
 },sendTextStyles:{
     marginRight:20,
         padding:10,
         backgroundColor:'#666',
         borderRadius:2.5
 },inputStyle:{
     fontSize:15,
         color:'#999999',
         height:45,
         marginLeft:10
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
        marginLeft:20,
        marginRight:20,
        textAlign:'center',
        backgroundColor:'#0080ff',
        marginTop:30,
        borderRadius:5,
        color:'#fff',
        height:45,
        fontSize:18,
        paddingTop:10
    },tip: {
        borderRadius:3,
        backgroundColor: '#0080ff',
        alignItems:'center',
        justifyContent:'center',
        width:130,
        height:30,
        marginRight:10
    },line:{
        height:0.5,
        backgroundColor:'#e5e5e5'
    }


});

