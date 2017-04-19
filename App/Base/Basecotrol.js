/**
 * rn-drawer example app
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
  AppRegistry,
    StyleSheet,
  Text,
  View,
    Navigator,
    Platform,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Image,
    Animated,
    ListView,
    Alert,
} from 'react-native';
var BaseDetail = require('./BaseDetail');//详情界面
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var screenHeight = Dimensions.get('window').height;//屏高
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
var ChooseCell = require('./ChooseCell');//筛选的cell
var WineJson = require('./Wine.json');//香型数据源
var WineJson1 = require('./Wine1.json');//年份数据源
var WineJson2 = require('./Level.json');//级别数据源
var WineJson3 = require('./Place.json');//产地数据源
var ary = WineJson;//香型数据源
var ary1 = WineJson1;//年份数据源
var ary2 = WineJson2;//级别数据源
var ary3 = WineJson3;//产地数据源
var ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
var ds1 = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
var ds2 = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
var ds3 = new ListView.DataSource({rowHasChanged:(r1,r2) => r1!==r2});
var array = [];
var array1 = [];
var array2 = [];
var array3 = [];
var arrayAll = [];
export class Basecotrol extends Component {
    constructor(props){
        super(props)
        this.icons = { //Step 2
            //'up' : require('../image/up.png'),
            //'down' : require('../image/down.png')
            'up' : {uri:'arrow_up'},
            'down' : {uri:'arrow_down'}
        };
        this.state = { //Step 3
            expanded : true,
            expanded1 : true,
            expanded2:true,
            expanded3:true,
            animation : new Animated.Value(),
            animation1 : new Animated.Value(),
            animation2: new Animated.Value(),
            animation3: new Animated.Value(),
            dataSource:ds.cloneWithRows(ary),
            dataSource1:ds1.cloneWithRows(ary1),
            dataSource2:ds2.cloneWithRows(ary2),
            dataSource3:ds3.cloneWithRows(ary3),
            minPrice:'',//最低价
            maxPrice:'',//最高价
        };
    }
    componentWillMount(){
        //对数据源进行判断,来确定初始高度
        if(ary.length == 0){
            this.state.animation.setValue()
        }else {
            this.state.animation.setValue(97)
        }
        if(ary1.length == 0){
            this.state.animation1.setValue()
        }else {
            this.state.animation1.setValue(97)
        }
        if(ary2.length == 0){
            this.state.animation2.setValue()
        }else {
            this.state.animation2.setValue(97)
        }
        if(ary3.length == 0){
            this.state.animation3.setValue()
        }else {
            this.state.animation3.setValue(97)
        }
        this.setState({
            expanded:false,
            expanded1:false,
            expanded2:false,
            expanded3:false,
        })
    }
    //香型折叠事件
    toggle= ()=>{
        const { expanded , animation,maxHeight,minHeight } = this.state
        //根据数据源计算行数
        if(ary.length == 0){
            this.state.maxHeight = 0;
            this.state.minHeight = 49
        }else{
            if(ary.length%3 != 0){
                this.state.maxHeight = (parseInt(ary.length/3) + 1)*50 +35;
                this.state.minHeight = 97

            }else {
                this.state.maxHeight = (ary.length/3)*50 +50;
                this.state.minHeight = 97
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
            this.state.minHeight1 = 49
        }else{
            if(ary1.length%3 != 0){
                this.state.maxHeight1 = (parseInt(ary1.length/3) + 1)*50 + 35;
                this.state.minHeight1 = 97
            }else {
                this.state.maxHeight1 = (ary1.length/3)*50+50;
                this.state.minHeight1 = 97
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
    //级别折叠事件
    toggle2= ()=>{
        const { expanded2 , animation2,maxHeight2,minHeight2 } = this.state
        //根据数据源计算行数
        if(ary2.length == 0){
            this.state.maxHeight2 = 0;
            this.state.minHeight2 = 49
        }else{
            if(ary2.length%3 != 0){
                this.state.maxHeight2 = (parseInt(ary2.length/3) + 1)*50 + 35;
                this.state.minHeight2 = 97
            }else {
                this.state.maxHeight2 = (ary2.length/3)*50+50;
                this.state.minHeight2 = 97
            }
        }
        let initialValue = this.state.expanded2? this.state.maxHeight2: this.state.minHeight2 ,
            finalValue = this.state.expanded2? this.state.minHeight2  : this.state.maxHeight2 ;
        this.setState({
            expanded2 : !this.state.expanded2 ,//Step 2改变图片
        });
        this.state.animation2.setValue(initialValue); //Step 3启动动画
        Animated.timing( //Step 4
            this.state.animation2,
            {
                toValue: finalValue
            }
        ).start();

    }
    //产地折叠事件
    toggle3= ()=>{
        const { expanded3 , animation3,maxHeight3,minHeight3 } = this.state
        //根据数据源计算行数
        if(ary3.length == 0){
            this.state.maxHeight3 = 0;
            this.state.minHeight3 = 49
        }else{
            if(ary3.length%3 != 0){
                this.state.maxHeight3 = (parseInt(ary3.length/3) + 1)*50 + 35;
                this.state.minHeight3 = 97
            }else {
                this.state.maxHeight3 = (ary3.length/3)*50+50;
                this.state.minHeight3 = 97
            }
        }
        let initialValue = this.state.expanded3? this.state.maxHeight3: this.state.minHeight3 ,
            finalValue = this.state.expanded3? this.state.minHeight3  : this.state.maxHeight3 ;
        this.setState({
            expanded3 : !this.state.expanded3 ,//Step 2改变图片
        });
        this.state.animation3.setValue(initialValue); //Step 3启动动画
        Animated.timing( //Step 4
            this.state.animation3,
            {
                toValue: finalValue
            }
        ).start();

    }
    render() {
        const { expanded, animation,expanded1,expanded2,expanded3 } = this.state
        //设置默认的图片即向下
        let icon = this.icons['down']
        let icon1 = this.icons['down']
        let icon2 = this.icons['down']
        let icon3 = this.icons['down']
        if(this.state.expanded){
            icon = this.icons['up']
        }
        if(this.state.expanded1){
            icon1 = this.icons['up']
        }
        if(this.state.expanded2){
            icon2 = this.icons['up']
        }
        if(this.state.expanded3){
            icon3 = this.icons['up']
        }
      return(
      <View style={styles.container}>
          <ScrollView
              showsVerticalScrollIndicator={false}
              style={{backgroundColor:'white',height:screenHeight}}
          >
            <View style={{borderBottomWidth:1,borderBottomColor:'black'}}>
                <View style={{height:50}}>
                    {/*价格区间*/}
                    <Text style={{marginTop:18,fontSize:14,marginLeft:10,color:'#666'}}>
                        价格区间(元)
                    </Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10,alignItems:'center'}}>
                    {/*最低价*/}
                    <TextInput
                        style={{flex:1,backgroundColor:'#f5f5f5',textAlign:'center',marginLeft:10,height:36,fontSize:13,color:'#999'}}
                        placeholder='最低价'
                        defaultValue= {this.state.minPrice}
                        keyboardType={'numeric'}
                        underlineColorAndroid = {'transparent'}
                        onChangeText={(text)=> {
                            this.setState({
                                minPrice:text
                            })
                        }}
                    />
                    {/*分割线*/}
                    <View style={{height:1,width:10,backgroundColor:'black',marginLeft:10,marginRight:10}}></View>
                    {/*最高价*/}
                    <TextInput
                        style={{flex:1,backgroundColor:'#f5f5f5',textAlign:'center',marginRight:10,height:36,fontSize:13,color:'#999'}}
                        placeholder='最高价'
                        defaultValue={this.state.maxPrice}
                        keyboardType={'numeric'}
                        underlineColorAndroid = {'transparent'}
                        onChangeText={(text)=> {
                            this.setState({
                                maxPrice:text
                            })
                        }}
                     />
                </View>
            </View>
              {/*香型,年份,基酒等级*/}
              {/*香型部分的动态view*/}
              <Animated.View style={[styles.animatedStyle,{height: this.state.animation}]}>
                  <View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:49}}>
                              <Text style={{fontSize:13,marginLeft:10}}>
                                  香型
                              </Text>
                          <TouchableOpacity onPress={()=>this.toggle()}>

                              <Image source={icon} style={{marginRight:8,height:8,width:8}}/>
                          </TouchableOpacity>
                      </View>
                  </View>

                      {/*香型的listview*/}
                      <ListView
                          contentContainerStyle={{marginLeft:5,flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start'}}
                          dataSource = {this.state.dataSource}
                          renderRow = {this.typeRow.bind(this)}
                          scrollEnabled = {false}
                          showsVerticalScrollIndicator ={false}
                      />

              </Animated.View>
              {/*年份部分的动态view*/}
              <Animated.View style={[styles.animatedStyle,{height: this.state.animation1}]}>
                  <View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:49}}>
                              <Text style={{fontSize:13,marginLeft:10}}>
                                  年份
                              </Text>
                          <TouchableOpacity onPress={()=>this.toggle1()}>
                              <Image source={icon1} style={{marginRight:8,height:8,width:8}}/>
                          </TouchableOpacity>
                      </View>
                  </View>
                      {/*年份的listview*/}
                      <ListView
                          contentContainerStyle={{marginLeft:5,flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start'}}
                          dataSource = {this.state.dataSource1}
                          renderRow= {this.yearRow.bind(this)}
                          scrollEnabled = {false}
                          showsVerticalScrollIndicator ={false}
                      />


              </Animated.View>

              {/*分级部分的动态view*/}
              <Animated.View style={[styles.animatedStyle,{height: this.state.animation2}]}>
                  <View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:49}}>
                          <Text style={{fontSize:13,marginLeft:10}}>
                              分级
                          </Text>
                          <TouchableOpacity onPress={()=>this.toggle2()}>
                              <Image source={icon2} style={{marginRight:8,height:8,width:8}}/>
                          </TouchableOpacity>
                      </View>
                  </View>
                  {/*分级的listview*/}
                  <ListView
                      contentContainerStyle={{marginLeft:5,flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start'}}
                      dataSource = {this.state.dataSource2}
                      renderRow= {this.levelRow.bind(this)}
                      scrollEnabled = {false}
                      showsVerticalScrollIndicator ={false}
                  />


              </Animated.View>

              {/*产地部分的动态view*/}
              <Animated.View style={[styles.animatedStyle,{height: this.state.animation3}]}>
                  <View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:49}}>
                          <Text style={{fontSize:13,marginLeft:10}}>
                              产地
                          </Text>
                          <TouchableOpacity onPress={()=>this.toggle3()}>
                              <Image source={icon3} style={{marginRight:8,height:8,width:8}}/>
                          </TouchableOpacity>
                      </View>
                  </View>
                  {/*产地的listview*/}
                  <ListView
                      contentContainerStyle={{marginLeft:5,flexDirection:'row',flexWrap:'wrap',alignItems:'flex-start'}}
                      dataSource = {this.state.dataSource3}
                      renderRow= {this.placeRow.bind(this)}
                      scrollEnabled = {false}
                      showsVerticalScrollIndicator ={false}
                  />


              </Animated.View>
          </ScrollView>

          <View style={{flexDirection:'row'}}>

              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'#f5f5f5',height:49,flex:1,}}onPress={() => this.resetAction()}>
                  <Text style={{fontSize:17,color:'#0080ff'}}>
                      重置
                  </Text>
              </TouchableOpacity>

              <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'#0080ff',height:49,flex:1}} onPress={() => this.affirmAction() }>
                  <Text style={{fontSize:17,color:'#ffffff'}}>
                      确认
                  </Text>
              </TouchableOpacity>
          </View>

      </View>
      );
  }
  //类型
    typeRow(rowData,sectionID,rowID){
        return(
            <TouchableOpacity style={styles.row} onPress={() => this.clickTypeCell(rowData,sectionID,rowID)}>
                <View style={[styles.row,{backgroundColor:rowData.color}]}>
                    <Text style={{fontSize:14,color:'#333333'}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //年份
    yearRow(rowData,sectionID,rowID){
        return(
            <TouchableOpacity style={styles.row} onPress={() => this.clickYearCell(rowData,sectionID,rowID)}>
                <View style={[styles.row,{backgroundColor:rowData.color}]}>
                    <Text style={{fontSize:14,color:'#333333'}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //分级
    levelRow(rowData,sectionID,rowID){
        return(
            <TouchableOpacity style={styles.row} onPress={() => this.clickLevelCell(rowData,sectionID,rowID)}>
                <View style={[styles.row,{backgroundColor:rowData.color}]}>
                    <Text style={{fontSize:14,color:'#333333'}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //产地
    placeRow(rowData,sectionID,rowID){
        return(
            <TouchableOpacity style={styles.row} onPress={() => this.clickPlaceCell(rowData,sectionID,rowID)}>
                <View style={[styles.row,{backgroundColor:rowData.color}]}>
                    <Text style={{fontSize:14,color:'#333333'}}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //类型点击事件
    clickTypeCell(rowData,sectionID,rowID){

        ary[rowID]['color'] =  ary[rowID]['color'] == '#0c7aff' ? '#b2b3b4' : '#0c7aff'
        this.setState({
            dataSource:ds.cloneWithRows(ary),

        })
    }
    //年份点击事件
    clickYearCell(rowData,sectionID,rowID){
        ary1[rowID]['color'] =  ary1[rowID]['color'] == '#0c7aff' ? '#b2b3b4' : '#0c7aff'
        this.setState({
            dataSource1:ds1.cloneWithRows(ary1),
        })

    }
    //分级点击事件
    clickLevelCell(rowData,sectionID,rowID){
        ary2[rowID]['color'] =  ary2[rowID]['color'] == '#0c7aff' ? '#b2b3b4' : '#0c7aff'
        this.setState({
            dataSource2:ds2.cloneWithRows(ary2),
        })

    }
    //产地点击事件
    clickPlaceCell(rowData,sectionID,rowID){
        ary3[rowID]['color'] =  ary3[rowID]['color'] == '#0c7aff' ? '#b2b3b4' : '#0c7aff'
        this.setState({
            dataSource3:ds3.cloneWithRows(ary3),
        })

    }
  //重置按钮点击事件
    resetAction(){
        if(this.state.minPrice != ''){
            this.setState({
                minPrice:''
            })
        }
        if(this.state.maxPrice != ''){
            this.setState({
                maxPrice:''
            })
        }
      for(var i = 0;i<ary.length;i++){
          if(ary[i]['color']=="#0c7aff"){
              ary[i]['color'] = '#b2b3b4'
          }
      }
        for(var i = 0;i<ary1.length;i++){
            if(ary1[i]['color']=="#0c7aff"){
                ary1[i]['color'] = '#b2b3b4'
            }
        }
        for(var i = 0;i<ary2.length;i++){
            if(ary2[i]['color']=="#0c7aff"){
                ary2[i]['color'] = '#b2b3b4'
            }
        }
        for(var i = 0;i<ary3.length;i++){
            if(ary3[i]['color']=="#0c7aff"){
                ary3[i]['color'] = '#b2b3b4'
            }
        }
        this.setState({
            dataSource:ds.cloneWithRows(ary),
            dataSource1:ds1.cloneWithRows(ary1),
            dataSource2:ds2.cloneWithRows(ary2),
            dataSource3:ds3.cloneWithRows(ary3),
        })

  }
  //确认按钮点击事件
    affirmAction(){
        var num = /^(0|\+?[1-9][0-9]*)$/
        if(this.state.minPrice == '' || this.state.maxPrice == '') {
            if (this.state.minPrice == '' && this.state.maxPrice != '') {
                this.state.minPrice = 0
                if ( num.test(this.state.maxPrice) == false) {
                    alert('价格只能输入非负整数')
                } else {
                    if (parseInt(this.state.minPrice) > parseInt(this.state.maxPrice)) {
                        alert('最低价格不能比最高价格高')
                    } else {
                        var minNum = this.state.minPrice
                        var maxNum = this.state.maxPrice
                        global.minNumber = minNum
                        global.maxNumber = maxNum
                        this.filter()
                    }
                }
            }else if (this.state.maxPrice == '' && this.state.minPrice != '') {
               this.state.maxPrice = 999999
                if (num.test(this.state.minPrice) == false) {
                    alert('价格只能输入非负整数')
                } else {
                    if (parseInt(this.state.minPrice) > parseInt(this.state.maxPrice)) {
                        alert('最低价格不能比最高价格高')
                    } else {
                        var minNum = this.state.minPrice
                        var maxNum = this.state.maxPrice
                        global.minNumber = minNum
                        global.maxNumber = maxNum
                        this.filter()
                    }
                }
            }else if(this.state.minPrice == '' && this.state.maxPrice == ''){
                this.state.minPrice = 0
                this.state.maxPrice = 999999
                global.minNumber = this.state.minPrice
                global.maxNumber = this.state.maxPrice
                this.filter()
            }

        }else {
            if (num.test(this.state.minPrice) == false || num.test(this.state.maxPrice) == false) {
                alert('价格只能输入非负整数')
            } else {
                if (parseInt(this.state.minPrice) > parseInt(this.state.maxPrice)) {
                    alert('最低价格不能比最高价格高')
                } else {
                    var minNum = this.state.minPrice
                    var maxNum = this.state.maxPrice
                    global.minNumber = minNum
                    global.maxNumber = maxNum
                    this.filter()
                }
            }
        }
    }
    filter(){
        //香型选中的条件
        for(var i = 0;i<ary.length;i++){
            if(ary[i]['color']=="#0c7aff"){
                array.push(ary[i]['name'])
                ary[i]['color'] = '#b2b3b4'
            }
        }
        //香型没有选,默认全选
        if(array.length == 0){
            for(var i = 0;i<ary.length;i++){
                array.push(ary[i]['name'])
            }
        }
        //年份选中的条件
        for(var i = 0;i<ary1.length;i++){
            if(ary1[i]['color']=="#0c7aff"){
                array1.push(ary1[i]['name'])
                ary1[i]['color'] = '#b2b3b4'
            }
        }
        //年份没选,默认全选
        if(array1.length == 0){
            for(var i = 0;i<ary1.length;i++){
                array1.push(ary1[i]['name'])
            }
        }
        //分级选中的条件
        for(var i = 0;i<ary2.length;i++){
            if(ary2[i]['color']=="#0c7aff"){
                array2.push(ary2[i]['name'])
                ary2[i]['color'] = '#b2b3b4'
            }
        }
        //分级没选,默认全选
        if(array2.length == 0){
            for(var i = 0;i<ary2.length;i++){
                array2.push(ary2[i]['name'])
            }
        }
        //产地选中的条件
        for(var i = 0;i<ary3.length;i++){
            if(ary3[i]['color']=="#0c7aff"){
                array3.push(ary3[i]['name'])
                ary3[i]['color'] = '#b2b3b4'
            }
        }
        //产地没选,默认全选
        if(array3.length == 0){
            for(var i = 0;i<ary3.length;i++){
                array3.push(ary3[i]['name'])
            }
        }
        //将两个数组合成一个数组
        Array.prototype.push.apply(array, array1)
        Array.prototype.push.apply(array, array2)
        Array.prototype.push.apply(array, array3)
        //将筛选条件传到Base界面
        global.dataAry = array
        //清空数组
        array=[]
        array1=[]
        array2=[]
        array3=[]
        this.setState({
            dataSource:ds.cloneWithRows(ary),
            dataSource1:ds1.cloneWithRows(ary1),
            dataSource1:ds2.cloneWithRows(ary2),
            dataSource1:ds3.cloneWithRows(ary3),
        })
        //关闭侧滑
        this.props.colse()
        //筛选的条件传到base
        this.props.requestData()
    }
};


var styles = StyleSheet.create({
    container: {
        flex:1
    },
    animatedStyle: {
        flex:1,
        overflow:'hidden',
        borderBottomWidth:1,
        borderBottomColor:'black'
    },
    row:{
        width:85,
        height:37,
        marginTop:5,
        marginLeft:5,
        justifyContent:'center',
        alignItems:'center'
    }

});

module.exports = Basecotrol;
AppRegistry.registerComponent('Basecotrol', () => Basecotrol);

