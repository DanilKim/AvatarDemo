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
  set_list: false,

  SetList() {
    if (!this.set_list) {
      for (let i = 0; i < this.item_list.length; i++) {
        let tmpType = this.item_list[i][0];
        for (let j = 0; j < this.item_list[i][1]; j++) {
          this.index_list.push(j);
          this.theme_list.push(tmpType);
          let tmpName = "url(/static/images/" + tmpType + "/" + String(j) + ".jpg)";
          this.image_list.push(tmpName);
        };
      };
      this.set_list = true;
    }
  },

  hair_list : [
    'mesh_00000',    'mesh_00035',    'mesh_00156',    'mesh_00253',
    'mesh_00404',    'mesh_00063',    'mesh_00137',    'mesh_00147',
    'mesh_00150',    'mesh_00157',    'mesh_00357',    'mesh_00395',
    'mesh_00427',    'mesh_00429',    'mesh_00512'
  ],


});

export { data_store };
