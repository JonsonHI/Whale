/* @flow */

import React, { Component } from 'react';
import {
  ListView, View, Text, StyleSheet, TouchableOpacity,
  Dimensions,
} from 'react-native';
import FetchHttpClient, { form, header } from 'fetch-http-client';
const client = new FetchHttpClient();
var screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {

  },
  row: {
    margin: 8,
    padding: 16,
    borderRadius: 3,
    backgroundColor: 'rgba(0, 0, 0, .1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'rgba(0, 0, 0, .4)',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containerline: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  all: {
    flex: 1,
  },
  upStyle: {
    backgroundColor: 'white',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  //包含产地,数量,年份,价格的view
  downStyle: {
    backgroundColor: 'white',
    height: 55,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'flex-start',
    // flexWrap: 'wrap',
    // width: screenWidth / 4.5,
    // marginTop : 5
  },
  //山西太原(300吨或6年)
  upChildStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
    borderLeftColor: '#f4f5f6',
    borderLeftWidth: 1,
  },
  originStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    flex:1
  },
  //产区(数量或年限)
  downChildStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  //300吨和数量(6年和年限  价格)的view
  numberStyle: {
    borderLeftWidth: 1,
    borderLeftColor: '#f4f5f6',
    flex:1,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  //价格
  moneyStyle: {
    borderLeftWidth: 1,
    borderLeftColor: '#f4f5f6',
    flex:2,
    justifyContent: 'center',
    alignItems: 'center',

  },
  texton: {
    fontSize: 16,
    color: '#666666',
  },
  textdown: {
    fontSize: 13,
    color: '#999999',
    marginBottom: 13,
    marginTop: 8,
  },
  texton1: {
    fontSize: 16,
    color: '#666666',

  }
});

export default class ListRecommed extends Component {

  static appbarElevation = 0;

  state = {
    data: [],
    dataSource: new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    }),
  };

  componentWillMount() {
    this._genRows();
  }
  selectRecommedRow() {
    this.props.selectRecommedRow()
  }
  /**
   * 点击查看全部
   */
  recommendLookAll() {
    this.props.recommendLookAll()
  }


  _genRows = () => {
    let url = 'http://rap.taobao.org/mockjsdata/11194/main';
    client.post(url, {
    }).then(response => {

      return response.json();

    }).then((result) => {
      console.log(JSON.stringify(result[0].data));
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(result[0].data)
      });
    }).catch((error) => {
      // alert('网络异常');
    })
  };

  _renderRow = (rowData) => {
    return (
      <TouchableOpacity onPress={() => this.selectRecommedRow()}>
        <View style={styles.containerline}>
          {/*包含酒型和时间的View*/}
          <View style={styles.upStyle}>
            {/*酒型*/}
            <Text style={{ fontSize: 18, color: '#333333', marginLeft: 10, marginTop: 13, fontWeight: 'bold' }} >
              {'酱香型'}
            </Text>
            {/*时间*/}
            <Text style={{ fontSize: 13, color: '#999999', marginRight: 10, marginTop: 18 }} >
              4小时前
            </Text>
          </View>
          {/*产区,数量,年份,价格的View*/}
          <View style={styles.downStyle}>
            {/*包含产地名和产区的view*/}
            {/*产地名*/}
            <View style={styles.originStyle}>
              <Text style={styles.texton} >
                山西太原
                </Text>
              {/*产区*/}
              <Text style={styles.textdown}>
                产区
                </Text>
            </View>
            {/*包含具体产量和数量的view*/}
            <View style={styles.numberStyle}>
              {/*具体的数量*/}

              <Text style={styles.texton}>
                300吨
              </Text>
              {/*数量*/}
              <Text style={styles.textdown}>
                数量
            </Text>
            </View>
            {/*具体年份和年份的view*/}
            {/*具体年份*/}
            <View style={styles.upChildStyle}>
              <Text style={styles.texton}>
                6年
              </Text>
              {/*年份*/}
              <Text style={styles.textdown}>
                年份
              </Text>
            </View>
            {/*价格*/}
            <View style={styles.moneyStyle}>
              <Text style={{ fontSize: 19, color: 'red', textAlign: 'center' }}>
                40000元/吨
              </Text>
            </View>
          </View>
        </View >

      </TouchableOpacity >
    );
  };


  render() {
    return (
      <View style={{ backgroundColor: 'white', flex: 1 }}>
        <ListView
          {...this.props}
          removeClippedSubviews={false}
          contentContainerStyle={styles.container}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          onEndReached={this._genRows}
          ref={el => (this._root = el)}
          scrollEnabled={false}
          />
        <TouchableOpacity onPress={() => this.recommendLookAll()}>
          <View style={{ marginLeft: 0, marginRight: 0, marginTop: 0, backgroundColor: '#8E8E8E', height: 40, justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', }}>查看全部</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
