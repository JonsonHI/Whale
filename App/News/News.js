/**
 *发布:
 * 1.判断是否登录:
 *    未登录:跳转至登录界面
 *    登录:继续下一步判断
 * 2.判断企业是否认证:
 * 企业未认证 : 跳转认证提示页面
 * 企业认证 : 直接显示供应发布页面
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
    NetInfo,
    InteractionManager,
    Dimensions
} from 'react-native';
import Login from '../Account/Login';  //登录界面
import  SupplyPublish from './SupplyPublish';  //供应发布界面
import  CertificationHint from '../News/CertificationHint';  //认证提示界面
import UserDefaults from '../common/UserDefaults'; //存值
import Common from '../common/constants'  //存值
import  CommitHint from  '../News/CommitHint'  //认证审核提示页
import NetNetwork from './NetNetwork'
// var certificationTag = 1//认证状态  =>  1:认证审核中  2:认证通过   3:认证失败   4:未认证
import  CertificationFail from '../News/CertificationFail' //认证失败
var Width = Dimensions.get('window').width; //屏宽

class News extends  React.Component {
    constructor(props) {
        super(props);
        this._handleConnectivityChange = this._handleConnectivityChange.bind(this),
            this.state = ({
                isConnected: null,
                certificationTag:2
            })
    }
    render () {

        if (this.state.isConnected == false) {
            return (
                <NetNetwork reloadData = {()=>this.reloadData()}/>
            );
        } else{
            return (
                <SupplyPublish navigatorPush = {this.props.navigator} />
            )
        }
    }
    /*
     *
     *   占位方法,无实际作用,只是为了去除警告
     *   @param
     *   @returns
     * */
    leftAction(){

    }
    rightAction(){

    }
    reloadData(){
      this.netWorkYesOrNo();
    }
    /*
     *
     *   有无网络判断
     *   @param
     *   @returns
     * */
    netWorkYesOrNo = ()=>{
        Platform.OS === 'ios' ?
            NetInfo.isConnected.addEventListener(
                'change',
                this._handleConnectivityChange
            )
            :
            NetInfo.isConnected.fetch().done((isConnected) => {
                if(isConnected == true){
                    this.setState({
                        isConnected:true
                    })
                    this.judgeSome();
                }else if (isConnected == false){
                    this.setState({
                        isConnected:false
                    })
                }
            });
    }
    /*
     *       收到移除网络状况,有网络把netWorkTag置为true,无网络置为false
     * */
    _handleConnectivityChange(isConnected) {
        this.setState({
            isConnected: isConnected,
        })
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
        this.judgeSome();

    }
    /*
     *       1.有网络再判断是否登录,没有登录,跳转至登录界面.
     *       2.已经是登录再判断有无认证,未认证跳转认证提示页
     *       3.认证过的话,显示发布页面
     *
     * */
    judgeSome =()=>{
        // //取出存的值
        // UserDefaults.cachedObject(Common.storeKeys.LOGIN_SUCCESS_USERNAME_PSW_STATE)
        //     .then((loginInfo) => {
        //         if (loginInfo == null) {
        //             //取值为null,push到登录
        //             if(this.state.isConnected == true){
        //                 InteractionManager.runAfterInteractions(() => {
        //                     this.pushToXXX(Login, 'Login')
        //                 })
        //             }
        //         } else {
        //             //取值不为null,进行登录请求
        //             var url = 'https://jijiuzaixian.com/login.json'  //admin  123123
        //             var data = {"username": loginInfo[0], "password": loginInfo[1]};
        //             var fetchOptions = {
        //                 method: 'POST',
        //                 headers: {
        //                     'Content-Type': 'application/json',
        //                 },
        //                 body: JSON.stringify(data)
        //             };
        //
        //             fetch(url, fetchOptions)
        //                 .then((response) => response.json())
        //                 .then((json) => {
        //                     // console.log(json)
        //                     if (json.statusCode == '200') {
        //                         //已经是登录,判断是否认证通过
        //                         //认证状态  =>  1:认证审核中  2:认证通过   3:认证失败   4:未认证
        //                         if (this.state.certificationTag == 2) {
        //                             //已经认证通过,显示发布页面
        //                             return
        //                         } else {
        //                             //未认证通过
        //                             if (this.state.certificationTag == 1) {
        //                                 InteractionManager.runAfterInteractions(() => {
        //                                     //认证审核中
        //                                     this.pushToXXX(CommitHint, 'CommitHint')
        //                                 })
        //                             } else if (this.state.certificationTag == 3) {
        //                                 //认证失败
        //                                 this.pushToXXX(CertificationFail, 'CertificationFail')
        //                                 return;
        //                             } else {
        //                                 //未认证
        //                                 this.pushToXXX(CertificationHint, 'NewsCertificationHint')
        //                                 return;
        //                             }
        //                         }
        //                     } else {
        //                         //登录失败.push到登录
        //                         InteractionManager.runAfterInteractions(() => {
        //                             //未认证.push到提示业
        //                             this.pushToXXX(Login, 'Login')
        //                         })
        //                     }
        //                 })
        //                 .catch(error => {
        //
        //                 })
        //                 .done();
        //         }
        //
        //     })


        //无登录

        UserDefaults.cachedObject(Common.storeKeys.LOGIN_SUCCESS_USERNAME_PSW_STATE)
            .then((loginInfo) => {
                if (loginInfo == null) {
                    //取值为null,push到登录
                    if(this.state.isConnected == true){
                        InteractionManager.runAfterInteractions(() => {
                            this.pushToXXX(Login, 'Login')
                        })
                    }
                } else {
                    if (this.state.certificationTag == 2) {
                        //已经认证通过,显示发布页面
                        return
                    } else {
                        //未认证通过
                        if (this.state.certificationTag == 1) {
                            InteractionManager.runAfterInteractions(() => {
                                //认证审核中
                                this.pushToXXX(CommitHint, 'CommitHint')
                            })
                        } else if (this.state.certificationTag == 3) {
                            //认证失败
                            this.pushToXXX(CertificationFail, 'CertificationFail')
                            return;
                        } else {
                            //未认证
                            this.pushToXXX(CertificationHint, 'NewsCertificationHint')
                            return;
                        }
                    }

                }

            })


    }
    /*
     *   @param 无
     *   @returns 无
     * */
    componentDidMount() {
        this.netWorkYesOrNo();
    }

    /*
     *
     *   push到相应页面
     *   @param
     *      name
     *      component
     *   @returns
     * */
    pushToXXX = (component,name) =>{
        //登录失败.push到登录
        this.props.navigator.push(
            {
                name:name,
                component: component,
                passProps: {

                }
            }
        );
    }

}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems:'center'
    },
    errorImageStyle:{
        width:22,
        height:22,
        marginLeft:10,
        marginRight:10
    },
    imageStyle:{
        width:100,
        height:100,
        marginTop:120
    },
    topStyle:{
        height:40,
        backgroundColor:'#ffd85d',
        width:Width,
        alignItems:'center',
        flexDirection:'row'
    }

});

module.exports = News;
