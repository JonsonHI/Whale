/* @flow */

import React, { Component } from 'react';
import {
    ListView, View, Text, StyleSheet, TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native';
import FetchHttpClient, { form, header } from 'fetch-http-client';
const client = new FetchHttpClient();
var screenWidth = Dimensions.get('window').width;
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
    title_text: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 0,
        paddingTop: 0,
        paddingBottom: 5,
        fontSize: 16,
        // fontWeight: '200',

    },

    right_back_view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
        // backgroundColor: 'red',
    },
    containerbottm: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',

    },
    image_left: {
        height: 80,
        width: 80,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },

});

export default class ListRecommed extends Component {

    static appbarElevation = 0;

    state = {
        data: [],
        dataSource: new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        }),
    };

    componentWillMount() {
        this._genRows();
    }


    _genRows = () => {
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
    };

    _renderRow = (rowData) => {
        return (
            <TouchableOpacity
                onPress={() => this.selectCellAction()}
                >
                <View style={styles.containerbottm}>

                    <View style={styles.right_back_view}>
                        <Text style={styles.title_text} numberOfLines={2}>{'请在电脑浏览器的以下网址的“找资金”中申请贷款'}</Text>
                        <Text style={styles.title_text} numberOfLines={2}>{'http://www.xxxxxxxxx.com'}</Text>
                    </View>
                    <Image style={styles.image_left} source={{ uri: 'http://imgsrc.baidu.com/forum/pic/item/b785beb7d0a20cf42845940d76094b36adaf9916.jpg' }}></Image>
                </View>
            </TouchableOpacity>
        );
    };
    messageLookAll() {
        this.props.messageLookAll()
    }
    /**
     * 点击基酒资讯row跳转页面
     */
    selectCellAction() {
        this.props.selectCellAction()
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <ListView
                    {...this.props}
                    removeClippedSubviews={false}
                    contentContainerStyle={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow}
                    onEndReached={this._genRows}
                    ref={el => (this._root = el)}
                    scrollEnabled={false}
                    />
                <TouchableOpacity onPress={() => this.messageLookAll()}>
                    <View style={{ marginLeft: 0, marginRight: 0, marginTop: 0, backgroundColor: '#8E8E8E', height: 40, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'center', }}>查看全部</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
