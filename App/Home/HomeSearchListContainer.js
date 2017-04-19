/**
 * Created by Jonson
 */
import React from 'react';
import {connect} from 'react-redux';
// import Search from '../pages/Search';
// import  Search from '../Home/SearchHeader';
import  HomeSearchList from './HomeSearchList';




class HomeSearchListContainer extends React.Component {
    render() {
        return (
            <HomeSearchList {...this.props} />
        )
    }
}

export default connect((state) => {
    const { HomeSearchList } = state;
    return {
        HomeSearchList
    }
})(HomeSearchListContainer);
// module.exports = connect((state) => {
//     const {App} = state;
//     return {
//         App
//     }
// })(AppContainer);
