 /**
  * 下一步页面(填写密码)
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
 import Toast, {DURATION} from 'react-native-easy-toast';   //提示框

export default class Next extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName:''
        };
    }

    componentDidMount() {
        this.setState({
            userName:this.props.userName
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='找回密码' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>


                <View style={styles.contentStyle}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="请输入新密码"
                        keyboardType={'number-pad'}
                        clearTextOnFocus={true}
                        secureTextEntry={true}
                        ref = 'password'
                        underlineColorAndroid = {'transparent'}
                        />

                    <View style={styles.line}/>

                    <TextInput
                        style={styles.inputStyle}
                        placeholder="请再次输入新密码"
                        clearTextOnFocus={true}
                        secureTextEntry={true}
                        ref = 'repassword'
                        keyboardType={'number-pad'}
                        underlineColorAndroid = {'transparent'}
                        />

                </View>

                <TouchableOpacity onPress={()=>{this.CommitPwd()}}>
                    <Text style={styles.buttonStyle}>确定</Text>
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

    /**
     * 密码提交
     * @constructor
     */
    CommitPwd(){
        let password = this.refs.password._lastNativeText;
        let repassword = this.refs.repassword._lastNativeText;
        let userName = this.state.userName;
        let formData = new FormData();
        formData.append("userName", userName);
        formData.append("passwurd", password);
        var url = 'http://rap.taobao.org/mockjs/12612/repassword';//mock测试接口
        var fetchOptions = {
            method: 'POST',
            headers: {

            },
            body: formData
        };

        if(!password || !repassword || password.length<6||password.length >16 ){
            //首先判断密码长度
            this.refs.toast.show('密码长度应在6~16位之间',1500);
            return false;
        }else {
            if(password !== repassword){
                //判断两者密码是否相符
                this.refs.toast.show('两次输入的密码输入不正确，请重新输入',1500);
                return false;
            } else {

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

    }

    leftAction(){
        this.props.navigator.pop();
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
    },inputStyle:{
        fontSize:15,
        color:'#999999',
        height:45,
        marginLeft:10
    },line:{
        height:0.5,
        backgroundColor:'#e5e5e5'
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
    }
});

