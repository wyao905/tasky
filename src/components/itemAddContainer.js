import React, { useState } from 'react'
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
        } else {
            setItemList([...itemList, {label: textValue,
                                       type: selectValue,
                                       subItems: []}])
        }
    }

    const handleTextChange = (e) => {
        setTextValue(e.target.value)
    }

    const handleSelect = (e) => {
        setSelectValue(e.value)
    }

    return <div>
        <form id='item-input-form'
              style={{'display':'flex'}}
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
                          setItemList={setItemList}/>
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
        borderRight: '2px solid lightgrey',
        borderRadius: 0,
        boxShadow: 'none',
        margin: 5 + 'px',
        width: 10 + 'rem',
        '&:hover': {}
    })
}