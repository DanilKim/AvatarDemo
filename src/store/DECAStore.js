import { observable } from "mobx";
import * as THREE from "three";
import { Vector3 } from 'three';


class InstanceInfo {
  id;
  name;
  position;
  rotation;
  scale;
  modelUrl;
  audio;

  constructor(id, name, position, rotation, scale, modelUrl = '', audio = {file: null, url: '', name: ''}) {
      this.id = id;
      this.name = name;
      this.position = position;
      this.rotation = rotation;
      this.scale = scale;
      this.modelUrl = modelUrl;
      this.audio = audio;
  }
}

class Transform {
  position;
  rotation;
  scale;

  constructor(position, rotation, scale) {
      this.position = position;
      this.rotation = rotation;
      this.scale = scale;
  }
}


const deca_store = observable({
  inputImage: null,
  style: "pixar",
  style_id: 0,
  hair_id: 1,
  hair_color_id: 0,
  sw: 40,
  model_url: null,
  audio: {file: null, url: '', name: ''},
  anim: {action: null, url: ''},
  loading: false,

  selected: false,
  selected_item: null,

  scene: new THREE.Scene,
  transform: new Transform(new Vector3(0,0,0), new Vector3(0,0,0), new Vector3(0,0,0)),

  setInputImage(img) {
    this.inputImage = img;
  },

  setStyle(style) {
    this.style = style;
  },

  setStyleId(style_id) {
    this.style_id = style_id;
  },

  setHairId(hair_id) {
    this.hair_id = hair_id;
  },

  setHairColorId(hair_color_id) {
    this.hair_color_id = hair_color_id;
  },

  setSw(sw) {
    this.sw = sw;
  },

  setModelURL(url) {
    this.model_url = url;
  },

  setAudio(audio) {
    //if (this.selected) {
    this.audio.file = audio.file;
    this.audio.url = audio.url;
    this.audio.name = audio.name;
    //}
  },

  setText(text) {
    this.text = text;
  },

  setLoading(load) {
    this.loading = load;
  },


  select(id, name, position, rotation, scale, modelUrl='', audio = {file: null, url: '', name: ''}) {
    this.selected = true;
    //this.selected_item = new InstanceInfo(id, name, position, rotation, scale, modelUrl, audio);
  },

  unselect() {
    this.selected = false;
    //this.selected_item = null;
  },


  setScene(scene) {
    this.scene = scene;
  },

  update3D(position, rotation, scale) {
    this.transform = new Transform(position, rotation, scale);
  },

  anim_on(action) {
    this.anim.action = action;
  },

  anim_off() {
    this.anim.action = null;
  },

  setAnimUrl(url) {
    this.anim.url = url;
  },

  flushAnim() {
    this.anim = {action: null, url: ''};
  }


});

export { deca_store };

/*
import { action, makeObservable, observable } from "mobx";

export class DECAStore {
    rootStore;

    inputImage = null;
    style = '';
    style_id = 0;
    hair_id = 0;
    sw = 40;

    constructor(root) {
        makeObservable(this, {
            inputImage : observable,
            style: observable,
            style_id : observable,
            hair_id : observable,
            sw : observable,
            setInputImage : action,
            setStyle : action,
            setStyleId : action,
            setHairId : action,
            setSw : action
        })

        this.rootStore = root;
    }

    setInputImage = (img) => {
        this.inputImage = img;
    }

    setStyle = (style) => {
        this.style = style;
    }

    setStyleId = (style_id) => {
        this.style_id= style_id;
    }

    setHairId = (hair_id) => {
        this.hair_id = hair_id;
    }

    setSw = (sw) => {
        this.sw = sw;
    }

}
*/
