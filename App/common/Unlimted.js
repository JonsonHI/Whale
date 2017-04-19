/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView

} from 'react-native';

var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
var TimerMixin = require('react-timer-mixin');

var UnlimtedCarousel = React.createClass({

  // 注册定时器
  mixins: [TimerMixin],

  // 设置常量
  getDefaultProps() {

    return {
      duration: 500
    }
  },

  // 初始化变量
  getInitialState() {

    return {currentPage: 0}
  },

  render() {
    return (
        <View style={styles.container}>
  <ScrollView
    ref="scrollView"
    horizontal={false}
    pagingEnabled={true}
    showsHorizontalScrollIndicator={true}
    style={styles.scrollViewStyle}
    onMomentumScrollEnd={(e)=>this.onAnimationEnd(e)}
    onScrollBeginDrag={this.onScrollBeginDrag}
    onScrollEndDrag={this.onScrollEndDrag}
  >
    {this.renderAllImages()}
  </ScrollView>
    <View style={styles.cycleStyle}>
    {this.renderAllCycle()}
  </View>
    </View>
  )
  },
  // 视图绘制完毕之后会调用此方法
  componentDidMount() {
    this.startTimer();
  },

  // 开启定时器
  startTimer() {

    // 拿到scrollView
    var scrollView = this.refs.scrollView;
    // 添加定时器
    this.timer = this.setInterval(function() {

      var tempPage;
      if (this.state.currentPage+1 >=7) {
        tempPage = 0;
      } else {
        tempPage = this.state.currentPage+1;
      }
      // 更新状态机
      this.setState( {
        currentPage: tempPage
      });

      // 改变scrollView的偏移量
      let offSet = tempPage * 50;
      scrollView.scrollTo({x: 0, y: offSet, animated: true});

    }, this.props.duration);
  },

  // 当一帧滚动结束的时候会调用此方法
  onAnimationEnd(e) {
    // 获取偏移量
    let offset = e.nativeEvent.contentOffset.y;
    // 获取页码
    let page = Math.floor(offset / 50);
    // 更新状态机,重新绘制UI
    this.setState({
      currentPage: page
    });
  },

  onScrollBeginDrag() {
    // 清除定时器
    this.clearInterval(this.timer);
  },

  onScrollEndDrag() {
    // 重新开启定时器
    this.startTimer();
  },
  // 返回所有图片
  renderAllImages() {
    var imageItems = [];
    var imageNames = ['萝卜伪饺子.jpg', '亲子丼.jpg', '日式肉末茄子.jpg', '日式烧汁炒牛肉.jpg',
      '日式味噌煎鸡块.jpg', '日式香菇炖鸡翅.jpg', '日式炸天妇罗.jpg'];
    var colors = ['red', 'blue', 'green', 'purple', 'brown', 'black', 'yellow'];

    for (var i=0; i<7; i++) {
      // 将Image装入数组中
      imageItems.push(
      <Image key={i}
      source={{uri: imageNames[i]}}
      style={{backgroundColor: colors[i], width: width, height: 50}} />
    );
    }
    // 返回所有Image
    return imageItems;
  },
  // 设置小圆点
  renderAllCycle() {
    var cycleItems = [];
    var colorStyle;
    for (var i=0; i<7; i++) {
      colorStyle = (i==this.state.currentPage) ? {color: 'gray'} : {color: 'white'}
      cycleItems.push(
      <Text key={i} style={[{fontSize: 30, left: 10}, colorStyle]}>&bull;</Text>
    )
    }
    return cycleItems;
  }
})

// 设置样式
const styles = StyleSheet.create({

  container: {
    width: width,
    height: 300,
    backgroundColor: 'green',
  },

  scrollViewStyle: {
    backgroundColor: 'yellow',
    width:width,
    marginTop: 20
  },

  cycleStyle: {
    backgroundColor: 'rgba(241,241,241,0.5)',
    width: width,
    height: 30,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default UnlimtedCarousel;