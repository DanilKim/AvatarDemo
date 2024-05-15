import { observable } from "mobx";

const data_store = observable({
  style_list: [
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

  style_images: [],

  SetList(styleIdx) {
    this.style_images = [];

    for (let i = 0; i < this.style_list[styleIdx][1]; i++) {
      this.style_images.push(
        "url(/static/images/" +
          this.style_list[styleIdx][0] +
          "/" +
          String(i) +
          ".jpg)"
      );
    }
  },

  hair_list : [
    'mesh_00000',    'mesh_00035',    'mesh_00156',    'mesh_00253',
    'mesh_00404',    'mesh_00063',    'mesh_00137',    'mesh_00147',
    'mesh_00150',    'mesh_00157',    'mesh_00357',    'mesh_00395',
    'mesh_00427',    'mesh_00429',    'mesh_00512'
  ],

  mint_hair_list : [ 'No_Hair',
    'Hair_Male_001',   'Hair_Male_002',   'Hair_Male_003',   
    'Hair_Male_004',   'Hair_Male_005',   'Hair_Male_006',   
    'Hair_Female_001',   'Hair_Female_002',   'Hair_Female_003',   
    'Hair_Female_004',   'Hair_Female_005',   'Hair_Female_006',   
  ],

  hair_color_list : [
    'black', 'brown', 'red', 'blue',
    'green', 'purple', 'yellow', 'sky'
  ]


});

export { data_store };
