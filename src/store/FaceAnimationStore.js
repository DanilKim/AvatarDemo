import { action, computed, makeObservable, observable} from 'mobx'

class FaceAnimationStore{
    
    @observable
    _faceanimationStore = new Array();
    _counter = 0;

    constructor(){
        makeObservable(this);
    }

    @action
    FaceAnimationUpdate(faceanimationClip) {
        let obj = JSON.parse(faceanimationClip);
        this._faceanimationStore.push(obj);
    }

    @action
    FaceAnimationStore() {
        return this.faceanimationStore;
    }

    @computed
    get updateFaceAnimation() {
        return this._counter;
    }
}

// 싱글톤으로 객체 유지
export default new FaceAnimationStore();
