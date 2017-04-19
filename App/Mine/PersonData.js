/**
 * Created by Administrator on 2016/12/26.
 * 个人资料页面
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
import ChangePhone from '../Account/ChangePhone.js';
import ChangePassword from '../Account/ChangePassword.js'
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import Toast from 'react-native-root-toast';

var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
};

export default class PersonData extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:'http://www.hinews.cn/pic/0/14/02/91/14029180_559617.jpg'
        };
      }

    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='个人资料' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>
                {/*头像*/}
                <TouchableOpacity style={styles.headviewStyle} onPress={this._selectphone}>
                    <Text style={styles.titleStyle}>头像</Text>
                    <Image style={styles.headimg} source={{uri:this.state.dataSource}}></Image>
                    <Image style={styles.arrow} source={{uri:'forward'}}/>
                </TouchableOpacity>
                {/*用户名修改*/}
                <View style={styles.headviewStyle}>
                    <Text style={styles.titleStyle}>用户名</Text>
                    <Text style={styles.nameStyle}>BW160923_abc</Text>
                </View>
                {/*密码修改*/}
                <TouchableOpacity style={styles.headviewStyle} onPress={()=>{this._onPress(ChangePassword)}}>
                    <Text style={styles.titleStyle}>密码修改</Text>

                    <Image style={styles.arrow} source={{uri:'forward'}}/>
                </TouchableOpacity>
                {/*更换绑定手机号*/}
                <TouchableOpacity style={styles.headviewStyle} onPress={()=>{this._onPress(ChangePhone)}}>
                    <Text style={styles.titleStyle}>更换绑定手机号</Text>
                    <Text style={styles.changeStyle}>18201121776</Text>
                    <Image style={styles.arrow} source={{uri:'forward'}}/>
                </TouchableOpacity>
            </View>
        );
    }

    /**
     * 返回到上一级
     */
    leftAction(){
        this.props.navigator.pop();
    }

    _onPress(jump){
        this.props.navigator.push({
            component: jump,
        });

    }

    /**
     * 选取图片更换头像
     * @private
     */
    _selectphone =() =>{
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            console.log(response.error)
            if(response.error != undefined){
                this.toast('若想使用相机&相册功能,请在设置--基酒在线--开启相应访问权限')

            }else {
                if (response.didCancel){
                    return
                }else {
                        this.setState({
                            dataSource:response.uri
                        })

                }
            }


        })
    }

    toast = (message)=>{
        let toast = Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },headviewStyle:{
        height:45,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:0.5,
        backgroundColor:'#fff'
    },titleStyle:{
        flex:1,
        fontSize:15,
        color:'#333333',
        marginLeft:20,
    },arrow:{
        width:10,
        height:15,
        marginRight:20
    },headimg:{
        width:30,
        height:30,
        borderRadius:15,
        marginRight:10
    },nameStyle:{
        fontSize:15,
        color:'#999999',
        marginRight:20
    },changeStyle:{
        fontSize:15,
        color:'#333333',
        marginRight:10
    }
});