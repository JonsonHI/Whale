/**
 * 主页
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
    Dimensions,
    TextInput,
    InteractionManager,
    ScrollView,
    StatusBarIOS,
    NativeAppEventEmitter,
    NetInfo,
    Animated
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Swiper = require('react-native-swiper')//轮播组件
var IconCell = require('../Home/IconCell');//IconCell导入
var jsonData = require('./ImageData.json');//导入自定义数据
var Base = require('../Base/Base');//导入基酒页面
var RNScrollViewSR = require('../Home/UnlimtedCarousel')
var RecommendCell = require('../Home/RecommendCell');//导入基酒推荐列表
var MessageCell = require('../Home/MessageCell');//资讯列表
var SCWidth = Dimensions.get('window').width; //屏宽
var SCHeight = Dimensions.get('window').height; //屏宽
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';//选项卡插件
import Constants from '../common/constants';
var SearchContainer = require('../Home/SearchContainer');
import SerachHeader from '../Home/SearchBarHome'
import Search from '../Home/Search';
import MessageList from '../Home/MessageList';
import Drwea from '../Base/Drawers';  //筛选
import JPushModule from 'jpush-react-native';//极光推送
import DefaultTabBar1 from '../Home/DefaultTabBar';//导入选项卡插件
import ListRecommend from '../Home/ListRecommed';
import ListMessage from '../Home/ListMessage';
import AllState from'../Mine/AllState'
// var JPushModule = require( 'jpush-react-native');//极光推送


const BANNER_IMGS = [  //定义iocn图片
    require('../image/1.png'),
    require('../image/2.png'),
    require('../image/3.png'),
];
class Home extends React.Component {
    constructor(props) {
        super(props);
        this._handleConnectivityChange = this._handleConnectivityChange.bind(this),
        this.state = ({
            isCollect: true,
            isConnected: null,
            index: 0,
            routes: [
                { key: '1', title: '基酒推荐' },
                { key: '2', title: '基酒资讯' },
            ],
        })
    }
    _first: Object;
    _second: Object;
    _handleChangeTab = (index) => {
        this.setState({ index });
    };

    _renderScene = ({ route }) => {
        if (route !== this.state.routes[this.state.index]) {
            return;
        }
        switch (route.key) {
            case '1':
                this._first.scrollTo({ y: 0 });
                break;
            case '2':
                this._second.scrollTo({ y: 0 });
                break;
        }
    };
    _renderLabel = (props: any) => ({ route, index }) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        const outputRange = inputRange.map(inputIndex => inputIndex === index ? '#0080ff' : '#666666');
        const color = props.position.interpolate({
            inputRange,
            outputRange,
        });

        return (
            <Animated.Text style={[styles.label, { color }]}>
                {route.title}
            </Animated.Text>
        );
    };
    _renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <View><ListRecommend ref={el => (this._first = el)} style={styles.page}
                    /></View>


            case '2':
                return <View><ListMessage ref={el => (this._second = el)} style={styles.page}
                    messageLookAll={() => this.messageLookAll()}
                    selectCellAction={() => this.selectCellAction()} /></View>

            default:
                return null;
        }
    };

    _renderHeader = (props) => {
        return (
            <TabBarTop
                {...props}
                pressColor='rgba(255, 64, 129, .5)'
                onTabPress={this._handleTabItemPress}
                renderLabel={this._renderLabel(props)}
                indicatorStyle={styles.indicator}
                tabStyle={styles.tab}
                tabWidth={90}
                style={styles.tabbar}
                />
        );
    };
    componentDidMount() {
        //---------------------------------android start---------------------------------

        //           JPushModule.addReceiveCustomMsgListener((message) => {

        //           //这是默认的通知消息

        //         alert(message);

        //         });

        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        );


        JPushModule.addReceiveCustomMsgListener((message) => {
            this.setState({ pushMsg: message });
            alert(message)
        });
        JPushModule.addReceiveNotificationListener((message) => {
            console.log("receive notification: " + message);
            alert(message)
        });

        //---------------------------------android end---------------------------------




        NativeAppEventEmitter.addListener(

            'ReceiveNotification',

            (message) => {

                //下面就是发送过来的内容，可以用stringfy打印发来的消息  

                alert("content: " + JSON.stringify(message));

            });
    }
    //     componentWillUnmount() {

    //       

    //       NativeAppEventEmitter.removeAllListeners();



    //   },
    _handleConnectivityChange(isConnected) {
        console.debug(isConnected)
        this.setState({
            isConnected: isConnected,
        })
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    }
    /**
     * 
     * 跳转到内链接
     * @param {any} urlStr //外联的URL和内敛的判断
     */
    imageclick(urlStr) {
        var str = urlStr.indexOf('http');
        console.debug(JSON.stringify(urlStr.indexOf('http')))
        if (str == 0) {
            // if(urlStart == 'http'){
            // <WebView
            //         html={urlStr}
            //         javaScriptEnabled = {true}
            //     />
            InteractionManager.runAfterInteractions(() => {
                this.props.navigator.push({

                    component: Base,
                });
            });
            // this.props.baseClick()

            // }else if(cardData.url == '基酒'){
            // 	<Base />
            // }else{
            // 	alert('并没有您需要的页面');
            // }
        }
    }
    /**
     * 点击
     */
    testInputSearch() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                component: SearchContainer,
            });
        });

    }
    /**
     * 点击全部查看资讯按钮
     */
    recommendLookAll() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                component: Base,
            });
        });
    }
    /**
     * 点击全部查看推荐按钮
     */
    messageLookAll() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                component: MessageList,
            });
        });
    }

    /**
     * 跳转到资讯列表
     */
    pushMessageList() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'MessageList',
                component: MessageList,
            });
        });
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }
    render() {
        if(!this.state.isConnected){
            return(
                <View>
                <SerachHeader
                    />
                    <AllState type = 'nonetwork'/>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                {/**两种头的方案  <View style={{ height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: 'blue' }} />*/}

                <SerachHeader
                    />
                <ScrollView style={styles.sr}>

                    {/**顶部轮播图 */}
                    <Swiper style={styles.wrapperTop}
                        showsButtons={false}
                        autoplay={true}
                        height={130}
                        paginationStyle={{
                            bottom: Platform.OS === 'ios' ? 18 : 15, left: null, right: 10,
                        }}
                        >
                        <View style={styles.slide1}>
                            <Text style={styles.text}>Hello Swiper</Text>
                        </View>
                        <View style={styles.slide2}>
                            <Text style={styles.text}>Beautiful</Text>
                        </View>
                        <View style={styles.slide3}>
                            <Text style={styles.text}>And simple</Text>
                        </View>
                    </Swiper>
                    {/**搜索条 
                    <View style={styles.searchBox}>
                    */}
                    {/**搜索图标 

                        <Image source={require("../image/search.png")} style={styles.searchIcon} />
                        */}
                    {/**输入框 
                            //    underlineColorAndroid='transparent'
                                //    keyboardType='web-search'
                                //    placeholder='多款基酒任你选' 
                        
                        <Text style={styles.inputText} onPress={() => this.testInputSearch()}>
                        </Text>
                    </View>
                    */}
                    {/**消息按钮 <Image source={require("../image/bugcomit.png")} style={styles.scanIcon} />*/}

                    {/**icon点击 */}

                    <IconCell onSelect1={(urlStr) => this.imageclick(urlStr)} />

                    {/**分割线 */}
                    <View style={{ height: 8, backgroundColor: '#F2F2F2' }} />

                    {/**中间垂直轮播 <RNScrollViewSR imgData={jsonData.data} />*/}
                    <View style={styles.containerCenter}>
                        <Text>基酒快报</Text>
                        <RNScrollViewSR />
                    </View>
                    {/**分割线 */}
                    <View style={{ height: 8, backgroundColor: '#f5f5f5' }} />

                    {/**中间广告位 */}
                    <Image source={require("../image/adv.jpg")} style={styles.advIcon} />

                    {/**底端选项卡<ListTBR onSelectPsuhMessList={() => this.pushMessageList()} />

                    <ScrollableTabView style={styles.scrs}
                        renderTabBar={() => <DefaultTabBar1 />}
                        tabBarBackgroundColor='#F2F2F2'
                        tabBarUnderlineColor="rgb(23,102,171)"
                        tabBarActiveTextColor='#63B8FF'
                        tabBarUnderlineColor='#FF0000'
                        scrollWithoutAnimation={true}
                        scrollEnabled={false}
                        >

                            
                            <RecommendCell tabLabel={{label: "基酒资讯"}} 
                            recommendLookAll={() => this.recommendLookAll()}
                            />
                            <MessageCell tabLabel={{label: "基酒推荐"}} 
                            recommendLookAll={() => this.recommendLookAll()}
                            />

                       
                            

                    </ScrollableTabView>
                    
                    */}
                    <TabViewAnimated
                        style={[styles.containertab, this.props.style]}
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderHeader={this._renderHeader}
                        onRequestChangeTab={this._handleChangeTab}
                        />
                </ScrollView>



            </View>



        );
    }
};


