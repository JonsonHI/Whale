/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif
#import <UIKit/UIKit.h>

static NSString *appKey = @"22778969ed30cd6204100ef8";    //填写appkey

static NSString *channel = nil;    //填写channel  一般为nil

static BOOL isProduction = false;  //填写isProdurion  平时测试时为false ，生产时填写true
@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;

@end
