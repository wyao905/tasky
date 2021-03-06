import React, { useState } from 'react'
import uuid from 'react-uuid'
import Select from 'react-select'
import DisplayContainer from './displayContainer'

function ItemAddContainer() {
    const [textValue, setTextValue] = useState("")
    const [selectValue, setSelectValue] = useState("")
    const [displayProgressBar, setDisplayProgressBar] = useState(false)
    const [itemList, setItemList] = useState([])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(selectValue === 'progressBar') {
            setDisplayProgressBar(true)
        } else if(selectValue === 'checklist') {
            setItemList([...itemList, {id: uuid(),
                                       label: textValue,
                                       type: selectValue,
                                       subItems: []}])
        } else if(selectValue === 'note') {
            setItemList([...itemList, {id: uuid(),
                                       label: textValue,
                                       type: selectValue,
                                       content: ''}])
        }
        setTextValue('')
        setSelectValue('')
    }

    const handleTextChange = (e) => {
        setTextValue(e.target.value)
    }

    const handleSelect = (e) => {
        setSelectValue(e.value)
    }

    return <div>
        <form id='item-input-form'
              onSubmit={handleSubmit}>
            <input id='item-input-form-text-input'
                type='text'
                value={textValue}
                onChange={handleTextChange}
                placeholder='Add Label...'/>
            <Select styles={customStyles}
                    options={groupedOptions}
                    onChange={handleSelect}
                    components={{IndicatorSeparator: () => null}}/>
            <input id='item-input-form-submit'
                   type='submit'
                   value='+'/>
        </form>
        <DisplayContainer displayProgressBar={displayProgressBar}
                          itemList={itemList}
                          setItemList={setItemList}
                          setDisplayProgressBar={setDisplayProgressBar}/>
    </div>
}

export default ItemAddContainer

const mainOptions = [
    {value: 'checklist', label: 'Checklist'},
    {value: 'note', label: 'Note'}
]

const additionalOptions = [
    {value: 'progressBar', label: "Progress Bar"}
]

const groupedOptions = [
    {
        label: 'Main',
        options: mainOptions
    },
    {
        label: 'Additional',
        options: additionalOptions
    }
]

const customStyles = {
    control: base => ({
        ...base,
        borderTop: 'none',
        borderLeft: 'none',
        borderBottom: 'none',
        borderRight: '1px solid lightgrey',
        borderRadius: 0,
        boxShadow: 'none',
        margin: 5 + 'px',
        width: 10 + 'rem',
        '&:hover': {}
    })
}