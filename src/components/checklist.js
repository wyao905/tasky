import React, { useState, useEffect } from 'react'
import uuid from 'react-uuid'
import ChecklistSubItems from './checklistSubItems'

function Checklist(props) {
    const [inputValue, setInputValue] = useState('')
    const [inputEditValue, setInputEditValue] = useState('')
    const [subItemAddState, setSubItemAddState] = useState('')
    const [itemLabelEditState, setItemLabelEditState] = useState(false)
    const currentChecklist = {...props.itemList[props.checklistIndex]}

    useEffect(() => {
        if(!props.itemLabel) {
            currentChecklist.label = `Checklist ${props.numOfLists}`
            props.updateItemList(props.checklistIndex, currentChecklist)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        currentChecklist.subItems = [...currentChecklist.subItems, {id: uuid(), label: inputValue, complete: false, subItems: []}]
        props.updateItemList(props.checklistIndex, currentChecklist)
        setInputValue('')
        props.updateTasksOverview({...props.tasksOverview, total: props.tasksOverview.total += 1})
    }

    const handleEditSubmit = (e) => {
        if(inputEditValue !== '') {
            e.preventDefault()
            currentChecklist.label = inputEditValue
            props.updateItemList(props.checklistIndex, currentChecklist)
            setInputEditValue('')
        }
        setItemLabelEditState(false)
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleInputEdit = (e) => {
        setInputEditValue(e.target.value)
    }

    const toggleEditState = () => {
        setItemLabelEditState(true)
    }

    const handleCheckChange = (e) => {
        if(e.target.checked) {
            currentChecklist.subItems[e.target.id].complete = true
            props.updateItemList(props.checklistIndex, currentChecklist)
            props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed += 1})
        } else {
            currentChecklist.subItems[e.target.id].complete = false
            props.updateItemList(props.checklistIndex, currentChecklist)
            props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed -= 1})
        }
    }

    const handleDeleteListItem = (e) => {
        if(currentChecklist.subItems[e.target.id].complete) {
            props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed -= 1})
        }
        currentChecklist.subItems = [...currentChecklist.subItems.slice(0, e.target.id), ...currentChecklist.subItems.slice(parseInt(e.target.id) + 1)]
        props.updateItemList(props.checklistIndex, currentChecklist)
        props.updateTasksOverview({...props.tasksOverview, total: props.tasksOverview.total -= 1})
    }

    const handleAddSubItem = (e) => {
        if(subItemAddState !== e.target.id) {
            setSubItemAddState(e.target.id)
        } else {
            setSubItemAddState('')
        }
    }

    const handleDeleteChecklist = (e) => {
        props.itemList[props.checklistIndex].subItems.forEach(item => {
            if(item.complete) {
                props.updateTasksOverview({...props.tasksOverview, completed: props.tasksOverview.completed -= 1})
            }
            props.updateTasksOverview({...props.tasksOverview, total: props.tasksOverview.total -= 1})
        })
        props.handleItemDelete(e.target.id)
    }

    const displayListSubItems = (id, index) => {
        return <ChecklistSubItems currentChecklist={currentChecklist}
                                  checklistIndex={props.checklistIndex}
                                  listItemId={id}
                                  listItemIndex={index}
                                  itemList={props.itemList}
                                  updateItemList={props.updateItemList}
                                  subItemAddState={subItemAddState}
                                  setSubItemAddState={setSubItemAddState}/>
    }

    const displayItemLabelContainer = () => {
        if(itemLabelEditState) {
            return <form onSubmit={handleEditSubmit}>
                <input className='list-item-edit-label-input'
                       type='text'
                       placeholder={props.itemLabel}
                       value={inputEditValue}
                       onChange={handleInputEdit}/>
            </form>
        } else {
            return <div style={{display: 'flex'}}>
                <p className='item-name'>{props.itemLabel}</p>
            </div>
        }
    }

    const displayListItems = () => {
        return props.itemList[props.checklistIndex].subItems.map((item, index) => {
            return <div style={{display: 'flex',
                                flexDirection: 'column',
                                marginTop: '6px',
                                borderBottom: '1px solid rgb(225, 225, 225)'}}>
                <div style={{display: 'flex',
                             justifyContent: 'space-between'}}>
                    <div>
                        <input id={index} className='checkbox' checked={item.complete} type='checkbox' onChange={handleCheckChange}/>
                        <label style={item.complete ? complete : incomplete}>
                            {item.label}
                        </label>
                    </div>
                    <div>
                        <button id={item.id} className='add-sub-item-button' onClick={handleAddSubItem}>&#10010;</button>
                        <button id={index} className='remove-button' onClick={handleDeleteListItem}>&#10006;</button>
                    </div>
                </div>
                {displayListSubItems(item.id, index.toString())}
            </div>
        })
    }

    return <div id={props.checklistIndex}
                style={{display: 'flex',
                        flexDirection: 'column',
                        padding: '24px',
                        marginBottom: '2px',
                        border: '1px solid lightgrey',
                        borderRadius: '5px'}}>
        <div className='item-header-container'>
            {displayItemLabelContainer()}
            <div>
                <button className='edit-button' onClick={toggleEditState}>&#9998;</button>
                <button id={props.checklistIndex} className='remove-button' onClick={handleDeleteChecklist}>&#10006;</button>
            </div>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <input className='list-item-input'
                       type='text'
                       placeholder='Add Item...'
                       value={inputValue}
                       onChange={handleInputChange}/>
            </form>
            {displayListItems()}
        </div>
    </div>
}

export default Checklist

const complete = {
    color: 'lightgrey'
}

const incomplete = {
    color: 'black'
}