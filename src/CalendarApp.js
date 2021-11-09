import React from 'react';
/* Se encarga de proveer la informacion a todos sus hijos */
import { Provider } from 'react-redux';

import { store } from './store/store';
import { AppRouter } from './router/AppRouter'

export const CalendarApp = () => {
    return (
        <Provider store={store}>
            <AppRouter />
        </Provider>
    )
}
