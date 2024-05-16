import { bugService } from '../services/bug.service.js'
import { utilService } from '../services/util.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { BugList } from '../cmps/BugList.jsx'
import { useCallback, useState } from 'react'
import { useEffect } from 'react'
import { BugFilter } from '../cmps/BugFilter.jsx'
import { BugSort } from '../cmps/BugSort.jsx'

const PAGE_SIZE = 6


export function BugIndex({ userId, loggedInUser }) {
  const [bugs, setBugs] = useState([])
  // TODO : Get From Params
  const [filterBy, setFilterBy] = useState(bugService.getDefaultFilter(userId))
  const [sortBy, setSortBy] = useState(bugService.getDefaultSort())
  const [numOfMatchingBugs, setNumOfMatchingBugs] = useState()
  const [allLabels, setAllLabels] = useState()

  const debouncedSetFilterBy = useCallback(utilService.debounce(onSetFilterBy, 1000), [])

  useEffect(() => {
    loadBugs()
  }, [filterBy, sortBy])

  useEffect(() => {
    setFilterBy((prevFilter) => ({ ...prevFilter, createdBy: userId }))
  }, [userId])

  async function loadBugs() {
    const { bugs, amountOfToalMathchingBugs, allLabels } = await bugService.query(filterBy, sortBy)
    setAllLabels(allLabels)
    setNumOfMatchingBugs(amountOfToalMathchingBugs)
    setBugs(bugs)
  }


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

  function handlePreviewsPageClicked() {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, pageIdx: --prevFilterBy.pageIdx }))
  }

  function handleNextPageClicked() {
    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, pageIdx: ++prevFilterBy.pageIdx }))
  }

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  return (
    <main className="bug-index">
      <h3>Bugs App - Page num {filterBy.pageIdx}</h3>
      <button onClick={handlePreviewsPageClicked} disabled={filterBy.pageIdx === 0 ? 'disabled' : ''}>Previous Page</button>
      <button onClick={handleNextPageClicked} disabled={filterBy.pageIdx === Math.ceil(numOfMatchingBugs / PAGE_SIZE) - 1 ? 'disabled' : ''}>Next Page</button>

      <BugFilter filterBy={filterBy} setFilterBy={setFilterBy} bugs={bugs} allLabels={allLabels} userId={userId} />
      <BugSort sortBy={sortBy} setSortBy={setSortBy} />
      <main>
        {/* If there is a user id and it is the logged in user OR if there is a logged in user and no userID meaning its bugIndex */}
        {((userId && loggedInUser?._id === userId) || (loggedInUser && !userId)) &&
          <button className='add-btn' onClick={onAddBug}>Add Bug ⛐</button>
        }
        <BugList bugs={bugs} onRemoveBug={onRemoveBug} onEditBug={onEditBug} loggedInUser={loggedInUser} />
      </main>
    </main>
  )
}
