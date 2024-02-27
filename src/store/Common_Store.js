import { observable } from "mobx";
import * as THREE from "three";

const common_store = observable({
  //cur_page: "Start",
  cur_page: "MainPanel",

  change_page(page) {
    //TODO
    this.cur_page = page;
  },

  fabToggle: "report",

  setFabToggle(toggle) {
    this.fabToggle = toggle;
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

  isMouseOver: false,

  setIsMouseOver(over) {
    this.isMouseOver = over;
  },

  isCreate: false,

  setIsCreate(create) {
    this.isCreate = create;
  },

  isTransControl: false,
  setIsTransControl(mode) {
    this.isTransControl = mode;
  },

  styleIdx: -1,
  libraryIdx: -1,

  setStyleIdx(idx) {
    this.styleIdx = idx;
  },
  setLibraryIdx(idx) {
    this.libraryIdx = idx;
  },

  curMode: "translate",
  changeMode(mode) {
    this.transcontrol.setMode(mode);
    this.curMode = mode;
  },

  changeMode_nonTrans(mode) {
    this.curMode = mode;
  },

  topSlide: true,
  changeTopSlide() {
    this.topSlide = !this.topSlide;
  },

  curCategory: "canvas",
  changeCategory(category) {
    this.curCategory = category;
    if (!this.topSlide) this.changeTopSlide();
  },

  curAsset: "",
  changeAsset(asset) {
    this.curAsset = asset;
  },

  optionLeftTab: "",
  changeLeftOption(option) {
    this.optionLeftTab = option;
  },
  optionprevLeftTab: "hierarchy",
  changePrevLeftOption(option) {
    this.optionprevLeftTab = option;
  },

  isCtrl: false,
  setIsCtrl(ctrl) {
    this.isCtrl = ctrl;
  },

  controlercheck: null,

  setControlercheck(controlercheck) {
    this.controlercheck = controlercheck;
  },

  transcontrol: null,
  setTranscontrol(scene, trans) {
    this.transcontrol = trans;
    if (scene != null) {
      scene.add(this.transcontrol);
    }
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

  createFloor() {
    const geometry = new THREE.PlaneGeometry(500, 500);
    const material = new THREE.MeshPhongMaterial();
    material.envMapIntensity = 0.0;
    const floor = new THREE.Mesh(geometry, material);
    floor.receiveShadow = true;
    floor.rotation.set(-Math.PI / 2, 0, 0);
    floor.name = "floor";
    floor.visible = false;
    this.floor = floor;
  },

  magneticMode: false,
  setMagneticAdd(mode) {
    this.magneticMode = mode;
  },

  normalMode: false,
  setNormalMode(mode) {
    this.normalMode = mode;
  },

  attachMode: false,
  setAttachMode(mode) {
    this.attachMode = mode;
  },

  plane: null,
  setPlane(plane) {
    this.plane = plane;
  },

  onPlane: false,
  setOnPlane(object, state) {
    if (object.name === "plane") this.onPlane = state;
  },

  raycastObjects: [],
  addRaycastObject(object) {
    this.raycastObjects.push(object);
  },
  deleteRaycastObject(object) {
    var index = this.raycastObjects.indexOf(object);
    if (index > -1) {
      this.raycastObjects.splice(index, 1);
    }
  },

  boundingCylinder: null,
  setBoundingCylinder(object) {
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1.6, 16);
    const cylinderMaterial = new THREE.MeshBasicMaterial({
      color: "rgb(255, 0, 0)",
    });
    // cylinderMaterial.transparent = true;
    // cylinderMaterial.opacity = 0.2;

    var cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.name = "boundingCylinder";
    cylinder.position.y = 0.8;
    this.boundingCylinder = cylinder;
    this.boundingCylinder.visible = false;
    this.scene.add(this.boundingCylinder);
  },

  positionX: 0,
  setPositionX(x) {
    this.positionX = x;
  },

  positionY: 0,
  setPositionY(y) {
    this.positionY = y;
  },

  positionZ: 0,
  setPositionZ(z) {
    this.positionZ = z;
  },

  rotationX: 0,
  setRotationX(x) {
    this.rotationX = x;
  },

  rotationY: 0,
  setRotationY(y) {
    this.rotationY = y;
  },

  rotationZ: 0,
  setRotationZ(z) {
    this.rotationZ = z;
  },

  scaleX: 0,
  setScaleX(x) {
    this.scaleX = x;
  },

  scaleY: 0,
  setScaleY(y) {
    this.scaleY = y;
  },

  scaleZ: 0,
  setScaleZ(z) {
    this.scaleZ = z;
  },

  isMoveMode: false,
  setIsMoveMode(mode) {
    this.isMoveMode = mode;
  },
  isMoveModeEnd: false,

  setIsMoveModeEnd(mode) {
    this.isMoveModeEnd = mode;
  },

  orientationHelper: null,
  setorientationHelper(orientationHelper) {
    this.orientationHelper = orientationHelper;
  },

  isPreview: false,
  setIsPreview(bool) {
    this.isPreview = bool;
  },

  isSceneSetting: false,
  setIsSceneSetting(bool) {
    this.isSceneSetting = bool;
  },

  name_open: false,
  setNameOpen(bool) {
    this.name_open = bool;
  },
  text_avatar: null,
  setTextAvatar(avatar) {
    this.text_avatar = avatar;
  },
  text_item: null,
  setTextItem(text_item) {
    this.text_item = text_item;
  },
  Create_Scon_type: null,
  setCreate_Scon_type(type) {
    this.Create_Scon_type = type;
  },
  captureCard: null,
  setcaptureCard(card) {
    this.captureCard = card;
  },
  captureCardRatio: 1,
  setcaptureCardRatio(Ratio) {
    this.captureCardRatio = Ratio;
  },
  outlineObjects: [],
  hdriEnvProps: {
    opacity: 0.5,
    backgroundBlur: 0.5,
    environmentIntensity: 1.2,
    backgroundRotation: [0, 0, 0],
  },
  setOpacity(value) {
    this.hdriEnvProps.opacity = value;
  },
  onChangeOpacity(e) {
    common_store.setOpacity(e.target.value);
  },
  setBackgroundBlur(value) {
    this.hdriEnvProps.backgroundBlur = value;
  },
  onChangeBackgroundBlur(e) {
    common_store.setBackgroundBlur(e.target.value);
  },
  setEnvironmentIntensity(value) {
    this.hdriEnvProps.environmentIntensity = value;
  },
  onChangeEnvironmentIntensity(e) {
    common_store.setEnvironmentIntensity(e.target.value);
  },
  setBackgroundRotation(value) {
    this.hdriEnvProps.backgroundRotation = [0, value, 0];
  },
  onChangeBackgroundRotation(e) {
    common_store.setBackgroundRotation(e.target.value);
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

export { common_store };
