import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Components/Auth/SignIn'
import SignUp from './Components/Auth/SignUp'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App