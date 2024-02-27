import React from 'react';
import {
    Box,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import useStore from '../../../store/UseStore';

function Loading({...props}) {
    const { deca_store } = useStore();
    const loadingSize = 40;

    return (
        <Box sx={{ width: '25vw', height: '25vh', borderRadius:2, p:2, position: 'absolute', top:'40%', left:'40%', opacity:0.7, bgcolor:'white'}}>
            <Typography sx={{fontSize: '1.5rem', m:'1%', textAlign: 'center'}}>
                3D 얼굴 생성중
            </Typography>
            <CircularProgress
                size={loadingSize}
                sx={{
                  position: 'absolute',
                  top: '55%',
                  left: '50%',
                  marginTop: `${-loadingSize/2}px`,
                  marginLeft: `${-loadingSize/2}px`
                }}>
            </CircularProgress>
        </Box>
        )
    }
    
export default observer(Loading);

//   <Dialog open={deca_store.loading}>
//     <DialogTitle>3D 얼굴 생성중...</DialogTitle>
//     <DialogContent>
//       <CircularProgress
//         size={loadingSize}
//         sx={{
//           position: 'absolute',
//           top: '50%',
//           left: '50%',
//           marginTop: `${-loadingSize/2}px`,
//           marginLeft: `${-loadingSize/2}px`
//       }}>
//       </CircularProgress>
//     </DialogContent>
//     <DialogActions>
//     </DialogActions>
//   </Dialog>