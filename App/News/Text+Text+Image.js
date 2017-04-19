/**
 * Created by shaotingzhou on 2016/12/9.
 */
/**
 *  供应发布的文字信息模块
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

class TextTextImage extends  React.Component {

    render () {
        return (
            <View style={{borderWidth:this.props.myBorderWidth,borderColor:this.props.myBorderColor}}>
                <TouchableOpacity onPress = {()=>this.passMethod()}>
                <View style={styles.container}>
                    <Text style={styles.leftTextStyle}>{this.props.leftValue}</Text>
                    <Text style={[styles.centerTextStyle, {color:this.props.textColor}]}>{this.props.rightValue}</Text>
                    <Image source={require('../image/camera.png')} style={styles.cameraImg}/>
                </View>
                </TouchableOpacity>

                {/*分割线*/}
                <View style={{height:0.5,backgroundColor:'#e9e9e9'}}></View>
                <View>

                </View>
            </View>
        )
    }
    /*
     *   点击传递方法
     *   @param 无
     *   @returns 无
     * */
    passMethod = ()=>{
        this.props.cameraAction()
    }
}

var styles = StyleSheet.create({
    //外部view
    container:{
        height:45,
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'blue'
    },
    //左侧文字
    leftTextStyle:{
        // width:Width*0.3,
        fontSize:15,
        color:'#666666',
        marginLeft:10
    },
    //中间文字
    centerTextStyle:{
        flex:1,
        fontSize:15,
        color:'#999999'
    },
    //相机图片
    cameraImg: {
        width: 20,
        height: 20,
        marginRight:10
    },
});

module.exports = TextTextImage;
