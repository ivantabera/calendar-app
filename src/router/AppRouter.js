import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
BrowserRouter as Router,
Switch,
Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();

    /* Seleccionar del state el checking para validar si el usuario esta autenticado */
    const { checking, uid } = useSelector(state => state.auth);

    /* Al usar este Hook, le estamos indicando a React que el componente 
    tiene que hacer el dispatch de renovar el token después de renderizarse. */
    useEffect(() => {
        dispatch( startChecking() );
    }, [dispatch]);

    if (checking) {
        return(<h1>Espere</h1>)
    }

    return (
        <Router>
            <div>
                <Switch>
                    
                    <PublicRoute 
                        exact 
                        path="/login" 
                        component={ LoginScreen }
                        isAuthenticated={ !!uid }
                    />
                    
                    <PrivateRoute 
                        exact 
                        path="/" 
                        component={ CalendarScreen } 
                        isAuthenticated={ !!uid }
                    />

                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
