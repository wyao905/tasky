import React, { useState } from 'react'

function ChecklistSubItems(props) {
    const [inputValue, setInputValue] = useState('')
    const currentChecklist = {...props.currentChecklist}
    const currentListItem = {...props.currentChecklist.subItems[props.listItemId]}

    const handleSubmit = (e) => {
        e.preventDefault()
        currentListItem.subItems = [...currentListItem.subItems, {label: inputValue, complete: false}]
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, props.listItemId), currentListItem, ...currentChecklist.subItems.slice(parseInt(props.listItemId) + 1)]
        props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
        setInputValue('')
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
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, props.listItemId), currentListItem, ...currentChecklist.subItems.slice(parseInt(props.listItemId) + 1)]
        props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
    }

    const handleDeleteListItem = (e) => {
        currentListItem.subItems = [...currentListItem.subItems.slice(0, e.target.id), ...currentListItem.subItems.slice(parseInt(e.target.id) + 1)]
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, props.listItemId), currentListItem, ...currentChecklist.subItems.slice(parseInt(props.listItemId) + 1)]
        props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
    }

    const displayListItems = () => {
        return currentListItem.subItems.map((item, id) => {
            return <div>
                <input id={id} checked={item.complete} type='checkbox' onChange={handleCheckChange}/>
                <label style={item.complete ? complete : incomplete}>
                    {item.label}
                </label>
                <button id={id} className='remove-button' onClick={handleDeleteListItem}>&#x2716;</button>
            </div>
        })
    }

    return <div className='sub-checklist'>
        <form onSubmit={handleSubmit}>
            <input type='text'
                   placeholder='Add Item...'
                   value={inputValue}
                   onChange={handleInputChange}/>
        </form>
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