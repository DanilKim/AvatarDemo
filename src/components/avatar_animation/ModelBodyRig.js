import * as React from 'react';
import { useState } from 'react';
import { 
    Box,
    ListSubheader,
    ListItemButton,
    List,
    ListItemText,
    Collapse,
    IconButton

} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

export default function ModelBodyRig(props) {

    const [openState, setOpenState] = useState(new Map());
    const upsert = (key, value) => {
        setOpenState((prev) => new Map(prev).set(key, value));
      }
      
    const handleListItemClick = (event, index)=>{
        props.setBoneName(index);
        for(var j=0; j<props.nodeStates.get(index).children.length; j++){
            if (props.nodeStates.get(index).children[j].name !== index){

                if (openState.get(props.nodeStates.get(index).children[j].name) === false){
                    upsert(props.nodeStates.get(index).children[j].name, true)
                }
                else{
                    upsert(props.nodeStates.get(index).children[j].name, false)
                    var childset = new Set();

                    ( function collapeAllChild( objects,  pad ) {

                        for ( let i = 0, l = objects.length; i < l; i ++ ) {
                
                            const object = objects[ i ];
                
                            if (object.isBone === true){
                                if ( openState.get(object.name) === true  ) {
                
                                    childset.add(object.name);
                                    collapeAllChild(object.children, pad+1)
                
                                }
                            }
                
                        }
                
                    } )( props.nodeStates.get(index).children[j].children, 0 );
                    console.log(childset);
                    for(var elem of childset){
                        upsert(elem, false);
                    }

                }
            }
        }
        
    }

    

    console.log(props.nodeStates);
    var keys= Array.from(props.nodeStates.keys());

    for(var i=0; i<keys.length;i++){
        if (openState.has( keys[i] ) === false){
            if(keys[i]==="mixamorigHips"){
                openState.set( keys[i], true );
            }
            else{
                openState.set( keys[i], false );
            }
        }
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: '#939393'}}>
                                {keys.map((value) => (
                                <Collapse in={openState.get(value)} timeout="auto" unmountOnExit>
                                    <ListItemButton
                                    key={value}
                                    selected={props.boneName === value}
                                    onClick={(event) => handleListItemClick(event, value)}
                                    secondaryAction={
                                        <IconButton>
                                        </IconButton>
                                    }
                                    >

                                    <ListItemText primary={`${value}`} sx={{ ml: props.depthState.get(value), flexGrow: 1, color: 'white' }} />
                                    {openState.get(value) ? <ExpandLess /> : <ExpandMore />}
                                    </ListItemButton>
                                </Collapse>
                            ))}
        </List>

    );


    /*
    const [open, setOpen] = React.useState(true);
    const [openLeftUpLeg, setOpenLeftUpLeg] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
        props.setBoneName("mixamorigHips")

    };

    const handleClickLeftUpLeg = () => {
        setOpenLeftUpLeg(!openLeftUpLeg);
        props.setBoneName("mixamorigLeftUpLeg")
    };

    return (
        <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                Models
                </ListSubheader>
        }
        >
            <ListItemButton onClick={handleClick} selected={props.boneName==="mixamorigHips"}>

                <ListItemText primary="mixamorigHips"  />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={handleClickLeftUpLeg} selected={props.boneName==="mixamorigLeftUpLeg"}>  

                        <ListItemText primary="mixamorigLeftUpLeg" />
                        {openLeftUpLeg ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={openLeftUpLeg} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItemButton sx={{ pl: 6 }} selected={false}>

                                <ListItemText primary="mixamorigLeftLeg" />
                            </ListItemButton>
                        </List>
                    </Collapse>





                    <ListItemButton sx={{ pl: 4 }} selected={false}>

                        <ListItemText primary="mixamorigRightUpLeg" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} selected={false}>

                        <ListItemText primary="mixamorigSpine" />
                    </ListItemButton>
                </List>
            </Collapse>
        </List>

    );
    */
}

