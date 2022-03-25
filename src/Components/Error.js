import React from 'react'

const Error = props => {
    return (
        <div className="container mx-auto px-4">
            <section className="py-8 px-4 text-center">
                <div className="max-w-auto mx-auto">
                    <div className="md:max-w-lg mx-auto">
                        <img className="w-64 mx-auto" src="/mihir@admin/main-site/404-cherry"/>
                    </div>
                    <h2 className="mt-8 uppercase text-xl lg:text-5xl font-black">We are sorry, Page not found!</h2>
                    <p className="mt-6 uppercase text-sm lg:text-base text-gray-900">The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                    <a href="/" className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-light py-4 px-6 rounded-full inline-block uppercase shadow-md">Back To Homepage</a>
                    <p className="mt-6 text-xs text-gray-500 hover:text-gray-700">llustration by Ouch.pics <a href="https://icons8.com" target="_blank" className=" underline">https://icons8.com</a></p>
                </div>
            </section>
        </div>
    )
}

export default Error