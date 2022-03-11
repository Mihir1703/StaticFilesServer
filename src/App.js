import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignIn from './Components/SignIn'

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<SignIn />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App