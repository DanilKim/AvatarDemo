import { makeObservable, observable, action } from "mobx";

const data_store = observable({
  item_list: [
    ["anime", 174],
    ["arcane", 100],
    ["caricature", 199],
    ["cartoon", 317],
    ["comic", 101],
    ["fantasy", 137],
    ["illustration", 156],
    ["impasto", 120],
    ["pixar", 122],
    ["slamdunk", 120],
  ],

  image_list: [],

  SetList(styleIdx) {
    this.image_list = [];

    for (let i = 0; i < this.item_list[styleIdx][1]; i++) {
      this.image_list.push(
        "url(/static/images/" +
          this.item_list[styleIdx][0] +
          "/" +
          String(i) +
          ".jpg)"
      );
    }
  },
});

export { data_store };
