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
    ScrollView,
    Platform,

} from 'react-native';
var jsonData = require('./ImageData.json');//导入自定义数据
var Dimensions = require('Dimensions');
var {width} = Dimensions.get('window');
var TimerMixin = require('react-timer-mixin');

var UnlimtedCarousel = React.createClass({

    // 注册定时器
    mixins: [TimerMixin],

    // 设置常量
    getDefaultProps() {

        return {
            duration: 2000
        }
    },

    // 初始化变量
    getInitialState() {

        return { currentPage: 0 }
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
                    onMomentumScrollEnd={(e) => this.onAnimationEnd(e)}
                    >
                    {this.renderAllImages()}
                </ScrollView>
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
        var imgCount = jsonData.data.length;
        this.timer = this.setInterval(function () {

            var tempPage;
            if (this.state.currentPage + 1 >= imgCount) {
                tempPage = 0;
            } else {
                tempPage = this.state.currentPage + 1;
            }
            // 更新状态机
            this.setState({
                currentPage: tempPage 
            });

            // 改变scrollView的偏移量
            let offSet = tempPage * 35;
            scrollView.scrollTo({ x: 0, y: offSet, animated: true });

        }, this.props.duration);
    },

    // 当一帧滚动结束的时候会调用此方法
    onAnimationEnd(e) {
        // 获取偏移量
        let offset = e.nativeEvent.contentOffset.y;
        // 获取页码
        let page = Math.floor(offset / 35);
        // 更新状态机,重新绘制UI
        this.setState({
            currentPage: page
        });
    },

    // onScrollBeginDrag() {
    //     // 清除定时器
    //     this.clearInterval(this.timer);
    // },

    // onScrollEndDrag() {
    //     // 重新开启定时器
    //     this.startTimer();
    // },
    // 返回所有图片
    renderAllImages() {
         var imgArr = [];
        var imgData = jsonData.data;
        for (var i in imgData) {
            if (imgData[i].title.length > 15) {
                imgData[i].title = imgData[i].title.substr(0, 15) + '...'
            }
            imgArr.push(
                <Text 
                    key={i}
                    source={{ uri: imgData[i].title }}
                    style={{ paddingTop:Platform.OS === 'ios'? 4 : 2.5, width: width, height: 35, marginLeft: 10,fontSize:15,alignItems: 'center',justifyContent: 'center', }}
                    >
                    {imgData[i].title}
                </Text>
            )
        }
        return imgArr;
    },
    // 设置小圆点
    // renderAllCycle() {
    //     var cycleItems = [];
    //     var colorStyle;
    //     for (var i = 0; i < 7; i++) {
    //         colorStyle = (i == this.state.currentPage) ? { color: 'gray' } : { color: 'white' }
    //         cycleItems.push(
    //             <Text key={i} style={[{ fontSize: 30, left: 10 }, colorStyle]}>&bull;</Text>
    //         )
    //     }
    //     return cycleItems;
    // }
})

// 设置样式
const styles = StyleSheet.create({

    container: {
        width: width,
        height: 35,
        backgroundColor: 'white',
    
    },

    scrollViewStyle: {
        backgroundColor: 'white',
        width: width,
        marginTop:5
    },

    cycleStyle: {
        backgroundColor: 'rgba(241,241,241,0.5)',
        width: width,
        height: 35,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center'
    }
});

// AppRegistry.registerComponent('UnlimtedCarousel', () => UnlimtedCarousel);
module.exports = UnlimtedCarousel;
