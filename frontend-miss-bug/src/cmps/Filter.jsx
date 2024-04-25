import { useEffect, useState } from "react"


export function Filter(){

    const [filter, setFilter] = useState({text: '', minSeverity: ''})

    useEffect(() => {
        console.log(filter)
    },[filter])

    function handleOnChange(event){
        const { name, value } = event.target
        setFilter(prevFilter => ({...prevFilter, [name] : name === 'minSeverity'? +value : value}))
    }

    function handleOnSubmit(event){
        event.preventDefault()
    }


    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input type='text' placeholder='0' name='minSeverity' id='severity' value={filter.minSeverity} onChange={handleOnChange}/>
            </form>
        </>
    )
}