import { makeObservable, observable, action, toJS, runInAction } from "mobx";
import { common_store } from "../../store/Common_Store";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import { rgbaToHexa } from "@uiw/color-convert";

class AnimateObject {
  objectId = 0;
  name = "";
  blobGlb = null;
  mixer = null;
  group = null;
  animationList = [];
  loadJSON = false;

  constructor(objectId, fileName, transform, blobGlb, loadJSON) {
    makeObservable(this, {
      objectId: observable,
      fileName: observable,
      transform: observable,
      blobGlb: observable,
      animationList: observable,
      loadJSON: observable,
      toJSON: action,
      ReConstructor: action,
    });
    const tempGroup = new THREE.Group();
    tempGroup.isRoot = true;
    this.objectId = objectId ? objectId : uuidv4();
    this.fileName = fileName;
    this.blobGlb = blobGlb;

    if (loadJSON !== true || loadJSON === undefined) {
      loadJSON = false; //this to see if it's loaded from JSON file
    }
  }

  async ReConstructor(object, { props, animationList }) {
    await this.group.add(object);
  }
}
