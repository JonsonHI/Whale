import * as types from './actionTypes';


import {
    Platform,
    NetInfo,
} from 'react-native';
import App from '../App'



export let NetInfoContent = (isConnected) => {

    return dispatch => {
        
        // dispatch(receiveNetInfo(isConnected));
        //   if (Platform.OS == 'ios') {
        // NetInfo.isConnected.addEventListener(
        //     'change',
        //     dispatch( _handleConnectivityChange())
        // );
        // } 

        // else {
        // NetInfo.fetch().done((isConnected) => {

        //     // alert('First, is ' + (isConnected ? 'online' : 'offline'));
        //     console.debug('First, is ' + (isConnected ? 'online' : 'offline'));
        //     dispatch(receiveNetInfo(isConnected));
        //     // alert(this.state.Connected+'conner')

        // });

        // }
         dispatch(searchNetInfo());
        NetInfo.isConnected.addEventListener('change', (isConnected) => {
            console.log(isConnected);
            NetInfo.isConnected.removeEventListener('change')
            dispatch(receiveNetInfo(isConnected));
        
        });
       
    }
}

let searchNetInfo = () => {

    return {
        type: types.SEARCH_NET_INFO,
    }
}
let receiveNetInfo = (isConnected) => {
    return {
        type: types.RECEIVE_NET_INFO,
        isConnected: isConnected,
        
    }
}