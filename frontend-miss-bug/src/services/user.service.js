import Axios from "axios"

var axios = Axios.create({
    withCredentials: true,
})

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

const BASE_URL = "http://localhost:3030/api/"
const BASE_URL_AUTH  = BASE_URL + 'auth/'
const BASE_URL_USER  = BASE_URL + 'user/'

export const userService = {
    login,
    signup,
    logout,
    query,
    getById,
    save,
    deleteUser,
    getEmptyUser,
    saveUserToSessionStorage,
    getLoggedinUser,
}


// Convention - use POST method for AUTH
async function login(credentials){
    const { data : user } = await axios.post(BASE_URL_AUTH + 'login', credentials) // Send credentials in body
    if(user){
        // Save Mini user to Session Storage
        return saveUserToSessionStorage(user)
    }
}

async function signup(credentials){
    const { data : user } = await axios.post(BASE_URL_AUTH + 'signup', credentials)
    return saveUserToSessionStorage(user)
}

async function logout(){
    await axios.post(BASE_URL_AUTH + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

async function query(){
    try{
        const { data : users } = await axios.get(BASE_URL_USER)
        return users
    }catch(err){
        throw err
    }
}

async function getById(userId){
    const { data : user } = await axios.get(BASE_URL_USER + userId)
    return user
}

async function save(userToSave){
    try{
        const method = userToSave._id ? "put" : "post"
        console.log(userToSave)
        const { data : savedUser } = await axios[method](BASE_URL_USER + (userToSave._id || ''), userToSave)
        return savedUser
    }catch(err){
        throw err
    }
}

async function deleteUser(userId){
    try{
        return await axios.delete(BASE_URL_USER + userId)
    }catch(err){
        throw err
    }
}

function getEmptyUser(){
    return {
        username: '',
        fullname: '',
        password: '',
        imgUrl: '',
    }
}

function saveUserToSessionStorage(user){
    const miniUser = { _id: user._id, fullname: user.fullname, isAdmin: user.isAdmin }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(miniUser))
    return miniUser
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}