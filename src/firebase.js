// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbG8rpLYK3FvSuwwh0qrjM12LpZNBfzmQ",
  authDomain: "alnoor-traders.firebaseapp.com",
  projectId: "alnoor-traders",
  storageBucket: "alnoor-traders.firebasestorage.app",
  messagingSenderId: "1079563642055",
  appId: "1:1079563642055:web:87894911ca4f6949984ae2",
  measurementId: "G-ZV65RZBTVL"
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore
export const db = getFirestore(app);

// Initialize Analytics with safe browser support check
export let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch(() => {
    // Gracefully handle analytics blockage or environment limitations
  });
}

export default app;
