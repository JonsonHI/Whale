/**
 * 主页
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    navgator,
    Platform,
    Dimensions,
    InteractionManager,
} from 'react-native';
var Swiper = require('react-native-swiper')//轮播组件
import Comm from '../common/constants'
import Main from '../Main/Main'
class GuidePage extends Component {
    constructor(props) {
        super(props);
        // this.renderScene = this.renderScene.bind(this),
        this.start = this.start.bind(this)
 
    }

    render() {
        return (

            <Swiper style={styles.wrapper}
                showsButtons={false}
                paginationStyle={{
                    bottom: Platform.OS === 'ios' ? -20 : -20
                }}
                loop={false}
                >
                <View style={styles.slide1}>
                    <Image source={{ uri: '1.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                </View>
                <View style={styles.slide1}>
                    <Image source={{ uri: '2.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                </View>
                <View style={styles.slide1}>
                    <Image source={{ uri: '3.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                </View>

                <View >

                    <Image source={{ uri: '4.png' }} style={{ height: Comm.window.height, width: Comm.window.width }} />
                    <TouchableOpacity style={{ backgroundColor: 'rgba(0,0,0,0.4)', bottom: 150, width: Comm.window.width, height: 100, }}
                        onPress={() => this.start()}
                        >
                    </TouchableOpacity>
                </View>

            </Swiper>

        );
    }
    start() {
        InteractionManager.runAfterInteractions(() => {
           this.props.navigator.immediatelyResetRouteStack(
                [{
                    component: Main,
                }]
            );


        });
    }
}


var styles = StyleSheet.create({
    wrapper: {
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default GuidePage;
module.exports = GuidePage;