import { Login, Dashboard } from '../../components';

export default function HomeView(props) {

    return (
        <div className="home-view">
            <h1>{props.text}</h1>
            {
                props.isLoggedIn ?
                    (<Dashboard />)
                    :
                    (<Login />)
            }
        </div>
    )
}