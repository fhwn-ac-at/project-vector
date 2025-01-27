import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // Use runtime configuration for Firebase setup
  const firebaseConfig = {
    apiKey: config.public.NUXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: config.public.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: config.public.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: config.public.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.public.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: config.public.NUXT_PUBLIC_FIREBASE_APP_ID,
  };

  const firebaseApp = initializeApp(firebaseConfig);

  return {
    provide: {
      firebaseAuth: getAuth(firebaseApp),
      firebaseDb: getFirestore(firebaseApp),
      firebaseStorage: getStorage(firebaseApp),
    },
  };
});
