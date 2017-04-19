/**
 * Created by shaotingzhou on 2016/12/6.
 */
/**
 *  发布成功后供应发布信息页面
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
    ScrollView,
    InteractionManager,
    NetInfo
} from 'react-native';
import App from '../App' //APP
import  Carousel from 'react-native-looped-carousel'  //点击图片放大居中
import  Lightbox from 'react-native-lightbox';   //点击图片放大第三方
import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
import  TextImage from './Text+Image' //企业的图片信息模块
import  TextText from './Text+Text'; //企业的文字信息模块
import  CompanyCertication from '../News/CompanyCertification'
import NetNetwork from './NetNetwork'
var licenceDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//生产许可证datasource
var businessDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//营业执照datasource
var revenueDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//税务登记证datasource
var organizerDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//组织机构代码证datasource
var Width = Dimensions.get('window').width; //屏宽
var Height = Dimensions.get('window').height; //屏高
var licenceimgAry = ['https://unsplash.it/600/400/?random']  //许可证图片DS
var businessimgAry = []  //营业执照图片DS
var revenueimgAry = []  //税务登记证图片DS
var organizerimgAry = []  //组织机构代码证图片DS
var cols = 2; //一行几个cell
var cellWH = 150; //cell的宽高
var vMargin = (Width - cellWH * cols)/ (cols + 1); //cell之间的边距
var hMargin = 20;

var photoOptions = {
    //底部弹出框选项
    title:'请选择',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}

class CertificationFail extends  React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isConnected:null,
            licenceDataSource:licenceDS.cloneWithRows(licenceimgAry),
            businessDataSource:businessDS.cloneWithRows(businessimgAry),
            revenueDataSource:revenueDS.cloneWithRows(revenueimgAry),
            organizerDataSource:organizerDS.cloneWithRows(organizerimgAry),
        };
    }
    renderCarousel = (image)=> {
        return (
            <Carousel style={{ width: Width, height: Height }}>
                <Image
                    style={{flex: 1}}
                    resizeMode="contain"
                    source={{ uri: image }}
                />
            </Carousel>
        );
    }
    render () {
        if (this.state.isConnected == false) {
            return (
                <NetNetwork reloadData={() => this.reloadData()}/>
            );
        } else {
            return (
                <View style={styles.container}>
                    {/*navigationBar*/}
                    <NavigatorBar title='供应发布' widthWH={Platform.OS == 'ios' ? 15 : 15} leftBtnName='back'
                                  rightBtnName='Share_icon' leftpress={() => this.leftAction()}
                                  rightPress={() => this.rightAction()}/>
                    <ScrollView style={styles.scrollView}>
                        {/*topView*/}
                        <TextText leftValue='公司名称:'
                                  myOpacity={1}
                                  rightValue='贵州茅台有限公司'
                                  rightColor='#CDC9C9'
                                  modalAction={() => this.modalAction()}
                                  myBorderWidth={0}
                                  myBorderColor='#E0EEEE'
                        />
                        <TextText leftValue='法人代表:'
                                  myOpacity={1}
                                  rightValue='李某某'
                                  rightColor='#CDC9C9'
                                  modalAction={() => this.modalAction()}
                                  myBorderWidth={0}
                                  myBorderColor='#E0EEEE'
                        />
                        <Image source={{uri: 'rejected'}} style={styles.typeStyle}/>
                        <TextText leftValue='身份证号:'
                                  myOpacity={1}
                                  rightValue='500326201711112424'
                                  rightColor='#CDC9C9'
                                  modalAction={() => this.modalAction()}
                                  myBorderWidth={0}
                                  myBorderColor='#E0EEEE'
                        />
                        <TextText leftValue='联系人:'
                                  myOpacity={1}
                                  rightValue='王某某'
                                  rightColor='#CDC9C9'
                                  modalAction={() => this.modalAction()}
                                  myBorderWidth={0}
                                  myBorderColor='#E0EEEE'
                        />
                        <TextText leftValue='所在部门:'
                                  myOpacity={1}
                                  rightValue='市场部'
                                  rightColor='#CDC9C9'
                                  modalAction={() => this.modalAction()}
                                  myBorderWidth={0}
                                  myBorderColor='#E0EEEE'
                        />
                        <TextText leftValue='联系电话:'
                                  myOpacity={1}
                                  rightValue='5621391'
                                  rightColor='#CDC9C9'
                                  modalAction={() => this.modalAction()}
                                  myBorderWidth={0}
                                  myBorderColor='#E0EEEE'
                        />
                        <TextText leftValue='公司地址:'
                                  rightValue='贵州遵义茅台镇'
                                  rightColor='#CDC9C9'
                                  myOpacity={1}
                                  modalAction={() => this.modalAction()}
                                  myBorderWidth={0}
                                  myBorderColor='#E0EEEE'
                        />
                        {/*分割线*/}
                        <View style={{height: 5, backgroundColor: '#E0EEEE'}}></View>
                        {/*bottomView*/}
                        <TextImage name='生产许可证' cameraAction={() => this.cameraAction('licence')} myBorderWidth={0}
                                   myBorderColor='red'/>
                        {/*上传的image*/}
                        <ListView
                            dataSource={this.state.licenceDataSource}
                            renderRow={this.licenceRenderRow}
                            contentContainerStyle={styles.listViewStyle}
                            enableEmptySections={true}  //去除警告
                        />
                        <TextImage name='营业执照 (正/副本)' cameraAction={() => this.cameraAction('business')}
                                   myBorderWidth={0} myBorderColor='red'/>
                        <ListView
                            dataSource={this.state.businessDataSource}
                            renderRow={this.businessIDRenderRow}
                            contentContainerStyle={styles.listViewStyle}
                            enableEmptySections={true}  //去除警告
                        />
                        <TextImage name='税务登记证 (正/副本)' cameraAction={() => this.cameraAction('revenue')}
                                   myBorderWidth={0} myBorderColor='red'/>
                        <ListView
                            dataSource={this.state.revenueDataSource}
                            renderRow={this.revenueRenderRow}
                            contentContainerStyle={styles.listViewStyle}
                            enableEmptySections={true}  //去除警告
                        />
                        <TextImage name='组织机构代码证 (正/副本)' cameraAction={() => this.cameraAction('organizer')}
                                   myBorderWidth={0} myBorderColor='red'/>
                        <ListView
                            dataSource={this.state.organizerDataSource}
                            renderRow={this.organizerRenderRow}
                            contentContainerStyle={styles.listViewStyle}
                            enableEmptySections={true}  //去除警告
                        />
                        {/*原因*/}
                        <Text style={{marginTop: 5, marginBottom: 5}}>原因:</Text>
                        <Text style={{height: 150, marginLeft: 10, marginRight: 10, borderWidth: 1}}>
                            实际资料不符合共产主义精神</Text>
                        <TouchableOpacity onPress={() => this.goCompanyCertication()}>
                            <View style={{
                                margin: 20,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 50,
                                backgroundColor: 'cyan'
                            }}>
                                <Text>重新编辑</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            )
        }
    }
    /*
     *
     *   跳转至企业认证
     *   @param
     *   @returns
     * */
    goCompanyCertication = ()  =>{
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push(
                {
                    name:'CompanyCertication',
                    component: CompanyCertication,
                }
            );
        })
    }
    /*
     *
     *   许可证图片的布局
     *   @param
     *   @returns
     * */
    licenceRenderRow =(rowData, sectionID, rowID)=>{
        return(
            <View  style={styles.innerViewStyle}>
                <Lightbox springConfig={{tension: 15, friction: 7}}
                          swipeToDismiss={true} renderContent={()=>this.renderCarousel(rowData)}>
                    <Image source={{uri:rowData}} style={styles.imageStyle}/>
                </Lightbox>
            </View>
        )
    }
    /*
     *
     *   营业执照图片的布局
     *   @param
     *   @returns
     * */
    businessIDRenderRow =(rowData, sectionID, rowID)=>{
        return(
            <View  style={styles.innerViewStyle}>
                <Lightbox springConfig={{tension: 15, friction: 7}}
                          swipeToDismiss={true} renderContent={()=>this.renderCarousel(rowData)}>
                    <Image source={{uri:rowData}} style={styles.imageStyle}/>
                </Lightbox>
            </View>

        )
    }
    /*
     *
     *   税务登记图片的布局
     *   @param
     *   @returns
     * */
    revenueRenderRow =(rowData, sectionID, rowID)=>{
        return(
            <View  style={styles.innerViewStyle}>
                <Lightbox springConfig={{tension: 15, friction: 7}}
                          swipeToDismiss={true} renderContent={()=>this.renderCarousel(rowData)}>
                    <Image source={{uri:rowData}} style={styles.imageStyle}/>
                </Lightbox>
            </View>

        )
    }
    /*
     *
     *   组织机构代码证图片的布局
     *   @param
     *   @returns
     * */
    organizerRenderRow =(rowData, sectionID, rowID)=>{
        return(
            <View  style={styles.innerViewStyle}>
                <Lightbox springConfig={{tension: 15, friction: 7}}
                          swipeToDismiss={true} renderContent={()=>this.renderCarousel(rowData)}>
                    <Image source={{uri:rowData}} style={styles.imageStyle}/>
                </Lightbox>
            </View>

        )
    }
    /*
     *
     *   占位方法,无实际作用,只是为了去除警告
     *   @param
     *   @returns
     * */
    leftAction = ()=>{
        this.props.navigator.immediatelyResetRouteStack([
            {
                component:App
            }
        ])
    }
    rightAction(){

    }
    //
    modalAction = () =>{

    }
    cameraAction = () =>{

    }

    componentWillMount() {
        this.netWorkYesOrNo()
    }

    /*
     *
     *   有无网络判断
     *   @param
     *   @returns
     * */
    netWorkYesOrNo = ()=>{
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
                }else if (isConnected == false){
                    this.setState({
                        isConnected:false
                    })
                }
            });
    }
    reloadData =() =>{
        this.netWorkYesOrNo();
    }
    /*
     *       收到移除网络状况,有网络把netWorkTag置为true,无网络置为false
     * */
    _handleConnectivityChange=(isConnected) => {
        this.setState({
            isConnected: isConnected,
        })
        NetInfo.isConnected.removeEventListener(
            'change',
            this._handleConnectivityChange
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    scrollView:{
        height: Platform.OS == 'ios' ? Height-64 : Height-44,
        backgroundColor:'white'
    },
    innerViewStyle:{
        width:cellWH,
        height:cellWH,
        marginLeft:vMargin,
        marginTop:hMargin,
        justifyContent:'center',

    },
    imageStyle:{
        width:150,
        height:150
    },
    listViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    typeStyle:{
        width:61,
        height:47,
        marginTop:-20,
        marginBottom:-37,
        marginLeft:Width-60
    }
});

module.exports = CertificationFail;
