import { observable } from "mobx";

const mode_store = observable({
  mode: 0,

  setMode(mode) {
    // mode : ['deca', 'smplify', 'anim', 'emote']
    if (mode === 'deca') {
      this.mode = 0;
    } else if (mode === 'anim') {
      this.mode = 1;
    } else if (mode === 'smplify') {
      this.mode = 2;
    } else if (mode === 'emote') {
      this.mode = 3;
    } else {
      this.mode = mode;
    }
  }
});

export { mode_store };
