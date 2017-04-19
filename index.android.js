import React, { Component } from 'react';
import {
    AppRegistry,
} from 'react-native';
import RootApp from './App/Root';
import RootStart from './App/RootStart';
// import Uicon from './App/common/Unlimted';
// var Uicon = require('./App/common/Unlimted') ;
AppRegistry.registerComponent('WhaleApp', () => RootStart);