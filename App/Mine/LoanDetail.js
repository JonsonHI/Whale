/**
 * Created by Administrator on 2016/12/26.
 * 贷款详情
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
import MyFinancing from '../Mine/MyFinancing.js'//我的融资
import MyPledge from '../Mine/MyPledge.js'//我的质押
import MyReturn from '../Mine/MyReturn.js'//我的还款
import MyDueSign from '../Mine/MyDueSign.js'//到期解押

export default class LoanDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isCollect:true,

        };
    }



    render() {
        var type =this.props.type;

        switch(type){
            case 1:
                return (
                    <View style={styles.container}>
                        <NavigatorBar title='我的融资' widthWH={Platform.OS == 'ios' ? 25:25} leftBtnName = 'return_back' leftpress={()=>this.leftAction()}/>

                        <MyFinancing type={type}/>

                    </View>
                );
            break;
            case 2:
                return (
                    <View style={styles.container}>
                        <NavigatorBar title='我的质押' widthWH={Platform.OS == 'ios' ? 25:25} leftBtnName = 'return_back' leftpress={()=>this.leftAction()}/>

                        <MyPledge />

                    </View>
                );
                break;
            case 3:
                return (
                    <View style={styles.container}>
                        <NavigatorBar title='我的还款' widthWH={Platform.OS == 'ios' ? 25:25} leftBtnName = 'return_back' leftpress={()=>this.leftAction()}/>

                        <MyReturn />

                    </View>
                );
                break;
            case 4:
                return (
                    <View style={styles.container}>
                        <NavigatorBar title='到期解押' widthWH={Platform.OS == 'ios' ? 25:25} leftBtnName = 'return_back' leftpress={()=>this.leftAction()}/>

                        <MyDueSign />

                    </View>
                );
                break;
        }

    }

    /**
     * 返回到上一级
     */
    leftAction(){
        this.props.navigator.pop();
    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    }
});

