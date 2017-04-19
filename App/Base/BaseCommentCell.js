/**
 * Created by shichunguang on 2016/12/6.
 */
/**
 *金融
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
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var BaseDetail =require('./BaseDetail');//详情界面
var CommentCell = React.createClass({
    getDefaultProps(){
        return{
            wineTitle:'',
            amount:'',
            price:'',
            producingArea:'',
            time:'',
            vintage:''
        }
    },
    //render() {
    //    return (
    //
    //        <View style={styles.container}>
    //            {/*包含酒型和时间的View*/}
    //            <View style={styles.upStyle}>
    //                {/*酒型*/}
    //                <View>
    //                    <Text style={{fontSize:20,color:'black',marginLeft:10,marginTop:10}}>
    //                        {this.props.wineTitle}
    //                    </Text>
    //                </View>
    //                {/*时间*/}
    //                <View>
    //                    <Text style={{fontSize:13,color:'#b2b3b4',marginRight:10,marginTop:15}}>
    //                        {this.props.time}
    //                    </Text>
    //                </View>
    //            </View>
    //            {/*产区,数量,年份,价格的View*/}
    //            <View style={styles.downStyle}>
    //                {/*包含产地名和产区的view*/}
    //                <View>
    //                    {/*产地名*/}
    //                    <View style={styles.upChildStyle}>
    //                        <Text style={{fontSize:20,color:'black'}}>
    //                            {this.props.producingArea}
    //                        </Text>
    //                    </View>
    //                    {/*产区*/}
    //                    <View style={styles.downChildStyle}>
    //                        <Text style={{fontSize:15,color:'gray'}}>
    //                            产区
    //                        </Text>
    //                    </View>
    //                </View>
    //                {/*包含具体产量和数量的view*/}
    //                <View style={styles.lineStyle}>
    //                    {/*具体的数量*/}
    //                    <View style={styles.upChildStyle}>
    //                        <Text style={{fontSize:20,color:'black'}}>
    //                            {this.props.amount}
    //                        </Text>
    //                    </View>
    //                    {/*数量*/}
    //                    <View style={styles.downChildStyle}>
    //                        <Text style={{fontSize:15,color:'gray'}}>
    //                            数量
    //                        </Text>
    //                    </View>
    //                </View>
    //                {/*具体年份和年份的view*/}
    //                <View style={styles.lineStyle}>
    //                    {/*具体年份*/}
    //                    <View style={styles.upChildStyle}>
    //                        <Text style={{fontSize:20,color:'black'}}>
    //                            {this.props.vintage}
    //                        </Text>
    //                    </View>
    //                    {/*年份*/}
    //                    <View style={styles.downChildStyle}>
    //                        <Text style={{fontSize:15,color:'gray'}}>
    //                            年份
    //                        </Text>
    //                    </View>
    //                </View>
    //                {/*价格*/}
    //                <View style={styles.moneyStyle}>
    //                    <Text style={{fontSize:20,color:'red',marginTop:8,textAlign:'center',marginRight:10}}>
    //                        {this.props.price}
    //                    </Text>
    //                </View>
    //            </View>
    //        </View>
    //
    //    );
    //},
    render() {
    return (
            <View style={styles.containerline}>
                {/*包含酒型和时间的View*/}
                <View style={styles.upStyle}>
                    {/*酒型*/}
                    <Text style={{ fontSize: 18, color: '#333333', marginLeft: 10, marginTop: 13, fontWeight: 'bold' }} >
                        {this.props.wineTitle}
                    </Text>
                    {/*时间*/}
                    <Text style={{ fontSize: 13, color: '#999999', marginRight: 10, marginTop: 18 }} >
                        {this.props.time}
                    </Text>
                </View>
                {/*产区,数量,年份,价格的View*/}
                <View style={styles.downStyle}>
                    {/*包含产地名和产区的view*/}
                    {/*产地名*/}
                    <View style={styles.originStyle}>
                        <Text style={styles.texton}>
                            {this.props.producingArea}
                        </Text>
                        {/*产区*/}
                        <Text style={styles.textdown}>
                            产区
                        </Text>
                    </View>
                    {/*包含具体产量和数量的view*/}
                    <View style={styles.numberStyle}>
                        {/*具体的数量*/}

                        <Text style={styles.texton}>
                            {this.props.amount}
                        </Text>
                        {/*数量*/}
                        <Text style={styles.textdown}>
                            数量
                        </Text>
                    </View>
                    {/*具体年份和年份的view*/}
                    {/*具体年份*/}
                    <View style={styles.upChildStyle}>
                        <Text style={styles.texton}>
                            {this.props.vintage}
                        </Text>
                        {/*年份*/}
                        <Text style={styles.textdown}>
                            年份
                        </Text>
                    </View>
                    {/*价格*/}
                    <View style={styles.moneyStyle}>
                        <Text style={{ fontSize: 19, color: 'red', textAlign: 'center' }}>
                            {this.props.price}
                        </Text>
                    </View>
                </View>
            </View >

    )}
});


const styles = StyleSheet.create({
    container: {

    },
    row: {
        margin: 8,
        padding: 16,
        borderRadius: 3,
        backgroundColor: 'rgba(0, 0, 0, .1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'rgba(0, 0, 0, .4)',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    containerline: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    all: {
        flex: 1,
    },
    upStyle: {
        backgroundColor: 'white',
        height: 44,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    //包含产地,数量,年份,价格的view
    downStyle: {
        backgroundColor: 'white',
        height: 55,
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'flex-start',
        // flexWrap: 'wrap',
        // width: screenWidth / 4.5,
        // marginTop : 5
    },
    //山西太原(300吨或6年)
    upChildStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
        borderLeftColor: '#f4f5f6',
        borderLeftWidth: 1,
    },
    originStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        flex:1
    },
    //产区(数量或年限)
    downChildStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    //300吨和数量(6年和年限  价格)的view
    numberStyle: {
        borderLeftWidth: 1,
        borderLeftColor: '#f4f5f6',
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    //价格
    moneyStyle: {
        borderLeftWidth: 1,
        borderLeftColor: '#f4f5f6',
        flex:2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    texton: {
        fontSize: 16,
        color: '#666666',
    },
    textdown: {
        fontSize: 13,
        color: '#999999',
        marginBottom: 13,
        marginTop: 8,
    },
    texton1: {
        fontSize: 16,
        color: '#666666',

    }
});

module.exports = CommentCell;
