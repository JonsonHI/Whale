/**
 * Created by Jonson
 */
import React from 'react';
import {connect} from 'react-redux';
// import Search from '../pages/Search';
// import  Search from '../Home/SearchHeader';
import  App from './App';




class AppContainer extends React.Component {
    render() {
        return (
            <App {...this.props} />
        )
    }
}

export default connect((state) => {
    const { App } = state;
    return {
        App
    }
})(AppContainer);
// module.exports = connect((state) => {
//     const {App} = state;
//     return {
//         App
//     }
// })(AppContainer);
