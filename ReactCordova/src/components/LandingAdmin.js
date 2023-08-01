import React, { Fragment, useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';

import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faHouse, faMapLocationDot, faUser, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import CuidadorBottomBar from './CuidadorBottomBar';

const LandingAdmin = () => {
	const { isAuthenticated } = useContext(AuthContext);
    
	const navigate = useNavigate();
	const cookies = new Cookies();

	console.log("isAuthenticated: ", isAuthenticated);

	const logout = () => {
		// unset cookie
		cookies.remove('auth-token');
		
		navigate('/');
	}

	const redirectProfile = () => {
		navigate('/account');
	}
	
	const redirectUsuarios = () => {
		navigate('/users');
	}

	const redirectSedes = () => {
		navigate('/sedes-admin');
	}

	if(isAuthenticated){
		return (
			<Fragment>
				<div className='relative h'>
					<CuidadorBottomBar />
					<div className='flex flex-col items-center justify-center relative border-b-2 border-b-gray-200'>
						<h1 className='flex justify-center font-bold text-lg pt-4 pb-1'>
							Gimnasio
						</h1>
						<p className='text-md text-gray-600'>Panel de Administrador</p>
					</div>
					<div className='space-y-5 p-7 my-2 mx-auto flex flex-col justify-center items-center'>
						<button
							className='w-full flex flex-row items-center justify-start gap-5 text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center'
							onClick={ (e) => { redirectSedes(e) }}
						>
							<FontAwesomeIcon icon={faMapLocationDot} className='text-3xl mr-1'/>
							Sedes
						</button>
						<button
							className='w-full flex flex-row items-center justify-start gap-5 text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center'
							onClick={ (e) => { redirectUsuarios(e) }}
						>
							<FontAwesomeIcon icon={faUserGroup} className='text-3xl'/>
							Usuarios
						</button>
						<button
							className='w-full flex flex-row items-center justify-start gap-5 text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-5 text-center'
							onClick={ (e) => { redirectProfile(e) }}
						>
							<FontAwesomeIcon icon={faUser} className='text-3xl mr-3'/>
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

export default LandingAdmin;