/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import <RCTJPushModule.h>
#ifdef NSFoundationVersionNumber_iOS_9_x_Max
#import <UserNotifications/UserNotifications.h>
#endif

#import "RCTBundleURLProvider.h"
#import "RCTRootView.h"

// ---------------------------start极光推送--------------------------

#import "JPUSHService.h"
#import "RCTLinkingManager.h"




@interface AppDelegate ()

// ---------------------------end极光推送---------------------------

//-(void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler{
// NSDictionary * userInfo = notification.request.content.userInfo;
// if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
// [JPUSHService handleRemoteNotification:userInfo];
// [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
//    }
// completionHandler(UNNotificationPresentationOptionAlert);
//}
//- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
//NSDictionary * userInfo = response.notification.request.content.userInfo;
//if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
//[JPUSHService handleRemoteNotification:userInfo];
//[[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
//}
//completionHandler();
//}
@end

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  
  
  if ([[UIDevice currentDevice].systemVersion floatValue] >= 8.0) {
    
    //可以添加自定义categories
    
    [JPUSHService registerForRemoteNotificationTypes:(UIUserNotificationTypeBadge |
                                                      
                                                      UIUserNotificationTypeSound |
                                                      
                                                      UIUserNotificationTypeAlert)
     
                                          categories:nil];
    
  } else {
    
    //iOS 8以前 categories 必须为nil
    
    [JPUSHService registerForRemoteNotificationTypes:(UIRemoteNotificationTypeBadge |
                                                      
                                                      UIRemoteNotificationTypeSound |
                                                      
                                                      UIRemoteNotificationTypeAlert)
     
                                          categories:nil];
    
  }
  
  [JPUSHService setupWithOption:launchOptions appKey:appKey
   
                        channel:channel apsForProduction:isProduction];
  
  
  
  NSURL *jsCodeLocation;
//    jsCodeLocation = [NSURL URLWithString:@"http://192.168.0.122:8081/index.ios.bundle?platform=ios&dev=true"];
  
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  //  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"WhaleApp"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
  
  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
  
  
  
  
}

- (void)application:(UIApplication *)application
didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  [JPUSHService registerDeviceToken:deviceToken];
}
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo {
  // 取得 APNs 标准信息内容
  
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}
//iOS 7 Remote Notification
- (void)application:(UIApplication *)application didReceiveRemoteNotification:  (NSDictionary *)userInfo fetchCompletionHandler:(void (^)   (UIBackgroundFetchResult))completionHandler {
  
  [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
}

// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(NSInteger))completionHandler {
  // Required
  NSDictionary * userInfo = notification.request.content.userInfo;
  if([notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }
  completionHandler(UNNotificationPresentationOptionAlert); // 需要执行这个方法，选择是否提醒用户，有Badge、Sound、Alert三种类型可以选择设置
}

// iOS 10 Support
- (void)jpushNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)())completionHandler {
  // Required
  NSDictionary * userInfo = response.notification.request.content.userInfo;
  if([response.notification.request.trigger isKindOfClass:[UNPushNotificationTrigger class]]) {
    [JPUSHService handleRemoteNotification:userInfo];
    [[NSNotificationCenter defaultCenter] postNotificationName:kJPFDidReceiveRemoteNotification object:userInfo];
  }
  completionHandler();  // 系统要求执行这个方法
}
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{  return [RCTLinkingManager application:application openURL:url
                       sourceApplication:sourceApplication annotation:annotation];
}
@end
