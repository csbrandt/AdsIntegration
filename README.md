# Unity Ads for Android Integration using Unity Editor on Ubuntu Linux

This guide will walk through the steps to build a project that targets the Android platform and integrates with the [Unity Ads](https://unity3d.com/services/ads) service using the [Unity Editor](http://unity3d.com/unity/editor/) on Ubuntu Linux.

## Prerequisites

+ [Unity ID](https://id.unity.com/account/new)
+ 64-bit Ubuntu Linux 12.04 or newer
+ OpenJDK
+ [Android SDK](http://developer.android.com/sdk/index.html#download)
+ Official Unity Editor Installer for 64-bit Ubuntu Linux

## Install

#### OpenJDK

    $ apt-get install openjdk-7-jdk

#### Android SDK

Visit [Android SDK](http://developer.android.com/sdk/index.html#download) site and download the Android SDK for Linux. Extract the contents of the archive to any location.

#### Official Unity Editor Installer

Visit [Unity on Linux: Release Notes and Known Issues](http://forum.unity3d.com/threads/unity-on-linux-release-notes-and-known-issues.350256/) and go to the last post in this thread to download the latest build of the **Official Installers for 64-bit Ubuntu Linux**. Open the .deb package with Ubuntu Software Center and install. It will take care of installing the necessary dependencies as well.

## Integration

1. Select target platform
   + Select **File** | **Build Settings...**
   + Select **Android** from the **Platform** list
   + Click **Switch Platform**

2. Enable Unity Ads
   + Select **Window** | **Services**
   + Select **Ads** from the **Services** window
   + Click the toggle in the upper-right corner to enable Ads
   + Indicate if your game is designed for children under 13 years old
   * Click **Save Changes**

## Showing an Ad

To demonstrate the integration we can add a sample script that will show an ad on start.

+ Select **Assets** | **Create** | **JavaScript** then right-click | **Open** the new file and paste the following script.

```
#pragma strict
import UnityEngine.Advertisements; // Import the Unity Ads namespace.

#if !UNITY_ADS // If the Ads service is not enabled...
public var gameId : String; // Set this value from the inspector.
public var enableTestMode : boolean = true;
#endif

function Start () : IEnumerator
{
   #if !UNITY_ADS // If the Ads service is not enabled...
   if (Advertisement.isSupported) { // If runtime platform is supported...
      Advertisement.Initialize(gameId, enableTestMode); // ...initialize.
   }
   #endif

   // Wait until Unity Ads is initialized,
   //  and the default ad placement is ready.
   while (!Advertisement.isInitialized || !Advertisement.IsReady()) {
      yield WaitForSeconds(0.5);
   }

   // Show the default ad placement.
   Advertisement.Show();
}
```

+ Select **File** | **Build Settings...** | click **Player Settings...** and update the Bundle Identifier to match the PlayerSettings near the top of the dialog keeping the format of `com.Company.ProductName`
+ Enable USB debugging on your Android device.
+ Connect your Android device to your computer
+ Select **File** | **Build Settings...** | click **Build and Run**.

The build will begin and ask for a location to save the apk file, then it will prompt for the location of the Android SDK root folder that we extracted earlier and also the root folder for the JDK.

Once the build completes you will see the application load on your Android device and the test ad will be displayed.
