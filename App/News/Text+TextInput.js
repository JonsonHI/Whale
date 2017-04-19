/**
 * Created by shaotingzhou on 2016/12/7.
 */
/**
 *  企业认证的文字信息模块
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

class TextTextInput extends  React.Component {

    render () {
        return (
            <View style={{borderWidth:this.props.myBorderWidth,borderColor:this.props.myBorderColor}}>
                <View style={styles.container}>
                    <Text style={styles.leftTextStyle}>{this.props.leftValue}</Text>
                    <TextInput
                        style={[styles.centerTextStyle,{color:this.props.defaultValueColor}]}
                        keyboardType = {this.props.keyboardType}
                        placeholder = {this.props.placeholder}
                        placeholderTextColor = '#CDCDC1'
                        defaultValue={this.props.defaultValue}
                        editable={this.props.editable}
                        underlineColorAndroid = {'transparent'}
                        onChangeText  = {(e)=>this.onChangeText (e)}
                        onFocus = {()=>this.onFocus()}

                    />
                    <Text style={styles.rightTextStyle}>{this.props.rightValue}</Text>
                </View>
                {/*分割线*/}
                <View style={{height:0.5,backgroundColor:'#e5e5e5'}}></View>
                <View>
                </View>
            </View>
        )
    }
    onChangeText  = (e) =>{
        this.props.onChangeText(e)
    }
    onFocus = () =>{
        this.props.onFocus()
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
        flex:1,
        fontSize:15,
        color:'#999999',
        paddingLeft:20
    },
    //右边文字
    rightTextStyle:{
        textAlign:'right',
        marginRight:10,
        fontSize:15,
        color:'#666666',
    }
});

module.exports = TextTextInput;
