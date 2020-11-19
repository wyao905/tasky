import React, { useState } from 'react'

function ChecklistSubItems(props) {
    const [inputValue, setInputValue] = useState('')
    const currentChecklist = {...props.currentChecklist}
    const currentListItem = {...props.currentChecklist.subItems[props.listItemIndex]}

    const handleSubmit = (e) => {
        e.preventDefault()
        currentListItem.subItems = [...currentListItem.subItems, {label: inputValue, complete: false}]
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, props.listItemIndex), currentListItem, ...currentChecklist.subItems.slice(parseInt(props.listItemIndex) + 1)]
        props.updateItemList(props.checklistIndex, currentChecklist)
        setInputValue('')
        props.setSubItemAddState('')
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleCheckChange = (e) => {
        if(e.target.checked) {
            currentListItem.subItems[e.target.id].complete = true
        } else {
            currentListItem.subItems[e.target.id].complete = false
        }
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, props.listItemIndex), currentListItem, ...currentChecklist.subItems.slice(parseInt(props.listItemIndex) + 1)]
        props.updateItemList(props.checklistIndex, currentChecklist)
    }

    const handleDeleteListItem = (e) => {
        currentListItem.subItems = [...currentListItem.subItems.slice(0, e.target.id), ...currentListItem.subItems.slice(parseInt(e.target.id) + 1)]
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, props.listItemIndex), currentListItem, ...currentChecklist.subItems.slice(parseInt(props.listItemIndex) + 1)]
        props.updateItemList(props.checklistIndex, currentChecklist)
    }

    const displayInputForm = () => {
        if(props.subItemAddState === props.listItemId) {
            return <form onSubmit={handleSubmit}>
                <input className='sub-list-item-input'
                       type='text'
                       placeholder='Add Item...'
                       value={inputValue}
                       onChange={handleInputChange}/>
            </form>
        } else {
            return null
        }
    }

    const displayListItems = () => {
        return currentListItem.subItems.map((item, id) => {
            return <div style={{display: 'flex',
                                justifyContent: 'space-between'}}>
                <div style={{paddingTop: '6px'}}>
                    <input id={id} className='checkbox' checked={item.complete} type='checkbox' onChange={handleCheckChange}/>
                    <label style={item.complete ? complete : incomplete}>
                        {item.label}
                    </label>
                </div>
                <button id={id} className='remove-button' onClick={handleDeleteListItem}>&#x2716;</button>
            </div>
        })
    }

    return <div className='sub-checklist'>
        {displayInputForm()}
        {displayListItems()}
    </div>
}

export default ChecklistSubItems

const complete = {
    color: 'lightgrey'
}

const incomplete = {
    color: 'black'
}