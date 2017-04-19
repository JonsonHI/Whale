/**
 * Created by Jonson
 */
import React from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
} from 'react-native';
import Constants from '../common/constants';

export default class StatusBarIOS extends React.Component {
    render() {
        return (
            <View>
                <StatusBar {...this.props}/>
                <View style={styles.statusBar} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    statusBar: {
        flex: 1,
        height: 20,
        backgroundColor: Constants.colors.themeColor,
    }
})