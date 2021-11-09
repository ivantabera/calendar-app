import React, { useState } from 'react';
import moment from 'moment';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

/* Se define el startDate con una hora mas y se ocupa en el DateTimePicker */
const now  = moment().minutes(0).seconds(0).add(1, 'hours');
const nowPlus1  = now.clone().add(1, 'hours');

export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState( now.toDate() );
    const [dateEnd, setDateEnd] = useState( nowPlus1.toDate() );

    /* Estado para validar el titulo */
    const [titleValid, setTitleValid] = useState(true);

    /* Obtener la informacion del formulario del evento */
    const [formValues, setFormValues] = useState({
        title:'Evento',
        notes:'',
        start:now.toDate(),
        end:nowPlus1.toDate()
    });

    /* Desestructuracion del formvalues para obtener las notes y el title */
    const { notes, title, start, end  } = formValues;

    const handleInputChange = ({ target }) => {
        
        setFormValues({
            ...formValues,
            [target.name]:target.value
        });

    }

    const closeModal = () => {
        //TODO cerrar el modal
    }

    const handleStartDateChange = ( e ) => {
        setDateStart(e)
        setFormValues({
            ...formValues,
            start:e
        })
    }

    const handleEndDateChange = ( e ) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end:e
        })
    }
    
    const handleSubmitForm = ( e ) => {
        e.preventDefault();
        console.log('formValues', formValues)

        /* Crear instancias de moment para trabajar con todas las comparaciones de fechas de esta libreria */
        
        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            console.log('Fecha 2 debe de ser mayor');
            return Swal.fire('Error', 'La fecha final debe ser mayor a la fecha de inicio', 'error');
        }

        if( title.trim().length < 2 ){
            return setTitleValid( false );
        }

        //TODO realizar grabacion en BD

        setTitleValid(true);
        closeModal();

    }

    return (
        <Modal
            isOpen={ true }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >

            <h1> Nuevo evento </h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange  }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={ handleEndDateChange  }
                        value={ dateEnd }
                        minDate= { dateStart }
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}