import React, { useContext } from 'react'
import { appContext } from '../App';

function Key({ keyVal, bigKey }) {
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
        <div className='key' id={bigKey && 'big'} onClick={selectLetter}>
            {keyVal}
        </div>
    )
}

export default Key