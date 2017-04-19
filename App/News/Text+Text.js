/**
 * Created by shaotingzhou on 2016/12/13.
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

class TextText extends  React.Component {

    render () {
        return (
            <View style={{borderWidth:this.props.myBorderWidth,borderColor:this.props.myBorderColor}}>
                <TouchableOpacity onPress = {()=>this.passMethod()} activeOpacity = {this.props.myOpacity}>
                    <View style={styles.container}>
                        <Text style={styles.leftTextStyle}>{this.props.leftValue}</Text>
                        <Text style={[styles.centerTextStyle,{color:this.props.rightColor}]}>{this.props.rightValue}</Text>
                    </View>
                </TouchableOpacity>
                {/*分割线*/}
                <View style={{height:0.5,backgroundColor:'#e5e5e5'}}></View>
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
        this.props.modalAction()
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
        fontSize:15,
        color:'#666666',
        marginLeft:10
    },
    //中间文字
    centerTextStyle:{
        width:Width*0.55,
        fontSize:15,
        color:'#999999',
        marginLeft:20
    },
});

module.exports = TextText;
