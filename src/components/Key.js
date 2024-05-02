import React, { useContext } from 'react'
import { appContext } from '../App';

function Key({ keyVal, bigKey, disabled }) {
    const { onSelectLetter, onDelete, onEnter } = useContext(appContext);
    const selectLetter = () => {
        if(keyVal === 'ENTER') {
            onEnter();
        }
        else if(keyVal === 'DELETE'){
            onDelete();
        }
        else {
            onSelectLetter(keyVal);
        }
    }
    return (
        <div className='key' id={bigKey ? 'big' : disabled && 'disabled'} onClick={selectLetter}>
            {keyVal}
        </div>
    )
}

export default Key