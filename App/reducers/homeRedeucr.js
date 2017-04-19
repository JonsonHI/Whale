/**
 * Created by Jonson
 */
import * as types from '../actions/actionTypes';

const initialState = {
   isConnected:null

}

let homeReducer = (state = initialState, action={})=> {

    switch (action.type) {
         case types.SEARCH_NET_INFO:
            return Object.assign({}, state, {
                ...state
            })
        case types.RECEIVE_NET_INFO:
            return Object.assign({}, state, {
                isConnected: action.isConnected
            })
        case types.RESET_SEARCH_STATE:
            return initialState
        default:
            return state;
    }
}

export default homeReducer;