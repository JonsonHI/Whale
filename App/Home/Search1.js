/**
 * Created by Jonson.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    ListView,
    InteractionManager,
} from 'react-native';
import {
    fetchRecommendedList,
    setupSearchText,
    selectKeyword,
    fetchCategories,
    fetchKeywords,
} from '../actions/searchActions';
import Common from '../common/constants';
import SearchHeader from '../Home/SearchHeader';
import Loading from '../common/Loading';
import UserDefaults from '../common/UserDefaults';
var historyArray = [
    {
        "kind": "group",
        "categories": [
            {
                "id": 1,
                "name": "主食类",
                "image_url": "http://up.boohee.cn/house/u/food_library/category/1_v1.png",
                "sub_category_count": 3,
                "sub_categories": []
            },
            {
                "id": 2,
                "name": "主食类1",
                "image_url": "http://up.boohee.cn/house/u/food_library/category/1_v1.png",
                "sub_category_count": 3,
                "sub_categories": []
            },
            {
                "id": 3,
                "name": "主食类主食类",
                "image_url": "http://up.boohee.cn/house/u/food_library/category/1_v1.png",
                "sub_category_count": 3,
                "sub_categories": []
            },
            {
                "id": 4,
                "name": "主食类3",
                "image_url": "http://up.boohee.cn/house/u/food_library/category/1_v1.png",
                "sub_category_count": 3,
                "sub_categories": []
            },
            {
                "id": 5,
                "name": "主食类3",
                "image_url": "http://up.boohee.cn/house/u/food_library/category/1_v1.png",
                "sub_category_count": 3,
                "sub_categories": []
            }
        ]
    },
];

let isLoading = true;
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.renderRow = this.renderRow.bind(this);
        this.state = {
            dataSources: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,

            }),
            dataSource: new ListView.DataSource({
                getSectionHeaderData: (data, sectionID) => {
                    return sectionID === 'history' ? '最近搜过' : '大家都在搜';
                },
                rowHasChanged: (row1, row2) => row1 !== row2,
                sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
            }),
        }
    }

    componentDidMount() {
        const {dispatch} = this.props;
        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchKeywords());
        })

    }

    render() {
        const {Search, dispatch} = this.props;
        // 将数据进行分组
        let sectionIDs = [];
        let rowIdentifiers = [];
        let sourceData = null;

        if (Search.history && Search.history.length) {
            sectionIDs.push('history');

            let rowID = [];
            for (let i = 0; i < Search.history.length; i++) {
                rowID.push(i);
            }

            rowID.push('clear');
            rowIdentifiers.push(rowID);
        }

        if (Search.keywordsList && Search.keywordsList.length) {
            sectionIDs.push('keywordsList');
            rowIdentifiers.push([0]);
        }

        if (Search.history && Search.history.length) {
            sourceData = {'history': Search.history, 'keywordsList': [Search.keywordsList]};
        } else {
            sourceData = {'keywordsList': [Search.keywordsList]};
        }



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
                            renderSectionHeader={this.renderSectionHeader}
                            enableEmptySections={true}
                            bounces={false}
                            style={{height: Common.window.height-64, width: Common.window.width}}
                             contentContainerStyle={styles.list}
                            />

                    }
                </View>
                {/**搜索框 */}
                <SearchHeader
                    value={Search.searchText}
                    onChangeText={(text) => {
                        dispatch(setupSearchText(text))
                        dispatch(fetchRecommendedList(text));
                        //    this.handleSearchText(text)
                    } }
                    backAction={() => this.props.navigator.pop()}
                    />
            </View>

        )
    }
    /** 
     * 点击键盘处理时间
    */
    _onPressSearch(event) {
        const {Search, dispatch} = this.props;
        dispatch(selectKeyword(Search.searchText));
        console.log(event.nativeEvent.text + "    点击前往" + Search.history);
    }
    // handleSearchText(keyword) {

    //     if (!keyword || !keyword.trim().length) {
    //         alert('不能为空!');
    //         return;
    //     }

    //     const {dispatch} = this.props;
    //     dispatch(selectKeyword(keyword));
    //     dispatch(fetchRecommendedList(keyword));
    // }

    /**
     * 
     * 自动提示
     * @returns
     * 
     * @memberOf Search
     */
    renderResultView() {
        const {Search, dispatch} = this.props;
        return (
            <View style={{ backgroundColor: 'white' }}>

                <ListView
                    dataSource={this.state.dataSources.cloneWithRows(Search.recomdData)}
                    renderRow={this.renderResultRow}
                    enableEmptySections={true}
                    />
            </View>
        )
    }
    renderResultRow(data) {
        return (
            <View style={{ width: Common.window.width, marginTop: 20, height: 30, borderBottomColor: '#ccc', borderBottomWidth: 0.5, }}>
                <Text style={{ marginLeft: 20 }} >{data} </Text>
            </View>
        )
    }

    renderSectionHeader(sectionHeader) {
        return (
            <View style={styles.sectionHeader}>
                <Text style={{ fontSize: 13, color: 'gray' }}>{sectionHeader}</Text>
            </View>
        )
    }



    handleSearchText(keyword) {

        if (!keyword || !keyword.trim().length) {
            alert('食物名称不能为空!');
            return;
        }

        const {dispatch} = this.props;
        dispatch(selectKeyword(keyword));
    }

    renderRow(keywords, sectionID, rowID) {
          const {dispatch} = this.props;

        if (sectionID == 'history') {

            // 搜索历史记录
            return (
                <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    activeOpacity={0.75}
                    onPress={this.handleSearchText.bind(this, keywords)}
                >
                    <View style={styles.historyTitle}>
                        <Text>{keywords}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

        return (
            <View style={styles.keywordsContainer}>
                {
                    keywords.map((keyword, i) => {
                        let keywordStyle = [styles.keyword]
                        let left = i % 2 === 0 ? 0 : Common.window.width / 2;
                        let top = Math.floor(i / 2) * 44;
                        keywordStyle.push({
                            position: 'absolute',
                            left: left,
                            top: top
                        });
                        return (
                            <TouchableOpacity
                                key={keyword}
                                style={keywordStyle}
                                activeOpacity={0.75}
                                onPress={this.handleSearchText.bind(this, keyword)}
                            >
                                <Text>{keyword}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )

    }

}

const styles = StyleSheet.create({
    list: {
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    listView: {
        flex: 1,

    },
    row: {
        justifyContent: 'center',
        padding: 5,
        margin: 3,
        backgroundColor: '#F6F6F6',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#CCC'
    },
    thumb: {
        width: 45,
        height: 15
    },
    text: {
        flex: 1,
        marginTop: 5,
        fontWeight: 'bold'
    },
    groupCell: {
        borderTopColor: 'rgb(241, 241, 241)',
        borderTopWidth: 10,
        paddingTop: 10,
        height: 500,
        width: Common.window.width

    },


    line: {
        width: 30,
        height: 2,
        marginTop: 10,
    },

    categoryContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        marginLeft: 1,
        width: Common.window.width - 20,
        height: 40,

    },

    category: {
        width: Common.window.width / 4,
        alignItems: 'center',
        marginBottom: 1,
        borderColor: '#ccc',

    },

    categoryTitle: {
        color: 'gray',
        fontSize: 12,
        marginTop: 5,
    },
    categoryView: {
        backgroundColor: '#cccccc',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 10,
    },
    titlestyle: {
        left: 10,

    },
    isHostry: {
        flex: 1,
    },









     historyTitle: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        width: Common.window.width - 15 - 10 - 16,
        marginLeft: 10,
        paddingTop: 15,
        paddingBottom: 15
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
    },

    keyword: {
        width: Common.window.width / 2,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        padding: 15,
    },

    sectionHeader: {
        height: 44,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        paddingTop: 20,
        paddingLeft: 15,
        backgroundColor: 'rgb(245, 246, 247)'
    },

    tag: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#ccc',
        textAlign: 'center',
        padding: 6,
        marginLeft: 10,
    },

    sortTypeCell: {
        flexDirection: 'row',
        height: 40,
        width: Common.window.width,
        borderColor: '#ccc',
        borderBottomWidth: 0.5,
        borderTopWidth: 0.5,
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white'
    },


    foodsCell: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    foodIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },

    titleContainer: {
        height: 40,
        marginLeft: 15,
        justifyContent: 'space-between',
    },

    calory: {
        fontSize: 13,
        color: 'red',
    },

    unit: {
        fontSize: 13,
        color: 'black'
    },

    healthLight: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        marginRight: 0,
    },

    sortType: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Common.window.width - 4 * 10) / 3,
        height: 30,
        borderWidth: 0.5,
        borderColor: '#ccc',
        borderRadius: 5,
        marginLeft: 10,
        marginBottom: 10,
    },

    sortTypesView: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        position: 'absolute',
        backgroundColor: 'white',
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        width: Common.window.width,
        paddingTop: 10,
    },

    subcategoryContainer: {
        position: 'absolute',
        top: 30,
        right: 10,
        width: 150,
        backgroundColor: 'white',
        shadowColor: 'gray',
        shadowOffset: {x: 1.5, y: 1},
        shadowOpacity: 0.5,
    },

    subcategory: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#ccc',
        height: 40,
        justifyContent: 'center',
        padding: 15,
    },

    addCompare: {
        borderWidth: 0.5,
        borderColor: 'red',
        padding: 5,
        paddingLeft: 0,
    }

})
module.exports = Search;