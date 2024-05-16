import { UserPreview } from "./UserPreview"


export function UserList({ users, onEditUser, onDeleteUser }) {


    if (!users) return
    return (
        <>
            {users.map((user) => <UserPreview user={user} onEditUser={onEditUser} onDeleteUser={onDeleteUser} key={user._id} />)}
        </>
    )
}