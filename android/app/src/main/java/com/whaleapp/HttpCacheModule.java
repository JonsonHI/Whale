package com.whaleapp;

import com.facebook.cache.disk.DiskStorageCache;
import com.facebook.cache.disk.FileCache;
import com.facebook.imagepipeline.core.ImagePipelineFactory;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.network.OkHttpClientProvider;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

import okhttp3.Cache;

/**
 * Created by Administrator on 2017/2/20.
 */

public class HttpCacheModule extends ReactContextBaseJavaModule {

    public HttpCacheModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CacheMoudle";//native代码模块的名字
    }
    /**
     * Promise相当于一个代理对象,当需要返回值的时候
     * promise.resolve(obj);这样js中就可以拿到这个代理对象了,在then方法中会返回
     * promise.reject(e);相当于native中报错了,没有拿到返回值,在erro方法中返回erro
     */
    @ReactMethod
    public void clearCache(Promise promise){
        try {
            //清理okhttp的缓存
            Cache cache = OkHttpClientProvider.getOkHttpClient().cache();
            if (cache != null) {
                cache.delete();
            }
            promise.resolve(null);
        } catch(IOException e){
            promise.reject(e);
        }
    }
    /**
     * 获取okhttp缓存的大小
     */
    @ReactMethod
    public void getHttpCacheSize(Promise promise){
        try {
            Cache cache = OkHttpClientProvider.getOkHttpClient().cache();
            promise.resolve(cache != null ? ((double)cache.size()) : 0);
        } catch(IOException e){
            promise.reject(e);
        }
    }
    /**
     * 因为防止fresco还没有初始化的时候,去拿缓存大小的话,这个时候还没有去计算缓存大小
     * 所以直接拿磁盘缓存大小可能为0,其源码中有一个方法去通知更新一下获取缓存大小
     */
    static Method update;
    private void updateCacheSize(DiskStorageCache cache) throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        if (update == null){
            update = DiskStorageCache.class.getDeclaredMethod("maybeUpdateFileCacheSize");
            update.setAccessible(true);
        }
        update.invoke(cache);
    }

    @ReactMethod
    public void getImageCacheSize(Promise promise){
        FileCache cache1 = ImagePipelineFactory.getInstance().getMainDiskStorageCache();
        long size1 = cache1.getSize();
        if (size1 < 0){
            try {
                updateCacheSize((DiskStorageCache)cache1);
            } catch (Exception e){
                promise.reject(e);
                return;
            }
            size1 = cache1.getSize();
        }
        FileCache cache2 = ImagePipelineFactory.getInstance().getSmallImageDiskStorageCache();
        long size2 = cache2.getSize();
        if (size2 < 0){
            try {
                updateCacheSize((DiskStorageCache)cache2);
            } catch (Exception e){
                promise.reject(e);
                return;
            }
            size2 = cache2.getSize();
        }
        promise.resolve(((double)(size1+size2)));
    }

    @ReactMethod
    public void clearImageCache(Promise promise){
        FileCache cache1 = ImagePipelineFactory.getInstance().getMainFileCache();
        cache1.clearAll();
        FileCache cache2 = ImagePipelineFactory.getInstance().getSmallImageFileCache();
        cache2.clearAll();
        promise.resolve(null);
    }
}