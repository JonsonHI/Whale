/**
 * Created by Jonson
 */
/**
 * Created by ljunb on 16/5/25.
 * 逛吃reducer
 */
import * as types from '../actions/actionTypes';
const initialState = {
    bannerList: [],
    messageList: [],
    isLoading: true,
    isLoadMore: false,
    isRefreshing: false,
};

let messageListReducer = (state = initialState, action={}) => {
   
    switch (action.type) {
        case types.FETCH_FEED_LIST:
            return {
                ...state,
            }
        case types.RECEIVE_FEED_LIST:
            return Object.assign({}, state, {
                messageList: state.isLoadMore ? state.messageList.concat(action.messageList) : action.messageList,
                isRefreshing: false,
                isLoading: false,
            })
        case types.FETCH_MESSAGE_LIST:
            return Object.assign({}, state, {
                isLoadMore: action.isLoadMore,
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading,
            })
        case types.RECEIVE_MESSAGE_LIST:
            return Object.assign({}, state, {
                messageList: state.isLoadMore ? state.messageList.concat(action.messageList) : action.messageList,
                isRefreshing: false,
                isLoading: false,
            })
        default:
            return state;
    }
}

export default messageListReducer;