/**
 * Created by shaotingzhou on 2016/12/7.
 */
/**
 *  企业认证页面
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
    Dimensions,
    Alert,
    InteractionManager,
    NetInfo
} from 'react-native';
import NetNetwork from './NetNetwork'
import  NavigatorBar from '../Main/NXNavigationBar';  //NavigationBar
import  TextTextInput from './Text+TextInput'; //企业的文字信息模块
import  TextImage from './Text+Image' //企业的图片信息模块
import  ImagePicker from 'react-native-image-picker'; //第三方相机
import  CommitHint from './CommitHint'; //提交审核提示界面
import Toast from 'react-native-root-toast';
import  Lightbox from 'react-native-lightbox';   //点击图片放大第三方
// import  Carousel from 'react-native-looped-carousel'  //点击图片放大居中
import  TextTextImage from './Text+Text+Image';  //供应发布页面的下方
import  Disclaimer from './DisclaimerFile' //基酒细则
var Width = Dimensions.get('window').width; //屏宽
var Height = Dimensions.get('window').height; //屏高
var personIDDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//身份证datasource
var licenceDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//生产许可证datasource
var businessDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//营业执照datasource
var revenueDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//税务登记证datasource
var organizerDS = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//组织机构代码证datasource

var personIDimgAry = []  //身份证图片DS
var licenceimgAry = []  //许可证图片DS
var businessimgAry = []  //营业执照图片DS
var revenueimgAry = []  //税务登记证图片DS
var organizerimgAry = []  //组织机构代码证图片DS
var cols = 2; //一行几个cell
var cellWH = 150; //cell的宽高
var vMargin = (Width - cellWH * cols)/ (cols + 1); //cell之间的边距
var hMargin = 20;
var companyValue = ''  //公司名称值
var personValue = ''  //法人代表值
var personIDValue = ''  //身份证值
var linkPersonValue = ''  //联系人值
var departmentValue = ''  //所在部门值
var telValue = ''  //联系电话
var addressValue = ''  //公司地址
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

class CompanyCertification extends  React.Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isConnected:null,
            personIDWidth:0,
            personImgWidth:0,
            telWidth:0,
            agreeImg:'unchecked',
            commitColor:'#0080ff50',
            textColor:'#ffffff50',
            personIDDataSource:personIDDS.cloneWithRows(personIDimgAry),
            licenceDataSource:licenceDS.cloneWithRows(licenceimgAry),
            businessDataSource:businessDS.cloneWithRows(businessimgAry),
            revenueDataSource:revenueDS.cloneWithRows(revenueimgAry),
            organizerDataSource:organizerDS.cloneWithRows(organizerimgAry),

        };
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
                    <NavigatorBar title='企业认证' widthWH={Platform.OS == 'ios' ? 15 : 15} leftBtnName='back'
                                  rightBtnName='Share_icon' leftpress={() => this.leftAction()}
                                  rightPress={() => this.rightAction()}/>
                    <ScrollView style={styles.scrollView}>
                        <View style={styles.container}>
                            {/*NavigatorBar*/}
                            {/*企业的文字信息模块*/}
                            <TextTextInput ref='company'
                                           leftValue='公司名称:'
                                           rightValue=''
                                           placeholder='请填写企业名称'
                                           keyboardType='default'
                                           defaultValue=''
                                           defaultValueColor={'black'}
                                           onFocus={() => this.onFocusText()}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(companyValue = e)}
                                           myBorderWidth={0}
                                           myBorderColor='red'
                            />
                            <TextTextInput ref='person'
                                           leftValue='法人代表:'
                                           rightValue=''
                                           placeholder='请填写法人名字'
                                           keyboardType='default'
                                           defaultValue=''
                                           defaultValueColor={'black'}
                                           onFocus={() => this.onFocusText()}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(personValue = e)}
                                           myBorderWidth={0}
                                           myBorderColor='red'
                            />
                            <TextTextInput ref='personIDValue'
                                           leftValue='身份证号:'
                                           rightValue=''
                                           placeholder='请填写法人身份证'
                                           keyboardType='number-pad'
                                           defaultValue=''
                                           defaultValueColor={'black'}
                                           onFocus={() => this.onFocusText()}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(personIDValue = e)}
                                           myBorderWidth={this.state.personIDWidth}
                                           myBorderColor='red'
                            />
                            <TextTextImage ref="personID"
                                           leftValue='身份证照:   '
                                           rightValue='请上传法人身份证照(正反照)'
                                           textColor='#CDCDC1'
                                           cameraAction={(e) => this.cameraAction('personID')}
                                           myBorderWidth={this.state.personImgWidth}
                                           myBorderColor='red'
                            />
                            {/*上传的image*/}
                            <ListView
                                dataSource={this.state.personIDDataSource}
                                renderRow={this.personIDRenderRow}
                                contentContainerStyle={styles.listViewStyle}
                                enableEmptySections={true}  //去除警告
                            />
                            <TextTextInput leftValue='联系人:'
                                           rightValue=''
                                           placeholder='请填写业务负责人姓名'
                                           keyboardType='default'
                                           defaultValue=''
                                           defaultValueColor={'black'}
                                           onFocus={() => this.onFocusText()}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(linkPersonValue = e)}
                                           myBorderWidth={0}
                                           myBorderColor='red'

                            />
                            <TextTextInput leftValue='所在部门:'
                                           rightValue=''
                                           placeholder='请填写业务负责人所在部门'
                                           keyboardType='default'
                                           defaultValue=''
                                           defaultValueColor={'black'}
                                           onFocus={() => this.onFocusText()}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(departmentValue = e)}
                                           myBorderWidth={0}
                                           myBorderColor='red'
                            />
                            <TextTextInput leftValue='联系电话:'
                                           rightValue=''
                                           placeholder='请填写业务联系人手机号或固号'
                                           keyboardType='numeric'
                                           defaultValue=''
                                           defaultValueColor={'black'}
                                           onFocus={() => this.onFocusText()}
                                           editable={true}
                                           onChangeText={(e) => this.changeValueAction(telValue = e)}
                                           myBorderWidth={this.state.telWidth}
                                           myBorderColor='red'
                            />
                            <TextTextInput leftValue='公司地址:'
                                           rightValue=''
                                           placeholder='请填写公司所在地址'
                                           keyboardType='default'
                                           defaultValue=''
                                           defaultValueColor={'black'}
                                           onFocus={() => this.onFocusText()} editable={true}
                                           onChangeText={(e) => this.changeValueAction(addressValue = e)}
                                           myBorderWidth={0}
                                           myBorderColor='red'
                            />
                            {/*分割view*/}
                            <View style={{height: 8, backgroundColor: '#f5f5f5'}}></View>
                            {/*企业的图片信息模块*/}
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
                            {/*底部的view*/}
                            <View style={{backgroundColor: '#f5f5f5'}}>
                                <View style={styles.bottomAgreeView}>
                                    <TouchableOpacity onPress={() => this.agreeAction()}>
                                        <Image source={{uri: this.state.agreeImg}} style={styles.agreeImg}/>
                                    </TouchableOpacity>
                                    <Text style={{marginLeft: 4}}>同意</Text>
                                    <TouchableOpacity onPress={() => this.goDisclaimerFile()}>
                                        <Text
                                            style={{color: '#0080ff', textDecorationLine: 'underline'}}>基酒认证管理细则</Text>
                                    </TouchableOpacity>

                                </View>

                                <TouchableOpacity onPress={() => this.commitAction()} activeOpacity={1}>
                                    <View style={[styles.bottombtnView, {backgroundColor: this.state.commitColor}]}>
                                        <Text style={{color: this.state.textColor}}>提交审核</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </ScrollView>
                </View>

            )
        }
    }
    /*
     *
     *   基酒细则
     *   @param
     *   @returns
     * */
    goDisclaimerFile = () =>{
        InteractionManager.runAfterInteractions(()=>{
            this.props.navigator.push(
                {
                    name:'Disclaimer',
                    component: Disclaimer,
                }
            );
        })
    }
    /*
     *
     *   身份证图片的布局
     *   @param
     *   @returns
     * */
    personIDRenderRow =(rowData, sectionID, rowID)=>{
        return(
            <View  style={styles.innerViewStyle}>
                <Lightbox springConfig={{tension: 15, friction: 7}}
                          swipeToDismiss={true} renderContent={()=>this.renderCarousel(rowData)}>
                    <Image source={{uri:rowData}} style={styles.imageStyle}/>
                </Lightbox>
                <TouchableOpacity onPress={()=> this.deleteImage(rowID,'personID')}
                                  style={{width:20,height:20,top:-150,left:130}}>
                    <Image  source={{uri: 'delete'}} style={{width:20,height:20}}/>
                </TouchableOpacity>
            </View>

        )
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
                <TouchableOpacity onPress={()=> this.deleteImage(rowID,'licence')}
                                  style={{width:20,height:20,top:-150,left:130}}>
                    <Image source={{uri: 'delete'}} style={{width:20,height:20}}/>
                </TouchableOpacity>
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
                <TouchableOpacity onPress={()=> this.deleteImage(rowID,'business')}
                                  style={{width:20,height:20,top:-150,left:130}}>
                    <Image  source={{uri: 'delete'}} style={{width:20,height:20}}/>
                </TouchableOpacity>
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
                <TouchableOpacity onPress={()=> this.deleteImage(rowID,'revenue')}
                                  style={{width:20,height:20,top:-150,left:130}}>
                    <Image  source={{uri: 'delete'}} style={{width:20,height:20}}/>
                </TouchableOpacity>
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
                          swipeToDismiss={true}
                          renderContent={()=>this.renderCarousel(rowData)}>
                    <Image source={{uri:rowData}} style={styles.imageStyle}/>
                </Lightbox>
                <TouchableOpacity onPress={()=> this.deleteImage(rowID,'organizer')}
                                  style={{width:20,height:20,top:-150,left:130}}>
                    <Image source={{uri: 'delete'}} style={{width:20,height:20}}/>
                </TouchableOpacity>
            </View>

        )
    }
    /*
     *  navigationBar左边按钮点击事件
     *   @param 无
     *   @returns 无
     * */
    leftAction = () =>{
        this.props.navigator.pop({

        })
    }
    rightAction(){

    }
    /*
     *
     *   删除图片
     *   @param
     *   @returns
     * */
    deleteImage = (rowID,tag) =>{

        Alert.alert(
            '您确定删除图片吗?',
            null,
            [
                {text: '取消', onPress: () => console.log('取消了提交')},
                {text: '确认', onPress: () => {
                    if(tag == 'personID'){
                        delete personIDimgAry[rowID];
                        personIDimgAry.pop()
                        this.setState({
                            personIDDataSource:personIDDS.cloneWithRows(personIDimgAry)
                        })
                    }else if (tag == 'licence'){
                        delete licenceimgAry[rowID];
                        licenceimgAry.pop()
                        this.setState({
                            licenceDataSource:licenceDS.cloneWithRows(licenceimgAry)
                        })
                    }else if (tag == 'business'){
                        delete businessimgAry[rowID];
                        businessimgAry.pop()
                        this.setState({
                            businessDataSource:businessDS.cloneWithRows(businessimgAry)
                        })
                    }else if (tag == 'revenue'){
                        delete revenueimgAry[rowID];
                        revenueimgAry.pop()
                        this.setState({
                            revenueDataSource:revenueDS.cloneWithRows(revenueimgAry)
                        })
                    }else{
                        delete organizerimgAry[rowID];
                        organizerimgAry.pop()
                        this.setState({
                            organizerDataSource:organizerDS.cloneWithRows(organizerimgAry)
                        })
                    }
                    this.checkout()
                }},
            ]
        )





    }
    /*
     *
     *   相机点击事件
     *   @param
     *   @returns
     * */
    cameraAction = (e) =>{
        this.setState({personImgWidth:0})
        ImagePicker.showImagePicker(photoOptions,(response) =>{
            if(response.error != undefined){
                this.toast('若想使用相机&相册功能,请在iPhone的设置--基酒在线--开启相应访问权限')
            }else {

                if (response.didCancel) {
                    return
                } else {
                    if (e == 'personID') {
                        if (personIDimgAry.length <= 1) {  //图片等于2张,不再修改dataSource
                            personIDimgAry.push(response.uri)
                            this.setState({
                                personIDDataSource: personIDDS.cloneWithRows(personIDimgAry)
                            })
                        }
                    } else if (e == 'licence') {
                        if (licenceimgAry.length <= 7) {  //图片等于8张,不再修改dataSource
                            licenceimgAry.push(response.uri)
                            this.setState({
                                licenceDataSource: licenceDS.cloneWithRows(licenceimgAry)
                            })
                        }
                    } else if (e == 'business') {
                        if (businessimgAry.length <= 7) {  //图片等于8张,不再修改dataSource
                            businessimgAry.push(response.uri)
                            this.setState({
                                businessDataSource: businessDS.cloneWithRows(businessimgAry)
                            })
                        }
                    } else if (e == 'revenue') {
                        if (revenueimgAry.length <= 7) {  //图片等于8张,不再修改dataSource
                            revenueimgAry.push(response.uri)
                            this.setState({
                                revenueDataSource: revenueDS.cloneWithRows(revenueimgAry)
                            })
                        }
                    } else {
                        if (organizerimgAry.length <= 7) {  //图片等于8张,不再修改dataSource
                            organizerimgAry.push(response.uri)
                            this.setState({
                                organizerDataSource: organizerDS.cloneWithRows(organizerimgAry)
                            })
                        }
                    }
                    this.checkout()

                }
            }
        })
    }
    /*
     *  点击同意按钮事件
     *   @param 无
     *   @returns 无
     * */
    agreeAction = () =>{
        if (this.state.agreeImg == 'checked'){
            this.setState({
                agreeImg:'unchecked'
            })
        }else{
            this.setState({
                agreeImg:'checked'
            })
        }
    }
    /*
     *  点击提交审核按钮事件
     *   @param 无
     *   @returns 无
     * */
    commitAction = () =>{
        //判断数据必填性
        //提交按钮为红色方可继续
        //判断颜色
        if(this.state.commitColor == '#0080ff'){
            //判断同意按钮
            if(this.state.agreeImg == 'unchecked'){
                this.toast('请勾线同意基酒认证细则')
            }else{
                //判断身份证
                var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/; // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
                if(reg.test(personIDValue) === false){
                    this.toast('请填写正确的身份证号')
                    this.setState({personIDWidth:1})
                }else{
                    //判断身份证照张数
                    if(personIDimgAry.length != 2){
                        this.toast('请上传2张法人身份证照(正反照)')
                        this.setState({personImgWidth:1})
                    }else{
                        //判断手机号
                        if(telValue.length > 0 && telValue.length <= 11){
                            this.netWorkYesOrNo();
                            if(this.state.isConnected == true){
                                this.props.navigator.push(
                                    {
                                        name:'CompanyCertificationCommitHint',
                                        component: CommitHint,
                                    }
                                );
                            }
                        }else {
                            this.toast('请填写正确的联系电话')
                            this.setState({telWidth:1})

                        }
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
    onFocusText () {
        this.setState({
            personIDWidth:0,
            telWidth:0
        })
    }

    /*
     *
     *   校验输入值是否合法
     *   @param
     *   @returns
     * */
    checkout = () =>{
        if(companyValue.replace(/\s+/g,"").length > 0 && personValue.replace(/\s+/g,"").length > 0 && personIDValue.replace(/\s+/g,"").length > 0 && personIDimgAry.length > 0 && linkPersonValue.replace(/\s+/g,"").length > 0 && departmentValue.replace(/\s+/g,"").length > 0 && telValue.replace(/\s+/g,"").length > 0 && addressValue.replace(/\s+/g,"").length > 0 && licenceimgAry.length > 0 && businessimgAry.length > 0 && revenueimgAry.length > 0 && organizerimgAry.length > 0){
            this.setState({
                commitColor:'#0080ff',
                textColor:'#ffffff'
            })
        }else{
            this.setState({
                commitColor:'#0080ff50',
                textColor:'#ffffff50'
            })
        }
    }
    recoverUI = ()=>{
        //进入之前恢复相片选择
        personIDimgAry = []  //身份证图片DS
        licenceimgAry = []  //许可证图片DS
        businessimgAry = []  //营业执照图片DS
        revenueimgAry = []  //税务登记证图片DS
        organizerimgAry = []  //组织机构代码证图片DS
        this.setState({
            personIDDataSource:personIDDS.cloneWithRows(personIDimgAry),
            licenceDataSource:licenceDS.cloneWithRows(licenceimgAry),
            businessDataSource:businessDS.cloneWithRows(businessimgAry),
            revenueDataSource:revenueDS.cloneWithRows(revenueimgAry),
            organizerDataSource:organizerDS.cloneWithRows(organizerimgAry),

        })
    }
    componentWillMount() {
        this.recoverUI();
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
        this.recoverUI();
        this.setState({
            commitColor:'#0080ff50',
            textColor:'#ffffff50'
        })
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
    //外部view
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    //同意按钮
    agreeImg: {
        width:12,
        height:12,
        marginLeft:10
    },
    //同意按钮 + 细则
    bottomAgreeView:{
        flexDirection:'row',
        alignItems:'center',
        marginTop:10
    },
    //提交审核外部的view
    bottombtnView:{
        marginTop:15,
        marginLeft:10,
        marginRight:10,
        marginBottom:15,
        height:45,
        borderRadius:2.5,
        justifyContent:'center',
        alignItems:'center'
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
    scrollView:{
        height: Platform.OS == 'ios' ? Height-64 : Height-44,
        backgroundColor:'white'
    },
});

module.exports = CompanyCertification;
