/**
 * Created by Administrator on 2017/1/12.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions
    } from 'react-native';
var Width = Dimensions.get('window').width; //屏宽

class AllState extends  React.Component {



    render () {
        let type = this.props.type;
        switch (type){
            case 'auditing'://审核中
                return (
                    <View style={styles.container}>
                        <Image source={{uri:'review'}} style={styles.imageStyle}/>
                        <Text style={[styles.TextStyle,{marginTop:45}]}>信息审核中，结果将在1个工作日内以</Text>
                        <Text style={[styles.TextStyle,{marginTop:12}]}>短信方式通知您，请耐心等待！</Text>

                        <TouchableOpacity style={styles.btnStyle} >
                            <Text style={styles.btnTextStyle}>返回首页</Text>
                        </TouchableOpacity>
                    </View>
                );
            break;

            case 'noreleaserecord'://没有发布记录
                return (
                    <View style={styles.container}>
                        <Image source={require('../image/noreleaserecord.png')} style={styles.imageStyle}/>
                        <Text style={[styles.TextStyle,{marginTop:45}]}>亲您没有发布记录！</Text>

                    </View>
                );
                break;

            case 'nocollectionrecord'://没有收藏记录
                return (
                    <View style={styles.container}>
                        <Image source={{uri:'nocollectionrecord'}} style={styles.imageStyle}/>
                        <Text style={[styles.TextStyle,{marginTop:45}]}>亲您的收藏为空！</Text>

                    </View>
                );
                break;

            case 'nomessagerecord'://没有消息
                return (
                    <View style={styles.container}>
                        <Image source={{uri:'nomessage'}} style={styles.imageStyle}/>
                        <Text style={[styles.TextStyle,{marginTop:45}]}>亲,您没有消息哟!</Text>

                    </View>
                );
                break;

            case 'noxunpanrecord'://没有询盘记录
                return (
                    <View style={styles.container}>
                        <Image source={{uri:'noxunpanrecord'}} style={styles.imageStyle}/>
                        <Text style={[styles.TextStyle,{marginTop:45}]}>您还未有询盘记录</Text>

                    </View>
                );
                break;

            case 'noresults'://没有筛选结果
                return (
                    <View style={styles.container}>
                        <Image source={{uri:'noresult'}} style={[styles.imageStyle,{marginTop:60}]}/>
                        <Text style={[styles.TextStyle,{marginTop:45}]}>未找到满足当前条件的内容</Text>

                    </View>
                );
                break;

            case 'nonetwork'://没有网络
                return (
                    <View style={styles.container}>
                        <View style={styles.topStyle}>
                            <Image source={{uri:'warning'}} style={styles.errorImageStyle}/>
                            <Text style={styles.errorTextStyle}>网络请求失败，请检查您的网络设置</Text>
                        </View>
                        <Image source={{uri:'nonetwork'}} style={[styles.imageStyle,{marginTop:80}]}/>
                        <Text style={{marginTop:45,fontSize:17,color:'#333333'}}>网络请求失败</Text>
                        <Text style={{marginTop:12,fontSize:14,color:'#999999'}}>检查下网络再来吧</Text>
                        <TouchableOpacity style={[styles.btnStyle,{backgroundColor: '#b5b5b5'}]} 
                            onPress = {() => {this.props.reloadData()}}
                        >
                            <Text style={styles.btnTextStyle}>重新加载</Text>
                        </TouchableOpacity>
                    </View>
                );
                break;
        }

    }

}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems:'center'
    },imageStyle:{
        width:100,
        height:100,
        marginTop:120
    },TextStyle:{
        fontSize:15,
        color:'#666666'
    },btnStyle:{
        marginTop:50,
        backgroundColor:'#0080ff',
        width:120,
        height:45,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:3
    },btnTextStyle:{
        fontSize:17,
        color:'#ffffff',
    },topStyle:{
        height:40,
        backgroundColor:'#ffd85d',
        width:Width,
        alignItems:'center',
        flexDirection:'row'
    },errorImageStyle:{
        width:22,
        height:22,
        marginLeft:10,
        marginRight:10
    },errorTextStyle:{
        fontSize:15,
        color:'#cc5100'
    }
})

module.exports = AllState;
