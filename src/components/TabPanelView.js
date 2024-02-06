import Box from '@mui/material/Box';

export default function TabPanel(props) {
    return (
        <Box>
            {props.value === props.index && 
            <Box sx={{ height: '100%',width: '100%' }}>
                {props.children}
            </Box>}
        </Box> 
    );
}