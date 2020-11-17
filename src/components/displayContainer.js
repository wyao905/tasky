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

    const handleItemDelete = (itemInd) => {
        props.setItemList([...props.itemList.slice(0, itemInd), ...props.itemList.slice(parseInt(itemInd) + 1)])
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

        return props.itemList.map((item, index)=> {
            if(item.type === 'checklist') {
                numOfLists += 1
                return <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                        return <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{userSelect: 'none',
                                            background: snapshot.isDragging ? 'lightblue' : 'lightcyan',
                                            margin: '0 0 0 30px',
                                            width: '30rem',
                                            ...provided.draggableProps.style}}>
                            <Checklist itemLabel={item.label} 
                                       numOfLists={numOfLists}
                                       itemList={props.itemList}
                                       setItemList={props.setItemList}
                                       tasksOverview={tasksOverview}
                                       updateTasksOverview={setTasksOverview}
                                       handleItemDelete={handleItemDelete}
                                       checklistIndex={index}
                                       checklistId={item.id}/>
                        </div>
                    }}
                </Draggable>
            } else {
                numOfNotes += 1
                return <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => {
                        return <div ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{userSelect: 'none',
                                            ...provided.draggableProps.style}}>
                            <p>{!!item.label ? item.label : 'Note ' + numOfNotes}</p>
                            <Note/>
                        </div>
                    }}
                </Draggable>
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