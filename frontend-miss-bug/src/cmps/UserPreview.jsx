import { CiEdit } from "react-icons/ci"

export function UserPreview({ user, onDeleteUser, onEditUser }) {

    function handleEditUser(event) {
        onEditUser(event, user)
    }

    async function handleDeleteUser(userId) {
        await onDeleteUser(userId)
    }
    return (
        <>
            <li className="user-preview">
                <div className="user-id preview-cell">{user._id}</div>
                <div className="user-fullname-div preview-cell">
                    <div className="user-fullname">{user.fullname}</div>
                    <button className="edit-fullname-btn" name="fullname" onClick={handleEditUser}><CiEdit size={25} /></button>
                </div>
                <div className="user-username-div preview-cell">
                    <div className="user-username">{user.username}</div>
                    <button className="edit-username-btn" name="username" onClick={handleEditUser}><CiEdit size={25} /></button>
                </div>
                <div className="user-password-div preview-cell">
                    <div className="user-password">{user.password}</div>
                    <button className="edit-password-btn" name="password" onClick={handleEditUser}><CiEdit size={25} /></button>
                </div>
                <div className="user-score-div preview-cell">
                    <div className="user-score">{user.score}</div>
                    <button className="edit-score-btn" name="score" onClick={handleEditUser}><CiEdit size={25} /></button>
                </div>
                <button className="delete-user" onClick={() => handleDeleteUser(user._id)}>Delete User</button>
            </li>
        </>
    )
}