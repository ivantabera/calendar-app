import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
BrowserRouter as Router,
Switch,
Route,
Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {

    const dispatch = useDispatch();

    /* Al usar este Hook, le estamos indicando a React que el componente 
    tiene que hacer el dispatch de renovar el token después de renderizarse. */
    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch])

    return (
        <Router>
            <div>
                <Switch>
                    <Route exact path="/login" component={ LoginScreen } />
                    <Route exact path="/" component={ CalendarScreen } />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
