import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepararEventos } from "../helpers/prepararEventos";
import { types } from "../types/types";

/* Inicia la grabacion de un evento al calendario */
export const eventStartAddNew = ( event ) => {

    return async(dispatch, getState) => {

    const {uid, name} = await getState().auth;

        try {
            
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if (body.ok) {
                event.id = body.evento.id;
                event.user = {
                    _id:uid,
                    name:name
                }
            }

            dispatch( eventAddNew( event ) );

        } catch (error) {
            console.log('error', error)
        }
    }

}

/* Se diapara la grabacion del evento */
const eventAddNew = ( event ) => ({
    type:types.eventAddNew,
    payload:event
});

/* Inicia la carga todos los eventos de la base de datos para mostrarlos en el calendario */
export const eventStartLoading = () => {

    return async(dispatch) => {
        
        try {

            /* Ejecutamos el token */
            const resp = await fetchConToken( 'events' );
            /* Convertimos la respuesta en json */
            const body = await resp.json();
            /* Extraemos los eventos del body y preparamos los Strings a objetos de tipo Date */
            const event = prepararEventos(body.eventos);

            dispatch(eventLoaded(event));

        } catch (error) {
            console.log('error', error);
        }
    }

}

/* Dispara la carga de datos */
const eventLoaded = ( event ) => ({
    type:types.eventLoaded,
    payload:event
});

/* Inicia la actualizacion de algun evento */
export const eventStartUpdate = ( event ) => {
    
    return async( dispatch ) => {

        console.log('event', event)
        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            console.log('body', body)

            if (body.ok) {
                dispatch( eventUpdated(event) );
            } else {
                Swal.fire('Error', body.msg, 'error')
            }

        } catch (error) {
            console.log('error', error)
        }

    }
}

const eventUpdated = (event) => ({
    type:types.eventUpdated,
    payload:event
});

export const eventSetActive = ( event ) => ({
    type:types.eventSetActive,
    payload:event
});

export const eventClearActiveEvent  = () => ({
    type:types.eventClearActiveEvent
});

export const eventDeleted = () => ({
    type:types.eventDeleted
});