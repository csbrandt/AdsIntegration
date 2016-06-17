#pragma strict
import UnityEngine.Advertisements; // Import the Unity Ads namespace.


function Start() : IEnumerator
{
    if (Advertisement.isSupported) { // If runtime platform is supported...
        Advertisement.Initialize("1083306", true); // ...initialize.
    }

    // Wait until Unity Ads is initialized,
    //  and the default ad placement is ready.
    while (!Advertisement.isInitialized || !Advertisement.IsReady()) {
        yield WaitForSeconds(0.5);
    }

    // Show the default ad placement.
    Advertisement.Show();
}

Start();
