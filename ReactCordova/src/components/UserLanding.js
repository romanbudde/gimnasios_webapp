import React, { Fragment, useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faHouse, faMapLocationDot, faRectangleList, faUser } from '@fortawesome/free-solid-svg-icons';
import ClientBottomBar from './ClientBottomBar';
// import { faHouse as heartSolido } from '@fortawesome/free-regular-svg-icons'

const ListUsers = () => {
	const { isAuthenticated } = useContext(AuthContext);
    
	const navigate = useNavigate();
	const cookies = new Cookies();

	console.log("isAuthenticated: ", isAuthenticated);

	const logout = () => {
		// unset cookie
		cookies.remove('auth-token');
		
		navigate('/');
	}

	const redirectLanding = () => {
		navigate('/landing');
	}

	const redirectVerSedes = () => {
		navigate('/ver-sedes');
	}

	const redirectVerMisReservas = () => {
		navigate('/mis-reservas');
	}

	const redirectProfile = () => {
		navigate('/account');
	}

	if(isAuthenticated){
		return (
			<Fragment>
				<div className='relative h'>
					<ClientBottomBar />

					<div className='flex flex-row items-center justify-center relative border-b-2 border-b-gray-200'>
						<h1 className='flex justify-center font-bold text-lg py-4'>
							Cuidar
						</h1>
					</div>
					<div className='space-y-5 p-10 my-2 mx-auto flex flex-col justify-center items-center'>
						<button
							className='w-full flex flex-row items-center justify-start gap-5 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-left'
							onClick={ (e) => { redirectVerSedes(e) }}
						>
							<FontAwesomeIcon icon={faMapLocationDot} className='text-4xl'/>
							Ver las sedes
						</button>
						<button
							className='w-full flex flex-row items-center justify-start gap-5 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-left'
							onClick={ (e) => { redirectVerMisReservas(e) }}
						>
							<FontAwesomeIcon icon={faRectangleList} className='text-4xl'/>
							Ver mis reservas anteriores
						</button>
						<button
							className='w-full flex flex-row items-center justify-start gap-5 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-left'
							onClick={ (e) => { redirectProfile(e) }}
						>
							<FontAwesomeIcon icon={faUser} className='text-4xl mr-3'/>
							Mi perfil
						</button>
					</div>
				</div>
			</Fragment>
		);
	}
	else {
		navigate('/');
	}
}

export default ListUsers;