/**
 * Created by Jonson
 */
import React from 'react';
import {connect} from 'react-redux';
// import Search from '../pages/Search';
// import  Search from '../Home/SearchHeader';
import  Search from '../Home/Search';
import  Search3 from '../Home/Search';



class SearchContainer extends React.Component {
    render() {
        return (
            <Search {...this.props} />
        )
    }
}

// export default connect((state) => {
//     const {Search} = state;
//     return {
//         Search
//     }
//<MySearch />

// })(SearchContainer);
module.exports = connect((state) => {
    const {Search} = state;
    return {
        Search
    }
})(SearchContainer);
