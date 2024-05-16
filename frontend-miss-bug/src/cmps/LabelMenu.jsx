import { useEffect, useState } from "react"

export function LabelMenu({ setFilterByToEdit, allLabels }) {

    const [activeLabels, setActiveLabels] = useState([])

    useEffect(() => {
        handleChange()
        console.log(activeLabels)
    }, [activeLabels])

    function handleOnSubmit(event) {
        event.preventDefault()
    }

    function handleChange() {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: activeLabels }))
    }

    function toggleCheckbox(event) {
        const { name } = event.target

        const labelIdx = activeLabels.findIndex(label => label === name)

        if (labelIdx === -1) {
            setActiveLabels((prevActiveLabels) => ([...prevActiveLabels, name]))
        } else {
            const newLabels = [...activeLabels.slice(0, labelIdx), ...activeLabels.slice(labelIdx + 1)]
            setActiveLabels((prevLabels) => newLabels)
        }
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <div className="label-menu-container">
                    <div className="label-menu">
                        {allLabels?.map((label, index) => (
                            <div key={index} name={label} className="label-tag">
                                <input type="checkbox" id={label} name={label} cheked={activeLabels[label] ? 'true' : 'false'} onChange={toggleCheckbox} />
                                <label htmlFor={label} id={label}>{label}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </>
    )
}