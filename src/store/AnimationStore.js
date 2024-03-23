import { action, makeObservable, observable } from "mobx";

const animation_store = observable({
  animationAction: null,
  setAnimationAction(action) {
    this.animationAction = action;
  },

  playAnimation() {
    this.animationAction?.reset().play();
  },

  stopAnimation() {
    this.animationAction?.stop();
  },
});

export { animation_store };
