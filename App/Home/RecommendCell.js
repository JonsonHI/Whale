/**
 *Created by Jonson on 16/6/5.
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    Dimensions,
    ScrollView,
    ListView,
    TouchableOpacity,
    InteractionManager,
} from 'react-native';
import FetchHttpClient, { form, header } from 'fetch-http-client';
const client = new FetchHttpClient();
var screenWidth = Dimensions.get('window').width; //屏宽
class RecommendCell extends Component {

  
    constructor(props) {
        super(props);
        this.state = ({
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            result: [],
        })


    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.clientList();
        })
    }
    _root: Object;
    clientList() {
        let url = 'http://rap.taobao.org/mockjsdata/11194/main';
        client.post(url, {
        }).then(response => {
            
            return response.json();
            
        }).then((result) => {
            console.log(JSON.stringify(result[0].data));
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(result[0].data)
            });
        }).catch((error) => {
            // alert('网络异常');
        })
    }
    recommendLookAll(){
       this.props.recommendLookAll()
    }
    
    render() {
        return (
            <View style={{backgroundColor:'white',flex:1}}>
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._renderRow}
                scrollEnabled={false}
                />
                <TouchableOpacity onPress={()=>this.recommendLookAll()}>
                <View style = {{marginLeft:0,marginRight:0,marginTop:0,backgroundColor:'#8E8E8E',height:40,justifyContent: 'center'}}>
                    <Text style={{textAlign: 'center',}}>查看全部</Text>
                </View>
                </TouchableOpacity>
            </View>
            
        );
        

    }

    _renderRow(rowData) {
        return (
            <TouchableOpacity>
                <View style={styles.containerline}>
                    {/*包含酒型和时间的View*/}
                    <View style={styles.upStyle}>
                        {/*酒型*/}
                        <View>
                            <Text style={{ fontSize: 20, color: 'black', marginLeft: 10, marginTop: 10 }}>
                                {rowData.name}
                            </Text>
                        </View>
                        {/*时间*/}
                        <View>
                            <Text style={{ fontSize: 13, color: '#b2b3b4', marginRight: 10, marginTop: 15 }}>
                                4小时前
                        </Text>
                        </View>
                    </View>
                    {/*产区,数量,年份,价格的View*/}
                    <View style={styles.downStyle}>
                        {/*包含产地名和产区的view*/}
                        <View>
                            {/*产地名*/}
                            <View style={styles.upChildStyle}>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    山西太原
                            </Text>
                            </View>
                            {/*产区*/}
                            <View style={styles.downChildStyle}>
                                <Text style={{ fontSize: 15, color: 'gray' }}>
                                    产区
                            </Text>
                            </View>
                        </View>
                        {/*包含具体产量和数量的view*/}
                        <View style={styles.lineStyle}>
                            {/*具体的数量*/}
                            <View style={styles.upChildStyle}>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    300吨
                            </Text>
                            </View>
                            {/*数量*/}
                            <View style={styles.downChildStyle}>
                                <Text style={{ fontSize: 15, color: 'gray' }}>
                                    数量
                            </Text>
                            </View>
                        </View>
                        {/*具体年份和年份的view*/}
                        <View style={styles.lineStyle}>
                            {/*具体年份*/}
                            <View style={styles.upChildStyle}>
                                <Text style={{ fontSize: 20, color: 'black' }}>
                                    6年
                            </Text>
                            </View>
                            {/*年份*/}
                            <View style={styles.downChildStyle}>
                                <Text style={{ fontSize: 15, color: 'gray' }}>
                                    年份
                            </Text>
                            </View>
                        </View>
                        {/*价格*/}
                        <View style={styles.moneyStyle}>
                            <Text style={{ fontSize: 20, color: 'red', marginTop: 8, textAlign: 'center', marginRight: 10 }}>
                                40000元/吨
                        </Text>
                        </View>
                    </View>
                </View>
                
            </TouchableOpacity>
        );
    }
};
const styles = StyleSheet.create({
    containerline: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: 'white',
        height: 100,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
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
        height: 43,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    //山西太原(300吨或6年)
    upChildStyle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    //产区(数量或年限)
    downChildStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
    },
    //300吨和数量(6年和年限  价格)的view
    lineStyle: {
        borderLeftWidth: 1,
        borderLeftColor: '#f4f5f6',
        width: screenWidth / 4.5,
    },
    //价格
    moneyStyle: {
        borderLeftWidth: 1,
        borderLeftColor: '#f4f5f6',
        width: screenWidth / 3,
    },
});

module.exports = RecommendCell;