 /**
  * 我的消息页面
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
    AsyncStorage
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
 import Notice from '../Mine/Notice.js'//通知消息



export default class Message extends Component {

     constructor(props) {
         super(props);
         this.state = {
             isCollect:true,
         };
     }


     render() {
         return (
             <View style={styles.container}>
                 <NavigatorBar title='消息' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>

                 {this._renderItem({uri:'mes_tz'},'通知消息','您的信息已通过审核..','08-07',Notice)}

                 <View style={styles.divide}/>

                 {this._renderItem({uri:'mes_yw'},'业务消息','您发布的基酒已审核...','08-07',Notice)}

             </View>
         );
     }

     /**
      * 返回到上一级
      */
     leftAction(){
         this.props.navigator.pop();
     }

    /**
     *  消息的item
     * @param 图标
     * @param 标题
     * @param 内容
     * @param 日期
     * @param 跳转的页面
     * @returns {XML}
     * @private
     */
    _renderItem(image,title,content,date,jump){
        return(
            <TouchableOpacity onPress={()=>{this._onPress(jump,title)}}>
                <View style={styles.itemStyle}>
                    <Image style={styles.imageStyle} source={(image)}/>
                    <View style={styles.itemtextStyle}>
                        <Text style={styles.titleStyle}>{title}</Text>
                        <Text style={styles.contentStyle}>{content}</Text>
                    </View>
                    <Text style={styles.timeStyle}>{date}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     *
     * 需要跳转到的下级页面
     * @param 下级页面
     * @private
     */
    _onPress(jump,name){
        this.props.navigator.push({
            component: jump,
            passProps:{
                name:name
            }
        });
    }
 }



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5f5',
    },itemStyle:{
        flexDirection:'row',
        backgroundColor:'#fff',
        height:65,
    },imageStyle:{
        width:50,
        height:50,
        marginLeft:10,
        marginTop:7.5
    },itemtextStyle:{
        flexDirection:'column',
        justifyContent:'space-between',
        marginLeft:10,
        flex:1,
        marginTop:13,
        marginBottom:13
    },titleStyle:{
        color:'#333333',
        fontSize:15,
    },contentStyle:{
        color:'#99999999',
        fontSize:12,
    },timeStyle:{
        marginTop:13,
        marginRight:10,
        fontSize:12,
        color:'#999999'
    },divide:{//分隔的段落
        height:8,
        borderTopWidth:0.5,
        borderTopColor:'#e5e5e5',
        borderBottomWidth :0.5,
        borderBottomColor:'#e5e5e5',
        backgroundColor:'#f5f5f5'
    }
});
