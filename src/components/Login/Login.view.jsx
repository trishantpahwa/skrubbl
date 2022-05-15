export default function LoginView(props) {
    return (
        <div className="login-view">
            <h1>
                Login
            </h1>
            <div className="google_sign_in_img" onClick={props.signInWithGoogle}>
                <img src="/google_sign_in.png" width="40%" />
            </div>
        </div>
    )
};