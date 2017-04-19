/**
 * 主页
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
    Dimensions,
    TextInput,
    InteractionManager,

} from 'react-native';
import SearchHeader from '../Home/SearchHeader'
import Search from '../Home/Search'
import SGListView from 'react-native-sglistview';
import Comm from '../common/constants'
var wineJson3 = require('../Base/Wine3.json');
var LIST_VIEW = "listview";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }


    }
    componentDidMount() {

    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: '#F2F2F2' }}>
                <SearchHeader
                    backAction={() => {
                        this.props.navigator.pop();
                    } }
                    value={this.props.text}
                    />
                <Text>搜索出{4}个相关结果</Text>
                <SGListView
                    dataSource={this.getDataSource()}
                    onEndReached={this.props.onEndReached}
                    initialListSize={1}
                    stickyHeaderIndices={[]}
                    scrollRenderAheadDistance={1}
                    onEndReachedThreshold={1}
                    renderRow={this.renderRow}
                    pageSize={1}
                    enableEmptySections={true}
                    ref={LIST_VIEW}
                    />

            </View>


        );
    }

    getDataSource() {
        var dataSource = new ListView.DataSource(
            { rowHasChanged: (r1, r2) => r1.uuid !== r2.uuid });

        var deals = wineJson3.length > 0;
        return deals ? dataSource.cloneWithRows(wineJson3) : dataSource;
    }

    renderRow(rowData) {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.hideModal()}>
                    <View style={{ opacity: 0.5, backgroundColor: 'black', width: Comm.window.width / 5, height: Comm.window.height }} />
                </TouchableOpacity>
                <View style={{ width: Comm.window.width * 4 / 5, backgroundColor: 'white' }}>
                </View>
            </View>
        );
    }



};


var styles = StyleSheet.create({
    container1: {
        marginTop: Platform.OS == 'ios' ? 0 : 0
    },
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        top: Platform.OS === 'ios' ? 0 : 0,
    },



});

export default Home;