import { Analytics, getAnalytics } from "firebase/analytics";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import { useEffect, useRef } from "react";
import app from "./firebase";

// export let appCheckRef: React.MutableRefObject<AppCheck | undefined>;
const useAppCheckAndAnalytics = () => {
  const appCheckRef = useRef<AppCheck>();
  const analyticsRef = useRef<Analytics>();
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-restricted-globals
      // (self as any).FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    if (!process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY) {
      return;
    }
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY /* reCAPTCHA Enterprise site key */
      ),
      isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
    });
    appCheckRef.current = appCheck;
  }, []);
  return { appCheckRef, analyticsRef };
};
export default useAppCheckAndAnalytics;
