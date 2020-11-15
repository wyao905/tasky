import React, { useState, useEffect } from 'react'
import ChecklistSubItems from './checklistSubItems'

function Checklist(props) {
    const [inputValue, setInputValue] = useState('')
    const currentChecklist = {...props.itemList[props.checklistId]}

    useEffect(() => {
        if(!props.itemLabel) {
            currentChecklist.label = `Checklist ${props.numOfLists}`
            props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        currentChecklist.subItems = [...currentChecklist.subItems, {label: inputValue, complete: false}]
        props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
        setInputValue('')
        props.updateTasksOverview({...props.tasksOverview, total: props.tasksOverview.total += 1})
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleCheckChange = (e) => {
        if(e.target.checked) {
            currentChecklist.subItems[e.target.id].complete = true
            props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
            props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed += 1})
        } else {
            currentChecklist.subItems[e.target.id].complete = false
            props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
            props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed -= 1})
        }
    }

    const handleDeleteListItem = (e) => {
        if(currentChecklist.subItems[e.target.id].complete) {
            props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed -= 1})
        }
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, e.target.id), ...currentChecklist.subItems.slice(parseInt(e.target.id) + 1)]
        props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
        props.updateTasksOverview({...props.tasksOverview, total: props.tasksOverview.total -= 1})
    }

    const handleAddSubItem = (e) => {
        currentChecklist.subItems[e.target.id]['subItems'] = []
        props.setItemList([...props.itemList.slice(0, props.checklistId), currentChecklist, ...props.itemList.slice(parseInt(props.checklistId) + 1)])
    }

    const handleDeleteChecklist = (e) => {
        props.itemList[props.checklistId].subItems.forEach(item => {
            if(item.complete) {
                props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed -= 1})
            }
            props.updateTasksOverview({...props.tasksOverview, total: props.tasksOverview.total -= 1})
        })
        props.handleItemDelete(e.target.id)
    }

    const displayListSubItems = (item, id) => {
        if(!!item.subItems) {
            return <ChecklistSubItems currentChecklist={currentChecklist}
                                      checklistId={props.checklistId}
                                      listItemId={id}
                                      itemList={props.itemList}
                                      setItemList={props.setItemList}/>
        } else {
            return null
        }
    }

    const displayListItems = () => {
        return props.itemList[props.checklistId].subItems.map((item, id) => {
            return <div>
                <input id={id} checked={item.complete} type='checkbox' onChange={handleCheckChange}/>
                <label style={item.complete ? complete : incomplete}>
                    {item.label}
                </label>
                <button id={id} className='remove-button' onClick={handleDeleteListItem}>&#x2716;</button>
                <button id={id} className='add-sub-item' onClick={handleAddSubItem}>&#9998;</button>
                {displayListSubItems(item, id)}
            </div>
        })
    }

    return <div id={props.checklistId}
                className='checklist'>
        <div className='item-header-container'>
            <p className='item-name'>{props.itemLabel}</p>
            <button id={props.checklistId} className='remove-button' onClick={handleDeleteChecklist}>&#x2716;</button>
        </div>
        <form onSubmit={handleSubmit}>
            <input type='text'
                   placeholder='Add Item...'
                   value={inputValue}
                   onChange={handleInputChange}/>
        </form>
        {displayListItems()}
    </div>
}

export default Checklist

const complete = {
    color: 'lightgrey'
}

const incomplete = {
    color: 'black'
}