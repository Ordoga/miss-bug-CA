import { utilService } from "./util.service.js"
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
}

async function query() {
  try {
    // Not const to allow modifying the data
    let { data: cars } = await axios.get(BASE_URL)
    return cars

    // return bugs
  } catch (error) {
    throw error
  }
}

async function getById(bugId) {
  try {
    const { data: bug } = await axios.get(BASE_URL + bugId)
    return bug

    // const bug = bugs.find((bug) => bug._id === bugId)
  } catch (error) {
    throw error
  }
}

async function remove(bugId) {
  try {
    // TODO What does it return?
    return await axios.get(BASE_URL + bugId + "/remove")

    // const bugIdx = bugs.findIndex((bug) => bug._id === bugId)
    // bugs.splice(bugIdx, 1)
    // _bugCarsToFile()
  } catch (error) {
    throw error
  }
}

async function save(bugToSave) {
  try {
    // TODO LOGIC is delegated to to backend bug service
    const queryParams = `?_id=${bugToSave.id || ""}&title=${
      bugToSave.title
    }&severity=${bugToSave.severity}`
    const { data: savedBug } = await axios.get(BASE_URL + "save" + queryParams)
    return savedBug
  } catch (error) {
    throw error
  }
}

function _bugCarsToFile(path = "../data/bugs.json") {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bugs, null, 4)
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}
