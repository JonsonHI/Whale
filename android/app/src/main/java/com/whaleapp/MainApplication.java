package com.whaleapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.theweflex.react.WeChatPackage;

import java.util.Arrays;
import java.util.List;

import cn.jpush.reactnativejpush.JPushPackage;
import cn.reactnative.modules.qq.QQPackage;
import io.rnkit.actionsheetpicker.ASPickerViewPackage;

public class MainApplication extends Application implements ReactApplication {
  private boolean SHUTDOWN_TOAST = true;

  private boolean SHUTDOWN_LOG = true;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new QQPackage(),
            new WeChatPackage(),
          new JPushPackage(SHUTDOWN_TOAST, SHUTDOWN_LOG),
              new ASPickerViewPackage(),
              new ImagePickerPackage(), // <-- add this line
              new HttpCachePackage()// Add this line


      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
