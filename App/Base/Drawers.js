/**
 * rn-drawer example app
 * https://github.com/facebook/react-native
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
    Platform,
} from 'react-native';

import styles from '../Base/styles';
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  }
}

import Drawer from 'react-native-drawer';
var Base = require( '../Base/Base');//详情界面
var BaseDetail = require('./BaseDetail');//详情界面
var Basecotrol = require('./Basecotrol');
import tweens from '../Base/tweens';
var Dimensions = require('Dimensions'); //Dimensions
var screenWidth = Dimensions.get('window').width; //屏宽
var screenHeight = Dimensions.get('window').height;//屏高
var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar
// import App from '../Main/Main'
var App =  require( '../App')
let counter = 0;
export class Drawers extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: 'overlay',
      openDrawerOffset:(viewport) => viewport.width - screenWidth*4/5,
      closedDrawerOffset:0,
      panOpenMask: .1,
      panCloseMask: .9,
      relativeDrag: false,
      panThreshold: .25,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: 'linear',
      disabled: true,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: false,
      negotiatePan: false,
      rightSide: true,
    };
  }

  setDrawerType(type){
    this.setState({
      drawerType: type
    })
  }

  tweenHandler(ratio){
    if(!this.state.tweenHandlerPreset){ return {} }
    return tweens[this.state.tweenHandlerPreset](ratio)
  }

  noopChange(){
    this.setState({
      changeVal: Math.random()
    })
  }

  openDrawer(){
    console.log('点击了')
    this.drawer.open()
  }
    closeDrawer(){

        this.drawer.close()
    }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    var controlPanel = <Basecotrol closeDrawer={() => {
      this.drawer.close();
    }} />
    return (
    <Drawer
        ref={c => this.drawer = c}
        type={this.state.drawerType}
        animation={this.state.animation}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        relativeDrag={this.state.relativeDrag}
        panThreshold={this.state.panThreshold}
        content={controlPanel}
        styles={drawerStyles}
        disabled={this.state.disabled}
        tweenHandler={this.tweenHandler.bind(this)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={this.state.acceptDoubleTap}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        negotiatePan={this.state.negotiatePan}
        changeVal={this.state.changeVal}
        side={this.state.rightSide ? 'right' : 'left'}
        >

        <App
          drawerType={this.state.drawerType}
          setParentState={this.setStateFrag.bind(this)}
          openDrawer={this.openDrawer.bind(this)}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
           panOpenMask={this.state.panOpenMask}
          navigator = {this.props.navigator}
          panCloseMask={this.state.panCloseMask}
          relativeDrag= {this.state.relativeDrag}
          panStartCompensation= {this.state.panStartCompensation}
          tweenHandlerOn={this.state.tweenHandlerOn}
          disabled={this.state.disabled}
          panThreshold={this.state.panThreshold}
          tweenEasing={this.state.tweenEasing}
          tweenHandlerPreset={this.state.tweenHandlerPreset}
          animation={this.state.animation}
          noopChange={this.noopChange.bind(this)}
          acceptTap={this.state.acceptTap}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          rightSide={this.state.rightSide}
          />
      </Drawer>
    );
  }
}

module.exports = Drawers;
AppRegistry.registerComponent('Drawers', () => Drawers);

