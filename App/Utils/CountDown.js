/**
 * Created by Administrator on 2017/1/4.
 */
import React from 'react';
import {
    Image,
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback
    } from 'react-native';
var TimerMixin = require('react-timer-mixin');

var CountDown = React.createClass({
    mixins: [TimerMixin],
    getInitialState: function () {
        return {
            time: this.props.time ? this.props.time : 60,
            disabled: true
        };
    },
    componentDidMount(){
        this._countdown();
    },
    render(){
        var style = [styles.text];
        var component;
        if (this.state.disabled) {
            style.push({color: '#0080ff'});

            component =
                <View
                    style={[styles.wrapper]}
                    >
                    <TouchableWithoutFeedback
                        style={styles.countdownStyles}
                        >
                        <View >
                        <Text style={styles.textStyle}>{this.state.time}秒后重试</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
        } else {
            component =
                <TouchableHighlight
                    style={[styles.wrapper]}
                    onPress={this._onPress}
                    >
                        <Text style={styles.textStyle}>{this.props.text}</Text>
                </TouchableHighlight>
        }
        return (
            component
        )
    },
    _onPress(){
        if (this.state.disabled) {
            //nothing

        } else {
            this.setState({disabled: true});
            this._countdown();
            if(this.props.onPress){
                this.props.onPress();
            }
        }
    },

    _countdown(){
        var timer = function () {
            var time = this.state.time - 1;
            this.setState({time: time});
            if (time > 0) {
                this.setTimeout(timer, 1000);
            } else {
                this.setState({disabled: false});
                this.setState({time: this.props.time ? this.props.time : 60});
            }
        };
        this.setTimeout(timer.bind(this), 1000);
    }
});

var styles = StyleSheet.create({
    text: {
        color: '#fff',
        width:130,
        height:25,
        backgroundColor: '#0080ff',
    },
    wrapper: {
        width:130,
        height:30,
        paddingTop: 5,

        borderRadius:3,
        backgroundColor: '#0080ff',
        alignItems:'center',
        justifyContent:'center',
        marginRight:10
    },countdownStyles:{
        marginRight:10,
        justifyContent:'center',
        alignItems:'center',

    },textStyle:{

        textAlign:'center',
        width:130,
        height:25,
        color:'#fff',
        fontSize:15,

    }
});

module.exports = CountDown;