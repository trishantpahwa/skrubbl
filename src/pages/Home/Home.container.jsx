import { useEffect, useState } from 'react';
import HomeView from './Home.view';
import { SessionService } from '../../services';
import './Home.css';

export default function HomeContainer(props) {

    const welcomeStr = 'Welcome to skrubbl!'
    const [text, setText] = useState("_");
    const [interval, _setInterval] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const startTyper = () => {
        _setInterval(setInterval(() => {
            setText(_text => {
                if (_text.length < welcomeStr.length) {
                    if (_text === "_") return welcomeStr[_text.length - 1] + '_';
                    else {
                        if (_text.length + 1 === welcomeStr.length) return _text.substring(0, _text.length - 1) + welcomeStr[_text.length - 1];
                        else return _text.substring(0, _text.length - 1) + welcomeStr[_text.length - 1] + '_';
                    }
                } else return "_";
            })
        }, 200));
    };

    const stopTyper = () => {
        if (text.length === welcomeStr.length) clearInterval(interval);
    }

    const checkIsLoggedIn = async () => {
        const user = await SessionService.get('user');
        if (user) setIsLoggedIn(true);
    }

    useEffect(startTyper, []);
    useEffect(checkIsLoggedIn, []);
    useEffect(stopTyper, [text]);

    return (
        <div className="home-container">
            <HomeView text={text} isLoggedIn={isLoggedIn} />
        </div>
    )
}