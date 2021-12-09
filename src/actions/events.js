import { fetchConToken } from "../helpers/fetch";
import { types } from "../types/types";

/* Agregar un evento al calendario */
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

const eventAddNew = ( event ) => ({
    type:types.eventAddNew,
    payload:event
});

/* Cargar todos los eventos de la base de datos para mostrarlos en el calendario */
export const eventStartLoading = () => {

    return async(dispatch) => {
        
        try {

            /* Ejecutamos el token */
            const resp = await fetchConToken( 'events' );
            /* Convertimos la respuesta en json */
            const body = await resp.json();
            /* Extraemos los eventos del body */
            const event = body.eventos;

            // dispatch(eventLoaded(event));

        } catch (error) {
            console.log('error', error);
        }
    }

}

const eventLoaded = ( event ) => ({
    type:types.eventLoaded,
    payload:event
});

export const eventSetActive = ( event ) => ({
    type:types.eventSetActive,
    payload:event
});

export const eventClearActiveEvent  = () => ({
    type:types.eventClearActiveEvent
})

export const eventUpdated = (event) => ({
    type:types.eventUpdated,
    payload:event
})

export const eventDeleted = () => ({
    type:types.eventDeleted
})