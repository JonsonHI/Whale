/**
 * 登录页面
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
    InteractionManager
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
import Regisiter from '../Account/Regisiter.js'//注册页面
import Forget from '../Account/Forget.js'//忘记密码
let REQUEST_URL = 'https://192.168.1.120:28080/login';
import JPushModule from 'jpush-react-native';//极光推送
import UserDefaults from '../common/UserDefaults';//存值
import Common from '../common/constants';//存值
import  CertificationHint from '../News/CertificationHint';  //认证提示界面
import Toast from 'react-native-root-toast';
import App from '../App' //APP
import  CommitHint from  '../News/CommitHint'  //认证审核提示页
import  CertificationFail from '../News/CertificationFail' //认证失败

export default class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
            telephone:'',//电话
            passwords:'',//密码
            certificationTag:2

        };
    }

    componentDidMount() {

        //---------------------------------android start---------------------------------

        JPushModule.addReceiveCustomMsgListener((message) => {

            //这是默认的通知消息

            alert({message});

        });


        //---------------------------------android end---------------------------------
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='登录'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' rightBtnName = 'XXX' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />
                <View style={styles.headviewStyle}>
                    <Image style={styles.headimg} source={require('../image/monkey.jpg')} />
                </View>

                <View style={styles.contentStyle}>
                    <TextInput
                        ref = 'userName'
                        style={styles.inputStyle}
                        placeholder="请输入账号"
                        keyboardType={'name-phone-pad'}
                        underlineColorAndroid = {'transparent'}
                        clearButtonMode={'always'}
                    />

                    <View style={styles.line}/>

                    <TextInput
                        ref = 'passWord'
                        style={styles.inputStyle}
                        secureTextEntry={true}//用password={true}对Android无效
                        onChangeText={(pass)=>this.setState({passwords:pass})}
                        placeholder="请输入密码"
                        clearButtonMode={'always'}
                        underlineColorAndroid = {'transparent'}
                    />
                </View>

                <TouchableOpacity onPress={()=>{this.loginBtnAction()}} activeOpacity={0.5}>
                    <Text style={styles.buttonStyle}>登录</Text>
                </TouchableOpacity>

                <View style={styles.otherStyle} >
                    <TouchableOpacity onPress={()=>{this._onPress(Forget)}}>
                        <Text style={styles.forgetStyle}>忘记密码?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this._onPress(Regisiter)}}>
                        <Text style={styles.registerStyle}>快速注册</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    /*
     *
     *   占位方法,无实际作用,只是为了去除警告
     *   @param
     *   @returns
     * */
    leftAction(){
        // console.log(this.props.navigator.getCurrentRoutes())
        //判断一下 如果是发布界面返回首页 否则返回前一页面

        var routeAry = [];
        routeAry = this.props.navigator.getCurrentRoutes()
        var name = routeAry[0].name
        if(name == '主页'){
            this.props.navigator.immediatelyResetRouteStack([
                {
                    component:App
                }
            ])
        }else {
            this.props.navigator.pop();
        }
    }

    rightAction(){

    }

    _onPress(jump){
        this.props.navigator.push({
            component: jump,
        });
    }


    loginBtnAction() {
        var tel = this.refs.userName._lastNativeText;
        var psw = this.refs.passWord._lastNativeText;


        // var url = 'https://jijiuzaixian.com/login.json'  //admin  123123
        // var data = {"mobile": tel, "password": psw};
        // var fetchOptions = {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // };
        //
        // fetch(url, fetchOptions)
        //     .then((response) => response.json())
        //     .then((json) => {
        //         console.log(json)
        //         if(json.statusCode == '200'){
        //             //登录成功.开始存值
        //             UserDefaults.setObject(Common.storeKeys.LOGIN_SUCCESS_USERNAME_PSW_STATE,[tel,psw,'200-OK'])
        //             //判断是否认证 + 认证状态
        //               //认证状态  =>  1:认证审核中  2:认证通过   3:认证失败   4:未认证
        //
        //             if(this.state.certificationTag == 2){
        //                 //认证通过
        //                 InteractionManager.runAfterInteractions(()=>{
        //                     this.props.navigator.pop(
        //                         {
        //                         }
        //                     );
        //                 })
        //             }else{
        //                 //未认证通过,在判断状态
        //                 if(this.state.certificationTag == 1){
        //                     InteractionManager.runAfterInteractions(()=>{
        //                         this.props.navigator.push(
        //                             {
        //                                 name:'CommitHint',
        //                                 component: CommitHint,
        //                             }
        //                         );
        //                     })
        //                 }else if(this.state.certificationTag == 3){
        //                     InteractionManager.runAfterInteractions(()=>{
        //                         this.props.navigator.push(
        //                             {
        //                                 name:'CertificationFail',
        //                                 component: CertificationFail,
        //                             }
        //                         );
        //                     })
        //                 }else {
        //                     InteractionManager.runAfterInteractions(()=>{
        //                         this.props.navigator.push(
        //                             {
        //                                 name:'LoginCertificationHint',
        //                                 component: CertificationHint,
        //                             }
        //                         );
        //                     })
        //                 }
        //
        //             }
        //         }else {
        //             let toast = Toast.show('错误=>用户名:admin   密码:123123', {
        //                 duration: Toast.durations.SHORT,
        //                 position: Toast.positions.CENTER,
        //                 shadow: true,
        //                 animation: true,
        //                 hideOnPress: true,
        //                 delay: 0,
        //             });
        //
        //         }
        //     })
        //     .catch(error =>{
        //
        //     })
        //     .done();


        //无登录直接存
        UserDefaults.setObject(Common.storeKeys.LOGIN_SUCCESS_USERNAME_PSW_STATE,[tel,psw,'200-OK'])
        //认证状态  =>  1:认证审核中  2:认证通过   3:认证失败   4:未认证

        if(this.state.certificationTag == 2){
            //认证通过
            InteractionManager.runAfterInteractions(()=>{
                this.props.navigator.pop(
                    {
                    }
                );
            })
        }else{
            //未认证通过,在判断状态
            if(this.state.certificationTag == 1){
                InteractionManager.runAfterInteractions(()=>{
                    this.props.navigator.push(
                        {
                            name:'CommitHint',
                            component: CommitHint,
                        }
                    );
                })
            }else if(this.state.certificationTag == 3){
                InteractionManager.runAfterInteractions(()=>{
                    this.props.navigator.push(
                        {
                            name:'CertificationFail',
                            component: CertificationFail,
                        }
                    );
                })
            }else {
                InteractionManager.runAfterInteractions(()=>{
                    this.props.navigator.push(
                        {
                            name:'LoginCertificationHint',
                            component: CertificationHint,
                        }
                    );
                })
            }

        }

    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },headviewStyle:{
        height:140,
        alignItems:'center'
    },headimg:{
        width:75,
        height:75,
        borderRadius:37.5,
        marginTop:35
    },contentStyle:{
        height:90,
        marginLeft:20,
        marginRight:20,
        borderRadius:3,
        borderWidth:0.5,
        borderColor:'#e5e5e5',
        backgroundColor:'#fff'
    },inputStyle:{
        flex:1,
        marginLeft:10,
        fontSize:15,
        color:'#999999',
       
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
    }


});

