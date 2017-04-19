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
    Navigator,
    ActivityIndicator,
    Dimensions,
    ScrollView,
    ListView,
    TouchableOpacity,
    InteractionManager,
    Platform,
    RefreshControl,
} from 'react-native';
import FetchHttpClient, { form, header } from 'fetch-http-client';
import Common from '../common/constants'
import LoadMore from '../Home/LoadMore'
import Loading from '../common/Loading'
import {fetchMessage,fetchMessageList,receiveMessageList} from '../actions/messageListActions'
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var MessageListDetails = require('../Home/MessageListDetails')//列表详情页面
const client = new FetchHttpClient();
var screenWidth = Dimensions.get('window').width; //屏宽
let page = 1;
let canLoadMore = false;
let isRefreshing = false;
let isLoading = true;

export default class MessageList extends React.Component{

    // getInitialState() {
    //     return {
    //         dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
    //         result: [],
    //     }
    // }
     constructor(props) {
        super(props);

        this._renderRow = this._renderRow.bind(this);

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
    clientList() {
        const{dispatch}=this.props;
        dispatch(fetchMessage(page, canLoadMore, isRefreshing, isLoading))
    //     let url = 'http://rap.taobao.org/mockjsdata/11194/main';
    //     client.post(url, {
    //     }).then(response => {

    //         return response.json();

    //     }).then((result) => {
    //         console.log(JSON.stringify(result[0].data));
    //         this.setState({
    //             dataSource: this.state.dataSource.cloneWithRows(result[0].data)
    //         });
    //     }).catch((error) => {
    //         // alert('网络异常');
    //     })
    }

    render() {
        const{MessageList}=this.props;
        // let message = [MessageList.messagelist]
        // console.log(message+'            message')
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <NavigatorBar title='资讯' widthWH={Platform.OS == 'ios' ? 15 : 15} leftBtnName='back' rightBtnName='Share_icon' leftpress={() => this.leftAction()} rightPress={() => this.rightAction()} />
                {MessageList.isLoading ?
                    <Loading /> :
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(MessageList.messageList)}
                    renderRow={this._renderRow.bind(this)}
                    initialListSize={1}
                    // scrollEnabled={false}
                    onScroll={this._onScroll}
                    onEndReached={this._onEndReach.bind(this)}
                    onEndReachedThreshold={10}
                    renderFooter={this._renderFooter.bind(this)}
                    style={{height: Common.window.height - 44}}
                    refreshControl={
                        <RefreshControl
                            refreshing={MessageList.isRefreshing}
                            onRefresh={this._onRefresh.bind(this)}
                            title="正在加载中……"
                            color="#ccc"
                            />
                    }
                    />
                }
            </View>
        );

    }

    _renderRow(rowData) {
        return (
            <TouchableOpacity
                onPress={() => this.MessageListDetails()}
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
    }
    leftAction() {
        this.props.navigator.pop()
    }
    MessageListDetails() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                component: MessageListDetails,
            });
        });
    }
     // 下拉刷新
    _onRefresh() {
        page = 1;
        const {dispatch} = this.props;
        canLoadMore = false;
        isRefreshing = true;
        dispatch(fetchMessage(page, canLoadMore, isRefreshing));
    }

    // 上拉加载
    _onEndReach() {
        if (canLoadMore) {
            page++;
            const {dispatch} = this.props;
            dispatch(fetchMessage(page, canLoadMore, false));
            canLoadMore = false;
        }
    }
       _renderFooter() {
        const {MessageList} = this.props;
        if (MessageList.isLoadMore) {
            return <LoadMore />
        }
    }
}
const styles = StyleSheet.create({
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
    image_left: {
        height: 80,
        width: 80,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    containerbottm: {
        width: screenWidth,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',

    },
});

module.exports = MessageList;