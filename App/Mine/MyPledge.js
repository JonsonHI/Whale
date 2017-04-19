/**
 * Created by Administrator on 2016/12/27.
 * 我的质押
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

export default class MyPledge extends Component {

    render(){
        return(
            <View style={styles.content}>
                {/*----业务编号及状态------*/}
                <View style={styles.number}>
                    <Text>质押物编号：ZJD160912000500</Text>
                    <Text>质押中</Text>
                </View>
                {/*----业务具体内容------*/}
                <View style={styles.contentStyle}>
                    <View style={styles.itemStyles}>
                        {this._renderItem("质权人:","XXXXX保险股份有限公司")}
                    </View>
                    <View style={styles.itemStyles}>
                        {this._renderItem("监管方:","长运安信股份有限公司")}

                    </View>
                    <View style={styles.itemStyles}>
                        {this._renderItem("出质人:","泸州老窖集团股份有限公司")}
                    </View>

                    <View style={styles.itemStyles}>
                        {this._renderItem("质押物总价:","2,000万")}
                        {this._renderItem("质押物数量:","1000吨")}
                    </View>
                </View>

                <View style={styles.number}>
                    <Text>出质时间：2016/11/10</Text>
                    <Text>质押时间：2016/09/03</Text>
                </View>
            </View>
        );
    }

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