import { action, makeObservable, observable } from "mobx";

const smplify_store = observable({
  obj_path: "/static/models/smplx_mesh.glb",
  front_body_img_path: "/static/images/common/avatar_body.png",
  back_body_img_path: "/static/images/common/avatar_body.png",

  setObjPath(path) {
    this.obj_path = path;
  },
  setFrontBodyImgPath(path) {
    this.front_body_img_path = path;
  },
  setBackBodyImgPath(path) {
    this.back_body_img_path = path;
  },
});

export { smplify_store };
