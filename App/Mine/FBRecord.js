/**
 * Created by shaotingzhou on 2017/1/17.
 */
/**
 * Created by sww on 2016/10/20.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ListView,
    Platform,
    Image,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Alert
} from 'react-native';
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
import {SwipeListView,SwipeRow } from 'react-native-swipe-list-view';
var ds = new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 !== r2});
var ary = []
const {width,height}=Dimensions.get('window')
export default class FBRecord extends Component{
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            dataSource:ds.cloneWithRows(ary),
            notMoreData:null,
        };
    }
    /**
     * 请求数据
     */
    requestData = () =>{
        var url =   'http://rap.taobao.org/mockjsdata/11281/minePblish'
        // var url =   'http://rap.taobao.org/mockjsdata/11281/less'
        var data = {"page":0,"size":6};
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((responseData) => {
                if (responseData) {
                    ary = responseData.data
                    this.setState({
                        dataSource:ds.cloneWithRows(ary),
                    })
                }
            }).catch((error) => {
        })
        //如果数据完毕,设置notMoreData为false
        this.setState({
            notMoreData:false
        })
    }
    render(){
        return (
            <View style={{flex:1}}>
                <NavigatorBar title='我的发布'  widthWH={Platform.OS == 'ios' ? 15:15} leftBtnName = 'back' rightBtnName = 'Share_icon' leftpress={()=>this.leftAction()} rightPress={()=>this.rightAction()}  />
                <SwipeListView
                    dataSource = {this.state.dataSource}
                    renderRow={this.renderRow}
                    refreshControl={
                        <RefreshControl
                            onRefresh={() => this.onRefresh()}
                            refreshing={false}
                        />
                    }
                    renderFooter = {() => this.renderFooter()}
                    onEndReached = {()=> this.onEndReached()}
                    enableEmptySections={true}
                />
            </View>

        );
    }

    /**
     * 返回到上一级
     */
    leftAction =() =>{
        this.props.navigator.pop();
    }
    rightAction = () =>{

    }
    renderRow =(rowData,sectionID,rowID,highlightRow) => {
        let type = rowData.type;
        if(type===1){//已发布
            return(
                Platform.OS === 'ios'
                    ?
                    <SwipeRow
                        disableRightSwipe={true}
                        disableLeftSwipe={false}
                        leftOpenValue={0}
                        rightOpenValue={-100}
                    >
                        <TouchableOpacity onPress={()=>this.deleteCell(rowData,sectionID,rowID,highlightRow)}>
                            <View style={styles.standaloneRowBack}>
                                <Text>删除</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'released'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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

                            </View>
                        </View>
                    </SwipeRow>
                    :
                    <TouchableOpacity onLongPress={()=>this.androidLongPress(rowData,sectionID,rowID,highlightRow)}>
                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'released'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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

                            </View>
                        </View>
                    </TouchableOpacity>

            );
        }else if (type ===2){//审核中
            return(
                Platform.OS === 'ios'
                    ?
                    <SwipeRow
                        disableRightSwipe={true}
                        disableLeftSwipe={false}
                        leftOpenValue={0}
                        rightOpenValue={-100}
                    >
                        <TouchableOpacity onPress={()=>this.deleteCell(rowData,sectionID,rowID,highlightRow)}>
                            <View style={styles.standaloneRowBack}>
                                <Text>删除</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'examine'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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

                            </View>
                        </View>
                    </SwipeRow>

                    :
                    <TouchableOpacity onLongPress={()=>this.androidLongPress(rowData,sectionID,rowID,highlightRow)}>

                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'examine'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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

                            </View>
                        </View>
                    </TouchableOpacity>

            );

        }else if (type ===3){//已失效

            return(
                Platform.OS === 'ios'
                    ?
                    <SwipeRow
                        disableRightSwipe={true}
                        disableLeftSwipe={false}
                        leftOpenValue={0}
                        rightOpenValue={-100}
                    >
                        <TouchableOpacity onPress={()=>this.deleteCell(rowData,sectionID,rowID,highlightRow)}>
                            <View style={styles.standaloneRowBack}>
                                <Text>删除</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'expired'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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

                            </View>
                        </View>
                    </SwipeRow>
                    :
                    <TouchableOpacity onLongPress={()=>this.androidLongPress(rowData,sectionID,rowID,highlightRow)}>
                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'expired'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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

                            </View>
                        </View>
                    </TouchableOpacity>

            );

        }else if (type ===4){//已拒绝
            return(
                Platform.OS === 'ios'
                    ?
                    <SwipeRow
                        disableRightSwipe={true}
                        disableLeftSwipe={false}
                        leftOpenValue={0}
                        rightOpenValue={-100}
                        closeOnRowPress = {true}
                    >
                        <TouchableOpacity onPress={()=>this.deleteCell(rowData,sectionID,rowID,highlightRow)}>
                            <View style={styles.standaloneRowBack}>
                                <Text>删除</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'rejected'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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

                            </View>
                        </View>
                    </SwipeRow>
                    :
                    <TouchableOpacity onLongPress={()=>this.androidLongPress(rowData,sectionID,rowID,highlightRow)}>

                        <View style={styles.container}>

                            <View style={styles.divides}/>

                            <View style={styles.contentStyle}>
                                <View style={styles.titlecontentStyle}>
                                    <Text style={styles.titleStyle}>{rowData.title}</Text>
                                    <Image source={{uri:'rejected'}} style={styles.typeStyle}/>
                                </View>

                                <View style={styles.myStyleone}>
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
                            </View>
                        </View>
                    </TouchableOpacity>
            );
        }

    }
    androidLongPress = (rowData,sectionID,rowID,highlightRow) =>{
        Alert.alert(
            '您确定要删除该条信息吗?',
            null,
            [
                {text: '取消', onPress: () => console.log('取消了提交')},
                {text: '确认', onPress: () => this.deleteCell(rowData,sectionID,rowID,highlightRow)},
            ]
        )
    }
    deleteCell = (rowData,sectionID,rowID,highlightRow)=>{
        if(Platform.OS === 'ios'){
            highlightRow[`${sectionID}${rowID}`].closeRow();
        }
        ary.splice(rowID, 1)
        this.setState({
            dataSource:ds.cloneWithRows(ary)
        })
    }
    onRefresh = ()=>{
        this.requestData()
    }
    onEndReached = ()=>{

    }
    renderFooter = ()=>{
        if(this.state.notMoreData == false){
            return (
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text>已经无更多数据</Text>
                </View>
            )
        }else {
            return (
                <ActivityIndicator
                    animating={true}
                    size="small" />
            )
        }

    }

    componentDidMount() {
        this.requestData()
    }

}
const styles=StyleSheet.create({
    container:{

    },
    content:{
        width:width,
        height:height,
        backgroundColor:'yellow',
        justifyContent:'center',
        alignItems:'center'
    },
    cell:{
        height:100,
        backgroundColor:'purple',
        alignItems:'center',
        justifyContent:'center',
        borderBottomColor:'#ececec',
        borderBottomWidth:1

    },
    divides:{
        height:8
    },
    titlecontentStyle:{
        justifyContent:'space-between',
        flexDirection:'row',
    },
    titleStyle:{
        marginTop:18,
        marginLeft:10,
        fontSize:15,
        fontWeight:'bold',
        color:'#333333'
    },
    typeStyle:{
        width:61,
        height:47,
        marginRight:10
    },
    divide:{
        width:1,
        height:32,
        backgroundColor:'#999'
    },
    numberStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width:75,
    },
    valueStyle:{
        fontSize:14,
        color:'#666666'
    },
    yearStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width:75,
    },
    nameStyle:{
        fontSize:12,
        color:'#999999',
        marginTop:3
    },
    pricevalueStyle:{
        fontSize:16,
        color:'#8B0000'
    },
    priceStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        flex:1,
    },
    contentStyle:{
        borderWidth:1,
        borderColor:'#e5e5e5',
        backgroundColor:'#fff',
        marginLeft:10,
        marginRight:10,
    } ,
    regionStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        width:75,
    },
    myStyleone:{
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:55,
        marginBottom:10
    },
    standaloneRowBack: {
        marginTop:10,
        flexDirection:'row-reverse',
        alignItems:'center',
        padding:40,
        marginTop:10
    },


})
