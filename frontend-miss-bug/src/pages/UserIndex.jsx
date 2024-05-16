import { useEffect, useState } from "react"
import { userService } from "../services/user.service"
import { UserList } from "../cmps/UserList"

export function UserIndex() {

    const [users, setUsers] = useState([])

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        const users = await userService.query()
        setUsers((prevUsers) => users)
    }

    async function onDeleteUser(userId) {
        await userService.deleteUser(userId)
        const userIdx = users.findIndex(user => user._id === userId)
        users.splice(userIdx, 1)
        loadUsers()
    }

    async function onAddUser() {
        const fullname = prompt('What is your full name?')
        const username = prompt('Choose Username')
        const password = prompt('Choose Password')
        const userToSave = { fullname, username, password }
        await userService.save(userToSave)
        loadUsers()
    }

    async function onEditUser(event, user) {
        const { name } = event.target
        const value = prompt("Choose new " + name)
        const updatedUser = { ...user, [name]: value }
        await userService.save(updatedUser)
        loadUsers()
    }

    return (
        <>
            <li className="user-preview list-header">
                <div className="user-id preview-cell">User ID</div>
                <div className="user-fullname-div preview-cell">
                    <div className="user-fullname">Full Name</div>
                </div>
                <div className="user-username-div preview-cell">
                    <div className="user-username">Username</div>
                </div>
                <div className="user-password-div preview-cell">
                    <div className="user-password">Password</div>
                </div>
                <div className="user-score-div preview-cell">
                    <div className="user-score">Score</div>
                </div>
                <div>
                    <button onClick={onAddUser}>Add User</button>
                </div>
            </li>
            <UserList users={users} onEditUser={onEditUser} onDeleteUser={onDeleteUser} />
        </>
    )
}