 /**
  * 询盘记录列表页面
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
var TextXunPan=require('../Mine/test_xunpan.json')//询盘测试数据
 var Width = Dimensions.get('window').width; //屏宽

 var SearchContainer = require('../Home/SearchContainer')


 export default class XPRecord extends Component {

     constructor(props) {
         super(props);
         var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         this.state = {
             dataSource: ds.cloneWithRows(TextXunPan.data),
             isCollect:true,
         };
     }


     render() {
         return (
             <View style={styles.container}>
                 <NavigatorBar title='我的询盘' widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' leftpress={()=>this.leftAction()} rightBtnName='清空'/>

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
                     <Text style={styles.timeStyle}>{rowData.time}</Text>
                 </View>



                 <View style={styles.contentStyle}>


                         <Text style={styles.titleStyle}>{rowData.title}</Text>


                     <View style={styles.detailsStyle}>
                        {/*--产区--*/}
                        <View style={styles.regionStyle}>
                            <Text style={styles.valueStyle}>{rowData.origin}</Text>
                            <Text style={styles.nameStyle}>产区</Text>
                        </View>

                         <View style={styles.divide}/>

                        {/*--数量--*/}
                        <View style={styles.numberStyle}>
                            <Text style={styles.valueStyle}>{rowData.number}</Text>
                            <Text style={styles.nameStyle}>数量</Text>
                        </View>

                         <View style={styles.divide}/>

                        {/*--年份--*/}
                        <View style={styles.yearStyle}>
                            <Text style={styles.valueStyle}>{rowData.year}</Text>
                            <Text style={styles.nameStyle}>年份</Text>
                        </View>

                         <View style={styles.divide}/>

                        {/*--价格--*/}
                        <View style={styles.priceStyle}>
                            <Text style={styles.pricevalueStyle}>{rowData.price}</Text>
                        </View>
                     </View>

                     <View style={styles.line}/>

                     <View style={styles.questionStyle}>
                        <Text style={styles.questionTestStyle}questionTestStyle>询盘内容:这款酒有什么认证</Text>
                         <Image style={styles.arrow} source={{uri:'forward'}}/>
                     </View>
                 </View>
             </View>

         );
     }
     /**
      * 无询盘记录时显示此页面
      * @returns {XML}
      * @private
      */
     _renderNullRow(){
         return(
             <View style={styles.nullcontentStyles}>
                 <Image source={{uri:'xunpan'}} style={styles.nullImageStyle}/>
                 <Text style={styles.nullTextStyle}>
                     您还未有询盘记录 !
                 </Text>
             </View>
         );
     }

 }



var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },timeViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height:45
    },timeStyle:{
        width:100,
        height:25,
        backgroundColor:'#999999',
        color:'#fff',
        borderRadius:3,
        fontSize:12,
        textAlign:'center',
        paddingTop:5
    },contentStyle:{
        borderWidth:1,
        height:145,
        borderColor:'#e5e5e5',
        backgroundColor:'#fff',
        marginLeft:10,
        marginRight:10,
    },detailsStyle:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:55,
    },titleStyle:{
        marginTop:18,
        marginLeft:10,
        fontSize:15,
        fontWeight:'bold',
        color:'#333333'
    },regionStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width:75,
    },numberStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width:75,
    },yearStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width:75,
    },priceStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },valueStyle:{
        fontSize:14,
        color:'#666666'
    },nameStyle:{
        fontSize:12,
        color:'#999999',
        marginTop:3
    },pricevalueStyle:{
        fontSize:16,
        color:'#8B0000'
    },divide:{
        width:0.5,
        height:40,
        backgroundColor:'#e5e5e5'
    },line:{
        height:0.5,
        backgroundColor:'#e5e5e5',
        marginLeft:5,
        marginRight:5
    },questionStyle:{
        justifyContent:'space-between',
       alignItems:'center',
        flex:1,
        marginLeft:10,
        marginRight:5,
        flexDirection:'row',
    },imageStyle:{
        width:15,
        height:15,
        justifyContent: 'center',
        alignItems: 'center',
    },questionTestStyle:{
        color:'#333333',
        fontSize:16
    },arrow:{
        width:10,
        height:15,
    },nullImageStyle:{
        width:100,
        height:100,
        marginTop:120
    },nullTextStyle:{
        fontSize:15,
        color:'#666666',
        marginTop:45
    },nullcontentStyles:{
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems:'center'
    }
});

//module.exports = Message;
