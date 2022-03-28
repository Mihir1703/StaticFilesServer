import React from 'react'
import axios from 'axios';
import Cookies from 'universal-cookie/es6';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

const ShortUrls = () => {
    const cookies = new Cookies();
    const handleSubmit = async (e) => {
        e.preventDefault();
        let data = new FormData(e.currentTarget);
        data = {
            old_url: data.get('old_url'),
            new_url: data.get('new_url'),
        }
        let req = await axios.post('/api/urls', data, {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                'authtoken': cookies.get('token')
            }
        });
        let url = window.location.hostname;
        let json = await req.data;
        console.log(json);
        if (json.success) {
            MySwal.fire({
                title: <p>Success! https://{url}/{data.new_url}</p>,
                footer: '<a href="https://' + url + '/' + data.new_url + '">Click here to visit</a>',
                icon: 'success',
            }).then(() => {
                MySwal.close();
            })
        } else {
            MySwal.fire({
                title: 'Oops...',
                text: json.message,
                icon: 'error',
            }).then(() => {
                MySwal.close();
            })
        }
    }

    return (
        <section id="url-form"
            className="my-1 max-w-md p-6 mx-auto bg-white flex flex-col justify-center mt-5 rounded-xl shadow-lg dark:bg-gray-800">
            <h2 className="text-3xl text-center font-Roboto text-gray-700 capitalize dark:text-white font-semibold">Short Url</h2>
            <form id="registration" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-1">

                    <div>
                        <label className="text-gray-700 dark:text-gray-200 font-bold"
                            htmlFor="old_url">Enter URL to short.</label>
                        <input required
                            id="old_url"
                            placeholder="e.g https://www.google.com"
                            type="text"
                            name='old_url'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                    <div>
                        <label className="text-gray-700 dark:text-gray-200 font-bold"
                            htmlFor="new_url">Enter new URL.</label>
                        <input required
                            id="new_url"
                            placeholder="e.g Mihir(https://localhost:3000/Mihir)"
                            type="text"
                            name='new_url'
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                    </div>
                </div>
                <div className="flex mt-6 justify-evenly items-center">
                    <button type="submit"
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 shadow-lg hover:shadow-xl rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Short</button>
                    <button type="reset"
                        className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 shadow-lg hover:shadow-xl rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Clear</button>
                </div>
            </form>
        </section>
    )
}

export default ShortUrls