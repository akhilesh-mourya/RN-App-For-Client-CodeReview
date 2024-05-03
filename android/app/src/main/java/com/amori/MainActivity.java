package com.RNCodeForClientReview;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;
import org.devio.rn.splashscreen.SplashScreen;
import com.proyecto26.inappbrowser.RNInAppBrowserModule;
import com.b8ne.RNPusherPushNotifications.NotificationsMessagingService;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "RNCodeForClientReview";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. Here we use a util class {@link
   * DefaultReactActivityDelegate} which allows you to easily enable Fabric and Concurrent React
   * (aka React 18) with two boolean flags.
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        // If you opted-in for the New Architecture, we enable the Fabric Renderer.
        DefaultNewArchitectureEntryPoint.getFabricEnabled());
  }

  @Override
  protected void onStart() {
    super.onStart();
    RNInAppBrowserModule.onStart(this);
    ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
    NotificationsMessagingService.read(reactInstanceManager, this);
  }
  
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    SplashScreen.show(this, true);
    super.onCreate(null);
  }

  @Override
  public void onNewIntent(Intent intent) {
    super.onNewIntent(intent);
    setIntent(intent);
    ReactInstanceManager reactInstanceManager = getReactNativeHost().getReactInstanceManager();
    NotificationsMessagingService.read(reactInstanceManager, this);
  }
}