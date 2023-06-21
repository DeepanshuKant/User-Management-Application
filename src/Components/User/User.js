import React, { useState, useEffect } from 'react'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import { motion } from 'framer-motion'

//Import CSS
import './User.css'


const User = () => {
    //User Info States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');

    //User Update State
    const [updatedName, setUpdatedName] = useState('');
    const [updatedEmail, setUpdatedEmail] = useState('');
    const [updatedContact, setUpdatedContact] = useState('');

    //Make a state if the request is for update the user or not
    const [isUpdate, setIsUpdate] = useState(false);

    //State to show Modal
    const [isModal, setIsModal] = useState(false);

    //user state
    const [users, setUsers] = useState(localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []);


    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users))
    }, [users])



    //Add User Handler
    const userAdd = (e) => {
        e.preventDefault();

        const details = {
            name: name,
            email: email,
            contact: contact
        }

        //find if user already exists by cheching email
        const isFound = users.find((user) => user.email === details.email);

        if (isFound) {
            alert('User already exists');
        }
        else {
            setUsers([...users, details]);
            setName('');
            setEmail('');
            setContact('');
            setIsModal(false);
        }

    }


    //Update user handler
    const userUpdate = (userDetail) => {
        setIsUpdate(true);
        setIsModal(true);

        setName(userDetail.name);
        setEmail(userDetail.email);
        setContact(userDetail.contact);

        //set the updated user details
        setUpdatedName(userDetail.name);
        setUpdatedEmail(userDetail.email);
        setUpdatedContact(userDetail.contact);

    }

    const userUpdateHandler = (e) => {
        e.preventDefault();
        const userNewDetail = {
            name: name,
            email: email,
            contact: contact
        }

        const updatedUser = users.map((user) => user.email === updatedEmail ? userNewDetail : user);
        setUsers(updatedUser);
        setIsModal(false);
        setIsUpdate(false);
        setName('');
        setEmail('');
        setContact('');

    }


    //Delete user Handler
    const deleteUser = (usermail) => {
        const newUsers = users.filter((user) => user.email !== usermail);
        setUsers(newUsers);
    }

    //Close Modal Handler
    const closeModal = () => {
        setIsModal(false);
        setIsUpdate(false);
        setName('');
        setEmail('');
        setContact('');
    }

    //Show Modal Handler
    const showModal = () => {
        setIsUpdate(false);
        setName('');
        setEmail('');
        setContact('');
        setIsModal(true);
    }


    return (
        <>

            <div className="container">
                <div className="add_user_container">
                    <p>Total Users: <span>{users ? users.length : 0}</span></p>
                    <button className='button' onClick={showModal} > Add User </button>
                </div>

                <div className="overlay" style={{ display: isModal ? 'block' : 'none' }} ></div>

                <div className="add_user_modal" style={{ display: isModal ? 'flex' : 'none' }} >
                    <span onClick={closeModal} ><ImCross /></span>
                    <form onSubmit={isUpdate ? userUpdateHandler : userAdd}>
                        <input type="text" className='input' value={name} placeholder="Name" required onChange={(e) => setName(e.target.value)} />
                        <input type="email" className='input' value={email} placeholder="Email" required onChange={(e) => setEmail(e.target.value)} />
                        <input type="number" className='input' value={contact} placeholder="Contact" required onChange={(e) => setContact(e.target.value)} />
                        <input type="submit" className='button' value={isUpdate ? "Update User" : "Add User"} />
                    </form>
                </div>

                <div className="users__container">
                    {users && users.map((user, index) => (
                        <div className="user__box" key={index} >
                            <div className="user_function">
                                <span onClick={() => userUpdate(user)} ><AiFillEdit /></span>
                                <span onClick={() => deleteUser(user.email)} ><AiFillDelete /></span>
                            </div>
                            <div className="userdetail_box">
                                <h1 className='user_detail' >{user.name}</h1>
                                <p className='user_detail' >{user.email}</p>
                                <p className='user_detail' >{user.contact}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div >

        </>
    )
}

export default User