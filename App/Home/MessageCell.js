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
} from 'react-native';
import FetchHttpClient, { form, header } from 'fetch-http-client';
import Common from '../common/constants'
import MessageList from '../Home/MessageList'

const client = new FetchHttpClient();
var screenWidth = Dimensions.get('window').width; //屏宽
var MessageCell = React.createClass({

    getInitialState() {
        return {
            dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
            result: [],
        }
    },

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.clientList();
        })
    },
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
    },
    /**
     * 回调查看所有
     */
    messageLookAll(){
        this.props.messageLookAll()
    },

    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    scrollEnabled={false}
                    />
                <TouchableOpacity onPress={() => this.messageLookAll()}>
                    <View style={{ marginLeft: 0, marginRight: 0, marginTop: 0, backgroundColor: '#8E8E8E', height: 40, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', }}>查看全部</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );

    },

    _renderRow(rowData) {
        return (

            <TouchableOpacity
                onPress={() => this.selectCellAction()}
                >
                <View style={styles.foodsCell}>
                    <View style={styles.titleContainer}>
                        <Text>222222</Text>
                        <Text>222222</Text>
                    </View>
                    <Image style={styles.foodIcon} source={require("../image/search.png")} />
                </View>
            </TouchableOpacity>
        );
    },
    selectCellAction() {
        this.props.selectCellAction()
    },
});
const styles = StyleSheet.create({
    container: {
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
    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    foodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
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

module.exports = MessageCell;