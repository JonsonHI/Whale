/**
 *基酒
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
    ScrollView,
    Navigator,
    Animated,
    Alert,
    TouchableHighlight,
    InteractionManager,
    ActivityIndicator,
    NetInfo,
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var screenHeight = Dimensions.get('window').height;//屏高
var CommentCell = require('./BaseCommentCell');//封装的Cell
var BaseDetail = require('./BaseDetail');//详情界面de
var AllState = require('../Mine/AllState');
var wineJson = require('./Wine.json');
var wineJson3 = require('./Wine3.json');
var wineJson1 = require('./Wine1.json');
var wineJson5 = require('./Wine1.json');
import Drawer from './Drawers';
import Modal from 'react-native-root-modal';
import {SwRefreshListView, RefreshStatus, LoadMoreStatus} from 'react-native-swRefresh';
var Basecontrol = require('./Basecotrol');
var LIST_VIEW = "listview";
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
var dsAry = [];
var Base = React.createClass({

    getInitialState() {
        return {
            isCollect: true,
            //默认选中上架时间
            selectItem: 0,
            show: false,
            dataSource: ds.cloneWithRows(dsAry),
            //model属性
            visible: false,
            scale: new Animated.Value(1),
            x: new Animated.Value(0),
            isShow:true,
            //timeIcon:require('../image/down.jpg')  ,//上架时间默认图片
            timeIcon:{uri:'order_down'}  ,//上架时间默认图片
            priceIcon:{uri:'order_grey'},//价格默认图片
            yearIcon:{uri:'order_grey'},//年份默认图片
            timeState:true,//上架时间默认状态
            priceState:false,//价格默认状态
            yearState:false,//年份默认时间
            modalVisible:true,//正在加载中..默认状态
            isConnected:null,//判断网络状态
        }
    },
    setParentState(args) {
        this.props.setParentState(args)
    },

    //打开model
    slideModal() {
        this.state.x.setValue(screenWidth);
        this.state.scale.setValue(1);
        Animated.timing(this.state.x, {
            toValue: 0
        }).start();
        this.setState({
            visible: true
        });
    },
    //关闭model
    hideModal  (){
            this.state.x.setValue(0);
            this.state.scale.setValue(1);
            Animated.timing(this.state.x, {
                toValue: screenWidth
            }).start(() => {
                this.setState({
                    visible: false
                });
            });
    },
    componentDidMount(){
        //设置监听是否有网络
        Platform.OS === 'ios'?
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        )
            :
            NetInfo.isConnected.fetch().done((isConnected) => {
                if(isConnected == true){
                    this.setState({
                        isConnected:true
                    })
                    this.fristNetWork()
                }else if (isConnected == false){
                    this.setState({
                        isConnected:false
                    })
                }
            });

    },
    //监听改变后的网络状态
    _handleConnectivityChange(isConnected) {
        console.debug(isConnected)
        this.setState({
            isConnected: isConnected,
        })
        //移除监听
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
        this.fristNetWork()
    },
    //重新加载
    reloadData(){
        Platform.OS === 'ios' ?
        NetInfo.isConnected.addEventListener(
            'change',
            this._handleConnectivityChange
        )
            :
            NetInfo.isConnected.fetch().done((isConnected) => {
                if(isConnected == true){
                    this.setState({
                        isConnected:true
                    })
                    this.fristNetWork()
                }else if (isConnected == false){
                    this.setState({
                        isConnected:false
                    })
                }
            });

    },
    componentWillMount() {
        InteractionManager.runAfterInteractions(() => {
                this.fristNetWork();
            });
    },
    fristNetWork(){
        let url = 'http://rap.taobao.org/mockjsdata/11194/down'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    dsAry = responseData.data
                    this.setState({
                        dataSource: ds.cloneWithRows(dsAry),
                        modalVisible:false,
                    })
                }
            }).catch((error) => {
            this.setState({
                modalVisible:false
            })
            console.debug('基酒页面获取数据失败+Base.js')
        })
    },
    render() {
        if (this.state.isConnected == false) {
            return (
                <View>
                    <NavigatorBar title='供应大厅' widthWH={Platform.OS == 'ios' ? 25 : 25} leftBtnName='return_icon' rightBtnName='Share_icon' leftpress={() => this.leftAction()} rightPress={() => this.rightAction()} />
                    <AllState type='nonetwork'  reloadData={() => this.reloadData()}/>
                </View>
            );
        }
        return (
            <View style={styles.container}>
                <NavigatorBar title='供应大厅' widthWH={Platform.OS == 'ios' ? 25 : 25} leftBtnName='return_icon' rightBtnName='Share_icon' leftpress={() => this.leftAction()} rightPress={() => this.rightAction()} />
                {/**包含上架时间,价格,年份,筛选的view*/}
                <View style={styles.choose}>
                    {/**上架时间的view*/}
                        <View style={styles.chooseChildView}>
                        {/**上架时间的text*/}
                            <Text onPress={() => this.putawayAction()} style={[styles.chooseStyle, { color: this.state.selectItem == 0 ? '#0080ff' : '#999999' }]}>
                                上架时间
                            </Text>
                            <Image source={this.state.timeIcon} style={{width:8,height:8,marginLeft:4}}/>
                        </View>
                    {/**价格的view*/}
                        <View style={styles.chooseChildView}>
                            {/**价格的text*/}
                            <Text onPress={() => this.priceAction()} style={[styles.chooseStyle, { color: this.state.selectItem == 1 ? '#0080ff' : '#999999' }]}>
                                价格
                            </Text>
                            <Image source={this.state.priceIcon} style={{width:8,height:8,marginLeft:4}}/>
                        </View>
                    {/**年份的view*/}
                        <View style={styles.chooseChildView}>
                        {/**年份的text*/}
                            <Text onPress={() => this.yearAction()} style={[styles.chooseStyle, { color: this.state.selectItem == 2 ? '#0080ff' : '#999999' }]}>
                                年份
                            </Text>
                            <Image source={this.state.yearIcon} style={{width:8,height:8,marginLeft:4}}/>
                        </View>
                    {/**筛选的view*/}
                    <View>
                        {/**筛选的text*/}
                        <Text
                            style={[styles.chooseStyle, { color: '#666666',marginRight:10}]}
                            onPress={() => this.slideModal()}
                        >
                            丨  筛选
                        </Text>
                        {/*侧滑*/}
                        <Animated.Modal
                            visible={this.state.visible}
                            style={[styles.modal, {
                                transform: [
                                    {
                                        scale: this.state.scale
                                    },
                                    {
                                        translateX: this.state.x
                                    }
                                ]
                            }]}
                        >
                            <View style={{flex:1,flexDirection:'row'}}>
                                <TouchableOpacity onPress={() => this.hideModal()}>
                                    <View style={{opacity:0.5,backgroundColor:'black',width:screenWidth/5,height:screenHeight}} />
                                </TouchableOpacity>
                                <View style={{width:screenWidth*4/5,backgroundColor:'white'}}>
                                    <Basecontrol
                                        colse ={()=> this.hideModal()}
                                        requestData = {()=> this.filtrate()}
                                    />
                                </View>
                            </View>
                        </Animated.Modal>
                    </View>
                </View>
                {/*判断是上架时间,价格,年份然后显示相应的内容*/}
                <SwRefreshListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    enableEmptySections={true}
                    ref="listView"
                    onRefresh={this.onListRefersh}
                    onLoadMore={this.onLoadMore}
                    pusuToLoadMoreTitle=""
                    loadingTitle="正在加载"
                    noMoreDataTitle="无更多数据"
                    isShowLoadMore={this.state.isShow}
                    customRefreshView={(refresStatus,offsetY)=>this.coustom(refresStatus,offsetY)}
                    customRefreshViewHeight={70}
                />
                {/*正在加载中...*/}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setState({modalVisible:true})}}
                >
                    <View style={{backgroundColor:'white',width:200,height:64,borderRadius:10}}>
                        <Text style={{backgroundColor:'white',width:200,height:20,textAlign:'center',marginTop:22}}>
                            正在加载中...
                        </Text>
                    </View>
                </Modal>
            </View>
        );
    },
    coustom(refresStatus,offsetY){
        if(refresStatus =='2'){
            return(
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',height:70}}>
                    <ActivityIndicator style={{marginRight:10}}>
                    </ActivityIndicator>
                    <Text>正在刷新</Text>
                </View>
            )
        }else if(refresStatus == '0'){
            return(
                <View style={{alignItems:'center',justifyContent:'center',height:70}}>
                    <Text>下拉刷新</Text>
                </View>
            )
        }else if(refresStatus == '1'){
            return(
                <View style={{alignItems:'center',justifyContent:'center',height:70}}>
                    <Text>松开刷新</Text>
                </View>
            )
        }
    },
    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={() => this.detailsAction()}>
                <CommentCell
                    wineTitle={rowData.wineType}
                    amount={rowData.amount}
                    price={rowData.price}
                    producingArea={rowData.producingArea}
                    time={rowData.time}
                    vintage={rowData.year}
                />
            </TouchableOpacity>
        );
    },
    onListRefersh(end){
        //根据选中的哪个区刷新对应的界面
        if(this.state.selectItem == 0){
            let timer =  setTimeout(()=>{
                clearTimeout(timer)
                end()//刷新成功后需要调用end结束刷新
                // this.refs.listView.endRefresh() //建议使用end() 当然 这个可以在任何地方使用
            },1000)
            this.refs.listView.resetStatus()//重置上拉加载的状态
        }else if(this.state.selectItem == 1){
            let timer =  setTimeout(()=>{
                clearTimeout(timer)
                end()
            },1000)
            this.refs.listView.resetStatus()
        }else if(this.state.selectItem == 2){
            let timer =  setTimeout(()=>{
                clearTimeout(timer)
                end()
            },1000)
            this.refs.listView.resetStatus()
        }
    },
    onLoadMore(end){
        //根据选中哪个去加载相应界面的数据
        if(this.state.selectItem == 0){
            let timer =  setTimeout(()=>{
                clearTimeout(timer)
                end(1)//加载成功后需要调用end结束刷新
            },1000)
        }else if(this.state.selectItem == 1){
            let timer =  setTimeout(()=>{
                clearTimeout(timer)
                end(1)//加载成功后需要调用end结束刷新

            },1000)
        }else if(this.state.selectItem == 2){
            let timer =  setTimeout(()=>{
                clearTimeout(timer)
                end(1)//加载成功后需要调用end结束刷新

            },1000)
        }

    },
    //升序数据
    upAction(){
        let url = 'http://rap.taobao.org/mockjsdata/11194/up'
        fetch(url, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    this.setState({
                        dataSource: ds.cloneWithRows(responseData.data),
                    })
                }

            }).catch((error) => {
            console.debug('获取上架时间错误base.js')
        })
    },
    //降序数据
    downAction(){
        let url = 'http://rap.taobao.org/mockjsdata/11194/down'
        fetch(url, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    this.setState({
                        dataSource: ds.cloneWithRows(responseData.data),
                    })
                }
            }).catch((error) => {
            console.debug('获取上架时间错误base.js')
        })
    },
    //筛选请求数据
    filtrate(){
        var chooseAry = []
        var minNum = global.minNumber
        var maxNum = global.maxNumber
        chooseAry = global.dataAry
        let url = 'http://rap.taobao.org/mockjsdata/11194/time'
        fetch(url, {
            method: 'POST',
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    this.setState({
                        dataSource: ds.cloneWithRows(responseData.data),
                        selectItem:0,
                        timeIcon:{uri:'order_down'},
                        priceIcon:{uri:'order_grey'},
                        yearIcon:{uri:'order_grey'},
                    })
                }
            }).catch((error) => {
            console.debug('获取上架时间错误base.js')
        })
    },
    //上架时间点击事件
    putawayAction() {
        this.onLoadMore
        //自动刷新
        let timer = setTimeout(()=>{
            clearTimeout(timer)
            this.refs.listView.beginRefresh()
        },100)
        //设置选中状态与其他两个选项的图片
        this.setState({
            selectItem: 0,
            priceIcon:{uri:'order_grey'},
            yearIcon:{uri:'order_grey'},
        })
        //根据状态去改变图片
        if(this.state.timeState){
            this.upAction()
            this.setState({
                timeIcon:{uri:'order_up'},
                timeState:!this.state.timeState
            })
        }else {
            this.downAction()
            this.setState({
                timeIcon:{uri:'order_down'},
                timeState:!this.state.timeState
            })
        }
        //设置其他两个选项状态
        this.setState({
            priceState:false,
            yearState:false
        })
    },
    //价格点击事件
    priceAction() {
        this.onLoadMore
        //自动刷新
        let timer = setTimeout(()=>{
            clearTimeout(timer)
            this.refs.listView.beginRefresh()
        },100)
        //设置选中状态与其他两个选项的图片
        this.setState({
            selectItem: 1,
            timeIcon:{uri:'order_grey'},
            yearIcon:{uri:'order_grey'},
        })

        //根据状态去修改图片
        if(this.state.priceState){
            this.upAction()
            this.setState({
                priceIcon:{uri:'order_up'},
                priceState:!this.state.priceState
            })
        }else {
            this.downAction()
            this.setState({
                priceIcon:{uri:'order_down'},
                priceState:!this.state.priceState
            })
        }
        //设置其他两个选项状态
        this.setState({
            timeState:false,
            yearState:false
        })
    },
    //年份点击事件
    yearAction() {
        this.onLoadMore
        //自动刷新
        let timer = setTimeout(()=>{
            clearTimeout(timer)
            this.refs.listView.beginRefresh()
        },100)
        //设置选中状态与其他两个选项的图片
        this.setState({
            selectItem: 2,
            timeIcon:{uri:'order_grey'},
            priceIcon:{uri:'order_grey'},
        })
        //根据状态修改图片
        if(this.state.yearState){
            this.upAction()
            this.setState({
                yearIcon:{uri:'order_up'},
                yearState:!this.state.yearState
            })
        }else {
            this.downAction()
            this.setState({
                yearIcon:{uri:'order_down'},
                yearState:!this.state.yearState
            })
        }
        //修改其他两个选项的状态
        this.setState({
            timeState:false,
            priceState:false
        })
    },
    //跳详情界面
    detailsAction() {
        this.props.navigator.push({
            component: BaseDetail,
        })
    },
    leftAction(){

    },
    rightAction(){

    }
});

var styles = StyleSheet.create({
    //最底层的View
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    //顶部包含上架时间,价格,年份,筛选的view
    choose: {
        height:40,
        backgroundColor: '#f4f5f6',
        flexDirection: 'row',
       alignItems:'center',
        justifyContent:'space-between'
    },
    //上架时间(价格,年份,筛选)的view
    chooseChildView: {
        flexDirection: 'row',
        alignItems:'center',

    },
    //上架时间(价格,年份,筛选)的text
    chooseStyle: {
        fontSize: 15,
        textAlign: 'center',
        marginLeft:10,

    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    modal: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        height: 100,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue'
    },
    text: {
        color: '#fff'
    }
});

module.exports = Base;
AppRegistry.registerComponent('Base', () => Base);
