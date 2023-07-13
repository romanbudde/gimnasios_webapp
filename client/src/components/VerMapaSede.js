import React, { Fragment, useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCircleCheck, faMoneyBillWave, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { GoogleMap, LoadScript, useLoadScript, Marker, useJsApiLoader } from "@react-google-maps/api";
import '../css/calendar.css';

const VerMapaSede = ({ sede, show, onClose }) => {

    const [map, setMap] = useState(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDdEqsnFUhTgQJmNN1t4iyn3VhMLJY6Yk4"
    })

    const { isAuthenticated } = useContext(AuthContext);
	const { userId } = useContext(AuthContext);

	const navigate = useNavigate();
	const cookies = new Cookies();

    const center = {
        lat: -32.9558163,
        lng: -60.6391125
    };

    const containerStyle = {
        width: '300px',
        height: '600px'
      };

    if(!show) return null;

    return (
        <Fragment>
            {/* <LoadScript
            googleMapsApiKey="AIzaSyDdEqsnFUhTgQJmNN1t4iyn3VhMLJY6Yk4"
            >
            </LoadScript> */}

            <div className='fixed inset-0 bg-gray-800 bg-opacity-40 z-50 flex justify-center items-center'>
                <div className='flex flex-col relative w-5/6 max-h-screen'>
                    <button onClick={ onClose } type="button" className="absolute top-2 right-2 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal">
                        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path></svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className='bg-white p-5 rounded flex flex-col gap-5 items-center justify-center'>
                        <p>Google maps</p>
                        { isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={15}
                            >
                                <Marker
                                    position={center}
                                />
                            </GoogleMap>
                        ) : (
                            <p>Cargando mapa</p>
                        )}

                    </div>
                </div>
            </div>
            
        </Fragment>
    );
}

export default VerMapaSede;