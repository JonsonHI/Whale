/**
 * Created by Administrator on 2016/12/27.
 * 我的融资
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

export default class MyFinancing extends Component {

    constructor(props) {
        super(props);
        this.state = {
            type:0,

        };
    }


    render(){
        return(
            <View style={styles.content}>
                {/*----业务编号及状态------*/}
                <View style={styles.number}>
                    <Text>业务编号：ZJD160912000500</Text>
                    <Text>申请中</Text>
                </View>
                {/*----业务具体内容------*/}
                <View style={styles.contentStyle}>
                    <View style={styles.itemStyles}>
                        {this._renderItem("融资金额:","1750万")}
                        {this._renderItem("融资期限:","1年")}
                    </View>
                    <View style={styles.itemStyles}>
                        {this._renderItem("年化利率:","12.5%")}
                        {this._renderItem("放款时间:","2016/11/10")}
                    </View>
                    <View style={styles.itemStyles}>
                        {this._renderItem("还款方式:","先息后本  ")}
                        {this._renderItem("到期时间:","2017/11/10")}
                    </View>
                </View>

                <View style={styles.number}>
                    <Text></Text>
                    <Text>申请时间:2016/09/03</Text>
                </View>
            </View>
        );
    }

    /**
     *
     * @param title
     * @param value
     * @returns {XML}
     * @private
     */
    _renderItem(title,value){
        return(
            <View style={styles.itemStyle}>
                <Text>{title}</Text>
                <Text>{value}</Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    content:{
        flexDirection:'column',
        backgroundColor:'#fff',
        borderRadius:3,
        marginTop:15
    },number:{
        flexDirection:'row',
        justifyContent:'space-between',
        margin:10
    },itemStyle:{
        flex:1,
        flexDirection:'row',
        padding:5
    },itemStyles:{
        flexDirection:'row',

    },contentStyle:{
        flexDirection:'column',
        backgroundColor:'#f5f5f5',
        borderRadius:3,
        marginLeft:5,
        marginRight:5
    }
})