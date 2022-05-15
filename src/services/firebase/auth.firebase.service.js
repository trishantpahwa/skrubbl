import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Firebase from './firebase.service';
import SessionService from "../session.service";

const auth = getAuth();
const provider = new GoogleAuthProvider();

const FirebaseAuthService = {
	signInWithGoogle: async () => {
		try {
			const res = await signInWithPopup(auth, provider);
			const user = {
				name: res.user.displayName,
				email: res.user.emailVerified ? res.user.email : null,
				picture: res.user.photoUrl
			}
			SessionService.set('user', JSON.stringify(user));
			return true;
		} catch(err) {
			console.log(err);
			return false;
		}
	}
};

export default FirebaseAuthService;