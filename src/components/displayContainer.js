import React, { useState, useEffect } from 'react'
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

    const displayItems = () => {
        let numOfLists = 0
        let numOfNotes = 0

        return props.itemList.map((item, id)=> {
            if(item.type === 'checklist') {
                numOfLists += 1
                return <Checklist itemLabel={item.label} 
                                  numOfLists={numOfLists}
                                  itemList={props.itemList}
                                  setItemList={props.setItemList}
                                  tasksOverview={tasksOverview}
                                  updateTasksOverview={setTasksOverview}
                                  handleItemDelete={handleItemDelete}
                                  checklistId={id}/>
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
        {displayItems()}
    </div>
}

export default DisplayContainer