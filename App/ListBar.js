/* @flow */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TabViewAnimated, TabBarTop } from 'react-native-tab-view';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#222',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
});

export default class ListBar extends Component {

  static title = 'Icon only top bar';
  static appbarElevation = 0;

  static propTypes = {
    style: View.propTypes.style,
  };

  state = {
    index: 0,
    routes: [
      { key: '1', title: '基酒推荐' },  
      { key: '2', title: '基酒推荐' },
      
    ],
  };

  _handleChangeTab = (index) => {
    this.setState({
      index,
    });
  };

  _renderIcon = ({ route }) => {
    
  };

  _renderHeader = (props) => {
    return (
      <TabBarTop
        {...props}
        indicatorStyle={styles.indicator}
        renderIcon={this._renderIcon}
        style={styles.tabbar}
      />
    );
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
      return <View style={[ styles.page, { backgroundColor: 'black' } ]} />;
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
    
    default:
      return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderHeader={this._renderHeader}
        onRequestChangeTab={this._handleChangeTab}
      />
    );
  }
}
