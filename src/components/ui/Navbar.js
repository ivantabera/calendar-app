import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth';

export const Navbar = () => {

    const dispatch = useDispatch();

    /* Seleccionamos el nombre del usuario que viene en el state.auth
        y lo ocuparemos para mostrarlo en el Navbar
    */
    const { name } = useSelector(state => state.auth);

    /* Manejador para hacer logout */
    const handleLogout = () => {
        dispatch( startLogout() );
    }

    return (
        <div className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand">
                {name}
            </span>
            
            <button 
                className="btn btn-outline-danger"
                onClick={ handleLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                <span> Salir</span>
            </button>
        </div>
    )
}
