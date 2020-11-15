import React, { useState, useEffect } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ProgressBar from './progressBar'
import Checklist from './checklist'
import Note from './note'

function DisplayContainer(props) {
    const [tasksOverview, setTasksOverview] = useState({total: 0, completed: 0})
    let [completionProgress, setCompletionProgress] = useState(0)
    useEffect(() => setCompletionProgress(tasksOverview.completed/tasksOverview.total), [tasksOverview])

    const displayProgressBar = () => {
        if(props.displayProgressBar) {
            return <ProgressBar progress={completionProgress}/>
        } else {
            return null
        }
    }

    const handleItemDelete = (itemId) => {
        props.setItemList([...props.itemList.slice(0, itemId), ...props.itemList.slice(parseInt(itemId) + 1)])
    }

    const onDragEnd = (result) => {
        if(!result.destination) {
            return
        } else {
            const {source, destination} = result
            const copiedItemList = [...props.itemList]
            const [removed] = copiedItemList.splice(source.index, 1)
            copiedItemList.splice(destination.index, 0, removed)
            props.setItemList(copiedItemList)
        }
    }

    const displayItems = () => {
        let numOfLists = 0
        let numOfNotes = 0

        return props.itemList.map((item, id)=> {
            if(item.type === 'checklist') {
                numOfLists += 1
                return <Draggable key={id} draggableId={id.toString()} index={id}>
                    {(provided, snapshot) => {
                        return <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{userSelect: 'none',
                                            ...provided.draggableProps.style}}>
                                    <Checklist itemLabel={item.label} 
                                               numOfLists={numOfLists}
                                               itemList={props.itemList}
                                               setItemList={props.setItemList}
                                               tasksOverview={tasksOverview}
                                               updateTasksOverview={setTasksOverview}
                                               handleItemDelete={handleItemDelete}
                                               checklistId={id}/>
                        </div>
                    }}
                </Draggable>
            } else {
                numOfNotes += 1
                return <div>
                    <p>{!!item.label ? item.label : 'Note ' + numOfNotes}</p>
                    <Note/>
                </div>
            }
        })
    }

    return <div>
        {displayProgressBar()}
        <DragDropContext onDragEnd={result => onDragEnd(result)}>
            <Droppable key={'item-list'} droppableId={'item-list'}>
                {(provided, snapshot) => {
                    return <div {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{width: 480}}>
                        {displayItems()}
                        {provided.placeholder}
                    </div>
                }}
            </Droppable>
        </DragDropContext>
    </div>
}

export default DisplayContainer