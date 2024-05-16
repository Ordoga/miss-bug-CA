import { BugIndex } from "./BugIndex"
import { userService } from "../services/user.service"
import { useEffect, useState } from "react"
import { useParams } from "react-router"

export function UserDetails({ loggedInUser }) {

    const [user, setUser] = useState({})

    const { userId } = useParams()

    useEffect(() => {
        loadUser(userId)
    }, [userId])

    async function loadUser(userId) {
        const userById = await userService.getById(userId)
        setUser(prevUser => userById)
    }

    return (
        <div className="user-details">
            <div className="details-section">
                {user.fullname}
            </div>
            <BugIndex userId={userId} loggedInUser={loggedInUser} />
        </div>
    )
}