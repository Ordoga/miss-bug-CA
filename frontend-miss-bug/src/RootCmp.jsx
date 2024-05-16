
import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { Home } from './pages/Home.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import { UserMsg } from './cmps/UserMsg.jsx'
import { UserIndex } from './pages/UserIndex.jsx'
import { BugHandlerProvider } from './context/BugHandler.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { useEffect, useState } from 'react'
import { userService } from './services/user.service.js'

export function App() {

    const [loggedInUser, setLoggedInUser] = useState(userService.getLoggedinUser())


    return (
        <Router>
            <div className='main-app'>
                <AppHeader loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
                <main className='container'>
                    <BugHandlerProvider>
                        <Routes>
                            <Route path='/' element={<Home />} />
                            <Route path='/bug' element={<BugIndex loggedInUser={loggedInUser} />} />
                            <Route path='/bug/:bugId' element={<BugDetails />} />
                            <Route path='/admin/user' element={<UserIndex />} />
                            <Route path='/about' element={<AboutUs />} />
                            <Route path='/user/:userId' element={<UserDetails loggedInUser={loggedInUser} />} />
                        </Routes>
                    </BugHandlerProvider>
                </main>
                <AppFooter />
                <UserMsg />
            </div>
        </Router>
    )
}
