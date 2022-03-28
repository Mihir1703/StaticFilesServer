import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'
import Error from './Components/Error'
import Header from './Components/Main/Header'
import ShortUrls from './Components/Main/ShortUrls'

const routes = {
    '/': <Header />,
    '/login': <SignIn />,
    '/signup': <SignUp />,
    '*': <Error />,
    '/short-urls': <><Header /><ShortUrls /></>,
}

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {
                    Object.keys(routes).map((route, index) => {
                        return (<Route key={index} path={route} element={routes[route]} />);
                    })
                }
            </Routes>
        </BrowserRouter>
    )
}

export default App