import React from 'react';
import {
BrowserRouter as Router,
Switch,
Route
} from "react-router-dom";
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';

export const AppRouter = () => {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <LoginScreen />
                    </Route>
                    <Route path="/">
                        <CalendarScreen />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}
