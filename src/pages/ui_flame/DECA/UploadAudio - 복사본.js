import React, { useEffect, useState } from 'react';
import './css/AudioUploader.css';

import {
    Typography,
    Box,
    Button,
    Card,
    CardHeader,
    CardContent,
} from "@mui/material";

import axios from "axios";
import { observer } from "mobx-react";
import useStore from "../../../store/UseStore";


const AudioPlayer = (props) => {
    const [audio, setAudio] = useState(new Audio());
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const newAudio = new Audio(props.audioUrl);
        setAudio(newAudio);
        setIsPlaying(true);
        newAudio.play();

        // cleanup on unmounted phase
        return () => {
            newAudio.pause();
            newAudio.removeEventListener('ended', () => { });
        };
    }, [props.audioUrl]);

    const togglePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };
    //console.log(isPlaying);
    return (
        <div>
            <h2> {props.audioName} </h2>
            <div className="audio-instance">
                <audio autoPlay controls="1" onEnded={() => setIsPlaying(false)}>
                    <source src={props.audioUrl} type="audio/*" />
                    Your browser does not support the audio tag.
                </audio>
                <button onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
            </div>
        </div>
    );
};


// const initialAudioFiles = JSON.parse(localStorage.getItem('audioList')) ||
//   [
//     //{ name: 'Audio 2', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
//     { name: 'Audio 1', url: '/static/audios/obama_test_audio.wav' },
//     { name: 'Audio 1', url: '/static/audios/test_man_audio.wav' },
//     // Add more initial audio files as needed
//   ];



const AudioUploader = (props) => {
  const { deca_store } = useStore();
  // const [audio, setAudio] = useState( {
  //   file: item.audio.file,
  //   url: item.audio.url,  //'/static/audios/obama_test_audio.wav',
  //   name: item.audio.name, //'obama_test_audio'
  // });

  // Post request for uploading audio in cloudinary
  const handleSubmit = async (e) => {
    e.preventDefault();
    deca_store.setLoading(true);

    //deca_store.setAudioURL(URL.createObjectURL(audioUpload))
    if (deca_store.audio.url === '') return;
    var data = new FormData();
    data.append("audio", deca_store.audio.file);

    var model = await fetch(deca_store.model_url);
    var model_blob = await model.blob();
    console.log(model_blob);
    var model_name = "my_deca" //item.name;
    var model_file = new File([model_blob], model_name + '.glb' );
    data.append("face", model_file);
 
    for (var value of data.values()) {
        console.log(value);
      }

    model = null;
    model_blob = null;
    model_name = '';
    model_file = null;

    try {
      const res = await axios({
        method: "post",
        //url: "http://222.122.67.140:11885/deca_with_emote",
        url: "http://192.168.153.123:11885/deca_with_emote",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });
      
      const model = new Blob([res.data]);
      data = null;
      deca_store.setAnimUrl(URL.createObjectURL(model));
      deca_store.setLoading(false);
    } catch (error) {
      console.log(error);
      data = null;
      deca_store.setLoading(false);
    }

  };

  return (
    <Box>
      <Button component="label">
        Audio
        <input 
          type='file' 
          accept="audio/*"
          onChange={(e) => {
            deca_store.setAudio({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
                name: e.target.files[0].name 
            });
            // item.audio = {
            //   file: e.target.files[0],
            //   url: URL.createObjectURL(e.target.files[0]),
            //   name: e.target.files[0].name 
            // }
            // setAudio(item.audio);
          }}
        />
      </Button>
      {deca_store.audio.url !== '' &&
        <AudioPlayer
            audioUrl={deca_store.audio.url}
            audioName={deca_store.audio.name}
        />
      }
      
      <Button
        color="inherit"
        sx={{
          width: 1,
          height: 40,
          mt: 3,
          bgcolor: "#939393",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={handleSubmit}
      >
        애니메이션 적용
      </Button>
    </Box>
    
  );
};

export default observer(AudioUploader);


/*
<div className='main'>
      <div>
        <input type='file' onChange={(e) => setAudioUpload(e.target.files[0])} />
        <button onClick={uploadAudioHandler}>Upload Audio</button>
      </div>
      
    </div>
*/