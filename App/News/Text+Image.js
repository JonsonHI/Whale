/**
 * Created by shaotingzhou on 2016/12/7.
 */
/**
 *  企业认证的图片信息模块
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
    TextInput,
    Dimensions,
    AsyncStorage
} from 'react-native';
var Width = Dimensions.get('window').width; //屏宽
var Height = Dimensions.get('window').height; //屏高

class TextImage extends  React.Component {

    render () {
        return (
            <TouchableOpacity onPress = {()=>this.passMethod()}>
            <View borderWidth = {this.props.myBorderWidth} borderColor = {this.props.myBorderColor}>
                <View style={styles.container}>
                    <Text style={styles.textStyle}>{this.props.name}</Text>
                    <Image source={require('../image/camera.png')} style={styles.cameraImg}/>
                </View>
                <View style={{height:0.5,backgroundColor:'#e5e5e5'}}></View>
            </View>
            </TouchableOpacity>
        )
    }
    /*
     *   点击传递方法
     *   @param 无
     *   @returns 无
     * */
    passMethod = () =>{
        this.props.cameraAction()
    }

}

var styles = StyleSheet.create({
    //外部view
    container:{
        height:45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
        // backgroundColor:'blue'
    },
    //左侧文字
    textStyle:{
        fontSize:15,
        color:'#666666',
        marginLeft:10
    },
    //右侧输入框
    textInputStyle:{
        width:Width*0.5,
        fontSize:15,
        color:'#999999',
        marginLeft:20
    },
    //相机图片
    cameraImg: {
        width: 20,
        height: 20,
        marginRight:10,

    },
});

module.exports = TextImage;
