/**
 * Created by Jonson
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    Platform,
} from 'react-native';
import Common from '../common/constants';
//<View style={{ height: 20, backgroundColor: 'blue' }} >
export default class SearchHeader extends React.Component {
    render() {
        return (


            <View style={styles.searchContainer} >
                {/**textInput */}
                <TextInput style={styles.textInput}
                    underlineColorAndroid='transparent'
                    keyboardType={'web-search'}

                    placeholder='多款基酒任你选'
                    ref={component => this._textInput = component}
                    clearButtonMode={'never'}
                    returnKeyType='search'
                    {...this.props}
                    />
                {/**搜索图 */}
                <Image
                    style={styles.searchIcon}
                    source={{uri:'search'}}
                    />
                {/**返回图 */}
                <TouchableOpacity
                    // style={styles.backIcon}
                    // activeOpacity={0.75}
                    // onPress={this.props.backAction}
                    // onEndEditing={this.props._onPressSearch}
                    >
                    <Image source={require("../image/bugcomit.png")} style={{ height: 30, width: 30, marginLeft: 10, top: 5,marginRight:10 }} />
                </TouchableOpacity>
            </View>





        )
    }

}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        height: Platform.OS === 'ios' ? 64 : 44,
        alignItems: 'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
        backgroundColor: '#0080ff',
    },
    inputText: {
        flex: 1,
        backgroundColor: '#fff',
        fontSize: Platform.OS === 'ios' ? 15 : 11,
        marginTop: Platform.OS === 'ios' ? 0 : 10,
        height: Platform.OS === 'ios' ? 28 : 28,    //通过大于TextInput的高度来弥补上面的问题
        justifyContent: 'flex-end'  //放置到底部
    },
    textInput: {
        flex:1,
        marginBottom:5,
        textAlignVertical:'center',
        paddingLeft: 35,
        padding:Platform.OS === 'ios' ? 0 : 5,
        marginTop: Platform.OS === 'ios' ? 20 : 5,
        fontSize: 15,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginLeft: 15,

    },

    searchIcon: {
        position: 'absolute',
        left: 15,
        top: Platform.OS === 'ios' ? 30 : 12,
        height: 20,
        width: 20,
        marginLeft:10,

    },
    backIcon: {
        position: 'absolute',
        left: 10,
        top: Platform.OS === 'ios' ? 25 : 12,
        height: 20,
        width: 20,
    },
})
module.exports = SearchHeader;