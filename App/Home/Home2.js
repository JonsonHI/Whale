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

} from 'react-native';
import {
    NetInfoContent,
    NetInfoContentNo,
} from '../actions/homeActions';
import Common from '../common/constants';//工具类
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Swiper = require('react-native-swiper')//轮播组件
var IconCell = require('../Home/IconCell');//IconCell导入
var jsonData = require('./ImageData.json');//导入自定义数据
var ListTBR = require('../Home/ListTBR');//导入选项卡插件
var Base = require('../Base/Base');//导入基酒页面
var RNScrollViewSR = require('../Home/RNScrollViewSR')
var SCWidth = Dimensions.get('window').width; //屏宽
var SCHeight = Dimensions.get('window').height; //屏宽
import Constants from '../common/constants';
var SearchContainer = require('../Home/SearchContainer');
// import  Search from '../Home/SearchHeader';
import Search from '../Home/Search';

// import  Search1 from '../Home/Search1';
import Drwea from '../Base/Drawers';  //筛选
import JPushModule from 'jpush-react-native';//极光推送
// var JPushModule = require( 'jpush-react-native');//极光推送

const BANNER_IMGS = [  //定义iocn图片
    require('../image/1.png'),
    require('../image/2.png'),
    require('../image/3.png'),
];
class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = ({
            isCollect: true,
            currentPage: 0,
            duration: 2000   //每隔一秒开始轮播
        })
            

    }
    componentDidMount() {
        this._startTimer();
        const {Home, dispatch} = this.props;
        dispatch(NetInfoContent());
       
        //---------------------------------android start---------------------------------

        //           JPushModule.addReceiveCustomMsgListener((message) => {

        //           //这是默认的通知消息

        //         alert(message);

        //         });

        // NetInfo.isConnected.addEventListener('change', (isConnected) => {
        //     console.log(isConnected + '           1111');

        //     this.setState({
        //         Connected: isConnected,
        //     });
        // });


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
    componentWillUnMount() {
        // this.interval && clearTimeout(this.interval)
          clearInterval(this.interval);
        

    }
    imageclick(urlStr) {
        var str = urlStr.indexOf('http');
        console.debug(JSON.stringify(urlStr.indexOf('http')))
        if (str == 0) {
            // if(urlStart == 'http'){
            // <WebView
            //         html={urlStr}
            //         javaScriptEnabled = {true}
            //     />
            this.props.navigator.push({

                component: Base,
            }
            );

            // }else if(cardData.url == '基酒'){
            // 	<Base />
            // }else{
            // 	alert('并没有您需要的页面');
            // }
        }
    }
    testInputSearch() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                component: SearchContainer,
            }
            );


        });

    }
    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }
    render() {
        const {Home, dispatch} = this.props;
        
        return (
            <View style={styles.container}>


                <View style={{ height: Platform.OS === 'ios' ? 20 : 0, backgroundColor: 'blue' }} />
               
                        <ScrollView style={styles.sr}>

                            {/**顶部轮播图 */}
                            <Swiper style={styles.wrapperTop}
                                showsButtons={false}
                                autoplay={true}
                                height={140}
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
                            {/**搜索条 */}
                            <View style={styles.searchBox}>
                                {/**搜索图标 */}

                                <Image source={require("../image/search.png")} style={styles.searchIcon} />

                                {/**输入框 
                            //    underlineColorAndroid='transparent'
                                //    keyboardType='web-search'
                                //    placeholder='多款基酒任你选' 
                        */}
                                <Text style={styles.inputText} onPress={() => this.testInputSearch()}>
                                </Text>
                            </View>
                            {/**消息按钮 */}
                            <Image source={require("../image/bugcomit.png")} style={styles.scanIcon} />
                            {/**icon点击 */}

                            <IconCell onSelect1={(urlStr) => this.imageclick(urlStr)} />

                            {/**分割线 */}
                            <View style={{ height: 8, backgroundColor: '#F2F2F2', top: 70 }} />

                            {/**中间垂直轮播 */}
                            <View style={styles.containerCenter}>
                                <Text>基酒快报</Text>

                                <View style={styles.container}>

                                    <ScrollView
                                        ref="scrollView"
                                        horizontal={false}
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled={true}
                                        onMomentumScrollEnd={(scrollView) => this.onAnimationEnd(scrollView)}

                                        >
                                        {this._renderAllImage()}
                                    </ScrollView>
                                    </View>
                            </View>
                            {/**分割线 */}
                            <View style={{ height: 8, backgroundColor: '#F2F2F2', top: 70 }} />

                            {/**中间广告位 */}
                            <Image source={require("../image/adv.jpg")} style={styles.advIcon} />

                            {/**底端选项卡 */}
                            <ListTBR />
                        </ScrollView>

            
             
            </View>



        );
    }

    infoNet(){

     console.log("111111")
      const { dispatch} = this.props;
        dispatch(NetInfoContentNo());
    }

/**
     * 演染图片
     * @returns {Array}
     * @private
     */
    _renderAllImage() {
        var imgArr = [];
        var imgData = jsonData.data;
        for (var i in imgData) {
            if (imgData[i].title.length > 3) {
                imgData[i].title = imgData[i].title.substr(0, 3) + '...'
            }
            imgArr.push(
                <Text
                    key={i}
                    source={{ uri: imgData[i].title }}
                    style={{ width: Common.window.width, height: 25, marginLeft: 10 }}
                    >
                    {imgData[i].title}
                </Text>
            )
        }
        return imgArr;
    }
     /**
     * 渲染圆点指示器
     * @private
     */
    _renderCircleIndicator() {

        var circleArr = [];
        var imgData = this.props.imgData;
        var style;
        for (var i in imgData) {
            style = i == this.state.currentPage ? { color: 'orange' } : { color: 'white' };
            circleArr.push(
                <Text key={i} style={[{ fontSize: 25 }, style]}>&bull;</Text>
            );
        }

        return circleArr;
    }
     /**
     * 当一页滑动结束时调用
     * @param scrollView
     */
    onAnimationEnd(scrollView) {

        // 计算一页滑动的偏移量
        var offSetY = scrollView.nativeEvent.contentOffset.y;
        // 算出当前为第几页
        var currentPage = Math.floor((offSetY / 25));
        this.setState({
            currentPage: currentPage
        });
    }
      /**
     * 开启定时器
     * @private
     */
    _startTimer() {
        
        const {Home} = this.props;
        scrollView = this.refs.scrollView;
        var imgCount = jsonData.data.length;

        this.interval = setInterval(() => {

            //记录当前正在活动的图片
            var activePage = 0;

            if ((this.state.currentPage + 1) >= imgCount) { //防止越界
                activePage = 0;
            } else {
                activePage = this.state.currentPage + 1;
            }

            this.setState({
                currentPage: activePage
            });

            //让ScrollView动起来
            var offSetY = activePage * 25;
                
                scrollView.scrollResponderScrollTo({ x: 0, y: offSetY, animated: true })

            

        }, this.state.duration);

    }

};


var styles = StyleSheet.create({
    container1: {
        marginTop: Platform.OS == 'ios' ? 0 : 0
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
        height: 20,
        top: 70,
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
        height: 160,
        width: SCWidth,
        top: 70,
    },
   
    circleContainer: {
        width: Common.window.width,
        height: 25,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,0.4)',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0
    },
    
});

export default Home;