var styles = StyleSheet.create({
    containertab: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        top: Platform.OS === 'ios' ? 0 : 0,
    },
    containerTop: {
        backgroundColor: '#436EEE',
        width: SCWidth,
        height: Platform.OS === 'ios' ? 53 : 43,
        alignItems: 'center',


    },
    containerCenter: {
        flexDirection: 'row',
        // paddingLeft : 10,
        height: 25,
        // top: 70,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    inputText: {
        flex: 1,
        backgroundColor: '#fff',
        fontSize: Platform.OS === 'ios' ? 15 : 11,
        marginTop: Platform.OS === 'ios' ? 0 : 10,
        height: Platform.OS === 'ios' ? 28 : 28,    //通过大于TextInput的高度来弥补上面的问题
        justifyContent: 'flex-end'  //放置到底部
    },
    searchBox: {//搜索框
        height: Platform.OS === 'ios' ? 30 : 25,
        flexDirection: 'row',   // 水平排布
        // flex: 1,
        borderRadius: 5,  // 设置圆角边
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 40,
        marginTop: -140,

    },
    scanIcon: {//搜索图标
        height: 26.7,
        width: 26.7,
        resizeMode: 'stretch',
        marginLeft: SCWidth - 35,
        top: Platform.OS === 'ios' ? -27 : -22

    },
    searchIcon: {//搜索图标
        height: 26.7,
        width: 26.7,
        resizeMode: 'stretch',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    wrapperTop: {

    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5',
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    divider1: {
        width: SCWidth,
        height: 10,
        backgroundColor: '#E3E3E3',
    },
    advIcon: {
        height: 100,
        width: SCWidth,
        // top: 70,
    },
    scrs: {
        flex: 1,
        // top:70,
    },
    indicator: {
        backgroundColor: '#0080ff',
        height: 0.5
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        margin: 8,
    },
    tabbar: {
        backgroundColor: '#E5E5E5',
    },
    tab: {
        opacity: 1,

    },
    page: {
        backgroundColor: '#f5f5f5',
    },
});

module.exports = Home;