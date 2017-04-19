/**
 *Created by Jonson on 16/6/5.
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Image,
    View,
    navigator,
    ActivityIndicator,
    Dimensions,
    ScrollView,
    ListView,
    TouchableOpacity,
    InteractionManager,
    Platform,
} from 'react-native';
import FetchHttpClient, { form, header } from 'fetch-http-client';
import Common from '../common/constants'
import MessageList from '../Home/MessageList'
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var test = "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq,qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq,qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq,qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq,qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq,qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq"
const client = new FetchHttpClient();
var screenWidth = Dimensions.get('window').width; //屏宽
var MessageListDetails = React.createClass({

    getInitialState(){

        return {
            isCollection:false
        }
    },

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            // this.clientList();
        })
    },
    clientList() {
        let url = 'http://rap.taobao.org/mockjsdata/11194/text';
        client.post(url, {
        }).then(response => {

            return response.json();

        }).then((result) => {
            console.log(JSON.stringify(result.data[0]));
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(result.data[0])
            });
        }).catch((error) => {
            // alert('网络异常');
        })
    },



    render() {
        return (
            <View style={{ flex: 1 ,backgroundColor:'white'}}>
            <NavigatorBar title='正文' widthWH={Platform.OS == 'ios' ? 15 : 15} leftBtnName='back' rightBtnName='Share_icon' leftpress={() => this.leftAction()} rightPress={() => this.rightAction()} />
            <ScrollView >
                <View style={styles.foodsCell}>
                    <View style={styles.titleContainer}>
                        <Text>iPhone7Plus</Text>
                        <Text>2019年5月3日</Text>
                    </View>

                    <TouchableOpacity onPress={()=>this.collectionAction()}>
                        <View style={styles.foodIcon}>
                            {this._collectionAction(this.state.isCollection)}
                        </View>
                    </TouchableOpacity>
                </View>
                    <Image
                        // source={ require('../image/1.png') }
                        source = {{uri:'http://imgsrc.baidu.com/forum/pic/item/b785beb7d0a20cf42845940d76094b36adaf9916.jpg'}}
                        style={{  height: 200,width:Common.window.width,resizeMode:'contain'}} />

                <Text style={{ marginTop: 0 ,marginLeft:10,marginRight:10,textAlign:'auto'}}>
                    {test}
                </Text>
                </ScrollView>
            </View>
        );

    },
    leftAction(){
        this.props.navigator.pop();
    },
    collectionAction(){
        this.setState({
            isCollection:!this.state.isCollection
        })
    },
    //收藏事件
    _collectionAction(flag){
        if(flag === true){
            return (
                <View style={{height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={{uri:'heart_orange'}} style={{width:15,height:15}}/>
                    <Text style={{fontSize:17,marginLeft:5,color:'#666666'}}>
                        已收藏
                    </Text>
                </View>
            );
        }else {
            return (
                <View style={{height:50,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <Image source={{uri:'heart'}} style={{width:15,height:15}}/>
                    <Text style={{fontSize:17,marginLeft:5,color:'#666666'}}>
                        收藏
                    </Text>
                </View>
            );
        }
    },


});
const styles = StyleSheet.create({
    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,

        alignItems: 'center',
        justifyContent: 'space-between'
    },

    foodIcon: {
        height: 40,
    },


    titleContainer: {
        height: 40,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    calory: {
        fontSize: 13,
        color: 'red',
    },

    unit: {
        fontSize: 13,
        color: 'black'
    },
    foodName: {
        width: Common.window.width - 15 - 15 - 40 - 15 - 10,
    },
});

module.exports = MessageListDetails;