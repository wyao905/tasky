import React, {useState} from 'react'

function Note() {
    const [inputValue, setInputValue] = useState('')
    const [submit, setSubmit] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSubmit(true)        
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const display = () => {
        if(submit) {
            return <div>
                <p>{inputValue}</p>
            </div>
        } else {
            return <div>
                <form onSubmit={handleSubmit}>
                    <textarea value={inputValue}
                            placeholder='Add Note...'
                            onChange={handleInputChange}/>
                    <input type='submit'
                           value='Add'/>
                </form>
            </div>
        }
    }

    return display()
}

export default Note