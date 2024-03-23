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



const AudioUploader = () => {
  const { deca_store } = useStore();
  const [audio, setAudio] = useState( {
    file: null,
    url: '', //'/static/audios/obama_test_audio.wav',
    name: '', //'obama_test_audio'
  });
  
  // const [audioFiles] = useState(initialAudioFiles);
  // const [currentAudioIndex, setCurrentAudioIndex] = useState(
  //   parseInt(localStorage.getItem('currentAudioIndex')) || 0
  // );

  // Post request for uploading audio in cloudinary
  const handleSubmit = async (e) => {
    e.preventDefault();
    deca_store.setLoading(true);

    //deca_store.setAudioURL(URL.createObjectURL(audioUpload))
    if (audio.url === '') return;
    var data = new FormData();
    data.append("files", audio.file);

    var model = await fetch(deca_store.selected_item.modelUrl);
    var model_blob = await model.blob();
    var model_name = deca_store.selected_item.name;
    var model_file = new File([model_blob], model_name );
    data.append("files", model_file);

    // console.log(audio.file);
    // console.log(audio.file);
    // console.log(deca_store.selected_item);
    // console.log(model_blob);
    // console.log(deca_store.selected_item.modelUrl);
    // console.log(model_file);
    console.log(data);

    model = null;
    model_blob = null;
    model_name = '';
    model_file = null;

    try {
      const res = await axios({
        method: "post",
        url: "http://222.122.67.140:11872/emote",
        data: data,
        headers: { "Content-Type": "multipart/form-data" },
        responseType: "blob",
      });
      
      const model = new Blob([res.data]);
      console.log(model);
      data = null;
      //deca_store.setModelURL(URL.createObjectURL(model));
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
            setAudio({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0]),
                name: e.target.files[0].name 
            });

          }}
        />
      </Button>
      {audio.url !== '' &&
        <AudioPlayer
            audioUrl={audio.url}
            audioName={audio.name}
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