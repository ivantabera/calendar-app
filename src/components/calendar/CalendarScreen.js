import React, { useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';

/* Se utiliza messajes para cambiar los mensajes del big calendar */
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';

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
    notes: 'Comprar el pastel',
    user: {
        _id: '123',
        name: 'Ivan'
    }
}]

export const CalendarScreen = () => {

    /* Mantener el estado de una variable que cuando cambie, actualice los componentes */
    const [lastView, setLastView] = useState( localStorage.getItem('lastView' || 'month' ) );

    /* Cuando se realice el doble click en el calendario se dispara esta funcion */
    const onDoubleClick = ( e ) => {
        console.log('e', e)
    }

    /* Cuando se realice la seleccion de algun evento en el calendario */
    const onSelect = ( e ) => {
        console.log('e', e)
    }

    /* Cuando se cambia la vista del calendario entre Mes, Semana, Dia, Agenda */
    const onViewChange = ( e ) => {
        console.log('e', e)

        setLastView( e );
        localStorage.setItem('lastView', e);
    }

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
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelect }
                onView={ onViewChange }
                view={ lastView || 'month' }

                /* Components para personalizar el evento para el calendario */
                components={{
                    event : CalendarEvent
                }}
            />

        </div>
    )
}
