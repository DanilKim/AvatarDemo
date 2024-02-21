import { observable } from "mobx";
import { player_store } from "./Player_Store";
import { scon_store } from "./Scon_Store";
import * as THREE from "three";
import MetaCharacter from "../class/MetaCharacter";
import { ChildCareOutlined } from "@mui/icons-material";
class UndoArray {
  object;
  category;
  index;

  constructor(object, category, index) {
    this.object = object;
    this.category = category;
    this.index = index;
  }
}

class RedoArray {
  object;
  category;
  index;

  constructor(object, category, index) {
    this.object = object;
    this.category = category;
    this.index = index;
  }
}

class MyItem {
  name;
  objectId;
  category;
  group;
  selected;
  visible;
  lock;

  constructor(name, objectId, category, group, selected, visible, lock) {
    this.name = name;
    this.objectId = objectId;
    this.category = category;
    this.group = group;
    this.selected = selected;
    this.visible = visible;
    this.lock = lock;
  }
}

class MyGroup {
  name;
  category;
  group;
  selected;

  constructor(name, category, group, selected) {
    this.name = name;
    this.category = category;
    this.group = group;
    this.selected = selected;
  }
}

class CopyObject {
  objectType;
  objectIndex;
  emotion_index;
  animation_index;
  transform;
  customize_list;
  material_temp;
  src_type;
  text;
  ui_index;
  temp;
  fontIndex;
  fontColor;

  constructor(
    objectType,
    objectIndex,
    emotion_index,
    animation_index,
    transform,
    customize_list,
    interactions,
    material_temp,
    src_type,
    text,
    ui_index,
    temp,
    fontIndex,
    fontColor
  ) {
    this.objectType = objectType;
    this.objectIndex = objectIndex;
    this.emotion_index = emotion_index;
    this.animation_index = animation_index;
    this.transform = transform;
    this.customize_list = customize_list;
    this.interactions = interactions;
    this.material_temp = material_temp;
    this.src_type = src_type;
    this.text = text;
    this.ui_index = ui_index;
    this.temp = temp;
    this.fontIndex = fontIndex;
    this.fontColor = fontColor;
  }
}

