import { useEffect } from 'react';
import { usePathname, useSegments } from 'expo-router';
import { DdRum } from 'expo-datadog';
import { DdSdkReactNative, DdSdkReactNativeConfiguration, SdkVerbosity } from 'expo-datadog';
import Constants from 'expo-constants';
import invariant from 'tiny-invariant';

const DD_CLIENT_TOKEN = Constants.expoConfig?.extra?.datadog?.clientToken;
const DD_RUM_APPLICATION_ID = Constants.expoConfig?.extra?.datadog?.rumApplicationId;

invariant(DD_CLIENT_TOKEN, 'DD_CLIENT_TOKEN is not set');
invariant(DD_RUM_APPLICATION_ID, 'DD_RUM_APPLICATION_ID is not set');

const config = new DdSdkReactNativeConfiguration(
  DD_CLIENT_TOKEN,
  __DEV__ ? 'dev' : 'prod',
  DD_RUM_APPLICATION_ID,
  true, // track user interactions such as tapping on a button. You can use the 'accessibilityLabel' element property to give the tap action a name, otherwise the element type is reported.
  true, // track XHR resources.
  true, // track errors.
);
// Optional: Select your Datadog website ("US1", "US3", "US5", EU1", or "US1_FED"). Default is "US1".
config.site = 'US1';
// Optional: Enable or disable native crash reports.
config.nativeCrashReportEnabled = true;
// Optional: Sample RUM sessions, for example: 80% of sessions are sent to Datadog. Default is 100%.
config.sessionSamplingRate = 100;
// Optional: Sample tracing integrations for network calls between your app and your backend, for example: 80% of calls to your instrumented backend are linked from the RUM view to the APM view. Default is 20%.
// You need to specify the hosts of your backends to enable tracing with these backends.
config.resourceTracingSamplingRate = 100;
// config.firstPartyHosts = ['example.com']; // Matches 'example.com' and subdomains like 'api.example.com'.
// Optional: Let the Datadog SDK print internal logs above or equal to the provided level. Default is undefined, which means no logs.
config.verbosity = SdkVerbosity.WARN;

let initialized = false;

export const initDatadog = async () => {
  await DdSdkReactNative.initialize(config);
  initialized = true;
};

export const useTrackingExpoRouter = () => {
  const pathname = usePathname();
  const segments = useSegments();
  const viewKey = segments.join('/');

  useEffect(() => {
    if (initialized) {
      DdRum.startView(viewKey, pathname);
    }
  }, [viewKey, pathname]);
};
