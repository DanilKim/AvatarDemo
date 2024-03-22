import { observable } from "mobx";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

const emote_store = observable({
  obj_path: "/static/models/talking_head_animation.glb",
  setObj(path) {
    this.obj_path = path;
  },

  setInputAudio(audio) {
    this.inputAudio = audio;
  },

  cur_page: "MainPanel",

  change_page(page) {
    //TODO
    this.cur_page = page;
  },

  globalTime: 0,

  setGlobalTime(time) {
    this.globalTime = time;
    if (this.mixer !== undefined) {
      this.mixer.setTime(time);
    }
  },

  lastClick: 0,
  nClick: 0,

  onLoading: false,
  setOnLoading(mode) {
    this.onLoading = mode;
  },

  isCreate: false,

  setIsCreate(create) {
    this.isCreate = create;
  },

  style: "",
  styleIdx: -1,
  libraryIdx: -1,
  hairIdx: -1,

  setStyle(sty) {
    this.style = sty;
  },

  setStyleIdx(idx) {
    this.styleIdx = idx;
  },

  setLibraryIdx(idx) {
    this.libraryIdx = idx;
  },

  setHairIdx(idx) {
    this.hairIdx = idx;
  },

  curAsset: "",
  changeAsset(asset) {
    this.curAsset = asset;
  },

  isCtrl: false,
  setIsCtrl(ctrl) {
    this.isCtrl = ctrl;
  },

  domEvents: null,
  setDomEvents(domEvents) {
    this.domEvents = domEvents;
  },
  orbitcontrol: null,
  setOrbitcontrol(orbitcontrol) {
    this.orbitcontrol = orbitcontrol;
  },
  canvas: null,
  setCanvas(canvas) {
    this.canvas = canvas;
  },
  camera: null,
  setCamera(camera) {
    this.camera = camera;
  },
  previewCamera: null,
  setPreviewCamera(camera) {
    this.previewCamera = camera;
  },
  previewCameraObject: null,
  setPreviewCameraObject(object) {
    this.previewCameraObject = object;
  },
  cameraPreviewOn: false,
  SetCameraPreviewOn(mode) {
    this.cameraPreviewOn = mode;
  },
  gl: null,
  setGl(gl) {
    this.gl = gl;
  },
  scene: null,
  setScene(scene) {
    this.scene = scene;
  },

  isPreview: false,
  setIsPreview(bool) {
    this.isPreview = bool;
  },

  isSceneSetting: false,
  setIsSceneSetting(bool) {
    this.isSceneSetting = bool;
  },

  asset: {},
  setAsset(name, file) {
    this.asset = { ...this.asset, [name]: file };
  },
  isLoading: true,
  setIsLoading(isLoading) {
    this.isLoading = isLoading;
  },
  uploadedImg: null,
  setUploadedImg(img) {
    this.uploadedImg = img;
  },
});

export { emote_store };
