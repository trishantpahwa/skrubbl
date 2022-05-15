import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import firebaseConfig from '../../helpers/firebase.config';

const Firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(Firebase);

export default Firebase;