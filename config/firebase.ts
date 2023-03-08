import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  AppCheck,
  initializeAppCheck,
  ReCaptchaV3Provider,
} from "firebase/app-check";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import onClientNext from "../utils/onClientNext";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FB_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FB_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FB_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics: Analytics | undefined;
let appCheck: AppCheck | undefined;
if (onClientNext) {
  analytics = getAnalytics(app);
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY
  ) {
    appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider(
        process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY /* reCAPTCHA Enterprise site key */
      ),
      isTokenAutoRefreshEnabled: true, // Set to true to allow auto-refresh.
    });
  }
}
let analyticsResult = analytics as Analytics;
let appCheckResult = appCheck as AppCheck;
export const functions = getFunctions(app);
export const db = getFirestore();
export const auth = getAuth();
export { analyticsResult as analytics, appCheckResult as appCheck };
export default app;
if (process.env.NODE_ENV === "development") {
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9001");
}
