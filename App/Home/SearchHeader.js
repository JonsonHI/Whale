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
                <TouchableOpacity
                    style={styles.backIcon}
                    activeOpacity={0.75}
                    onPress={this.props.backAction}
                    onEndEditing={this.props._onPressSearch}
                    >
                    <Image
                        style={{ height: 15, width: 15,marginLeft:10}}
                        source={{uri:'back'}}
                        />
                </TouchableOpacity>
                <View style={{ marginTop: Platform.OS === 'ios' ? 20 : 0,borderRadius:5,height:30,marginRight:20,alignItems:'center',backgroundColor:'#fff',flex:1,flexDirection:'row'}}>
                {/**textInput */}
                    {/**搜索图 */}
                    <Image
                        style={styles.searchIcon}
                        source={{uri:'search'}}
                        />

                    <TextInput style={styles.textInput}
                               underlineColorAndroid='transparent'
                               keyboardType={'web-search'}
                               placeholder='多款基酒任你选'
                               ref={component => this._textInput = component}
                               clearButtonMode={'never'}
                               returnKeyType='search'
                        {...this.props}
                        />

                </View>
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
        backgroundColor: '#0c7aff',

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
        textAlignVertical:'center',
        marginLeft:10,
        padding:Platform.OS === 'ios' ? 0 : 0,

        fontSize: 15,

    },

    searchIcon: {
       marginLeft:10,
        width:15,
        height:15
    },
    backIcon: {
        marginTop:Platform.OS === 'ios' ? 20 : 0,
        width:35,
        height:44,
        justifyContent:'center'
    },
})
module.exports = SearchHeader;