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
  theme_list: [],
  index_list: [],

  SetList() {
    for (let i = 0; i < this.item_list.length; i++) {
      let tmpName =
        "url(/static/images/" +
        this.item_list[i][0] +
        "/" +
        String(this.item_list[i][1]) +
        ".jpg)";
      for (let j = 0; j < this.item_list[i][1]; j++) {
        this.theme_list.push(this.item_list[i][0]);
        this.image_list.push(tmpName);
        this.index_list.push(this.item_list[i][1]);
      }
    }
  },
});

export { data_store };
