

export function BugSort({ sortBy, setSortBy }) {

    function handleOnChange(event) {
        setSortBy((prevSortBy) => ({ ...prevSortBy, sortBy: event.target.value }))
    }

    function handleOnSubmit(event) {
        event.preventDefault()
    }

    function toggleSortDir() {
        setSortBy((prevSortBy) => ({ ...prevSortBy, sortDir: prevSortBy.sortDir * -1 }))
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="sortBy">Sort By:
                    <select id='sortBy' name='sortBy' onChange={handleOnChange}>
                        <option value="severity">Severity</option>
                        <option value="createdAt">Created At</option>
                        <option value="title">Title</option>
                    </select>
                </label>
            </form>
            <button onClick={toggleSortDir}>{sortBy.sortDir < 0 ? 'Descending' : 'Ascending'}</button>
        </>
    )
}