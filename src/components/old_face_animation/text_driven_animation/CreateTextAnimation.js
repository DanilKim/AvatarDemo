import { Add } from '@mui/icons-material';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, MenuItem, Stack, TextField, Typography } from '@mui/material';
import Select from '@mui/material/Select';
import $ from 'jquery'
import { useState } from 'react';
import scheduleFacePose from './scheduleFacePose';
import scheduleToAnimation from './scheduleToAnimation';


export default function CreateTextAnimation(props) {
    const [open, setOpen] = useState(false)
    const [voice, setVoice] = useState('tsd1')

    function synthesize(e) {
        var jsonData = JSON.stringify({"uid":'demo_site', "text": props.textInput, "spk":voice, "speed":1});
        $.ajax({
            type: "POST",
            url: "/v1/tts/synthesize",
            accept:"*/*",
            dataType:"json",
            contentType:"application/json; charset=UTF-8",
            data: jsonData,
            error : function(request, status, error) {
                console.log("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+error);
            },
            success: function(response){
                if (response['code'] == 0) {
                    // audio
                    const aud_url = URL.createObjectURL(b64toBlob(response['result']));
                    const aud = new Audio(aud_url)
                    // aud.loop = true
                    props.setAudioList([...props.audioList, aud])
                    
                    // animation
                    const schedule = scheduleFacePose(response['token'], response['duration'])
                    const clip = scheduleToAnimation(schedule, props.textInput)
                    props.setFaceAnimData(clip)
                    props.setAnimNameList([...props.animNameList, props.textInput])
                } else {
                }
            }
        })
    }

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button color='inherit' sx={{ width: 1, height: 1/3, mt:3, mb:3, bgcolor: '#939393', borderRadius: 5, display: 'flex', flexDirection: 'column'}} 
                onClick={handleOpen}>
                <Add sx={{color: 'white', mt: 5}} />
                <Typography variant="body1" sx={{color: 'white', mb: 5}}>
                    텍스트로 얼굴 애니메이션 만들기
                </Typography>
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>텍스트 입력</DialogTitle>
                <DialogContent>
                    <DialogContentText marginBottom={2}>
                        텍스트로부터 음성과 얼굴 애니메이션을 생성합니다. 
                    </DialogContentText>
                    <TextField label='성우' value={voice} onChange={(e) => setVoice(e.target.value)} select>
                        <MenuItem value={'tsd1'}> 남자 1 </MenuItem>
                        <MenuItem value={'tsd2'}> 남자 2 </MenuItem>
                        <MenuItem value={'tsd5'}> 남자 3 </MenuItem>
                        <MenuItem value={'tsd3'}> 여자 1 </MenuItem>
                        <MenuItem value={'tsd4'}> 여자 2 </MenuItem>
                    </TextField>
                    <TextField margin='normal' variant='filled' label='텍스트를 입력하세요' multiline fullWidth
                            onChange={(e) => props.setTextInput(e.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        synthesize()
                        handleClose()
                    }}>
                        애니메이션 생성
                    </Button>
                    <Button onClick={handleClose}> 취소 </Button>
                </DialogActions>
            </Dialog>
        </div>

        // <Stack direction={'row'}>
        //     {/* <input size={15} onChange={(e) => props.setTextInput(e.target.value)}/> */}
        //     <TextField label="텍스트를 입력하세요" margin='normal' variant='filled'
        //         onChange={(e) => props.setTextInput(e.target.value)}
        //     />
        //     &nbsp;
        //     <Button variant='contained' size='small' onClick={synthesize}> 생성 </Button>
        // </Stack>
    )
}

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'audio/wav';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}
