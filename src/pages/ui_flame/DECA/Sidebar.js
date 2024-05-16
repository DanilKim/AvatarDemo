import React, { useState } from "react";
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    Avatar,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TableCell,
    Input
} from '@mui/material';
import { observer } from 'mobx-react';
import useStore from "../../../store/UseStore";
import { Vector3 } from "three";

import UploadAudio from "./UploadAudio";
import AnimationPlay from "./AnimationPlay";

const actions = ['rotation', 'hover', 'alien atack'];

export default observer((props) => {
    const { deca_store } = useStore();
    const [act, setAct] = useState();

    let item;
    if (deca_store.selected) {
        //item = deca_store.scene.getObjectByName(deca_store.selected_item.name, true);
        item = deca_store.scene.getObjectByName("my_deca", true);
    }


    const handleClickScene = (id) => {
        console.log(deca_store.scene.getObjectByName(id, true));
    }

    const eulerToDegree = (euler) => {
        let degree = euler * 180.0 / Math.PI;
        if (degree < 0) {
            degree += 360.0;
        }
        return degree;
    }

    const degreeToEuler = (degree) => {
        return degree * (Math.PI / 180);
    }

    const delegate = (event, func) => {
        if (event.key === "Enter"){
            if(!isNaN(event.target.value)){
                func(event.target.value);
            }
            event.currentTarget.value = '';
            event.target.blur();
    }}

    const setPosX = (x) => { console.log(item); item.position.setX(Number(x)); }
    const setPosY = (y) => { item.position.setY(Number(y)); }
    const setPosZ = (z) => { item.position.setZ(Number(z)); }
    const setRotX = (x) => { item.rotation.setFromVector3(new Vector3(degreeToEuler(x % 360), item.rotation.y, item.rotation.z)); }
    const setRotY = (y) => { item.rotation.setFromVector3(new Vector3(item.rotation.x, degreeToEuler(y % 360), item.rotation.z)); }
    const setRotZ = (z) => { item.rotation.setFromVector3(new Vector3(item.rotation.x, item.rotation.y, degreeToEuler(z % 360))); }
    const setScaX = (x) => { item.scale.setX(Number(x)); }
    const setScaY = (y) => { item.scale.setY(Number(y)); }
    const setScaZ = (z) => { item.scale.setZ(Number(z)); }
    

    // const [dist, setDist] = useState();

    // const handleChange = ({ target: { value } }) => setDist(value);

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     alert(`Entering Distance: ${dist}`);
    // };

    return (<>
        <Card variant='elevation' sx={{ width: '100%', height: '99%', m: '0%', mt: 1, bgcolor: '#e4ddfa' }}>
            <CardHeader
                title="애니메이션 제작"
                avatar={<Avatar src="../../icons/building_icon.png" />}
                sx={{ color: '#5f5f5f', m: '3%', mb: -3 }}
            />
            {deca_store.selected &&
                <CardContent align="center">
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" sx={{ width: 30 }}>ID</TableCell>
                                        <TableCell align="right" >{0}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">name</TableCell>
                                        <TableCell align="right" >{"my_deca"}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    <Card variant='elevation' sx={{ bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
                        <TableContainer component={Paper}>
                            <Table size="small" aria-label="a dense table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ width: 20 }}></TableCell>
                                        <TableCell align="right">x</TableCell>
                                        <TableCell align="right">y</TableCell>
                                        <TableCell align="right">z</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">position</TableCell>
                                        <TableCell align="right">
                                            <Input
                                            disableUnderline={true}
                                            placeholder={deca_store.transform.position.x.toFixed(0)} 
                                            onKeyDown={(event) => {delegate(event, setPosX)}}
                                            inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={deca_store.transform.position.y.toFixed(0)} 
                                                onKeyDown={(event) => {delegate(event, setPosY)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={deca_store.transform.position.z.toFixed(0)} 
                                                onKeyDown={(event) => {delegate(event, setPosZ)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">rotation</TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={eulerToDegree(deca_store.transform.rotation.x).toFixed(0)}
                                                onKeyDown={(event) => {delegate(event, setRotX)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={eulerToDegree(deca_store.transform.rotation.y).toFixed(0)}
                                                onKeyDown={(event) => {delegate(event, setRotY)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={eulerToDegree(deca_store.transform.rotation.z).toFixed(0)}
                                                onKeyDown={(event) => {delegate(event, setRotZ)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">scale</TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={deca_store.transform.scale.x.toFixed(2)}
                                                onKeyDown={(event) => {delegate(event, setScaX)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={deca_store.transform.scale.y.toFixed(2)}
                                                onKeyDown={(event) => {delegate(event, setScaY)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>                                     
                                        <TableCell align="right">
                                            <Input
                                                disableUnderline={true}
                                                placeholder={deca_store.transform.scale.z.toFixed(2)}
                                                onKeyDown={(event) => {delegate(event, setScaZ)}}
                                                inputProps={{style: {fontSize: 14, textAlign: 'right'}}} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Card>
                    {/* <TextField id="outlined-basic" label="Distance" variant="outlined" onChange={handleChange}></TextField> */}
                    <br />
                </CardContent>
            }
            {deca_store.model_url && <UploadAudio />}
            {deca_store.anim.url !== '' && <AnimationPlay action={deca_store.anim.action}/>}
        </Card>
    </>
    );


})

//{deca_store.selected && <UploadAudio item={item}/>}

/*
<form onSubmit={handleSubmitDistance}>
    <label>
        Entering Distance:
        <input
            type="distance"
            name="distance"
            value={SidebarStore.distance}
            onChange={handleChangeDistance}
        />
    </label>
</form>

{ SidebarStore.current === 'asset' &&
    <FormControl sx={{ m:3, width: 200, flexGrow: 1 }}>
        <InputLabel htmlFor="action-select">Choose Effect</InputLabel>
        <Select 
        defaultValue="" 
        id="action-select" 
        label="Action"
        value={act}
        onChange={actChange}
        >
        {actions.map((a, index) => (<MenuItem key={index} value={a}>{a}</MenuItem>))}
        </Select>
    </FormControl>
}

{ SidebarStore.current === 'building' && 
    <Card variant='elevation' sx={{ bgcolor: 'white', display: 'flex', flexDirection: 'row', boxShadow: 0, mt: 2 }}>
    {
        localStorage.getItem(SidebarStore.item.name) !== null ?
        <PlanPreview buildingName={SidebarStore.item.name} /> :
        <></>
    }
    </Card>
}

{ SidebarStore.current === 'building' && 
    <Button onClick={handleClickIndoor} sx={{ color: 'inherit', width: 1, height: 1 / 3, mt: 3, bgcolor: '#dbdbdb', borderRadius: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', align: 'center' }}>
        실내 공간 스튜디오
    </Button>
}
*/