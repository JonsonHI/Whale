import React from 'react';
import {connect} from 'react-redux';
import  MessageList from '../Home/MessageList';




class MessageListContainer extends React.Component {
    render() {
        return (
            <MessageList {...this.props} />
        )
    }
}

export default connect((state) => {
    const {MessageList} = state;
    return {
        MessageList
    }

})(MessageListContainer);
// module.exports = connect((state) => {
//     const {Search} = state;
//     return {
//         Search
//     }
// })(MessageListContainer);