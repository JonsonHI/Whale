/**
 * Created by Jonson
 */
import React from 'react';
import {connect} from 'react-redux';
// import Search from '../pages/Search';
// import  Search from '../Home/SearchHeader';
import  Home from './Home';




class HomeContainer extends React.Component {
    render() {
        return (
            <Home {...this.props} />
        )
    }
}

export default connect((state) => {
    const { Home } = state;
    return {
        Home
    }
})(HomeContainer);
// module.exports = connect((state) => {
//     const {App} = state;
//     return {
//         App
//     }
// })(AppContainer);
