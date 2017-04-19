/**
 * Created by shichunguang on 2016/12/20.
 */
/**
 *
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
    Animated,
    Alert,
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var WineJson = require('./Wine.json');//香型数据源
var WineJson1 = require('./Wine1.json');//年份数据源
var ary = WineJson;//香型数据源
var ary1 = WineJson1;//年份数据源
var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
var ds1 = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
export class ChooseCell extends Component {
    constructor(props){
        super(props);

        this.icons = { //Step 2
            'up' : require('../image/up.png'),
            'down' : require('../image/down.png')
        };
        this.state = { //Step 3
            expanded : true,
            expanded1 : true,
            animation : new Animated.Value(),
            animation1 : new Animated.Value(),
            dataSource:ds.cloneWithRows(ary),
            dataSource1:ds1.cloneWithRows(ary1),
        };
    }
    componentWillMount(){
        //对数据源进行判断,来确定初始高度
        if(ary.length == 0){
            this.state.animation.setValue()
        }else {
            this.state.animation.setValue(70)
        }
        if(ary1.length == 0){
            this.state.animation1.setValue()
        }else {
            this.state.animation1.setValue(70)
        }
        this.setState({
            expanded:false,
            expanded1:false,
        })
    }
    //香型折叠事件
    toggle= ()=>{
        const { expanded , animation,maxHeight,minHeight } = this.state
        //根据数据源计算行数
        if(ary.length == 0){
            this.state.maxHeight = 0;
            this.state.minHeight = 30
        }else{
            if(ary.length%3 != 0){
                this.state.maxHeight = (parseInt(ary.length/3) + 1)*50 +30;
                this.state.minHeight = 70

            }else {
                this.state.maxHeight = (ary.length/3)*50 +30;
                this.state.minHeight = 70
            }
        }
        let initialValue = this.state.expanded? this.state.maxHeight : this.state.minHeight ,
            finalValue = this.state.expanded? this.state.minHeight  : this.state.maxHeight ;
        this.setState({
            expanded : !this.state.expanded ,//Step 2修改图片
        });
        this.state.animation.setValue(initialValue); //Step 3启动动画
        Animated.timing( //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();

    }
    //年份折叠事件
    toggle1= ()=>{
        const { expanded1 , animation1,maxHeight1,minHeight1 } = this.state
        //根据数据源计算行数
        if(ary1.length == 0){
            this.state.maxHeight1 = 0;
            this.state.minHeight1 = 30
        }else{
            if(ary1.length%3 != 0){
                this.state.maxHeight1 = (parseInt(ary1.length/3) + 1)*50 + 30;
                this.state.minHeight1 = 70
            }else {
                this.state.maxHeight1 = (ary1.length/3)*50+30;
                this.state.minHeight1 = 70
            }
        }
        let initialValue = this.state.expanded1? this.state.maxHeight1: this.state.minHeight1 ,
            finalValue = this.state.expanded1? this.state.minHeight1  : this.state.maxHeight1 ;
        this.setState({
            expanded1 : !this.state.expanded1 ,//Step 2改变图片
        });
        this.state.animation1.setValue(initialValue); //Step 3启动动画
        Animated.timing( //Step 4
            this.state.animation1,
            {
                toValue: finalValue
            }
        ).start();

    }
    render() {
        const { expanded, animation,expanded1 } = this.state
        //设置默认的图片即向下
        let icon = this.icons['down']
        let icon1 = this.icons['down']
        if(this.state.expanded){
            icon = this.icons['up']
        }
        if(this.state.expanded1){
            icon1 = this.icons['up']
        }
        return (
            <View>
                {/*香型部分的动态view*/}
            <Animated.View style={[styles.container,{height: this.state.animation}]}>
                <View>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{marginTop:8,marginLeft:10,flex:1}}>
                            <Text>
                                香型
                            </Text>
                        </View>
                        <TouchableOpacity onPress={()=>this.toggle()}>
                            <Image source={icon} style={{marginRight:8,marginTop:8}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    {/*香型的listview*/}
                    <ListView
                        contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start',width:screenWidth*4/5}}
                        dataSource = {this.state.dataSource}
                        renderRow = {this.typeRow.bind(this)}
                        scrollEnabled = {false}
                        showsVerticalScrollIndicator ={false}
                    >
                    </ListView>
                </View>
            </Animated.View>
                {/*年份部分的动态view*/}
                <Animated.View style={[styles.container,{height: this.state.animation1}]}>
                    <View>
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <View style={{marginTop:8,marginLeft:10,flex:1}}>
                                <Text>
                                    年份
                                </Text>
                            </View>
                            <TouchableOpacity onPress={()=>this.toggle1()}>
                                <Image source={icon1} style={{marginRight:8,marginTop:8}}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        {/*年份的listview*/}
                        <ListView
                            contentContainerStyle={{flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start',width:screenWidth*4/5}}
                            dataSource = {this.state.dataSource1}
                            renderRow= {this.yearRow.bind(this)}
                            scrollEnabled = {false}
                            showsVerticalScrollIndicator ={false}
                        >
                        </ListView>
                    </View>
                </Animated.View>
            </View>
        );
    }
    typeRow(rowData,sectionID,rowID){
        return(
            <TouchableOpacity style={styles.row} onPress={() => this.clickTypeCell(rowData,sectionID,rowID)}>
                <View style={[styles.row,{backgroundColor:rowData.color}]}>
                    <Text>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    yearRow(rowData,sectionID,rowID){
        return(
            <TouchableOpacity style={styles.row} onPress={() => this.clickYearCell(rowData,sectionID,rowID)}>
                <View style={[styles.row,{backgroundColor:rowData.color,}]}>
                    <Text>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    clickTypeCell(rowData,sectionID,rowID){

        ary[rowID]['color'] =  ary[rowID]['color'] == '#0c7aff' ? '#b2b3b4' : '#0c7aff'
        this.setState({
            dataSource:ds.cloneWithRows(ary),

        })
        global.typeAry=ary
    }
    clickYearCell(rowData,sectionID,rowID){
        ary1[rowID]['color'] =  ary1[rowID]['color'] == '#0c7aff' ? '#b2b3b4' : '#0c7aff'
        this.setState({
            dataSource1:ds1.cloneWithRows(ary1),
        })
        global.yearAry=ary1
    }
};


var styles = StyleSheet.create({
    container: {
        flex:1,
        overflow:'hidden',
        borderBottomWidth:1,
        borderBottomColor:'black'
    },
    row:{
        width:screenWidth/5,
        height:30,
        marginTop:10,
        marginLeft:15,
        marginBottom:10,
        justifyContent:'center',
        alignItems:'center'
    }

});

module.exports = ChooseCell;
