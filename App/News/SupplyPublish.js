/**
 * Created by shaotingzhou on 2016/12/9.
 */

/**
 *  供应发布页面
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
    TouchableHighlight,
    Platform,
    AsyncStorage,
    Alert,
    Picker,
    Modal,
    Dimensions,
    ScrollView,
    InteractionManager,
    NetInfo
} from 'react-native';

import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
import  TextText from  './Text+Text'
import  TextTextInput from './Text+TextInput'; //企业的文字信息模块
import  TextTextImage from './Text+Text+Image';  //供应发布页面的下方
import  MaterialSpicker from './MaterialSpicker'  //基酒原料modal
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import  Lightbox from 'react-native-lightbox';   //点击图片放大第三方
// import  Carousel from 'react-native-looped-carousel'  //点击图片放大居中
// import Toast from 'react-native-root-toast';
// import NetNetwork from './NetNetwork'
//
// import  PublishHint from './PublishHint';  //发布成功提示页面
import { DatePicker, DataPicker } from 'rnkit-actionsheet-picker';
var countValue = '';//基酒数量
var priceValue = '';//基酒价格
var yieldlyValue = '';//基酒产区
var deliveryValue = ''; //交割地

var wineTypeAry = ['清香型','酱香型','玫瑰花香型','酒精兑水型','粮食香型','栀子花型','葡萄型','基酒香型'];
var yearAry = ['一年份','二年份','三年份','四年份','五年份','六年份','七年份','八年份'];
var gradeAry = ['特级','优级','上级','中级','普通级','国产类型','进口类型'];
var validAry = ['一个月','二个月','三个月','四个月','五个月','六个月','七个月','八个月','九个月'];


var Width = Dimensions.get('window').width; //屏宽
var Height = Dimensions.get('window').height; //屏高
var imgAry = []
var cols = 2; //一行几个cell
var cellWH = 150; //cell的宽高
var vMargin = (Width - cellWH * cols)/ (cols + 1); //cell之间的边距
var hMargin = 20;
var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//照片datasource

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


class SupplyPublish extends  React.Component {
    // 构造
    constructor(props) {

        super(props);
        // 初始状态
        this.state = {
            countWidth:0,
            priceWidth:0,
            show:false,  //是否显示modal
            wineType:'请选择基酒类型', //基酒类型默认值
            year:'请选择基酒生产年份',
            grade:'请选择基酒等级',
            material:'请选择基酒原料',
            valid:'请选择供应信息显示时间',
            commitBtnColor:'#0080ff50',
            commitTextColor:'#FFFFFF50',
            loginView:'blue',
            isConnected:null,
            dataSource:ds.cloneWithRows(imgAry)
        };

    }

    onWillFocus(){
        alert('sss')
    }
    renderCarousel = (image)=> {
        return (
            <View style={{ width: Width, height: Height }}>
                <Image
                    style={{flex: 1}}
                    resizeMode="contain"
                    source={{ uri: image }}
                />
            </View>
        );
    }
    render () {
        if (this.state.isConnected == false) {
            return (
                <NetNetwork reloadData = {()=>this.reloadData()}/>
            );
        } else {
            return (
                <View>
                    <NavigatorBar title='供应发布' widthWH={Platform.OS == 'ios' ? 15 : 15} leftBtnName='XXXX'
                                  rightBtnName='XXXX' leftpress={() => this.leftAction()}
                                  rightPress={() => this.rightAction()}/>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.container}>
                            {/*navigationBar*/}
                            {/*topView*/}
                            <TextText key='1' ref='wineType'
                                      myOpacity={0.5}
                                      leftValue='基酒香型:'
                                      rightValue={this.state.wineType}
                                      rightColor={this.state.wineType == '请选择基酒类型' ? '#CDC9C9' : 'black'}
                                      modalAction={() => this.openPicker(wineTypeAry, '请选择基酒类型')}
                                      myBorderWidth = {0}
                                      myBorderColor = 'red'
                            />
                            <TextTextInput ref='count'
                                           leftValue='出售数量:'
                                           rightValue='吨'
                                           placeholder='请填写您出售数量'
                                           keyboardType='numeric'
                                           defaultValue={this.state.countValue}
                                           defaultValueColor={this.state.countValue == '请填写您出售数量' ? '#CDC9C9' : 'black'}
                                           onFocus={() => this.onFocusText(this.setState({countValue: ''}))}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(countValue = e)}
                                           myBorderWidth = {this.state.countWidth}
                                           myBorderColor = 'red'
                            />
                            <TextTextInput ref='price'
                                           leftValue='出售价格:'
                                           rightValue='元/吨'
                                           placeholder='请选择您销售价格'
                                           keyboardType='numeric'
                                           defaultValue={this.state.priceValue}
                                           defaultValueColor={this.state.priceValue == '请选择您销售价格' ? '#CDC9C9' : 'black'}
                                           onFocus={() => this.onFocusText(this.setState({priceValue: ''}))}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(priceValue = e)}
                                           myBorderWidth = {this.state.priceWidth}
                                           myBorderColor = 'red'
                            />
                            <TextText ref='year'
                                      myOpacity={0.5}
                                      leftValue='基酒年份:'
                                      rightValue={this.state.year}
                                      rightColor={this.state.year == '请选择基酒生产年份' ? '#CDC9C9' : 'black'}
                                      modalAction={() => this.openPicker(yearAry, '请选择基酒生产年份')}
                                      myBorderWidth = {0}
                                      myBorderColor = 'red'
                            />
                            <TextText ref='grade'
                                      myOpacity={0.5}
                                      leftValue='基酒等级:'
                                      rightValue={this.state.grade}
                                      rightColor={this.state.grade == '请选择基酒等级' ? '#CDC9C9' : 'black'}
                                      modalAction={() => this.openPicker(gradeAry, '请选择基酒等级')}
                                      myBorderWidth = {0}
                                      myBorderColor = 'red'
                            />
                            <TextTextInput ref='yieldly'
                                           leftValue='基酒产区:'
                                           rightValue=''
                                           placeholder='请选择您基酒产区'
                                           keyboardType='default'
                                           defaultValue={this.state.yieldlyValue}
                                           defaultValueColor={this.state.yieldlyValue == '请选择您基酒产区' ? '#CDC9C9' : 'black'}
                                           onFocus={() => this.onFocusText(this.setState({yieldlyValue: ''}))}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(yieldlyValue = e)}
                                           myBorderWidth = {0}
                                           myBorderColor = 'red'
                            />
                            <TextText ref='material'
                                      myOpacity={0.5}
                                      leftValue='基酒原料:'
                                      rightValue={this.state.material}
                                      rightColor={this.state.material == '请选择基酒原料' ? '#CDC9C9' : 'black'}
                                      modalAction={() => this.showModal()}
                                      myBorderWidth = {0}
                                      myBorderColor = 'red'
                            />
                            <TextTextInput ref='delivery'
                                           leftValue='交割地:'
                                           rightValue=''
                                           placeholder='请填写基酒交割地'
                                           keyboardType='default'
                                           defaultValue={this.state.deliveryValue}
                                           defaultValueColor={this.state.deliveryValue == '请填写基酒交割地' ? '#CDC9C9' : 'black'}
                                           onFocus={() => this.onFocusText(this.setState({deliveryValue: ''}))}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(deliveryValue = e)}
                                           myBorderWidth = {0}
                                           myBorderColor = 'red'
                            />
                            <TextText ref='valid'
                                      myOpacity={0.5}
                                      leftValue='有效区:'
                                      rightValue={this.state.valid}
                                      rightColor={this.state.valid == '请选择供应信息显示时间' ? '#CDC9C9' : 'black'}
                                      modalAction={() => this.openPicker(validAry, '请选择供应信息显示时间')}
                                      myBorderWidth = {0}
                                      myBorderColor = 'red'
                            />
                            {/*分割线*/}
                            <View style={{height: 8, backgroundColor: '#f5f5f5'}}></View>
                            {/**/}
                            <TextTextImage
                                leftValue='基酒质检报告:    '
                                rightValue='最多上传8张'
                                textColor='#999999'
                                cameraAction={() => this.cameraAction()}
                                myBorderWidth = {0}
                                myBorderColor = 'red'
                            />
                            <View style={styles.bottomsStyle}>

                                <View style={{marginLeft: 10, marginRight: 10, flexDirection: 'row'}}>
                                    <Text style={{fontSize: 12, color: '#666666'}}>温馨提示:</Text>
                                    <Text style={{fontSize: 12, color: '#999999', marginRight: 10, flex: 1}}>为保护企业相关隐私不被泄露,平台将对质检报告中所涉及的企业名称及部分内容做模糊处理.</Text>
                                </View>
                                {/*images*/}
                                <ListView
                                    dataSource={this.state.dataSource}
                                    renderRow={this.renderRow}
                                    contentContainerStyle={styles.listViewStyle}
                                    enableEmptySections={true}  //去除警告
                                />

                                <TouchableOpacity onPress={()=>this.commitAction()}
                                                  activeOpacity={1}
                                                  style={[styles.commitStyle, {backgroundColor: this.state.commitBtnColor,}]}>
                                    <Text
                                        style={{fontSize: 17, color: this.state.commitTextColor, textAlign: 'center'}}>提交</Text>
                                </TouchableOpacity>
                                {/*原料modal*/}
                                <Modal
                                    animationType='slide'
                                    transparent={true}
                                    visible={this.state.show}
                                    onShow={() => {
                                    }}
                                    onRequestClose={() => {
                                        this.setState({show: false})
                                    }} //去除安卓的警告

                                >
                                    <MaterialSpicker modalHidden={(result) => this.showModal(result)}/>
                                </Modal>

                            </View>
                        </View>
                    </ScrollView>
                </View>
            )
        }

    }
    /*
     *
     *   展示modal
     *   @param
     *   @returns
     * */
    showModal = (result) =>{
        console.log(result)
        if(result == ''){
            result = "请选择基酒原料"
        }
        this.setState({
            show:!this.state.show,
            material:result
        })
    }
    openPicker = (datasource,title) =>{
        //算出中间坐标
        var index  = Math.round(datasource.length/2)
        DataPicker.show({
            titleText:title,    //标题
            dataSource: datasource,   //数据源
            defaultSelected: [datasource[index]],  //默认选中,安卓不可用
            numberOfComponents: 1,    //默认模块的个数
            onPickerConfirm: (selectedData, selectedIndex) => {
                if(title == '请选择基酒类型'){
                    this.setState({
                        wineType:selectedData
                    })
                }else if(title == '请选择基酒生产年份'){
                    this.setState({
                        year:selectedData,
                    })
                }else if(title == '请选择基酒等级'){
                    this.setState({
                        grade:selectedData,
                    })
                }else {
                    this.setState({
                        valid:selectedData,

                    })
                }
            },
            onPickerCancel: () => {
                // alert('取消')
            },
            onPickerDidSelect: (selectedData, selectedIndex) => {
                // alert(selectedData+selectedIndex)
                //该方法安卓不可用
            }
        })
        this.checkout()
    }
    /*
     *
     *   相机之后的图片的布局
     *   @param
     *   @returns
     * */
    renderRow =(rowData, sectionID, rowID)=>{
        return(
            <View  style={styles.innerViewStyle}>
                <Lightbox springConfig={{tension: 15, friction: 7}}
                          swipeToDismiss={true}
                          renderContent={()=>this.renderCarousel(rowData)}>
                    <Image source={{uri:rowData}} style={styles.imageStyle}/>
                </Lightbox>
                <TouchableOpacity onPress={()=> this.deleteImage(rowID)}
                                  style={{width:20,height:20,top:-150,left:130}}>
                    <Image  source={{uri: 'delete'}} style={{width:20,height:20}}/>
                </TouchableOpacity>
            </View>

        )
    }
    /*
     *
     *   删除图片
     *   @param
     *   @returns
     * */
    deleteImage = (rowID) =>{
        Alert.alert(
            '您确定要删除图片吗?',
            null,
            [
                {text: '取消', onPress: () => console.log('取消了提交')},
                {text: '确认', onPress: () => {
                    delete imgAry[rowID];
                    imgAry.pop() //删除数组中最后一个元素
                    this.setState({
                        dataSource:ds.cloneWithRows(imgAry)
                    })
                    this.checkout()
                }},
            ]
        )


    }
    /*
     *
     *   占位方法,无实际作用,只是为了去除警告
     *   @param
     *   @returns
     * */
    leftAction(){

    }
    rightAction(){

    }

    componentWillMount() {
        // this.props.navigator.navigationContext.addListener('willfocus',()=> console.log('这个新的过来都走'));

    }
    /*
     *
     *   提交按钮点击弹出选择框
     *   @param
     *   @returns
     * */
    commitAction =()=>{
        //先检测有无网络
        this.netWorkYesOrNo();
        if(this.state.isConnected == true){ //有网往下走
            if(this.state.commitBtnColor == '#0080ff'){
                //这里再做出售数量+出售价格的校验
                var reg = /^[1-9]*[1-9][0-9]*$/
                if(reg.test(countValue) === false){
                    this.toast('出售数量必须为正整数')
                    this.setState({countWidth:1})
                }if(reg.test(countValue) === true) {
                    if (reg.test(priceValue) === false) {
                        this.toast('出售价格必须为正整数')
                        this.setState({priceWidth: 1})
                    } else {
                        Alert.alert(
                            '您确定要提交信息吗?',
                            null,
                            [
                                {text: '取消', onPress: () => console.log('取消了提交')},
                                {text: '确认', onPress: () => this.pushPublishHint()},
                            ]
                        )
                    }
                }
            }
        }

    }
    /*
     *
     *   toast
     *   @param
     *   @returns
     * */
    toast = (message)=>{
        let toast = Toast.show(message, {
            duration: Toast.durations.SHORT,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
        });
    }
    /*
     *
     *   校验输入值是否合法
     *   @param
     *   @returns
     * */
    checkout = () =>{
        if(this.refs.wineType.props.rightValue != '请选择基酒类型' && countValue.replace(/\s+/g,"").length > 0 && priceValue.replace(/\s+/g,"").length > 0 && this.refs.year.props.rightValue != '请选择基酒生产年份'&&this.refs.grade.props.rightValue != '请选择基酒等级'&& yieldlyValue.replace(/\s+/g,"").length > 0 && (this.state.material != '请选择基酒原料' || this.state.material != '')&& deliveryValue.replace(/\s+/g,"").length > 0&&this.refs.valid.props.rightValue != '请选择供应信息显示时间'&&imgAry.length>0){
            this.setState({
                commitBtnColor:'#0080ff',
                commitTextColor:'#FFFFFF',
            })
        }else {
            this.setState({
                commitBtnColor:'#0080ff50',
                commitTextColor:'#FFFFFF50',
            })
        }
    }
    /*
     *
     *   传递方法到主界面
     *   @param
     *   @returns
     * */
    passMethod = () =>{

    }


    /*
     *
     *   相机点击事件
     *   @param
     *   @returns
     * */
    cameraAction = () =>{
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            console.log(response.error)
            if(response.error != undefined){
                this.toast('若想使用相机&相册功能,请在iPhone的设置--基酒在线--开启相应访问权限')
            }else {
                if (response.didCancel){
                    return
                }else {
                    if(imgAry.length<=7){  //图片等于8张,不再修改dataSource
                        imgAry.push(response.uri)
                        this.setState({
                            dataSource:ds.cloneWithRows(imgAry)
                        })
                        this.checkout()
                    }

                }
            }


        })
    }

    /*
     *
     *   输入值改变,其state值改变
     *   @param
     *   @returns
     * */

    changeValueAction (method){
        {method}
        this.checkout()
    }
    /*
     *
     *   光标切入,去除defaultValue
     *   @param
     *   @returns
     * */
    onFocusText (setState){
        {setState}
        //光标切入,再次恢复
        this.setState({
            countWidth:0,
            priceWidth:0
        })
    }
    /*
     *
     *   push到发布成功提示页面
     *   @param
     *   @returns
     * */
    pushPublishHint =() =>{
        //开始上传图片到后台
        // this.uploadImage(imgAry);
        imgAry = []; //清空数组
        this.setState({
            wineType:'请选择基酒类型',
            year:'请选择基酒生产年份',
            grade:'请选择基酒等级',
            material:'请选择基酒原料',
            valid:'请选择供应信息显示时间',
            countValue:'请填写您出售数量',
            priceValue:'请选择您销售价格',
            yieldlyValue:'请选择您基酒产区',
            deliveryValue:'请填写基酒交割地',
            commitBtnColor:'#0080ff50',
            dataSource:ds.cloneWithRows(imgAry)
        })
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigatorPush.push(
                {
                    name:'NewsPublishHint',
                    component: PublishHint,
                }
            );
        })

    }
    /*
     *
     *   上传图片请求
     *   @param
     *   @returns
     * */

    uploadImage(imgAry) {
        console.log(imgAry)
        let formData = new FormData();
        for(var i = 0;i<imgAry.length;i++){
            let file = {uri: imgAry[i], type: 'multipart/form-data', name: 'image.png'};
            formData.append("files",file);
        }
        fetch('http://192.168.0.183:8080/whale/test/upload_files',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
            },
            body:formData,
        })
            .then((response) => response.text() )
            .then((responseData)=>{

                console.log('responseData',responseData);
            })
            .catch((error)=>{console.error('error',error)});

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
    //外部View
    container: {
        backgroundColor: '#ffffff',
    },
    //底部View
    bottomsStyle:{
        backgroundColor: '#f5f5f5',
        paddingTop:12,
        flexDirection:'column'
    },
    //底部按钮
    bottombtnView:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        height:50,
        borderRadius:4,
        justifyContent:'center',
        alignItems:'center'
    },
    //modal
    modalStyle:{
        marginTop:Height - 200,
        width:Width,
        height:200,
        backgroundColor:'red'
    },
    //左侧文字
    leftTextStyle:{
        width:Width*0.2,
        marginLeft:5
    },
    //中间文字
    centerTextStyle:{
        width:Width*0.6,
    },
    scrollView:{
        height: Platform.OS == 'ios' ? Height-64 : Height-44,
        backgroundColor:'#E0EEEE'
    },
    listViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap'
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
    commitStyle:{
        height:45,
        marginLeft:20,
        marginRight:20,
        borderRadius:2.5,
        marginTop:18,
        alignItems:'center',
        justifyContent:'center'
    }

});

module.exports = SupplyPublish;
