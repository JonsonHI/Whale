/**
 * Created by shichunguang on 2016/12/9.
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
    Platform
} from 'react-native';

//Dimentsions
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width; //屏宽

var BaseDetailCell = React.createClass({
    getDefaultProps(){
        return{
            leftName:'',
            rightContent:''
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.backgroundStyle}>
                    <Text style={{fontSize:15,color:'#999999',marginLeft:10}}>
                        {this.props.leftName}
                    </Text>
                    <Text style={{fontSize:15,marginLeft:20,color:'#666666'}}>
                        {this.props.rightContent}
                    </Text>
                </View>

                <View style={{height:1,backgroundColor:'#e5e5e5',marginLeft:10,marginRight:10}}/>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container:{


    },
    backgroundStyle:{
        height:45,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'white',
    },
});

module.exports = BaseDetailCell;