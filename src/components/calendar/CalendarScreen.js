import React, { useState } from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux'

import { Navbar } from '../ui/Navbar';
/* Se utiliza messajes para cambiar los mensajes del big calendar */
import { messages } from '../../helpers/calendar-messages-es';
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';

/* Se utiliza para cambiar el idioma del big calendar */
import 'moment/locale/es';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveEvent, eventSetActive } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
moment.locale('es');

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const dispatch = useDispatch();
    // TODO leer del store, los eventos
    const { events, activeEvent } = useSelector(state => state.calendar);

    /* Mantener el estado de una variable que cuando cambie, actualice los componentes */
    const [lastView, setLastView] = useState( localStorage.getItem('lastView' || 'month' ) );

    /* Cuando se realice el doble click en una actividad del calendario se dispara esta funcion */
    const onDoubleClick = () => {
        dispatch( uiOpenModal() );
    }

    /* Cuando se realice la seleccion de algun evento en el calendario */
    const onSelect = ( e ) => {
        dispatch( eventSetActive( e ) );
    }

    /* Cuando se cambia la vista del calendario entre Mes, Semana, Dia, Agenda */
    const onViewChange = ( e ) => {
        setLastView( e );
        localStorage.setItem('lastView', e);
    }

    const onSelectSlot = () => {
        dispatch( eventClearActiveEvent() );
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
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                onView={ onViewChange }
                view={ lastView || 'month' }

                /* Components para personalizar el evento para el calendario */
                components={{
                    event : CalendarEvent
                }}
            />

            <AddNewFab />

            { (activeEvent) && <DeleteEventFab /> }
            

            <CalendarModal />

        </div>
    )
}
