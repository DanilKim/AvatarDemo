import React from 'react';

export default function AnimSliderViewModel() {

    const [isPlaying, setIsPlaying] = React.useState(0)

    const playChange = (event)=>{
      if (isPlaying === 0){
          setIsPlaying(1)
      }
      else{
          setIsPlaying(0)
      }
    }

    return { isPlaying, playChange}
}

