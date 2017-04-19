 /**
  * 业务消息页面
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
var Testmessage=require('../Mine/test_notice.json')//消息测试数据

 export default class Business extends Component {

     constructor(props) {
         super(props);
         var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.state = {
             dataSource: ds.cloneWithRows(Testmessage.data),
             isCollect:true,
         };
     }


     render() {
         return (
             <View style={styles.container}>
                 <NavigatorBar title='业务消息' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()}/>

                 <ListView
                     dataSource={this.state.dataSource}
                     renderRow={this._renderRow}
                     />
             </View>


         );
     }

     /**
      * 返回到上一级
      */
     leftAction(){
         this.props.navigator.pop();
     }


     _renderRow(rowData){
         return(
             <View style={styles.container}>
                 <View style={styles.timeViewStyle}>
                     <Text style={styles.timeStyle}>{rowData.timetext}</Text>
                 </View>

                 <View style={styles.contentStyle}>
                     <Text style={styles.titleStyle}>{rowData.titletext}</Text>
                     <Text style={styles.valueStyle}>{rowData.valuetext}</Text>
                 </View>
             </View>

         );
     }
 }
//var Message = React.createClass({
//    getInitialState(){
//        return {
//            isCollect:true,
//        }
//    },
//
//    render() {
//        return (
//            <View style={styles.container}>
//            <NavigatorBar title='通知消息' widthWH={Platform.OS == 'ios' ? 25:25} leftBtnName = 'return_back' leftpress={()=>this.leftAction()}/>
//                <View style={styles.timeViewStyle}>
//                    <Text style={styles.timeStyle}>08-07  11:20</Text>
//                </View>
//
//                <View style={styles.contentStyle}>
//                    <Text style={styles.titleStyle}>个人认证</Text>
//                    <Text style={styles.valueStyle}>您的个人认证已通过审核</Text>
//                </View>
//            </View>
//        );
//    },
//
//    /**
//     * 返回到上一级
//     */
//    leftAction(){
//        this.props.navigator.pop();
//    }
//});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },timeViewStyle: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        marginBottom:10,

    },timeStyle:{
        backgroundColor:'#999999',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        color:'#fff',
        borderRadius:3,
        fontSize:10
    },contentStyle:{
        borderWidth:1,
        borderColor:'#33333322',
        backgroundColor:'#fff',
        padding:10,
        marginLeft:10,
        marginRight:10,
        borderRadius:3
    },titleStyle:{
        fontSize:15,
        color:'#000',
        marginBottom:5
    },valueStyle:{
        fontSize:12,
    }
});

//module.exports = Message;
