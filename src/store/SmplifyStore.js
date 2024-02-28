import { action, makeObservable, observable } from "mobx";

const smplify_store = observable({
    obj_path: 'static/models/smplx_mesh.glb',
    setObjPath(path) {
        this.obj_path = path;
    }
})

export {smplify_store};