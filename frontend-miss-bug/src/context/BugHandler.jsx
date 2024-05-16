import { createContext } from "react"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { bugService } from "../services/bug.service.js"

const BugHandlerContext = createContext()

function BugHandlerProvider({ children }) {


    async function onAddBug() {
        const bug = {
            title: prompt('Bug title?'),
            severity: +prompt('Bug severity?'),
            description: prompt('Bug Description?'),
            labels: []
        }
        try {
            const savedBug = await bugService.save(bug)
            console.log('Added Bug', savedBug)
            loadBugs()
            showSuccessMsg('Bug added')
        } catch (err) {
            console.log('Error from onAddBug ->', err)
            showErrorMsg('Cannot add bug')
        }
    }

    async function onEditBug(bug) {
        const severity = +prompt('New severity?')
        const bugToSave = { ...bug, severity }
        try {

            const savedBug = await bugService.save(bugToSave)
            console.log('Updated Bug:', savedBug)
            setBugs(prevBugs => prevBugs.map((currBug) =>
                currBug._id === savedBug._id ? savedBug : currBug
            ))
            showSuccessMsg('Bug updated')
        } catch (err) {
            console.log('Error from onEditBug ->', err)
            showErrorMsg('Cannot update bug')
        }
    }

    async function onRemoveBug(bugId) {
        try {
            await bugService.remove(bugId)
            console.log('Deleted Succesfully!')
            setBugs(prevBugs => prevBugs.filter((bug) => bug._id !== bugId))
            showSuccessMsg('Bug removed')
        } catch (err) {
            console.log('Error from onRemoveBug ->', err)
            showErrorMsg('Cannot remove bug')
        }
    }

    const handlers = { onAddBug, onEditBug, onRemoveBug }

    return (
        <BugHandlerContext.Provider value={handlers}>
            {children}
        </BugHandlerContext.Provider>
    )
}

export { BugHandlerContext, BugHandlerProvider }