import LoginView from "./Login.view";
import { FirebaseAuthService } from '../../services';
import './Login.css';

export default function LoginContainer(props) {

    async function signInWithGoogle() {
        const loggedIn = await FirebaseAuthService.signInWithGoogle();
        if (loggedIn) {
            window.location = '/';
        }
    }

    return (
        <div className="login-container">
            <LoginView signInWithGoogle={signInWithGoogle} />
        </div>
    )
};