import React from 'react'

function ProgressBar(props) {
    const handleDelete = () => {
        props.setDisplayProgressBar(false)
    }

    return <div id='progress-bar-container'>
        <div className='item-header-container'
             style={{flexDirection: 'column'}}>
            <p className='item-name'>Overall Progress</p>
            <div style={{display: 'flex',
                         justifyContent: 'space-between'}}>
                <p style={{margin: '0px'}}>{(!props.progress && props.progress !== 0) ? null : `${(props.progress * 100).toFixed(1)}%`}</p>
                <button className='remove-button' onClick={handleDelete}>&#10006;</button>
            </div>
        </div>
        <div id='progress-bar'>
            <div style={{backgroundColor: '#0085ff',
                        width: (!props.progress && props.progress !== 0) ? 0 + '%' : (props.progress * 100).toFixed(1) + '%',
                        height: 100 + '%',
                        borderRadius: '15px'}}/>
        </div>
    </div>
}

export default ProgressBar