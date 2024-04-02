import { observable } from "mobx";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const emote_store = observable({
  //obj_path: "/static/models/output_file.glb",
  obj_path: "/static/models/talking_head_animation.glb",
  setObj(path) {
    this.obj_path = path;
  },

  setInputAudio(audio) {
    this.inputAudio = audio;
  },

  setInputText(text) {
    this.inputText = text;
  },
});

export { emote_store };
