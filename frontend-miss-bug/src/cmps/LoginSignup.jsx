import { useState } from "react"

export function LoginSignup({ handleLogin, handleSignup }) {
    const [isSignup, setIsSignup] = useState(false)
    const [credentials, setCredentials] = useState({ fullname: "", username: "", password: "" })

    return (
        <div className="login-signup">
            {isSignup ? "Signup Form" : "Login Form"}
            <form className="login-signup-form" onSubmit={SubmitForm}>
                {isSignup &&
                    <div className="fullname-line login-signup-line">
                        <label htmlFor="fullname">Fullname</label>
                        <input onChange={handleOnChange} value={credentials.fullname} name="fullname" id="fullname"></input>
                    </div>}
                <div className="username-line login-signup-line">
                    <label htmlFor="username">Username</label>
                    <input onChange={handleOnChange} value={credentials.username} name="username" id="username"></input>
                </div>
                <div className="password-line login-signup-line">
                    <label htmlFor="password">Password</label>
                    <input onChange={handleOnChange} value={credentials.password} name="password" id="password"></input>
                </div>
            </form>
            {isSignup ? <button onClick={handleSwitchToLogin}>Already a user? Click here to login</button> : <button onClick={handleSwitchToSignup}>To create an account, click here</button>}
            {isSignup ? <button onClick={() => handleSignup(credentials)}>Sign Up!</button> : <button onClick={() => handleLogin(credentials)}>Log In!</button>}
        </div>
    )

    function SubmitForm(event) {
        event.preventDefault()
    }

    function handleSwitchToLogin() {
        setIsSignup(() => false)
    }

    function handleSwitchToSignup() {
        setIsSignup(() => true)
    }



    function handleOnChange(event) {
        const name = event.target.name
        const value = event.target.value
        setCredentials(prevCredentials => ({ ...prevCredentials, [name]: value }))
    }
}