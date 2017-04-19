/**
 * Created by Jonson
 * 根reducer
 */
import { combineReducers } from 'redux';
import Search from './searchReducer';
import App from './appReducer';
import Home from './homeRedeucr';
import MessageList from './messageListReducer';



export default rootReducer = combineReducers({
    Search,
    App,
    Home,
    MessageList,
})