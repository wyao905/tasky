import React from 'react'

function ProgressBar(props) {
    return <div id='progress-bar-container'>
        <div className='item-header-container'>
            <p className='item-name'>Overall Progress</p>
            <p id='overall-progress'>{(!props.progress && props.progress !== 0) ? null : `${(props.progress * 100).toFixed(1)}%`}</p>
        </div>
        <div id='progress-bar'>
            <div id='progress-bar-complete'
                style={{backgroundColor: 'cyan',
                        width: (!props.progress && props.progress !== 0) ? 0 + '%' : (props.progress * 100).toFixed(1) + '%',
                        height: 100 + '%',
                        borderRadius: '15px'}}/>
        </div>
    </div>
}

export default ProgressBar