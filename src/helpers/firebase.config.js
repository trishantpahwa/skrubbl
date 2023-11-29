const firebaseConfig = {
    apiKey: import.meta.env._FIREBASE_API_KEY,
    authDomain: import.meta.env._FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env._FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env._FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env._FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env._FIREBASE_APP_ID,
    measurementId: import.meta.env._FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfig;

