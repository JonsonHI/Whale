 /**
  *我的
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
    Dimensions
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
 var Width = Dimensions.get('window').width; //屏宽
 var Height = Dimensions.get('window').height; //屏宽
 var Base = require('../Base/Base');  //基酒
 var News = require('../News/News');  //发布
 var Collection = require('../Mine/Collection');//收藏
 var Certification = require('../Mine/Certification');//企业认证
 var Feedback = require('../Mine/Feedback');//意见反馈
 var Setting = require('../Mine/Setting');//设置
 //var Message = require('../Mine/Message');//我的消息
import Message from '../Mine/Message';//我的消息
 import XPRecord from '../Mine/XPRecord.js'//我的询盘列表
 import FBRecord from '../Mine/FBRecord.js'//我的发布列表
import Login from '../Account/Login.js'
 import Loan from '../Mine/Loan.js'//我的贷款
 import PersonData from '../Mine/PersonData.js'



 export default class Mine extends Component{

     constructor(props) {
         super(props);
         this.state = {
             isCollect:true,
             Login:true
         };
     }



    render() {
        var isLogin = this.state.Login;
        return (
            <View style={styles.container}>

                <NavigatorBar title='发现' widthWH={Platform.OS == 'ios' ? 20:20}   rightBtnName = 'message_icon'  rightPress={()=>this.rightAction()}/>
                {/*-----上方人物信息-----*/}
                {this._RenderLoginMessage(isLogin)}



                <View style={styles.divide}/>
                {/*-----业务信息-----*/}
                <View style={styles.middle}>
                    {this._renderMiddle({uri:'mymessage'},'我的询盘',XPRecord)}
                    <View style={styles.dividecolumn}/>
                    {this._renderMiddle({uri:'wodefabu'},'我的发布',FBRecord)}
                    <View style={styles.dividecolumn}/>
                    {this._renderMiddle({uri:'collection'},'我的收藏',Collection)}
                </View>

                <View style={styles.divide}/>

                {this._renderItem({uri:'qiye'},'企业认证',Certification,false,'未认证')}

                <View style={styles.divide}/>

                {this._renderItem({uri:'feedback'},'意见反馈',Feedback,true,'')}

                <View style={styles.divide}/>

                {this._renderItem({uri:'setting'},'设置',Setting,true,'')}

                <View style={styles.divide}/>


                {this._renderItem(require('../image/setting.png'),'我的贷款',Loan)}

                <View style={styles.divide}/>
            </View>
        );
    }

    /**
     * 中间部件的item
     * iconName：图标，默认从本地image导入
     * title：标题
     * jump：需要跳转的页面
     */
    _renderMiddle(iconName,title,jump){
        return(
            <TouchableOpacity style={styles.buscontent} onPress={()=>{this._onPress(jump)}}>
                <View  style={styles.busview}>
                    <Image source={(iconName)} style={styles.middleStyle}/>
                    <Text style={styles.middleTextStyles}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }

 //<Text >{judge}</Text>
 //<Image style={styles.arrow} source={{uri:'forward'}}></Image>
    /**
     * 下面部件的item
     * iconName：图标，默认从本地image导入
     * title：标题
     * jump：需要跳转的页面
     */
    _renderItem(iconName,title,jump,judge,text){
        if(judge === true){
            return(
                <TouchableOpacity style={styles.buscontent1} onPress={()=>{this._onPress(jump)}}>
                    <View style={styles.itemcontent}>
                        <Image source={(iconName)} style={styles.itemStyle}/>
                        <Text style={styles.itemtext}>{title}</Text>
                    </View>
                </TouchableOpacity>
            );
        }else {
            return(
                <TouchableOpacity style={styles.buscontent1} onPress={()=>{this._onPress(jump)}}>
                    <View style={styles.itemcontent}>
                        <Image source={(iconName)} style={styles.itemStyle}/>
                        <Text style={styles.itemtext}>{title}</Text>
                        <Text style={styles.judgeStyles}>{text}</Text>
                        <Image style={styles.arrow} source={{uri:'forward'}}/>
                    </View>
                </TouchableOpacity>
            );
        }
    }
    _onPress(jump){
        this.props.navigator.push({
            component: jump,
        });

    }
    /*
     *
     *   去我的消息页面
     *   @param
     *   @returns
     * */

    rightAction(){
        this.props.navigator.push({
            component: Message,
        });
    }


     _RenderLoginMessage(isLogin){
         if(isLogin === false){
             return(
                 <View style={styles.head}>
                     <Image style={styles.headimg} source={require('../image/test_img_head.jpg')}></Image>
                     <TouchableOpacity style={styles.loginStyle} onPress={()=>{this._onPress(Login)}}>
                         <Text style={styles.loginLeft}>请先</Text>
                         <Text style={styles.loginRight}>登录/注册</Text>
                         <Image style={styles.arrow} source={{uri:'forward'}} />
                     </TouchableOpacity>

                 </View>
             );
         }else {
             return(
                 <View style={styles.head}>
                     <Image style={styles.headimg} source={require('../image/test_img_head.jpg')}></Image>
                     <TouchableOpacity style={styles.loginStyle} onPress={()=>{this._onPress(PersonData)}}>
                         <View style={styles.LoginSuccess}>
                             <Text style={styles.nameStyles}>
                                 BW160923_abc
                             </Text>
                             <Text style={styles.phoneStyles}>
                                 182××××1776
                             </Text>
                         </View>
                         <Image style={styles.arrow} source={{uri:'forward'}} />
                     </TouchableOpacity>

                 </View>
             );
         }
     }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
    },head:{
        width:Width,
        height:105,
        flexDirection:'row',
        alignItems:'center',
        //backgroundColor: '#000',
    },headimg:{
        width:60,
        height:60,
        borderRadius:30,
        marginLeft:10
    },loginStyle:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10
    },loginLeft:{
        fontSize:15,
        color:'#666666',
    },loginRight:{
        fontSize:15,
        flex:1,
        color:'#0080ff',
    },arrow:{
        width:10,
        height:15,
        marginRight:20
    },divide:{//分隔的段落
        width:Width,
        height:4,
        borderTopWidth:0.5,
        borderTopColor:'#e5e5e5',
        borderBottomWidth :0.5,
        borderBottomColor:'#e5e5e5',
        backgroundColor:'#f5f5f5'
    },middle:{
        width:Width,
        height:80,
        flexDirection:'row',
        alignItems:'center'
    }, buscontent:{
        flex:1,
        justifyContent:'center',
    },buscontent1:{
        justifyContent:'center',
    }, busview:{
        alignItems:'center'
    },middleStyle:{
        width:25,
        height:25,
    } ,dividecolumn:{
        width:0.5,
        height:50,
        backgroundColor:'#f5f5f5',
    },itemcontent:{
        height:45,
        flexDirection:'row',
        alignItems:'center',
    },itemStyle:{
        width:20,
        height:20,
        marginLeft:20
    },itemtext:{
        marginLeft:10,
        fontSize:15,
        color:'#333333',
        flex:1
    },LoginSuccess:{
        flex:1
    },middleTextStyles:{
        marginTop:7,
        fontSize:15,
        color:'#333333'
    },judgeStyles:{
        fontSize:12,
        color:'#999999',
        marginRight:10
    },nameStyles:{
        fontSize:15,
        color:'#666666'
    },phoneStyles:{
        fontSize:12,
        color:'#666666',


    }
});

module.exports = Mine;
