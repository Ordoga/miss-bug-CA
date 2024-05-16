import { useEffect, useState } from "react"
import { bugService } from "../services/bug.service"


export function Filter({ filterBy, setFilterBy }) {

    const [filterByToEdit, setfilterByToEdit] = useState(filterBy ? filterBy : bugService.getDefaultFilter())

    useEffect(() => {
        setFilterBy(prevFilter => filterByToEdit)
    }, [filterByToEdit])

    function handleOnChange(event) {
        const { name, value } = event.target
        if (name === 'minSeverity' && isNaN(value)) {
            return
        }

        setfilterByToEdit(prevFilter => ({ ...prevFilter, [name]: name === 'minSeverity' ? +value : value }))
    }

    function handleOnSubmit(event) {
        event.preventDefault()
    }


    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor='minSeverity'>Filter by text:
                    <input type='text' placeholder='Search Bugs' name='textSearch' id='textSearch' value={filterByToEdit.textSearch} onChange={handleOnChange} />
                </label>
                <label htmlFor='minSeverity'>Minimum Severity:
                    <input type='text' placeholder='0' name='minSeverity' id='severity' value={filterByToEdit.minSeverity} onChange={handleOnChange} />
                </label>
            </form>
        </>
    )
}