/**
 * 
 * 自定义中间按钮类
 */
'use strict'

import React, { Component } from 'react';

import {
	Image,
	Text,
	View,
	StyleSheet,
	WebView,
	TouchableHighlight,
	TouchableOpacity,
	Platform,
} from 'react-native';
var discount_url = 'http://api.meituan.com/group/v1/deal/topic/discount/city/1?ci=1&client=iphone&movieBundleVersion=100&msid=48E2B810-805D-4821-9CDD-D5C9E01BC98A2015-06-17-14-50363&userid=10086&utm_campaign=AgroupBgroupD100Fab_chunceshishuju__a__a___b1junglehomepagecatesort__b__leftflow___ab_gxhceshi__nostrategy__leftflow___ab_gxhceshi0202__b__a___ab_pindaochangsha__a__leftflow___ab_xinkeceshi__b__leftflow___ab_gxtest__gd__leftflow___ab_gxh_82__nostrategy__leftflow___ab_pindaoshenyang__a__leftflow___i_group_5_2_deallist_poitype__d__d___ab_b_food_57_purepoilist_extinfo__a__a___ab_trip_yidizhoubianyou__b__leftflow___ab_i_group_5_3_poidetaildeallist__a__b___ab_waimaizhanshi__b__b1___a20141120nanning__m1__leftflow___ab_pindaoquxincelue__a__leftflow___ab_i_group_5_5_onsite__b__b___ab_i_group_5_6_searchkuang__a__leftflow&utm_content=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&utm_medium=iphone&utm_source=AppStore&utm_term=5.7&uuid=4B8C0B46F5B0527D55EA292904FD7E12E48FB7BEA8DF50BFE7828AF7F20BB08D&version_name=5.7';
var Base = require('../Base/Base');
{/**定义数据 */ }
var resultsCache = {
	discountData: {},//商家列表数据
};
var cardData = [{
	imgurl: 'jijiu_icon.png',
	maintitle: '找基酒',
	imgurlandroid: 'jijiu'

}, {
	imgurl: 'money_icon.png',
	maintitle: '找资金',
	imgurlandroid: 'money_icon'

}, {
	imgurl: 'news_icon.png',
	maintitle: '看资讯',
	imgurlandroid :'news'

}

];


var IconCell = React.createClass({
	//初始化
	getInitialState: function () {
		return {
			isLoading: false,
			dataSource: cardData,
		};
	},
	getDefaultProps() {
		//回调函数
		return {
			selectCellAction: null,
		}
	},

	// componentDidMount: function () {
	// 	this.getDiscountData();
	// },
	// componentWillUnmount() {
	
	// },
	// getDiscountData: function () {
	// 	resultsCache.discountData = null;

		
	// 	var fetchOptions = {
	// 		method: 'GET',
	// 	};
	// 	fetch(discount_url, fetchOptions)
	// 		.then((response) => response.json())

	// 		.catch((error) => {
	// 			resultsCache.discountData = null;
				
	// 		})
	// 		.then((responseData) => {
	// 			if (responseData) {
	// 				resultsCache.discountData = responseData.data;
	// 				this.setState({
	// 					isLoading: false,
	// 					dataSource: resultsCache.discountData,
	// 				});
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			console.debug('获取网络图错误iconCell')
    //     })

	// },
	// getImage: function (url): string {
	// 	// return ('http://p0.meituan.net/200.120/deal/667c7aa92a0c04779e266bbfa7d77c64316233.jpg');
	// 	if (url.search('w.h') === -1) {
	// 		return (url);
	// 	} else {
	// 		url = url.replace('w.h', '200.120');
	// 		return (url);
	// 	}
	// },
	test: function (i) {
		this.props.onSelect1(i)
	},

	renderItem: function (data) {
		var weakself = this;
		var group = data.map(function (item, i) {
			// var imgurl = item.imgurl;
			// var weburl = item.share.url;
			return (
				<TouchableHighlight key={i}
					style={styles.touch}
					onPress={() => weakself.test(i)}>
					<View style={styles.boxtd}>
					{
						Platform.OS === 'ios' ?
						<Image
							style={styles.cardImg}
							source={{ uri: item.imgurl }}
							/>
							:
						<Image
							style={styles.cardImg}
							source={{ uri: item.imgurlandroid }}
							/>	
					}
						<Text style={styles.cardText}>
							{/**描述 */}
							{item.maintitle}
						</Text>
					</View>

				</TouchableHighlight>
			);
		});

		return (
			<View style={styles.container1}>
				<View style={styles.boxtr}>
					{group.slice()}
				</View>
			</View>
		)
	},

	render: function () {
		if (this.state.dataSource === null) {
			return (
				<Text>

				</Text>
			);
		} else {
			return (
				<View style={styles.container}>
					<View style={styles.boxtr}>
						{this.renderItem(this.state.dataSource)}
					</View>
				</View>
			);
		}
	},
});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',

	},
	container1: {
		flex: 1,
		backgroundColor: '#fff',
		marginTop:13,
	},
	boxtr: {
		flexDirection: 'row',
		justifyContent: 'center',
		paddingTop: 3,
		paddingBottom: 10,
		paddingLeft: 5,
		paddingRight: 5,

	},
	boxtd: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	cardImg: {
		width: 58,
		height: 42,
		marginTop:5,
		marginBottom:5
	},
	cardText: {
		color: '#333',
		fontSize: 14,
		marginTop: 6,
	},
	row: {
		flexDirection: 'row',
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		borderBottomColor: 'rgba( 0, 0, 0, 0.1 )',
		borderBottomWidth: 1,
		borderRightColor: 'rgba( 0, 0, 0, 0.1 )',
		borderRightWidth: 1,
	},
	title: {
		flex: 1,
		alignItems: 'center',
		marginTop: 10,
	},
	itemImg: {
		width: 42,
		height: 21,
		marginTop: 1,
	},
	touch: {
		flex: 1,
		backgroundColor: 'white',
	},
});

module.exports = IconCell;