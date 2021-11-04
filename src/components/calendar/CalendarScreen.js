import React from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';

/* Se utiliza messajes para cambiar los mensajes del big calendar */
import { messages } from '../../helpers/calendar-messages-es';

import 'react-big-calendar/lib/css/react-big-calendar.css';

/* Se utiliza para cambiar el idioma del big calendar */
import 'moment/locale/es';
moment.locale('es');

const localizer = momentLocalizer(moment);

/* Estructura del arreglo de objetos para los eventos del big calendar*/
const events = [{
    title: 'Cumpleaños ivan',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    bgcolor: '#fafafa',
    notes: 'Comprar el pastel'
}]

export const CalendarScreen = () => {

    /* Esta funcion se va disparar con ciertos argumentos gracias al componente Calendar */
    const eventStylerGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }
        /* Lo que regresa esta funcion es el estilo que le va aplicar al evento */
        return {
            style
        }

    };

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages}
                eventPropGetter={ eventStylerGetter }
            />
        </div>
    )
}
