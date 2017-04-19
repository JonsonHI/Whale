/**
 * Created by Administrator on 2017/1/9.
 * 资讯列表
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
    Dimensions
    } from 'react-native';
var TestInfotmation=require('../Mine/test_information.json')//询盘测试数据
var Width = Dimensions.get('window').width; //屏宽

export default class InformationList extends Component {

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(TestInfotmation.data),
            isCollect:true,
        };
    }


    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    />
            </View>


        );
    }

    _renderRow(rowData){

        return(

                <View style={styles.contentStyle}>
                    <View style={styles.leftStyle}>
                        <Text
                            style={styles.titleStyle}
                            numberOfLines={2}
                            >
                            {rowData.title}
                        </Text>

                        <Text style={styles.dateStyle}>
                            {rowData.time}
                        </Text>
                    </View>

                    <Image style={styles.icon} source={{uri:rowData.image}} />

                </View>


        );
    }

    /**
     * 无收藏记录时显示此页面
     * @returns {XML}
     * @private
     */
    _renderNullRow(){
        return(
            <View style={styles.nullcontentStyles}>
                <Image source={{uri:'fabu'}} style={styles.nullImageStyle}/>
                <Text style={styles.nullTextStyle}>
                    亲您没有发布记录 !
                </Text>
            </View>
        );
    }
}



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        marginBottom:8
    },contentStyle:{
        borderWidth:1,
        height:100,
        borderColor:'#e5e5e5',
        backgroundColor:'#fff',
        marginLeft:10,
        marginRight:10,
        marginTop:8,
        flexDirection:'row',
    },leftStyle:{
        flexDirection:'column',
        flex:1
    },titleStyle:{
        marginRight:5,
        padding:10,
        fontSize:15,
        color:'#333333',
        height:60,
    },dateStyle:{
        marginLeft:10,
        fontSize:12,
        color:'#999999'
    },icon:{
        width:80,
        height:80,
        marginRight:10,
        marginTop:10
    },nullImageStyle:{
        width:100,
        height:100,
        marginTop:120
    },nullTextStyle:{
        fontSize:15,
        color:'#666666',
        marginTop:45
    },nullcontentStyles:{
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems:'center'
    }
});