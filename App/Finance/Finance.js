/**
 *金融
*/
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage,
    ScrollView,
} from 'react-native';
import UserDefaults from '../common/UserDefaults';//存值
import Common from '../common/constants';//存值
import App from '../App' //APP


var NavigatorBar = require('../Main/NXNavigationBar'); //NavigationBar


var Finance = React.createClass({
    getInitialState() {
        return {
            isCollect: true,
        }
    },
    render() {
        return (
            <View style={styles.container}>
                <NavigatorBar title='中酒贷金融' widthWH={Platform.OS == 'ios' ? 25 : 25} />
                <ScrollView style={{ backgroundColor: 'white' }}
                showsVerticalScrollIndicator = {false}
                >
                    <View style={{ alignItems: "center", marginTop: 20 }}>
                        <Text style={{ fontSize: 17, textAlign: 'auto', justifyContent: 'center' }}>什么是中酒贷</Text>
                        <View style={{ height: 2, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width - 150 }} />
                        <Text style={{ fontSize: 17, textAlign: 'auto', justifyContent: 'center', alignItems: "center", width: Common.window.width - 20, marginTop: 20 }}>
                            {'     中酒贷是一款专注于酒行业的全生态供应链金融服务产品。由中酒国际发起，凭借基酒在线平台和专业的服务团队，通过提供优质便捷的金融服务来满足市场需求。'}
                        </Text>
                        <Image
                            // source={ require('../image/1.png') }
                            source={{ uri: 'http://imgsrc.baidu.com/forum/pic/item/b785beb7d0a20cf42845940d76094b36adaf9916.jpg' }}
                            style={{ height: 200, width: Common.window.width, resizeMode: 'contain', marginTop: 8 }} />
                        <View style={{ height: 8, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width }} />
                        <Text style={{ fontSize: 17, textAlign: 'auto', justifyContent: 'center', marginTop: 10 }}>为什么选择中酒贷</Text>
                        <View style={{ height: 2, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width - 150 }} />
                        <Text style={{ fontSize: 17, textAlign: 'auto', justifyContent: 'center', alignItems: "center", width: Common.window.width - 20, marginTop: 20 }}>
                            {'      中酒国际拥有贯通厂商、经销商、电子商务及终端客户的架构体系，拥有国家政策以及各级机构的强力支持，拥有专业的项目、渠道以及网络运营团队，拥有严谨有效的金融咨询及投资策略体系，更拥有打通各个环节的综合整合能力。中酒国际将在粮食贸易以及供应链金融方面为广大酒企提供多方位的服务与支持.'}
                        </Text>
                        <View style={{ height: 8, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width }} />
                        <Text style={{ fontSize: 17, textAlign: 'auto', justifyContent: 'center', marginTop: 10 }}>服务和产品</Text>
                        <View style={{ height: 2, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width - 150 }} />
                        <Image
                            // source={ require('../image/1.png') }
                            source={{ uri: 'http://imgsrc.baidu.com/forum/pic/item/b785beb7d0a20cf42845940d76094b36adaf9916.jpg' }}
                            style={{ height: 200, width: Common.window.width, resizeMode: 'contain', marginTop: 8 }} />
                        <View style={{ height: 8, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width }} />
                        <Text style={{ fontSize: 17, textAlign: 'auto', justifyContent: 'center', marginTop: 10 }}>中酒贷款流程</Text>
                        <View style={{ height: 2, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width - 150 }} />
                        <Image
                            // source={ require('../image/1.png') }
                            source={{ uri: 'http://imgsrc.baidu.com/forum/pic/item/b785beb7d0a20cf42845940d76094b36adaf9916.jpg' }}
                            style={{ height: 200, width: Common.window.width, resizeMode: 'contain', marginTop: 8 }} />
                        <View style={{ height: 8, backgroundColor: '#F2F2F2', marginTop: 3, width: Common.window.width }} />

                    </View>
                    <View style={styles.containerbottm}>
                        <Image style={styles.image_left} source={{ uri: 'http://imgsrc.baidu.com/forum/pic/item/b785beb7d0a20cf42845940d76094b36adaf9916.jpg' }}></Image>
                        <View style={styles.right_back_view}>
                            <Text style={styles.title_text} numberOfLines={2}>{'请在电脑浏览器的以下网址的“找资金”中申请贷款'}</Text>
                            <Text style={styles.title_text} numberOfLines={2}>{'http://www.xxxxxxxxx.com'}</Text>
                        </View>
                    </View>


                    <TouchableOpacity onPress={() => this.logout()}>
                        <Text style={styles.welcome}>
                            注销登录
                </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    },
    componentWillReceiveProps() {

    },
    componentWillMount() {

    },
    logout() {
        UserDefaults.clearCachedObject(Common.storeKeys.LOGIN_SUCCESS_USERNAME_PSW_STATE);
        this.props.navigator.immediatelyResetRouteStack([
            {
                component:App
            }
        ])
    }
});


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    containerbottm: {
        width: Common.window.width - 25,
        marginLeft: 15,
        marginRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1,

    },
    image_left: {
        height: 60,
        width: 60,
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        borderRadius: 30,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    foodsCell: {
        flexDirection: 'row',
        width: Common.window.width,
        marginTop: 10,
        alignItems: "center"
    },

    foodIcon: {
        width: 40,
        height: 40,
        marginLeft: 20,
    },


    titleContainer: {
        height: 40,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 20,
        justifyContent: 'space-between',

    },
    title_text: {
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginLeft: 0,
        paddingTop: 0,
        paddingBottom: 5,
        fontSize: 16,
        // fontWeight: '200',

    },

    right_back_view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 10,
        // backgroundColor: 'red',
    },
});

module.exports = Finance;
