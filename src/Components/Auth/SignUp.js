import * as React from 'react';
import Cookies from 'universal-cookie/es6'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import alreadyLoggedIn from '../../Util/Token';
import login_svg from '../../static/images/login.svg';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);


export default function SignIn() {
    const cookies = new Cookies();
    const history = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        let data = new FormData(event.currentTarget);
        if (data.get('password') !== data.get('confirmPassword')) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Passwords do not match',
            }).then(() => {
                MySwal.close();
            })
        }
        data = {
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
        }
        console.log(data);
        let req = await axios.post('/api/auth/register', data);
        let json = await req.data;
        if (json.success) {
            cookies.set('token', json.token);
            history('/');
            console.log(cookies.get('token'));
        }
    };
    useEffect(() => {
        alreadyLoggedIn(() => {
            history('/');
        }, cookies);
    })

    return (
        <section id="registration-form"
            className="my-1 max-w-md p-6 mx-auto bg-white flex flex-col justify-center mt-5 rounded-xl shadow-lg dark:bg-gray-800">

            <div className='flex flex-col items-center my-5'>
                <img src={login_svg} alt="Alt" className='h-[50%] w-[60%]' />
            </div>

            <h2 className="text-3xl text-center font-Roboto text-gray-700 capitalize dark:text-white font-semibold">Sign In</h2>

            <form id="registration" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">

                    <div>
                        <label className="text-gray-700 dark:text-gray-200"
                            htmlFor="username">Username</label>
                        <input required
                            id="username"
                            placeholder="e.g mihir1703"
                            type="text"
                            name='username'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200"
                            htmlFor="username">Email</label>
                        <input required
                            id="email"
                            placeholder="e.g mihir1703@example.com"
                            type="emal"
                            name='email'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200"
                            htmlFor="password">Password</label>
                        <input required
                            id="password"
                            placeholder="******"
                            type="password"
                            name='password'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200"
                            htmlFor="password">Confirm Password</label>
                        <input required
                            id="password"
                            placeholder="******"
                            type="password"
                            name='confirmPassword'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                </div>
                <div className="flex justify-center mt-6">
                    <button type="submit"
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 shadow-lg hover:shadow-xl rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">SignUp</button>
                </div>
            </form>
        </section>
    );
}