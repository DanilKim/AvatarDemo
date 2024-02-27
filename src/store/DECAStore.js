import { observable } from "mobx";
import * as THREE from "three";

const deca_store = observable({
  inputImage: null,
  style: "pixar",
  style_id: 0,
  hair_id: 1,
  sw: 40,
  model_url: null,
  loading: false,

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

  setSw(sw) {
    this.sw = sw;
  },

  setModelURL(url) {
    this.model_url = url;
  },

  setLoading(load) {
    this.loading = load;
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
