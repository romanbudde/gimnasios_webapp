import React, { Fragment, useContext, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faHouse, faCheck, faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import dayjs from 'dayjs';
import moment from 'moment';
import EditUser from './EditUser';
import UserEditData from './UserEditData';

const User = ({ user, users, setUsers, displayedUsers, setDisplayedUsers, disableUser, enableUser }) => {

    const [showEditModal, setShowEditModal] = useState(false);
    
    const handleShow = () => setShowEditModal(true);
    const handleClose = () => {
        console.log('----------- HANDLE CLOSE() -----------')
        setShowEditModal(false);
    }

    // useEffect(() => {
    //     handleClose()
    // }, [user])

    return (
        <>
            <div
                className={`${user.enabled ? 'bg-gradient-to-r from-green-500 to-green-400' 
                : 'bg-gradient-to-r from-red-500 to-red-400'} p-5 m-5 rounded-md flex flex-col items-start text-white font-medium relative`}
                // key={user.id}
            >
                <div className='flex flex-row w-full items-center justify-between'>
                    <div className={`${user.enabled ? 'bg-green-700 ' : 'bg-red-700'} flex flex-row items-center gap-3 p-2 mb-3 rounded-lg shadow-md`}>
                        { user.enabled ? (
                            <FontAwesomeIcon icon={faCheck} className=''/>
                        ) : (
                            <FontAwesomeIcon icon={faCircleXmark} className=''/>
                        )}
                        <p>{user.enabled ? 'Activado' : 'Desactivado'}</p>
                    </div>
                    <div
                        className='bg-gray-800 flex flex-row items-center gap-3 p-2 mb-3 rounded-lg shadow-md'
                        onClick={handleShow}
                    >
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className='text-xl'
                        />
                    </div>
                    <EditUser
                        user={user}
                        users={users}
                        setUsers={setUsers}
                        displayedUsers={displayedUsers}
                        setDisplayedUsers={setDisplayedUsers}
                        show={showEditModal}
                        onClose={handleClose}
                    />
                </div>
                <p>ID: {user.id}</p>
                <p>Email: {user.mail}</p>
                <p>Nombre: {user.name}</p>
                <p>Apellido: {user.last_name}</p>
                <p>Dirección: {user.address}</p>
                <p>Fecha de creación: {moment(user.created_at).format('DD/MM/YYYY')}</p>
            </div>
        </>
    )
}

export default User;