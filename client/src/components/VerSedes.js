import React, { Fragment, useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';

import useWebSocket from 'react-use-websocket';

import VerDisponibilidad from './VerDisponibilidad';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import ClientBottomBar from './ClientBottomBar';

const VerSedes = () => {

	// const WS_URL = 'ws://localhost:5000/';
	
	// const socket = new WebSocket('ws://localhost:5000');
	
	// const testingWebsocket = useWebSocket(WS_URL, {
	// 	onOpen: () => {
	// 	  console.log('WebSocket connection established.');
	// 	}
	// });

	const { isAuthenticated } = useContext(AuthContext);
	const [search, setSearch] = useState('');
	const [tarifaMinima, setTarifaMinima] = useState('');
	const [tarifaMaxima, setTarifaMaxima] = useState('');
	const [checkboxesReviews, setCheckboxesReviews] = useState({
		satisfactorio: false,
		bueno: false,
		muybueno: false,
		fantastico: false
	});
	const [sedes, setSedes] = useState([]);
	const [showDisponibilidadModal, setShowDisponibilidadModal] = useState(false);
    
	const handleCheckboxReviewsChange = (event) => {
		const { name, checked } = event.target;
		setCheckboxesReviews(prevState => ({
			...prevState,
			[name]: checked
		}));
	};

	const navigate = useNavigate();
	const cookies = new Cookies();

	// console.log("isAuthenticated: ", isAuthenticated);

	const logout = () => {
		// unset cookie
		cookies.remove('auth-token');
		
		navigate('/');
	}

	const redirectLanding = () => {
		navigate('/landing');
	}

	// const handleShowDisponibilidadModal = (cuidador) => setShowDisponibilidadModal(true);

	const handleShowDisponibilidadModal = (cuidador) => () => {
		// Use cuidador inside this function
		console.log('Clicked on:', cuidador);
		setShowDisponibilidadModal(cuidador);
	  };

    const handleClose = () => {
        console.log('----------- HANDLE CLOSE() -----------')
        setShowDisponibilidadModal(false);
    }

	 // get all users function
	 const getSedes = async () => {
        try {
            const response = await fetch("http://localhost:5000/sedes/");
            const jsonData = await response.json();

            setSedes(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    };

    // when page loads, get all Users
    useEffect(() => {
        getSedes();
    }, []);


	console.log('sedes: ', sedes)
	// console.log(cuidadores)

	if(isAuthenticated){
		return (
			<Fragment>
				<div className='rounded-md bg-slate-200z'>
					<ClientBottomBar />
					<div className='flex flex-row items-center w-full justify-center relative border-b-2 border-b-gray-200'>
						<FontAwesomeIcon
							className='absolute left-5'
							icon={faChevronLeft}
							onClick={ redirectLanding }
						/>
						<h1 className='flex justify-center font-bold text-lg py-4'>Sedes</h1>
					</div>
				</div>
				{
					console.log('sedes length: ', sedes.length)
				}
				{ sedes.length > 0 && (
					<div className='flex flex-col space-y-4 mx-auto items-center rounded-md justify-start w-9/12 py-2 my-5 mb-28'>
						{sedes.length > 0 && sedes.map(sede => (
							<div 
								className='bg-yellow-500 border border-gray-500 p-4 w-full rounded-md text-white font-semibold shadow-gray-400 shadow-lg'
								key={sede.id}
							>
								<h2>Sede: {sede.name}</h2>
								<h2>Direccion: {sede.address}</h2>
								<h2>Cupos por turno: {sede.max_cupo}</h2>
								<button
									className='w-full text-white bg-gradient-to-r from-yellow-700 to-yellow-800 focus:ring-4 focus:outline-none rounded-lg text-sm px-5 py-2.5 mt-2 text-center font-semibold'
									onClick={handleShowDisponibilidadModal(sede)}
								>
									Reservar turno
								</button>
								<VerDisponibilidad
									sede={sede}
									show={showDisponibilidadModal === sede}
									onClose={handleClose}
								/>
							</div>
						))}
					</div>
				)}
				{ sedes.length <= 0 && (
					<div className='flex flex-col space-y-4 mx-auto items-center rounded-md justify-start w-96 py-2 my-5'>
						<h1 className='flex justify-center font-bold text-md py-4'>No existen sedes por ahora.</h1>
					</div>
				)}
			</Fragment>
		);
	}
	else {
		navigate('/');
	}
}

export default VerSedes;