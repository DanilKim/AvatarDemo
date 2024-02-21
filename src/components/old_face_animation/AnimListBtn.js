import { Button, IconButton, Stack } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import React from 'react'


function AnimListBtn(props) {
    function handleOnClick(index) {
        // stop previous action, audio
        props.actionList[props.animIndex].fadeOut(0.5)
        if (props.audioList[props.animIndex] !== null) {
            props.audioList[props.animIndex].pause()
            props.audioList[props.animIndex].currentTime = 0
        }

        // play curretn action, audio
        props.actionList[index].reset().fadeIn(0.5).play()
        if (props.audioList[index] !== null) {
            props.audioList[index].play()
        }

        // set animIndex as current index
        props.setAnimIndex(index)
    }

    function removeAnim(index) {
        props.setAnimNameList(props.animNameList.filter((_, i) => index !== i))
        props.setActionList(props.actionList.filter((_, i) => index !== i))
        props.setAudioList(props.audioList.filter((_, i) => index !== i))
        handleOnClick(0)
    }

    function editAnim(index) {
    }

    const EditRemoveButton = (props) => {
        return (
            <>
                <IconButton onClick={() => editAnim(props.index)}>
                    <ModeEditIcon/>
                </IconButton>
                <IconButton onClick={() => removeAnim(props.index)}>
                    <DeleteIcon/>
                </IconButton>
            </>
        )
    }

    return (
        <Stack spacing={1}>
            {props.animNameList.map((name, index) => {
                return (
                    <form key={index}>
                        <Button variant='contained' onClick={() => handleOnClick(index)}>{name}</Button>
                        {(index===0 || index===1) ? <></> : <EditRemoveButton index={index}/>}
                    </form>
                )
            })}
        </Stack>
    )
}

export default AnimListBtn