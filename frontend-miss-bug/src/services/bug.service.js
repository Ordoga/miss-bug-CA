import Axios from "axios"

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = "http://localhost:3030/api/bug/"

export const bugService = {
    query,
    getById,
    remove,
    save,
    getDefaultFilter,
    getDefaultSort,
}

async function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {
    try {
        const params = {...filterBy, ...sortBy}
        let { data: bugs } = await axios.get(BASE_URL, {params : params})
        return bugs
    } catch (error) {
        throw error
    }
}

async function getById(bugId) {
    try {
        const { data: bug } = await axios.get(BASE_URL + bugId)
        return bug
    } catch (error) {
        throw error
    }
}

async function remove(bugId) {
    try {
        return await axios.delete(BASE_URL + bugId)
    } catch (error) {
        throw error
    }
}


async function save(bugToSave) {
    try {
        const method = bugToSave._id? "put" : "post"
        const { data : savedBug } = await axios[method](BASE_URL + (bugToSave._id || ''), bugToSave)
        return savedBug
    } catch (error) {
        throw error
    }
}

function getDefaultFilter(userId = null) {
    return {
        textSearch: "",
        minSeverity: "",
        labels: [],
        pageIdx: 0,
        createdBy: userId
    }
}

function getDefaultSort(){
    return {
        sortBy: "severity",
        sortDir: -1
    }
}
