/**
 * Created by Jonson on 16/6/5.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    Image,
    ListView,
    TouchableOpacity,
    InteractionManager
} from 'react-native';

import {
    fetchKeywords,
    fetchRecommendedList,
    selectKeyword,
    resetState,
    setupSearchText,
    clearHistory
} from '../actions/searchActions';

import Common from '../common/constants';//工具类
import SearchHeader from '../Home/SearchHeader';//头文件
// import  BaseDetail from'./BaseDetail';//详情界面
// var BaseDetail = require('../Base/BaseDetail');//详情界面
import HomeSearchListContainer from '../Home/HomeSearchListContainer'
var height = 40;
export default class Search extends React.Component {

    constructor(props) {
        super(props);

        this.renderRow = this.renderRow.bind(this);
        this.renderResultRow = this.renderResultRow.bind(this);
        // this.pushSearchListRow = this.pushSearchListRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                getSectionHeaderData: (data, sectionID) => {
                    return sectionID == 'history' ? '历史搜索' : '热门推荐';
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            })
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchKeywords());
        })
    }

    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(resetState());
    }

    /**
     * 
     * 
     * @returns
     * 
     * @memberOf Search
     */
    render() {

        const {Search, dispatch} = this.props;

        // 将数据进行分组
        let sectionIDs = [];
        let rowIdentifiers = [];
        let sourceData = null;

        if (Search.history.length) {

            sectionIDs.push('history');
            rowIdentifiers.push([0]);
        }

        if (Search.keywordsList.length) {
            sectionIDs.push('keywordsList');
            rowIdentifiers.push([0]);
        }

        if (Search.history.length) {
            sourceData = { 'history': [Search.history], 'keywordsList': [Search.keywordsList] };
        } else {
            sourceData = { 'keywordsList': [Search.keywordsList] };
        }
        //实现页面本页面切换2个页面
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ position: 'absolute', top: 64, }}>
                    {/**切换文字效应*/}
                    {Search.searchText ?
                        this.renderResultView()
                        :
                        <ListView
                            dataSource={this.state.dataSource.cloneWithRowsAndSections(sourceData, sectionIDs, rowIdentifiers)}
                            renderRow={this.renderRow}
                            enableEmptySections={true}
                            bounces={false}

                            />

                    }
                </View>
                <SearchHeader
                    backAction={() => {
                        this.props.navigator.pop();
                    } }

                    value={Search.searchText}
                    onChangeText={(text) => {
                        // if(text === 'null'){
                        //     return;
                        // }
                        dispatch(setupSearchText(text))
                        dispatch(fetchRecommendedList(text));
                    } }
                    onEndEditing={this.pushToResultPage.bind(this, Search.searchText)}
                    />

            </View>
        )
    }


    /**
     * 
     * 点击跳转和搜索的跳转
     * @param {any} keyword 关键字
     * @returns
     * 实现思路为 耗时任务放到线程,并且判断是否为空格和空字符串
     * @memberOf Search
     */
    pushToResultPage(keyword) {
        if (!keyword || !keyword.trim().length) {
            if (!keyword) {
                return;
            }
            alert('名称不能为空!');
            return;

        }

        const {dispatch} = this.props;

        
        dispatch(selectKeyword(keyword));
        dispatch(fetchRecommendedList(keyword));
    }
    pushSearchListRow(data){
        // console.debug('点击了'+data[0])
        InteractionManager.runAfterInteractions(() => {
            this.props.navigator.push({
                name: 'HomeSearchListContainer',
                component: HomeSearchListContainer,
                passProps: {
                    text :data,
                },
            })
        })
    }

    /**
     * 实现思路:并没有使用组头,而是把数据分为2个数组,
     * 分别传入2个不同的布局,每个布局自行设置组头.
     * 并可以更好的设置组头了的图片来做删除功能.
     * 
     * @param {any} keywords 数据源数据
     * @param {any} sectionID 组
     * @param {any} rowID 行
     * @returns
     * 
     * @memberOf Search
     */
    renderRow(keywords, sectionID, rowID) {

        const {dispatch} = this.props;

        if (sectionID == 'history') {

            // 搜索历史记录
            return (
                <View>
                    <View style={styles.sectionHeaderClean}>
                        <Text style={styles.sectionHeaderCleanText}>历史搜索</Text>
                        <TouchableOpacity
                            activeOpacity={0.75}
                            onPress={() => dispatch(clearHistory())}
                            >
                            <Image source={require("../image/close.png")} style={styles.sectionHeaderCleanImg}>
                            </Image>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.keywordsContainer}>
                        {
                            keywords.map((keyword) => {

                                return (
                                    <TouchableOpacity
                                        key={keyword}
                                        style={styles.keyword}
                                        activeOpacity={0.75}
                                        onPress={this.pushToResultPage.bind(this, keyword)}
                                        >
                                        <View style={styles.keywords}>
                                            <Text style={styles.fonts}>{keyword}</Text>
                                        </View>

                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>
                </View>
            )
        }

        return (
            <View>
                <View style={styles.sectionHeaderClean}>
                    <Text style={{ fontSize: 13, color: 'gray', marginLeft: 15 }}>热门搜索</Text>
                </View>
                <View style={styles.keywordsContainer}>

                    {
                        keywords.map((keyword) => {
                            return (
                                <TouchableOpacity
                                    key={keyword}
                                    style={styles.keyword}
                                    activeOpacity={0.75}
                                    onPress={this.pushToResultPage.bind(this, keyword)}
                                    >
                                    <View style={styles.keywords}>
                                        <Text style={styles.fonts}>{keyword}</Text>
                                    </View>

                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
        )
    }

    /**
     * 如果搜索框有信息会显示的列表
     *
     * @returns
     *
     * @memberOf Search
     */
    renderResultView() {
        const {Search, dispatch} = this.props;
        return (
            <View style={{ backgroundColor: 'white' }}>

                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(Search.recomdData)}
                    renderRow={this.renderResultRow}
                    enableEmptySections={true}
                    />
            </View>
        )
    }
    /**
     * 列表数据
     *
     * @param {any} data
     * @returns
     *
     * @memberOf Search
     */
    renderResultRow(data) {
        return (
            <TouchableOpacity onPress={()=>this.pushSearchListRow(data)}
            >
                <View style={{ width: Common.window.width, marginTop: 20, height: 30, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                    <Text style={{ marginLeft: 20 }} >{data} </Text>
                </View>
            </TouchableOpacity>
        )
    }

    /**
     * 清楚历史记录
     * @memberOf Search
     */
    cleanData() {

    }

}

const styles = StyleSheet.create({
    historyTitle: {
        width: Common.window.width - 15 - 10 - 16,
        marginLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },

    historyIcon: {
        height: 16,
        width: 16,
        marginLeft: 15
    },

    clearHistoryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
    },

    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        //  textAlign:'center'

    },

    keyword: {
        width: Common.window.width / 3,
        padding: 15,
        height: 60
    },
    keywords: {
        backgroundColor: 'rgb(245, 246, 247)',
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,

    },
    fonts: {
        fontSize: 18,

    },

    sectionHeader: {
        height: 44,
        paddingTop: 20,
        paddingLeft: 15,

    },
    sectionHeaderClean: {
        height: 44,
        paddingTop: 20,
        flexDirection: 'row',
    },
    sectionHeaderCleanText: {
        fontSize: 13,
        color: 'gray',
        marginLeft: 15,
    },
    sectionHeaderCleanImg: {

        marginLeft: Common.window.width - 100,
        height: 15,
        width: 15,
    },
})