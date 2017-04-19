import * as types from './actionTypes';


import {
    Platform,
    NetInfo,
} from 'react-native';
import Home from '../Home/Home'
var flag = 1;


/**
 * 无网络点击事件
 */
export let NetInfoContent = () => {

    return dispatch => {
        dispatch(searchNetInfo());
        NetInfo.isConnected.addEventListener('change', (isConnected) => {
            console.log(isConnected);
            if (!isConnected) {
                // dispatch(receiveNetInfo(isConnected));
                // clearInterval(this.interval);
                return;
            }else{
                if(flag <= 1){
                    dispatch(receiveNetInfo(isConnected));
                    flag++ ;
                }else{
                    return;
                }
            }
        });
    }
}


/**
 * 无网络点击事件
 */
export let NetInfoContentNo = () => {

    return dispatch => {

        dispatch(searchNetInfo());
        NetInfo.isConnected.fetch().done((isConnected) => {
            console.debug(isConnected + '        2222222')
            dispatch(receiveNetInfo(isConnected));
        })
    }
}

/**
 * 
 * 
 * @returns
 */
let searchNetInfo = () => {

    return {
        type: types.SEARCH_NET_INFO,
    }
}
/**
 * 
 * 
 * @param {any} isConnected
 * @returns
 */
let receiveNetInfo = (isConnected) => {

    return {
        type: types.RECEIVE_NET_INFO,
        isConnected: isConnected,

    }
}