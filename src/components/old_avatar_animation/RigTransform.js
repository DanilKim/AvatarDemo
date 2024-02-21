import * as React from 'react';
import { useState } from 'react';

import { 
    Box,
    TextField,
} from '@mui/material';

export default function RigTransform(props) {

    const [value, setValue] = React.useState([0]);
    
    

    const handleFrameChange = (event) => {

        setValue(event.target.value);
    };


    return (
        <Box component="form"
            sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off">
            <div>
                <TextField
                id="outlined-basic"
                label="BoneName"
                multiline
                value={props.boneName}
                onChange={handleFrameChange}
                />

            </div>

            <div>
                <TextField
                id="outlined-basic"
                label="Position.X"
                multiline
                value={props.nodeStates.get(props.boneName).position.x}
                onChange={handleFrameChange}
                />
                <TextField
                id="outlined-basic"
                label="Position.Y"
                multiline
                value={props.nodeStates.get(props.boneName).position.y}
                onChange={handleFrameChange}
                />
                <TextField
                id="outlined-basic"
                label="Position.Z"
                multiline
                value={props.nodeStates.get(props.boneName).position.z}
                onChange={handleFrameChange}
                />


            </div>
            <div>
                <TextField
                id="outlined-basic"
                label="Rotation.X"
                multiline
                value={props.nodeStates.get(props.boneName).rotation.x}
                onChange={handleFrameChange}
                />
                <TextField
                id="outlined-basic"
                label="Rotation.Y"
                multiline
                value={props.nodeStates.get(props.boneName).rotation.y}
                onChange={handleFrameChange}
                />
                <TextField
                id="outlined-basic"
                label="Rotation.Z"
                multiline
                value={props.nodeStates.get(props.boneName).rotation.z}
                onChange={handleFrameChange}
                />

            </div>
            <div>
                <TextField
                id="outlined-basic"
                label="Quaternion.X"
                multiline
                value={props.nodeStates.get(props.boneName).quaternion.x}
                onChange={handleFrameChange}
                />
                <TextField
                id="outlined-basic"
                label="Quaternion.Y"
                multiline
                value={props.nodeStates.get(props.boneName).quaternion.y}
                onChange={handleFrameChange}
                />
                <TextField
                id="outlined-basic"
                label="Quaternion.Z"
                multiline
                value={props.nodeStates.get(props.boneName).quaternion.z}
                onChange={handleFrameChange}
                />
                <TextField
                id="outlined-basic"
                label="Quaternion.W"
                multiline
                value={props.nodeStates.get(props.boneName).quaternion.w}
                onChange={handleFrameChange}
                />

            </div>
        </Box>


    );
}
