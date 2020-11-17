import React, { useState, useEffect } from 'react'

function Note(props) {
    const [inputValue, setInputValue] = useState('')
    const [inputEditLabelValue, setInputEditLabelValue] = useState('')
    const [itemLabelEditState, setItemLabelEditState] = useState(false)
    const [itemContentEditState, setItemContentEditState] = useState(true)
    const currentNote = {...props.itemList[props.noteIndex]}

    useEffect(() => {
        if(!props.itemLabel) {
            currentNote.label = `Note ${props.numOfNotes}`
            updateItemList()
        }
    })

    const updateItemList = () => {
        const copiedItemList = [...props.itemList]
        copiedItemList.splice(props.noteIndex, 1, currentNote)
        props.setItemList(copiedItemList)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        currentNote.content = inputValue
        updateItemList()
        setItemContentEditState(false)
    }

    const handleEditSubmit = (e) => {
        if(inputEditLabelValue !== '') {
            e.preventDefault()
            currentNote.label = inputEditLabelValue
            updateItemList()
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

    const toggleEditContentState = () => {
        setItemContentEditState(true)
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
                <button className='edit-button' onClick={toggleEditLabelState}>&#9998;</button>
            </div>
        }
    }

    const display = () => {
        if(!itemContentEditState) {
            return <div style={{display: 'flex'}}>
                <p style={{whiteSpace: 'pre-wrap'}}>{props.itemContent}</p>
                <button className='edit-button' onClick={toggleEditContentState}>&#9998;</button>
            </div>
        } else {
            return <div style={{display: 'flex'}}>
                <form onSubmit={handleSubmit}
                      style={{display: 'flex'}}>
                    <textarea style={{border: 'none',
                                      margin: '0 0 5px 10px',
                                      borderBottom: '1px solid lightgrey',
                                      width: '15rem',
                                      minHeight: '50px',
                                      resize: 'vertical',
                                      outline: 'none'}}
                              value={inputValue}
                              placeholder='Add Note...'
                              onChange={handleInputChange}/>
                    <input style={{border: 'none',
                                   backgroundColor: 'cyan',
                                   align: 'center',
                                   margin: '0 0 5px 0',
                                   color: 'white',
                                   fontSize: 'large',
                                   fontWeight: 'bold',
                                   outline: 'none'}}
                           id='note-content-submit-button'
                           type='submit'
                           value='+'/>
                </form>
            </div>
        }
    }

    return <div className='note'>
        <div className='item-header-container'>
            {displayItemLabelContainer()}
            <button id={props.noteIndex} className='remove-button' onClick={handleDelete}>&#10006;</button>
        </div>
        {display()}
    </div>
}

export default Note