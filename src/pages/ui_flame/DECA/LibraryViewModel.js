import useStore from "../../../store/UseStore";

export default function LibraryViewModel(props) {
  const { data_store } = useStore();
  let image_list = [];
  let file_list = [];
  let category_list = [];
  let theme_list = [];
  let index_list = [];
  let tmpType = "";
  let tmpNum = 0;
  let tmpName = "";

  const itemList = data_store.item_list;

  for (let i = 0; i < itemList.length; i++) {
    tmpType = itemList[i][0];
    tmpNum = itemList[i][1];
    tmpName = "url(/static/images/" + tmpType + "/" + String(tmpNum) + ".jpg)";
    for (let j = 0; j < tmpNum; j++) {
      index_list.push(j);
      theme_list.push(tmpType);
      tmpName = "url(/static/images/" + tmpType + "/" + String(j) + ".jpg)";
      image_list.push(tmpName);
    }
  }

  return {
    image_list,
    theme_list,
    index_list,
  };
}
