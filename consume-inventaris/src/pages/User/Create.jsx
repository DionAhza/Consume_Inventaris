import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserAdd({ isOpen, onClose, endpoint, inputData, titleModal }) {
    const navigate = useNavigate();

    const [dataDetail, setDataDetail] = useState({
        username: '',
        email: '',
        password: '',
        role:''
    }); 
    const [error, setError] = useState([]);

    if (!isOpen) {
        return null;
    }

    function handleCreateUser() {
        axios.post(endpoint['create_user'], dataDetail, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token')
            }
        })
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => {
            console.log(err);
            if (err.response && err.response.status === 401) {
                navigate('/login?message=' + encodeURIComponent('Anda belum login'));
            } else {
                setError(err.response.data);
            }
        });
    }

    return (
        <div id="crud-modal-add" tabIndex="-1" aria-hidden="true"
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {titleModal}
                        </h3>
                        <button type="button" onClick={onClose}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-toggle="crud-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <form className="p-4 md:p-5">
                        {
                            Object.entries(inputData).map(([index, item]) => (
                                <div className="mb-6" key={index}>
                                    <label htmlFor={index} className="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-3">
                                        {index}
                                    </label>
                                    {item.tag === "select" ? (
                                        <select
                                            id={index}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            onChange={e => setDataDetail({ ...dataDetail, [index]: e.target.value })}
                                        >
                                            {item.option.map(opt => (
                                                <option key={opt} value={opt}>{opt}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={item.type}
                                            name={index}
                                            id={index}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            onChange={e => setDataDetail({ ...dataDetail, [index]: e.target.value })}
                                        />
                                    )}
                                </div>
                            ))
                        }
                        <button onClick={handleCreateUser} type="button" className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                            <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path>
                            </svg>
                            Create User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