const common_store = observable({
  //cur_page: "Start",
  cur_page: "MainPanel",

  change_page(page) {
    //TODO
    this.cur_page = page;
  },

  allAgreement: false,
  ageAgreement: false,
  serviceAgreement: false,
  personalAgreement: false,
  marketingAgreement: false,

  setAllAgreement(agree) {
    this.allAgreement = agree;
  },
  setAgeAgreement(agree) {
    this.ageAgreement = agree;
  },
  setServiceAgreement(agree) {
    this.serviceAgreement = agree;
  },
  setPersonalAgreement(agree) {
    this.personalAgreement = agree;
  },
  setMarketingAgreement(agree) {
    this.marketingAgreement = agree;
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

  isAvatarClick: false,

  setIsAvatarClick(click) {
    if (click === false) this.setIsMoveMode(click);
    this.isAvatarClick = click;
  },

  isItemClick: false,

  setIsItemClick(click) {
    if (click === false) this.setIsMoveMode(click);
    this.isItemClick = click;
  },

  isUIClick: false,

  setIsUIClick(click) {
    this.isUIClick = click;
  },

  isLikes: false,

  setIsLikes() {
    this.isLikes = !this.isLikes;
  },

  isFilter: false,

  setIsFilter() {
    this.isFilter = !this.isFilter;
  },

  prevIdx: -1,
  isProjectSelect: false,

  scon_index_personalfile: -1,
  setSconIndexPersonalFile(value) {
    this.scon_index_personalfile = value;
  },

  setIsProjectSelect(index) {
    if (this.prevIdx === -1 || index === -1) {
      this.isProjectSelect = !this.isProjectSelect;
      this.prevIdx = index;
      if (this.isTemplateSelect === true) {
        this.isTemplateSelect = !this.isTemplateSelect;
        this.prevTemplateIdx = -1;
      }
    } else if (this.prevIdx === index) {
      this.isProjectSelect = !this.isProjectSelect;
      this.prevIdx = -1;
    } else {
      this.prevIdx = index;
    }
  },

  prevTemplateIdx: -1,
  isTemplateSelect: false,

  setIsTemplateSelect(index) {
    if (this.prevTemplateIdx === -1 || index === -1) {
      this.isTemplateSelect = !this.isTemplateSelect;
      this.prevTemplateIdx = index;
      if (this.isProjectSelect === true) {
        this.isProjectSelect = !this.isProjectSelect;
        this.prevIdx = -1;
      }
    } else if (this.prevTemplateIdx === index) {
      this.isTemplateSelect = !this.isTemplateSelect;
      this.prevTemplateIdx = -1;
    } else {
      this.prevTemplateIdx = index;
    }
  },

  isCreate: false,

  setIsCreate(create) {
    this.isCreate = create;
  },

  isGuideOff: false,

  setIsGuideOff() {
    this.isGuideOff = !this.isGuideOff;
  },

  isCameraOnPlayer: false,

  setIsCameraOnPlayer(isOn) {
    this.isCameraOnPlayer = isOn;
  },

  isTransControl: false,
  setIsTransControl(mode) {
    this.isTransControl = mode;
  },

  object_id: null,
  setObject_id(id) {
    this.object_id = id;
  },
  avatarIdx: -1,
  setAvatarIdx(idx) {
    this.avatarIdx = idx;
  },

  conceptIdx: 0,
  setConceptIdx(idx) {
    this.conceptIdx = idx;
  },

  floorIdx: 0,
  setFloorIdx(idx) {
    this.floorIdx = idx;
  },

  itemIdx: -1,
  setItemIdx(idx) {
    this.itemIdx = idx;
  },

  tempIdx: -1,
  setTempIdx(idx) {
    this.tempIdx = idx;
  },

  emotionIdx: 0,
  setEmotionIdx(idx) {
    this.emotionIdx = idx;
  },
  musicIdx: 0,
  setMusicIdx(idx) {
    //TODO : DELETE
    this.emotionIdx = idx;
  },
  animationIdx: 0,
  setAnimationIdx(idx) {
    this.animationIdx = idx;
  },

  character_custom_index: 0,
  setCharacterCustomIdx(idx) {
    this.character_custom_index = idx;
  },

  decoration_custom_index: 0,
  setDecorationCustomIdx(idx) {
    this.decoration_custom_index = idx;
  },

  background_custom_index: 0,
  setBackgroundCustomIdx(idx) {
    this.background_custom_index = idx;
  },

  sound_custom_index: 0,
  setSoundCustomIdx(idx) {
    this.sound_custom_index = idx;
  },

  sort_order: "최신순",
  setSortOrder(order) {
    this.sort_order = order;
  },

  thema_label: "전체",
  thema_name: "all",
  setThemaLabel(label) {
    this.thema_label = label;
    if (label === "전체") {
      this.thema_name = "all";
    } else if (label === "파티") {
      this.thema_name = "party";
    } else if (label === "캠핑") {
      this.thema_name = "camp";
    } else if (label === "우주") {
      this.thema_name = "space";
    } else if (label === "스키") {
      this.thema_name = "ski";
    } else if (label === "여름") {
      this.thema_name = "summer";
    } else if (label === "크리스마스") {
      this.thema_name = "xmas";
    } else if (label === "할로윈") {
      this.thema_name = "hallow";
    } else if (label === "기타") {
      this.thema_name = "null";
    }
  },
  trigger_names: {
    normal: ["Enter", "Spacebar", "Click", "Double"],
    attach: ["With Before Action", "After Before Action"],
    layout: [
      ["full", "전체화면"],
      ["vertical", "세로형"],
      ["horizontal", "가로형"],
    ],
    vertical: [
      ["left", "왼쪽"],
      ["right", "오른쪽"],
    ],
    horizontal: [
      ["top", "위쪽"],
      ["bottom", "아래쪽"],
    ],
  },
  thema_index: 0,
  setThemaIdx(idx) {
    this.thema_index = idx;
  },

  curMode: "translate",
  changeMode(mode) {
    this.transcontrol.setMode(mode);
    this.curMode = mode;
  },

  changeMode_nonTrans(mode) {
    this.curMode = mode;
  },

  undoExist: false,
  redoExist: false,
  prevObject: "Avatar",
  prevCategory: "Avatar",
  prevAvatarIndex: 0,
  prevEmotionIndex: 0,
  prevAnimationIndex: 0,

  leftSlide: false,
  changeLeftSlide(slide) {
    this.leftSlide = slide;
  },

  rightSlide: false,
  changeRightSlide(slide) {
    this.rightSlide = slide;
  },

  curCategory: "character",
  changeCategory(category) {
    this.curCategory = category;
  },

  curMyPage: "home",
  changeMyPage(page) {
    this.curMyPage = page;
  },

  add_undo(object, category, index) {
    this.undo_list = [
      new UndoArray(object, category, index),
      ...this.undo_list,
    ];
  },

  add_redo(object, category, index) {
    this.redo_list = [
      new RedoArray(object, category, index),
      ...this.redo_list,
    ];
  },

  editedDrawer: null,
  txtItemDrawer(objectId) {
    this.editedDrawer = objectId;
  },

  myDrawerList: [],
  updateMyDrawer() {
    if (this.numOfGroup === 0) {
      this.myDrawerList = [...this.myItemList];
    } else {
      let newList = [];
      for (let i = 0; i < this.numOfGroup; i++) {
        for (let j = 0; j < this.myItemList.length; j++) {
          if (this.myItemList[j].group === i) {
            newList = [this.myItemList[j], ...newList];
          }
        }
        newList = [this.myGroupList[i], ...newList];
      }
      for (let i = 0; i < this.myItemList.length; i++) {
        if (this.myItemList[i].group === -1) {
          newList = [...newList, this.myItemList[i]];
        }
      }
      this.myDrawerList = newList;
    }
  },

  initializeMyDrawer() {
    this.myDrawerList = [];
    this.myGroupList = [];
    this.myItemList = [];
    this.selected_list = [];
    this.multi_check = false;
    this.numOfGroup = 0;
    for (let metaObject of scon_store.metaGroups)
      scon_store.onMetaGroupDelete(metaObject);
    for (let metaObject of scon_store.metaGroupsPos)
      scon_store.onMetaGroupPosDelete(metaObject);
  },

  numOfGroup: 0,
  myGroupList: [],
  addMyGroup(name, category, group, selected) {
    this.myGroupList = [
      ...this.myGroupList,
      new MyGroup(name, category, group, selected),
    ];
    for (let i = 0; i < this.myItemList; i++) {}
    this.numOfGroup = this.numOfGroup + 1;
    this.updateMyDrawer();
  },

  myItemList: [],
  addMyItem(name, objectId, category, group, selected, visible, lock) {
    this.myItemList = [
      ...this.myItemList,
      new MyItem(name, objectId, category, group, selected, visible, lock),
    ];
    this.updateMyDrawer();
  },

  selected_groupList: [],
  selectMyGroup(group) {
    let new_list = [...this.myGroupList];
    const i = new_list.findIndex((e) => e.group === group);
    new_list[i].selected = !new_list[i].selected;
    this.myGroupList = new_list;
    this.updateMyDrawer();

    this.selected_list.length < 2
      ? (this.multi_check = false)
      : (this.multi_check = true);
    if (new_list[i].selected) {
      this.selected_groupList = [i, ...this.selected_groupList];
      this.setSelectedGroup(scon_store.metaGroups[i]);
      this.transcontrol.detach();

      let children_ = [];
      for (let child of scon_store.metaGroups[i].children)
        children_.push(child);
      for (let child of children_) {
        let oldParent = child.parent;
        let newParent = common_store.scene;
        let movedMesh = child;

        let meshPosition = new THREE.Vector3();
        movedMesh.getWorldPosition(meshPosition);

        oldParent.remove(movedMesh);
        newParent.add(movedMesh);
        movedMesh.updateMatrixWorld(true);
        movedMesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
      }

      let pos = new THREE.Vector3();
      pos.set(0, 0, 0);
      for (let child of children_) {
        pos.x += child.position.x;
        pos.y += child.position.y;
        pos.z += child.position.z;
      }
      pos.x /= children_.length;
      pos.y /= children_.length;
      pos.z /= children_.length;
      //console.log(children_)

      scon_store.metaGroups[i].position.set(pos.x, pos.y, pos.z);
      for (let child of children_) scon_store.metaGroups[i].attach(child);

      this.transcontrol.attach(scon_store.metaGroups[i]);
      this.setSelectedAvatar(null);
      this.setSelected_item(null);
      this.changeRightSlide(true);
    } else {
      this.transcontrol.detach();
      const j = this.selected_groupList.findIndex((e) => e.group === group);
      this.selected_groupList.splice(j, 1);
      //console.log(this.selected_groupList);
      if (this.selected_groupList.length === 0) {
        this.setSelectedGroup(null);
        this.changeRightSlide(false);
      } else {
        this.setSelectedGroup(
          scon_store.metaGroups[this.selected_groupList[0]]
        );
        this.changeRightSlide(true);
      }
    }
  },

  selected_list: [],
  multi_check: false,
  selectMyItem(objectId, type) {
    if (type !== "multi") {
      this.selected_list = [];
      for (let i = 0; i < common_store.myItemList.length; i++) {
        common_store.myItemList[i].selected = false;
      }
    }
    let new_list = [...this.myItemList];
    const i = new_list.findIndex((e) => e.objectId === objectId);
    if (new_list[i].selected) {
      const j = this.selected_list.findIndex((e) => e.objectId === objectId);
      this.selected_list.splice(j, 1);
    } else {
      this.selected_list = [new_list[i], ...this.selected_list];
    }
    this.selected_list.length < 2
      ? (this.multi_check = false)
      : (this.multi_check = true);
    new_list[i].selected = !new_list[i].selected;
    this.myItemList = new_list;
    this.updateMyDrawer();

    let target_obj;
    let category = 0;
    for (let metaObject of scon_store.metaObjects)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 0;
      }

    for (let metaObject of scon_store.metaItems)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 1;
      }
    if (type === "tab") {
      if (this.myItemList[i].selected) {
        if (category === 0) {
          if (target_obj.theme === "ch") {
            target_obj.MeshEventListner();
          } else {
            if (target_obj.box === "box") {
              target_obj.MeshEventListner();
            } else {
              target_obj.MeshEventListner();
            }
          }
        }
        if (category === 1) {
          target_obj.ItemEventListner();
        }
      } else {
        if (target_obj.theme === "ch") {
          common_store.domEvents.removeEventListener(
            target_obj.Mesh,
            "mousedown",
            target_obj.MeshEventListner,
            false
          );
          common_store.transcontrol.detach();
          this.setSelectedAvatar(null);
        } else {
          if (target_obj.box === "box") {
            common_store.domEvents.removeEventListener(
              target_obj.Mesh,
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
            common_store.transcontrol.detach();
            this.setSelectedAvatar(null);
          } else {
            common_store.domEvents.removeEventListener(
              target_obj.group.children[0],
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
            common_store.transcontrol.detach();
            this.setSelectedAvatar(null);
          }
        }
        if (category === 1) {
          common_store.domEvents.removeEventListener(
            target_obj.group.children[0],
            "mousedown",
            target_obj.ItemEventListner,
            false
          );
          common_store.transcontrol.detach();
          this.setSelected_item(null);
        }
      }
    }
  },

  visibleMyItem(objectId) {
    let new_list = [...this.myItemList];
    const i = new_list.findIndex((e) => e.objectId === objectId);
    new_list[i].visible = !new_list[i].visible;
    this.myDrawer = new_list;
    this.updateMyDrawer();

    let target_obj;
    let category = 0;
    for (let metaObject of scon_store.metaObjects)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 0;
      }

    for (let metaObject of scon_store.metaItems)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 1;
      }

    if (target_obj.group.visible === true) {
      if (category === 0) {
        if (target_obj.theme === "ch") {
          common_store.domEvents.removeEventListener(
            target_obj.Mesh,
            "mousedown",
            target_obj.MeshEventListner,
            false
          );
          common_store.transcontrol.detach();
          this.setSelectedAvatar(null);
        } else {
          if (target_obj.box === "box") {
            common_store.domEvents.removeEventListener(
              target_obj.Mesh,
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
          } else {
            common_store.domEvents.removeEventListener(
              target_obj.group.children[0],
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
            common_store.transcontrol.detach();
            this.setSelected_item(null);
          }
        }
      }
      if (category === 1) {
        common_store.domEvents.removeEventListener(
          target_obj.group.children[0],
          "mousedown",
          target_obj.ItemEventListner,
          false
        );
      }
    }
    if (target_obj.group.visible === false) {
      if (category === 0) {
        if (target_obj.theme === "ch") {
          common_store.domEvents.addEventListener(
            target_obj.Mesh,
            "mousedown",
            target_obj.MeshEventListner,
            false
          );
          common_store.orbitcontrol.enabled = true;
          common_store.transcontrol.attach(target_obj.group);
          this.setSelected_item(null);
          this.setSelectedAvatar(target_obj);
        } else {
          if (target_obj.box === "box") {
            common_store.domEvents.addEventListener(
              target_obj.Mesh,
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
          } else {
            common_store.domEvents.addEventListener(
              target_obj.group.children[0],
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
          }
        }
      }
      if (category === 1) {
        common_store.domEvents.addEventListener(
          target_obj.group.children[0],
          "mousedown",
          target_obj.ItemEventListner,
          false
        );
        common_store.orbitcontrol.enabled = true;
        common_store.transcontrol.attach(target_obj.group);
        this.setSelectedAvatar(null);
        this.setSelected_item(target_obj);
      }
    }
    target_obj.group.visible = !target_obj.group.visible;
  },

  lockMyItem(objectId) {
    let new_list = [...this.myDrawerList];
    const i = new_list.findIndex((e) => e.objectId === objectId);
    new_list[i].lock = !new_list[i].lock;
    this.myDrawerList = new_list;
    let target_obj;
    let category = 0;
    for (let metaObject of scon_store.metaObjects)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 0;
      }

    for (let metaObject of scon_store.metaItems)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 1;
      }

    if (new_list[i].lock) {
      ///잠금
      if (category === 0) {
        if (target_obj.theme === "ch") {
          common_store.domEvents.removeEventListener(
            target_obj.Mesh,
            "mousedown",
            target_obj.MeshEventListner,
            false
          );
          common_store.transcontrol.detach();
          this.setSelectedAvatar(null);
        } else {
          if (target_obj.box === "box") {
            common_store.domEvents.removeEventListener(
              target_obj.Mesh,
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
            common_store.transcontrol.detach();
            this.setSelectedAvatar(null);
          } else {
            common_store.domEvents.removeEventListener(
              target_obj.group.children[0],
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
            common_store.transcontrol.detach();
            this.setSelectedAvatar(null);
          }
        }
      }
      if (category === 1) {
        common_store.domEvents.removeEventListener(
          target_obj.group.children[0],
          "mousedown",
          target_obj.ItemEventListner,
          false
        );
        common_store.transcontrol.detach();
        this.setSelected_item(null);
      }
    }

    if (!new_list[i].lock) {
      ///잠금 해제
      if (category === 0) {
        if (target_obj.theme === "ch") {
          common_store.domEvents.addEventListener(
            target_obj.Mesh,
            "mousedown",
            target_obj.MeshEventListner,
            false
          );
        } else {
          if (target_obj.box === "box") {
            common_store.domEvents.addEventListener(
              target_obj.Mesh,
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
          } else {
            common_store.domEvents.addEventListener(
              target_obj.group.children[0],
              "mousedown",
              target_obj.MeshEventListner,
              false
            );
          }
        }
      }
      if (category === 1) {
        common_store.domEvents.addEventListener(
          target_obj.group.children[0],
          "mousedown",
          target_obj.ItemEventListner,
          false
        );
      }
    }
  },

  FindMyItem(objectId) {
    const i = this.myItemList.findIndex((e) => e.objectId === objectId);
    return i;
  },

  CopyMyDrawer(index) {
    //console.log(common_store.myDrawerList[index].name)

    let objectId = common_store.myItemList[index].objectId;
    let target_obj;
    let category = 0;
    for (let metaObject of scon_store.metaObjects) {
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 0;
      }
    }
    for (let metaObject of scon_store.metaItems) {
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        category = 1;
      }
    }

    if (category === 0) {
      common_store.selected_avatar = target_obj;
    }
    if (category === 1) {
      common_store.selected_item = target_obj;
    }
    //console.log(target_obj)
    target_obj.Copy();

    //console.log(target_obj.name)
  },

  GroupMyDrawer() {
    const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
    const material = new THREE.MeshBasicMaterial({ color: "rgb(255, 0, 0)" });
    material.transparent = true;
    material.opacity = 0.0;

    let empty_group = new THREE.Mesh(geometry, material);

    var target_obj = [];
    empty_group.position.set(0, 0, 0);

    for (let i = 0; i < common_store.myItemList.length; i++) {
      if (common_store.myItemList[i].selected === true) {
        common_store.myItemList[i].group = this.numOfGroup;
        let objectId = common_store.myItemList[i].objectId;

        for (let metaObject of scon_store.metaObjects)
          if (metaObject.objectId === objectId) {
            target_obj.push(metaObject);
            metaObject.layer = scon_store.metaGroups.length;
          }
        for (let metaObject of scon_store.metaItems)
          if (metaObject.objectId === objectId) {
            target_obj.push(metaObject);
            metaObject.layer = scon_store.metaGroups.length;
          }

        empty_group.position.x +=
          target_obj[target_obj.length - 1].group.position.x;
        empty_group.position.y +=
          target_obj[target_obj.length - 1].group.position.y;
        empty_group.position.z +=
          target_obj[target_obj.length - 1].group.position.z;
      }
    }
    empty_group.position.x /= target_obj.length;
    empty_group.position.y /= target_obj.length;
    empty_group.position.z /= target_obj.length;
    scon_store.onMetaGroupPositonAddFinished(empty_group.position);

    scon_store.onMetaGroupAddFinished(empty_group);
    common_store.scene.add(
      scon_store.metaGroups[scon_store.metaGroups.length - 1]
    );
    for (let metaObject of target_obj) {
      empty_group.attach(metaObject.group);
    }
  },

  OutGroupDrawer(objectId) {
    let target_obj;
    let type;
    for (let i = 0; i < common_store.myItemList.length; i++) {
      if (common_store.myItemList[i].objectId === objectId) {
        common_store.myItemList[i].group = -1;
      }
    }
    this.updateMyDrawer();
    for (let metaObject of scon_store.metaObjects)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        type = 0;
      }

    for (let metaObject of scon_store.metaItems)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
        type = 1;
      }
    //scon_store.metaGroups[scon_store.metaGroups.length - 1]
    let oldParent = target_obj.group.parent;
    let newParent = common_store.scene;
    let movedMesh = target_obj.group;

    let meshPosition = new THREE.Vector3();
    movedMesh.getWorldPosition(meshPosition);

    oldParent.remove(movedMesh);
    newParent.add(movedMesh);
    target_obj.layer = -1;

    // Here it needs to re-learn its new coordinates
    movedMesh.updateMatrixWorld(true);
    movedMesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
  },

  DeleteGroupElement(objectId) {
    let target_obj;
    for (let metaObject of scon_store.metaObjects)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
      }

    for (let metaObject of scon_store.metaItems)
      if (metaObject.objectId === objectId) {
        target_obj = metaObject;
      }

    if (target_obj.layer === -1) target_obj.DeleteMeta();

    if (target_obj.layer !== -1) {
      let oldParent = target_obj.group.parent;
      let newParent = common_store.scene;
      let movedMesh = target_obj.group;

      let meshPosition = new THREE.Vector3();
      movedMesh.getWorldPosition(meshPosition);

      oldParent.remove(movedMesh);
      newParent.add(movedMesh);
      target_obj.layer = -1;
      target_obj.DeleteMeta();
    }
    this.updateMyDrawer();
  },

  ChangeMyItemDrawer(objectId, str) {
    let new_list = [...this.myItemList];
    const i = new_list.findIndex((e) => e.objectId === objectId);
    //new_list[i].name = str;
    let target_obj;
    for (let metaObject of scon_store.metaObjects)
      if (objectId === metaObject.objectId) target_obj = metaObject;
    for (let metaObject of scon_store.metaItems)
      if (objectId === metaObject.objectId) target_obj = metaObject;

    target_obj.name = str;
    if (new_list[i].category === "character") target_obj.changeNameTag(str);

    this.myDrawer = new_list;
    this.updateMyDrawer();
  },

  delete_redo() {
    this.redo_list = [];
  },

  isPlaying: true,

  setIsPlaying() {
    this.isPlaying = !this.isPlaying;
  },

  setPreviewMode() {
    this.isPlaying = true;
    this.globalTime = 0;
  },

  slider_max: 5,

  setSlider_max(max) {
    this.slider_max = max;
  },

  selected_avatar: null,

  setSelectedAvatar(avatar) {
    this.selected_avatar = avatar;
  },

  selected_group: null,

  setSelectedGroup(group) {
    this.selected_group = group;
  },

  controlercheck: null,

  setControlercheck(controlercheck) {
    this.controlercheck = controlercheck;
  },

  selected_item: null,
  setSelected_item(item) {
    this.selected_item = item;
  },

  selected_ui: null,
  setSelected_ui(ui) {
    this.selected_ui = ui;
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
  setCameraPosition(x, y, z) {
    this.camera.position.set(x, y, z);
  },
  setCameraRotation(_x, _y, _z) {
    this.camera.rotation.set(_x, _y, _z);
  },
  gl: null,
  setGl(gl) {
    this.gl = gl;
  },
  scene: null,
  setScene(scene) {
    this.scene = scene;
  },
  composer: null,
  setComposer(composer) {
    this.composer = composer;
  },
  outlinePass: null,
  setOutlinePass(outlinePass) {
    this.outlinePass = outlinePass;
  },

  interactionItem: null,
  setInteractionItem(item) {
    this.interactionItem = item;
  },

  grid: null,
  setGrid(grid) {
    this.grid = grid;
  },

  floor: null,
  setFloor(floor) {
    this.floor = floor;
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
  moveBoundingCylinderToPlayer() {
    let target;
    if (player_store.player instanceof MetaCharacter === true)
      target = player_store.player.group;
    else target = player_store.player;
    this.boundingCylinder.position.copy(target.position);
    this.boundingCylinder.position.y += 0.8;
  },

  mouseState: 0,
  setMouseState(state) {
    this.mouseState = state;
  },

  size: 50,
  setSize(size) {
    this.size = size;
  },

  headSize: 50,
  setHeadSize(headSize) {
    this.headSize = headSize;
  },

  footSize: 50,
  setFootSize(footSize) {
    this.footSize = footSize;
  },

  armSize: 50,
  setArmSize(armSize) {
    this.armSize = armSize;
  },

  legSize: 50,
  setLegSize(legSize) {
    this.legSize = legSize;
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

  isItemAddMode: false,
  setItemAddMode(mode) {
    this.isItemAddMode = mode;
    if (scon_store.tempItem !== null && !mode) {
      if (scon_store.tempItem !== null) {
        scon_store.tempItem.DeleteMeta();
        scon_store.tempItem = null;
      }
    }
  },

  isTempAddMode: false,
  setTempAddMode(mode) {
    this.isTempAddMode = mode;
    if (scon_store.tempAvatar !== null && !mode) {
      scon_store.tempAvatar.deleteBaseMetaObject();
      scon_store.tempAvatar = null;
    }
  },

  isAvatarAddMode: false,
  setAvatarAddMode(mode) {
    this.isAvatarAddMode = mode;
    if (scon_store.tempAvatar !== null && !mode) {
      scon_store.tempAvatar.DeleteMeta();
      scon_store.tempAvatar = null;
    }
  },

  orientationHelper: null,
  setorientationHelper(orientationHelper) {
    this.orientationHelper = orientationHelper;
  },
  avatarEditmode: null,
  setavatareditmode(avatarEditmode) {
    this.avatarEditmode = avatarEditmode;
  },
  editAvatar: null,
  seteditavatar(editAvatar) {
    this.editAvatar = editAvatar;
  },
  is2DUIInteract: false,
  set2DUIInteract(bool) {
    this.is2DUIInteract = bool;
  },

  musicSelect: null,
  setMusicSelect(title) {
    this.musicSelect = title;
  },
  music_mode: "replay",
  setMusicMode(mode) {
    this.music_mode = mode;
  },
  music: null, //audio class로 객체
  setMusic(music) {
    this.music = music;
  },
  musicTitle: null, //현재  audio 객체 등록되어 있는 music Title
  setMusicTitle(title) {
    this.musicTitle = title;
  },

  isPreview: false,
  setIsPreview(bool) {
    this.isPreview = bool;
    if (bool) {
      document.addEventListener("keydown", player_store.KeyDown, false);
      document.addEventListener("keyup", player_store.KeyUp, false);
      document.addEventListener("mousedown", player_store.JoystickOn, false);
      document.addEventListener("mouseup", player_store.JoystickOff, false);
      document.addEventListener("touchstart", player_store.JoystickOn, false);
      document.addEventListener("touchend", player_store.JoystickOff, false);
    } else {
      document.removeEventListener("keydown", player_store.KeyDown, false);
      document.removeEventListener("keyup", player_store.KeyUp, false);
      document.removeEventListener("mousedown", player_store.JoystickOn, false);
      document.removeEventListener("mouseup", player_store.JoystickOff, false);
      document.addEventListener("touchstart", player_store.JoystickOn, false);
      document.addEventListener("touchend", player_store.JoystickOff, false);
      if (player_store.joyManager !== null) {
        //console.log("delete")
        player_store.joyManager["0"].destroy();
        document.body.removeChild(document.getElementById("joy"));
        document.getElementById("joy").remove();
      }
    }
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

  objectClipBoard: null,
  setObjectClipBoard(object) {
    this.objectClipBoard = object;
  },

  cinematicCam: null,
  setCinematicCam(cam) {
    this.cinematicCam = cam;
  },
  wheelcount: 0,
  wheelcountunit: 0.03,
  setWheelcountunit(value) {
    this.wheelcountunit = value;
  },
  meta3DCanvas: [],
  cinematicPreviewCam: null,
  setCinematicPreviewCam(camera) {
    this.cinematicPreviewCam = camera;
  },
});

export { CopyObject, common_store };
