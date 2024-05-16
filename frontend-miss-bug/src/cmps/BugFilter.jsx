import { useState, useEffect } from 'react'
import { bugService } from '../services/bug.service'
import { LabelMenu } from './LabelMenu'


export function BugFilter({ filterBy, setFilterBy, allLabels, userId }) {

    const [filterByToEdit, setFilterByToEdit] = useState(filterBy ? filterBy : bugService.getDefaultFilter(userId))
    const [isLabelMenuOpen, setIsLabelMenuOpen] = useState(false)

    useEffect(() => {
        setFilterBy((prevFilterByToEdit) => ({ ...prevFilterByToEdit, ...filterByToEdit }))
    }, [filterByToEdit])


    function handleOnChange(event) {
        const { name, value } = event.target
        if (name === 'minSeverity' && isNaN(value)) {
            return
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [name]: name === 'minSeverity' ? +value : value }))
    }

    function handleOnSubmit(event) {
        event.preventDefault()
    }

    function toggleLabelMenu() {
        setIsLabelMenuOpen((prevState) => !prevState)
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor='textSearch'>Filter by text:</label>
                <input type='text' placeholder='Search Bugs' name='textSearch' id='textSearch' value={filterByToEdit.textSearch} onChange={handleOnChange} />
                <label htmlFor='minSeverity'>Minimum Severity:</label>
                <input type='text' placeholder='0' name='minSeverity' id='minSeverity' value={filterByToEdit.minSeverity} onChange={handleOnChange} />
                <button name='labels' onClick={toggleLabelMenu}>Filter By Labels</button>
            </form>
            {isLabelMenuOpen && <LabelMenu setFilterByToEdit={setFilterByToEdit} allLabels={allLabels} />}
        </>
    )
}