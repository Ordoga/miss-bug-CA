
import { NavLink } from 'react-router-dom'
import { LoginSignup } from './LoginSignup'
import { userService } from '../services/user.service'

export function AppHeader({ loggedInUser, setLoggedInUser }) {

    async function handleLogin(credentials) {
        try {
            const user = await userService.login({ username: credentials.username, password: credentials.password })
            setLoggedInUser(() => user)
        } catch (error) {
            console.log('Error: ' + error)
        }
    }

    async function handleSignup(credentials) {
        try {
            const user = await userService.signup(credentials)
            setLoggedInUser(() => user)
        } catch (error) {
            console.log('Error: ' + error)
        }
    }

    async function handleLogout() {
        try {
            await userService.logout()
            setLoggedInUser(() => null)
        } catch (error) {
            console.log('Error: ' + error)
        }
    }

    return (
        <header className='app-header container'>

            <div className='header-container'>
                <nav className='app-nav'>
                    <NavLink to="/">Home</NavLink> |<NavLink to="/bug">Bugs</NavLink> |
                    <NavLink to="/about">About</NavLink>{loggedInUser?.isAdmin && <NavLink to="/admin/user">| Users</NavLink>}
                </nav>
                {!loggedInUser && <LoginSignup handleLogin={handleLogin} handleSignup={handleSignup} />}
                {loggedInUser && <div className='logged-in'>
                    <div className='greeting'>
                        <span>Hello </span>
                        <button className='go-to-profile'>
                            <NavLink className='go-to-profile' to={`/user/${loggedInUser._id}`}>{loggedInUser.fullname}</NavLink>
                        </button>
                    </div>
                    <button className='logout' onClick={handleLogout}>Logout</button>
                </div>}
                <h1>Bugs are Forever</h1>
            </div>
        </header>
    )
}
