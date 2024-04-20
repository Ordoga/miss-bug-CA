import fs from "fs"
import { utilService } from "./util.service.js"

const bugs = utilService.readJsonFile("data/bugs.json")

export const bugService = {
  query,
  getById,
  remove,
  save,
}

async function query() {
  try {
    return bugs
  } catch (error) {
    throw error
  }
}

async function getById(bugId) {
  try {
    const bug = bugs.find((bug) => bug._id === bugId)
    return bug
  } catch (error) {
    throw error
  }
}

async function remove(bugId) {
  try {
    const bugIdx = bugs.findIndex((bug) => bug._id === bugId)
    bugs.splice(bugIdx, 1)
    _bugCarsToFile()
  } catch (error) {
    throw error
  }
}

async function save(bugToSave) {
  try {
    if (bugToSave._id) {
      // Edit existing bug
      const idx = bugs.findIndex((bug) => bug._id === bugToSave._id)
      if (idx < 0) throw `Cant find car with _id ${bugToSave._id}`
      bugs[idx] = bugToSave
    } else {
      bugToSave._id = utilService.makeId() // New Bug
      bugs.push(bugToSave)
    }
    await _bugCarsToFile()
    return bugToSave
  } catch (error) {
    throw error
  }
}

function _bugCarsToFile(path = "./data/bugs.json") {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bugs, null, 4)
    fs.writeFile(path, data, (err) => {
      if (err) return reject(err)
      resolve()
    })
  })
}

// const STORAGE_KEY = 'bugDB'

// function query() {
//     return storageService.query(STORAGE_KEY)
// }
// function getById(bugId) {
//     return storageService.get(STORAGE_KEY, bugId)
// }
// function remove(bugId) {
//     return storageService.remove(STORAGE_KEY, bugId)
// }
// function save(bug) {
//     if (bug._id) {
//         return storageService.put(STORAGE_KEY, bug)
//     } else {
//         return storageService.post(STORAGE_KEY, bug)
//     }
// }
