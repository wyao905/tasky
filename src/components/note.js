import React, { useState, useEffect } from 'react'

function Note(props) {
    const [inputValue, setInputValue] = useState('')
    const [inputEditLabelValue, setInputEditLabelValue] = useState('')
    const [itemLabelEditState, setItemLabelEditState] = useState(false)
    const currentNote = {...props.itemList[props.noteIndex]}

    useEffect(() => {
        if(!props.itemLabel) {
            currentNote.label = `Note ${props.numOfNotes}`
            props.updateItemList(props.noteIndex, currentNote)
        }
    })

    const handleEditSubmit = (e) => {
        if(inputEditLabelValue !== '') {
            e.preventDefault()
            currentNote.label = inputEditLabelValue
            props.updateItemList(props.noteIndex, currentNote)
            setInputEditLabelValue('')
        }
        setItemLabelEditState(false)
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleInputEdit = (e) => {
        setInputEditLabelValue(e.target.value)
    }

    const toggleEditLabelState = () => {
        setItemLabelEditState(true)
    }

    const handleDelete = (e) => {
        props.handleItemDelete(e.target.id)
    }

    const displayItemLabelContainer = () => {
        if(itemLabelEditState) {
            return <form onSubmit={handleEditSubmit}>
                <input className='list-item-edit-label-input'
                       type='text'
                       placeholder={props.itemLabel}
                       value={inputEditLabelValue}
                       onChange={handleInputEdit}/>
            </form>
        } else {
            return <div style={{display: 'flex'}}>
                <p className='item-name'>{props.itemLabel}</p>
            </div>
        }
    }

    return <div className='note'>
        <div className='item-header-container'>
            {displayItemLabelContainer()}
            <div>
                <button className='edit-button' onClick={toggleEditLabelState}>&#9998;</button>
                <button id={props.noteIndex} className='remove-button' onClick={handleDelete}>&#10006;</button>
            </div>
        </div>
        <textarea style={{border: '1px solid lightgrey',
                          borderRadius: '5px',
                          margin: '0 0 5px 0',
                          padding: '6px',
                          width: '416px',
                          height: '150px',
                          fontFamily: 'inherit',
                          fontSize: 'inherit',
                          resize: 'none',
                          outline: 'none'}}
                  value={inputValue}
                  placeholder='Add Note...'
                  onChange={handleInputChange}/>
    </div>
}

export default Note