/**
 * Created by shaotingzhou on 2016/12/13.
 */
/**
 *  自定义modal
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
    TextInput,
    Dimensions,
    AsyncStorage,
    ScrollView
} from 'react-native';

var Width = Dimensions.get('window').width; //屏宽
var Height = Dimensions.get('window').height; //屏高
var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});//照片datasource
var imgAry = [
    {
        'title':'高粱',
        'color':'#FFF5EE'
    },
    {
        'title':'小米',
        'color':'#FFF5EE'
    },
    {
        'title':'大米',
        'color':'#FFF5EE'
    },
    {
        'title':'土豆',
        'color':'#FFF5EE'
    },
    {
        'title':'西红柿',
        'color':'#FFF5EE'
    },
    {
        'title':'包谷',
        'color':'#FFF5EE'
    },
    {
        'title':'苞米',
        'color':'#FFF5EE'
    },
    {
        'title':'土豆',
        'color':'#FFF5EE'
    },
    {
        'title':'酒精',
        'color':'#FFF5EE'
    },
    {
        'title':'辣条',
        'color':'#FFF5EE'
    },
    {
        'title':'番茄',
        'color':'#FFF5EE'
    }
]
var cols = 3; //一行几个cell
var cellWH = 100; //cell的宽高
var vMargin = (Width - cellWH * cols)/ (cols + 1); //cell之间的边距
var hMargin = 15;
class MaterialSpicker extends  React.Component {
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isOn:false,
            pickerLabel:'',
            slideNum:0,
            dataSource:ds.cloneWithRows(imgAry)
        };
    }
    render () {
        return (
            <View style={styles.container}>
                {/*阴影*/}
                <TouchableOpacity onPress={()=>this.passMethod()}>
                    <View style={styles.shadowView}>
                    </View>
                </TouchableOpacity>
                {/*modal*/}
                <View style={styles.modalStyle}>

                    <View style={styles.modalTop}>
                        <Text>选择基酒原料</Text>
                    </View>

                    <View style={{height:1,backgroundColor:'#E0EEEE',marginTop:10}}></View>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow}
                        contentContainerStyle={styles.listViewStyle}
                        enableEmptySections={true}  //去除警告
                    />
                    {/*重置+提交*/}
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <TouchableOpacity onPress={()=>this.reset()}>
                        <View style={styles.leftButton}><Text>重置</Text></View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={()=>this.passMethod()}>
                            <View style={styles.rightButton}><Text>提交</Text></View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    /*
     *   ListView布局
     *   @param 无
     *   @returns 无
     * */
    renderRow =(rowData, sectionID, rowID)=>{
        return(
            <TouchableOpacity style={styles.innerViewStyle} onPress={()=>this.cellOnclick(rowData,sectionID,rowID)}>
                <View  style={[styles.innerViewStyle, {backgroundColor: rowData.color}]} >
                    <Text>{rowData.title}</Text>
                </View>
            </TouchableOpacity>
        )


    }
    /*
     *   点中每个按钮
     *   @param 无
     *   @returns 无
     * */
    cellOnclick = (rowData,sectionID,rowID)=>{
        imgAry[rowID]['color'] =  imgAry[rowID]['color'] == 'red' ? '#FFF5EE' : 'red'
        this.setState({
            dataSource:ds.cloneWithRows(imgAry),
        })
    }

    /*
     *   点击传递方法
     *   @param 无
     *   @returns 无
     * */
    passMethod = ()=>{
        var result = ''
        for (var i = 0;i<imgAry.length;i++){
            if(imgAry[i].color == 'red'){
                result += (imgAry[i].title + ' ')
            }
        }
        this.props.modalHidden(result)
    }
    /*
     *   重置方法
     *   @param 无
     *   @returns 无
     * */
    reset = ()=>{
       for(var i = 0;i<imgAry.length;i++){
           imgAry[i].color = '#FFF5EE'
       }
        this.setState({
            dataSource:ds.cloneWithRows(imgAry),
        })

    }
    /*
     *   点击确认事件
     *   @param 无
     *   @returns 无
     * */
    commitAction = () =>{
        this.props.modalHidden(result)
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    //shadow
    shadowView:{
        backgroundColor:'black',
        opacity:0.5,
        height:Platform.OS === 'ios' ? Height*0.55 : Height*0.48,
        width: Width,
    },
    //modal
    modalStyle:{
        backgroundColor:'white',
        width: Width,
        height: Platform.OS === 'ios' ? Height*0.45 : Height*0.49,
    },
    // modalTop
    modalTop: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    //checkBoxStyle
    checkBoxStyle: {
        flexDirection:'row',
        justifyContent:'space-around',
        height:44,
        marginTop:10,
        alignItems:'center',
    },
    //buttonStyle
    buttonView:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        marginTop:5,
        alignItems:'center',
    },
    //leftButton
    leftButton:{
        backgroundColor:'#FFF5EE',
        height:40,
        width:Width/2,
        justifyContent:'center',
        alignItems:'center'
    },
    //rightButton
    rightButton:{
        backgroundColor:'red',
        height:40,
        width:Width/2,
        justifyContent:'center',
        alignItems:'center'
    },
    listViewStyle:{
        flexDirection:'row',
        flexWrap:'wrap'
    },
    innerViewStyle:{
        width:cellWH,
        height:40,
        marginLeft:vMargin,
        marginTop:hMargin,
        justifyContent:'center',
        alignItems:'center'

    },

});

module.exports = MaterialSpicker;

